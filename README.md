# LORI Bio — Natural Hair Care Storefront

Minimalist single-page e-commerce experience for **LORI Bio**, defaulting to Arabic RTL (`AR`) with `FR` and `EN` support, transparent-background PNG product cutouts, interactive carousel & grid views, hair-care role breakdowns, and direct **Cash on Delivery (الدفع عند الاستلام) via WhatsApp** (`+212 621-572534`).

## Products Featured

1. **الباك الكامل للعناية بالشعر LORI** (`199 DH` · **توصيل مجاني**) — الشامبوان 100 مل + الزيت 100 مل
2. **شامبوان طبيعي ضد تساقط الشعر LORI** (`110 DH`) — 100 ml
3. **زيت طبيعي ضد تساقط الشعر LORI** (`135 DH`) — 100 ml
4. **علاج الكيراتين الطبيعي للشعر LORI** (`150 DH`) — 100 ml

## 1. Transparent PNG Product Images

All 4 transparent-background PNG product images live inside `public/images/`:
- `/images/lori-pack.png`
- `/images/lori-shampoo.png`
- `/images/lori-oil.png`
- `/images/lori-keratin.png`

## 2. Editing Prices, Hair Care Roles & WhatsApp Number

- Edit prices, variants, `needFor`, `hairRole`, and `howToUse` inside `src/data/products.ts`.
- Edit the WhatsApp destination number (`212621572534`) inside `src/components/OrderCodModal.tsx`.

## 3. Orders & `/admin` Console

- All Cash-on-Delivery WhatsApp orders are also logged in `localStorage` under `lori_orders_v1`.
- Visit `/admin` (or click **الإدارة / Admin** in the footer) with password `lori2026` to review orders and export CSV.
