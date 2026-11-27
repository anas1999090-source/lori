import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

const META_DATASET_ID = process.env.META_DATASET_ID || '2905831479803678';
const META_GRAPH_VERSION = 'v21.0';
const MAX_BODY_BYTES = 32 * 1024;
const DEDUPE_TTL_MS = 10 * 60 * 1000;
const DEDUPE_MAX_ENTRIES = 2000;

const ALLOWED_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Search',
  'InitiateCheckout',
  'Purchase',
  'Contact',
]);

// In-memory deduplication store keyed by `${event_name}:${event_id}`
const processedEventIds = new Map<string, number>();

function pruneDedupeCache(now: number): void {
  for (const [key, expiresAt] of processedEventIds) {
    if (expiresAt <= now) {
      processedEventIds.delete(key);
    }
  }
  while (processedEventIds.size > DEDUPE_MAX_ENTRIES) {
    const oldestKey = processedEventIds.keys().next().value;
    if (!oldestKey) break;
    processedEventIds.delete(oldestKey);
  }
}

function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function normalizePhone(rawPhone: string): string | null {
  let digits = rawPhone.replace(/\D/g, '');
  if (!digits) return null;
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 10) {
    digits = `212${digits.slice(1)}`;
  }
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

function normalizeTextToken(raw: string): string | null {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, '');
  return cleaned.length > 0 ? cleaned : null;
}

function isValidFbpOrFbc(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 255 &&
    /^fb\.[01]\.\d+\.[A-Za-z0-9_-]+$/.test(value)
  );
}

function sanitizeSourceUrl(rawUrl: unknown): string {
  if (typeof rawUrl === 'string' && rawUrl.length <= 1024) {
    try {
      const parsed = new URL(rawUrl);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.toString();
      }
    } catch {
      // fallback below
    }
  }
  return 'https://lori-86t4.vercel.app/';
}

function sendJson(res: ServerResponse, statusCode: number, body: Record<string, unknown>): void {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: IncomingMessage & { body?: unknown }): Promise<Record<string, unknown> | null> {
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    const parsed = JSON.parse(req.body);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;

    req.on('data', (chunk: Buffer) => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(null);
        return;
      }
      try {
        const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          resolve(parsed as Record<string, unknown>);
        } else {
          resolve(null);
        }
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });

    req.on('error', () => reject(new Error('READ_ERROR')));
  });
}

function extractClientIp(req: IncomingMessage): string | undefined {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress;
}

function sanitizeCustomData(raw: unknown): Record<string, unknown> | undefined {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return undefined;
  const input = raw as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  if (typeof input.currency === 'string' && /^[A-Z]{3}$/.test(input.currency)) {
    out.currency = input.currency;
  }
  if (typeof input.value === 'number' && Number.isFinite(input.value) && input.value >= 0) {
    out.value = Number(input.value.toFixed(2));
  }
  if (typeof input.content_type === 'string' && input.content_type.length <= 64) {
    out.content_type = input.content_type;
  }
  if (typeof input.content_name === 'string' && input.content_name.length <= 255) {
    out.content_name = input.content_name;
  }
  if (typeof input.order_id === 'string' && input.order_id.length <= 128) {
    out.order_id = input.order_id;
  }
  if (typeof input.search_string === 'string' && input.search_string.length <= 255) {
    out.search_string = input.search_string;
  }
  if (typeof input.num_items === 'number' && Number.isInteger(input.num_items) && input.num_items > 0) {
    out.num_items = input.num_items;
  }
  if (Array.isArray(input.content_ids)) {
    const ids = input.content_ids
      .filter((id): id is string => typeof id === 'string' && id.length > 0 && id.length <= 128)
      .slice(0, 50);
    if (ids.length > 0) out.content_ids = ids;
  }
  if (Array.isArray(input.contents)) {
    const items = input.contents
      .filter((entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === 'object'))
      .slice(0, 50)
      .map((entry) => {
        const cleanItem: Record<string, unknown> = {};
        if (typeof entry.id === 'string' && entry.id.length <= 128) cleanItem.id = entry.id;
        if (typeof entry.quantity === 'number' && Number.isInteger(entry.quantity) && entry.quantity > 0) {
          cleanItem.quantity = entry.quantity;
        }
        if (typeof entry.item_price === 'number' && Number.isFinite(entry.item_price) && entry.item_price >= 0) {
          cleanItem.item_price = Number(entry.item_price.toFixed(2));
        }
        return cleanItem;
      })
      .filter((item) => typeof item.id === 'string');

    if (items.length > 0) out.contents = items;
  }

  return Object.keys(out).length > 0 ? out : undefined;
}

