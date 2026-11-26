export type Language = 'en' | 'fr' | 'ar';

export type CategoryFilter = 'ALL' | 'SHAMPOO' | 'OILS' | 'KERATIN' | 'PACKS';

export type ViewMode = 'carousel' | 'grid';

export type PageRoute = 'home' | 'detail' | 'blog' | 'admin';

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  dotColor: string;
}

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  comment: Record<Language, string>;
}

export interface Product {
  id: string;
  slug: string;
  category: Exclude<CategoryFilter, 'ALL'>;
  categoryLabel: Record<Language, string>;
  name: Record<Language, string>;
  shortName: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
  needFor: Record<Language, string>;
  hairRole: Record<Language, string>;
  howToUse: Record<Language, string>;
  freeDelivery?: boolean;
  price: number;
  variants: ProductVariant[];
  benefits: Record<Language, string[]>;
  ingredients: Record<Language, string[]>;
  /** Transparent PNG product image paths */
  images: [string, string, string, string];
  imageLabels: Record<Language, [string, string, string, string]>;
  accentColor: string;
  reviewCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

export interface Order {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  items: Array<{
    productId: string;
    productName: string;
    variantLabel: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'COD';
  status: OrderStatus;
}

export interface BlogArticle {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  readTime: Record<Language, string>;
  excerpt: Record<Language, string>;
  body: Record<Language, string[]>;
  relatedProductId: string;
  accentColor: string;
}
