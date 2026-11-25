# LORI — Natural Hair & Body Care Storefront

Minimalist single-page e-commerce experience for **LORI**, supporting English, French (`FR`), and right-to-left Arabic (`AR`), with interactive 3D-feel product carousel, grid view, shared-element product detail pages, slide-in Cash-on-Delivery (COD) checkout, and a local `/admin` order console.

## 1. Replacing Product Images

All 16 transparent-background PNG placeholders live inside `public/images/` (4 views per product):

- **Frankincense Soap**: `lori-soap-1.png`, `lori-soap-2.png`, `lori-soap-3.png`, `lori-soap-4.png`
- **Natural Shampoo**: `lori-shampoo-1.png`, `lori-shampoo-2.png`, `lori-shampoo-3.png`, `lori-shampoo-4.png`
- **Keratin Oil**: `lori-keratin-1.png`, `lori-keratin-2.png`, `lori-keratin-3.png`, `lori-keratin-4.png`
- **Hair Loss Oil**: `lori-hairloss-1.png`, `lori-hairloss-2.png`, `lori-hairloss-3.png`, `lori-hairloss-4.png`

To swap in your studio photography, drop transparent-background PNG files with those exact filenames into `public/images/`. No code edits are required.

Recommended photography style:
- Pure transparent PNG cutout (`800×800` or square aspect ratio)
- Soft studio lighting and subtle natural botanical leaves (`#4A5F34`, `#A9BC93`, `#F4C2C2`)
- Consistent angle across all 4 products

## 2. Editing Prices, Variants & Copy

Open `src/data/products.ts`. Each product in `PRODUCTS` contains:
- `price`: base display price in Moroccan Dirhams (`DH`)
- `variants`: size options (e.g. `100g` / `200g`, `250ml` / `500ml`, `50ml` / `100ml`) with individual prices and accent dot colors
- `name`, `shortName`, `subtitle`, `description`, `benefits`, `ingredients`: localized for `en`, `fr`, and `ar`

## 3. Orders & `/admin` Console

- Customer COD orders are persisted in `localStorage` under `lori_orders_v1`.
- Navigate to `/admin` (or click **Admin** in the footer) to view orders, update delivery status, and export CSV.
- Default admin password: `lori2026` (edit `ADMIN_PASSWORD` inside `src/components/AdminOrdersPage.tsx`).
