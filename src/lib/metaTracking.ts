import { Order, Product } from '../types';

export type TrackingConsent = 'granted' | 'denied';

export type MetaStandardEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Search'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Contact';

export interface MetaContentItem {
  id: string;
  quantity: number;
  item_price: number;
}

export interface MetaCustomData {
  content_ids?: string[];
  content_type?: 'product' | 'product_group' | 'whatsapp';
  content_name?: string;
  value?: number;
  currency?: 'MAD';
  contents?: MetaContentItem[];
  num_items?: number;
  order_id?: string;
  search_string?: string;
}

interface MetaCapiUserDataInput {
  fullName?: string;
  phone?: string;
  city?: string;
  email?: string;
  fbp?: string;
  fbc?: string;
}

declare global {
  interface Window {
    fbq?: (
      command: 'init' | 'track' | 'trackCustom' | 'consent',
      arg1: string,
      arg2?: Record<string, unknown>,
      arg3?: { eventID?: string }
    ) => void;
    __loriMetaPixelInitialized?: boolean;
  }
}

export const META_PIXEL_ID = '2905831479803678';
const CONSENT_STORAGE_KEY = 'lori_consent_v1';
const TRACKED_PURCHASES_KEY = 'lori_tracked_purchases_v1';

let lastPageViewRoute: string | null = null;
let lastViewedProductKey: string | null = null;
let lastSearchString: string | null = null;
const memoryTrackedPurchases = new Set<string>();

function createEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `lori-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getStoredConsent(): TrackingConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed === 'granted' || parsed === 'denied' ? parsed : null;
  } catch {
    return null;
  }
}

export function applyTrackingConsent(consent: TrackingConsent): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore storage errors
  }

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('consent', consent === 'granted' ? 'grant' : 'revoke');
    if (!window.__loriMetaPixelInitialized) {
      window.__loriMetaPixelInitialized = true;
      window.fbq('init', META_PIXEL_ID);
    }
  }
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const parts = document.cookie.split('; ');
  for (const part of parts) {
    const eqIndex = part.indexOf('=');
    if (eqIndex > 0 && part.slice(0, eqIndex) === name) {
      return decodeURIComponent(part.slice(eqIndex + 1));
    }
  }
  return undefined;
}

function getBrowserMetaIds(): { fbp?: string; fbc?: string } {
  if (getStoredConsent() !== 'granted') return {};
  const fbp = getCookie('_fbp');
  let fbc = getCookie('_fbc');

  if (!fbc && typeof window !== 'undefined') {
    try {
      const fbclid = new URLSearchParams(window.location.search).get('fbclid');
      if (fbclid && /^[A-Za-z0-9_-]{8,200}$/.test(fbclid)) {
        fbc = `fb.1.${Date.now()}.${fbclid}`;
      }
    } catch {
      // ignore URL parse errors
    }
  }

  return { fbp, fbc };
}

function readTrackedPurchaseIds(): Set<string> {
  const combined = new Set(memoryTrackedPurchases);
  try {
    const raw = localStorage.getItem(TRACKED_PURCHASES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const id of parsed) {
          if (typeof id === 'string') combined.add(id);
        }
      }
    }
  } catch {
    // ignore
  }
  return combined;
}

function markPurchaseTracked(orderId: string): void {
  memoryTrackedPurchases.add(orderId);
  try {
    const existing = Array.from(readTrackedPurchaseIds()).slice(-99);
    if (!existing.includes(orderId)) existing.push(orderId);
    localStorage.setItem(TRACKED_PURCHASES_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

async function sendServerEvent(
  eventName: MetaStandardEventName,
  eventId: string,
  customData?: MetaCustomData,
  extraUserData?: Omit<MetaCapiUserDataInput, 'fbp' | 'fbc'>
): Promise<void> {
  if (getStoredConsent() !== 'granted') return;

  const metaIds = getBrowserMetaIds();
  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: typeof window !== 'undefined' ? window.location.href : 'https://lori-86t4.vercel.app/',
    consent_granted: true,
    custom_data: customData,
    user_data: {
      ...extraUserData,
      ...metaIds,
    },
  };

  try {
    await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Non-blocking telemetry: avoid interrupting storefront checkout/UX
  }
}

function dispatchMetaEvent(
  eventName: MetaStandardEventName,
  customData?: MetaCustomData,
  extraUserData?: Omit<MetaCapiUserDataInput, 'fbp' | 'fbc'>
): void {
  if (getStoredConsent() !== 'granted') return;

  const eventId = createEventId();

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (customData) {
      window.fbq('track', eventName, customData as Record<string, unknown>, { eventID: eventId });
    } else {
      window.fbq('track', eventName, {}, { eventID: eventId });
    }
  }

  void sendServerEvent(eventName, eventId, customData, extraUserData);
}

export function trackPageView(routeKey: string, force = false): void {
  if (getStoredConsent() !== 'granted') return;
  if (!force && lastPageViewRoute === routeKey) return;
  lastPageViewRoute = routeKey;
  dispatchMetaEvent('PageView');
}

export function resetViewContentDedupe(): void {
  lastViewedProductKey = null;
}

export function trackViewContent(product: Product, variantPrice: number): void {
  if (getStoredConsent() !== 'granted') return;
  if (lastViewedProductKey === product.id) return;
  lastViewedProductKey = product.id;

  dispatchMetaEvent('ViewContent', {
    content_ids: [product.id],
    content_type: 'product',
    content_name: product.name.en,
    value: variantPrice,
    currency: 'MAD',
    contents: [
      {
        id: product.id,
        quantity: 1,
        item_price: variantPrice,
      },
    ],
  });
}

export function trackSearch(query: string, matchedProductIds: string[]): void {
  if (getStoredConsent() !== 'granted') return;
  const normalized = query.trim();
  if (normalized.length < 2) return;
  if (lastSearchString === normalized.toLowerCase()) return;
  lastSearchString = normalized.toLowerCase();

  dispatchMetaEvent('Search', {
    search_string: normalized,
    content_ids: matchedProductIds,
    content_type: 'product',
    currency: 'MAD',
  });
}

export function trackInitiateCheckout(
  product: Product,
  unitPrice: number,
  quantity = 1
): void {
  if (getStoredConsent() !== 'granted') return;

  dispatchMetaEvent('InitiateCheckout', {
    content_ids: [product.id],
    content_type: 'product',
    content_name: product.name.en,
    contents: [
      {
        id: product.id,
        quantity,
        item_price: unitPrice,
      },
    ],
    num_items: quantity,
    value: unitPrice * quantity,
    currency: 'MAD',
  });
}

export function trackPurchase(order: Order): void {
  if (getStoredConsent() !== 'granted') return;
  if (!order.id) return;

  const alreadyTracked = readTrackedPurchaseIds();
  if (alreadyTracked.has(order.id)) return;

  markPurchaseTracked(order.id);

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  dispatchMetaEvent(
    'Purchase',
    {
      content_ids: order.items.map((item) => item.productId),
      content_type: 'product',
      content_name: order.items.map((item) => item.productName).join(', '),
      contents: order.items.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        item_price: item.unitPrice,
      })),
      num_items: totalItems,
      value: order.total,
      currency: 'MAD',
      order_id: order.id,
    },
    {
      fullName: order.fullName,
      phone: order.phone,
      city: order.city,
    }
  );
}

export function trackContact(channel: string): void {
  if (getStoredConsent() !== 'granted') return;

  dispatchMetaEvent('Contact', {
    content_name: channel,
    content_type: 'whatsapp',
  });
}