export async function handleMetaCapi(
  req: IncomingMessage & { body?: unknown },
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = await readJsonBody(req);
  } catch (err) {
    const message = err instanceof Error && err.message === 'PAYLOAD_TOO_LARGE'
      ? 'Payload too large'
      : 'Invalid JSON payload';
    sendJson(res, 400, { ok: false, error: message });
    return;
  }

  if (!body) {
    sendJson(res, 400, { ok: false, error: 'Missing request body' });
    return;
  }

  // Enforce explicit user consent on server before processing or forwarding any user data
  if (body.consent_granted !== true) {
    sendJson(res, 202, { ok: false, skipped: 'consent_required' });
    return;
  }

  const eventName = typeof body.event_name === 'string' ? body.event_name.trim() : '';
  const eventId = typeof body.event_id === 'string' ? body.event_id.trim() : '';

  if (!ALLOWED_EVENTS.has(eventName)) {
    sendJson(res, 400, { ok: false, error: 'Unsupported event name' });
    return;
  }

  if (!eventId || eventId.length > 128) {
    sendJson(res, 400, { ok: false, error: 'Invalid event_id' });
    return;
  }

  const now = Date.now();
  pruneDedupeCache(now);
  const dedupeKey = `${eventName}:${eventId}`;
  if (processedEventIds.has(dedupeKey)) {
    sendJson(res, 200, { ok: true, deduplicated: true });
    return;
  }

  const accessToken = process.env.META_ACCESS_TOKEN?.trim();
  if (!accessToken) {
    sendJson(res, 202, { ok: false, skipped: 'meta_token_not_configured' });
    return;
  }

  // Build hashed + consented user_data
  const rawUserData =
    body.user_data && typeof body.user_data === 'object' && !Array.isArray(body.user_data)
      ? (body.user_data as Record<string, unknown>)
      : {};

  const userData: Record<string, unknown> = {};

  const clientIp = extractClientIp(req);
  if (clientIp) userData.client_ip_address = clientIp;

  const userAgent = req.headers['user-agent'];
  if (typeof userAgent === 'string' && userAgent.length <= 512) {
    userData.client_user_agent = userAgent;
  }

  if (isValidFbpOrFbc(rawUserData.fbp)) userData.fbp = rawUserData.fbp;
  if (isValidFbpOrFbc(rawUserData.fbc)) userData.fbc = rawUserData.fbc;

  if (typeof rawUserData.email === 'string') {
    const cleanEmail = rawUserData.email.trim().toLowerCase();
    if (cleanEmail.includes('@') && cleanEmail.length <= 254) {
      userData.em = [sha256Hex(cleanEmail)];
    }
  }

  if (typeof rawUserData.phone === 'string') {
    const normalizedPhone = normalizePhone(rawUserData.phone);
    if (normalizedPhone) {
      userData.ph = [sha256Hex(normalizedPhone)];
    }
  }

  if (typeof rawUserData.fullName === 'string') {
    const parts = rawUserData.fullName.trim().split(/\s+/);
    const fn = parts[0] ? normalizeTextToken(parts[0]) : null;
    const ln = parts.length > 1 ? normalizeTextToken(parts.slice(1).join(' ')) : null;
    if (fn) userData.fn = [sha256Hex(fn)];
    if (ln) userData.ln = [sha256Hex(ln)];
  }

  if (typeof rawUserData.city === 'string') {
    const ct = normalizeTextToken(rawUserData.city);
    if (ct) userData.ct = [sha256Hex(ct)];
  }

  // Store operates in Morocco (MAD)
  userData.country = [sha256Hex('ma')];

  const customData = sanitizeCustomData(body.custom_data);
  const eventPayload: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(now / 1000),
    event_id: eventId,
    event_source_url: sanitizeSourceUrl(body.event_source_url),
    action_source: 'website',
    user_data: userData,
  };

  if (customData) {
    eventPayload.custom_data = customData;
  }

  const graphBody: Record<string, unknown> = {
    data: [eventPayload],
  };

  const testEventCode = process.env.META_TEST_EVENT_CODE?.trim();
  if (testEventCode) {
    graphBody.test_event_code = testEventCode;
  }

  try {
    const graphUrl = `https://graph.facebook.com/${META_GRAPH_VERSION}/${META_DATASET_ID}/events`;
    const metaResp = await fetch(graphUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(graphBody),
    });

    if (!metaResp.ok) {
      sendJson(res, 502, { ok: false, error: 'Meta Conversions API rejected event' });
      return;
    }

    const metaJson = (await metaResp.json()) as { events_received?: number };
    processedEventIds.set(dedupeKey, now + DEDUPE_TTL_MS);

    sendJson(res, 200, {
      ok: true,
      deduplicated: false,
      events_received: metaJson.events_received ?? 1,
    });
  } catch {
    sendJson(res, 502, { ok: false, error: 'Failed to reach Meta Conversions API' });
  }
}

export default handleMetaCapi;
