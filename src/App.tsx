import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { BLOG_ARTICLES, PRODUCTS } from './data/products';
import { TRANSLATIONS } from './data/translations';
import {
  CartItem,
  CategoryFilter,
  Language,
  Order,
  OrderStatus,
  PageRoute,
  Product,
  ViewMode,
} from './types';
import { Header } from './components/Header';
import { HeroShowcase } from './components/HeroShowcase';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { BlogView } from './components/BlogView';
import { AdminOrdersPage } from './components/AdminOrdersPage';
import { CursorFollower } from './components/CursorFollower';
import { LoriLogo } from './components/LoriLogo';

const STORAGE_KEYS = {
  cart: 'lori_cart_v1',
  orders: 'lori_orders_v1',
  wishlist: 'lori_wishlist_v1',
  lang: 'lori_lang_v1',
};

const EASE = [0.22, 1, 0.36, 1] as const;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() =>
    readStorage<Language>(STORAGE_KEYS.lang, 'en')
  );
  const [route, setRoute] = useState<PageRoute>(() =>
    window.location.pathname === '/admin' ? 'admin' : 'home'
  );
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);

  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.cart, [])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.wishlist, [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.orders, [])
  );

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [introDone, setIntroDone] = useState<boolean>(() =>
    window.location.pathname === '/admin'
  );

  const t = TRANSLATIONS[language];

  // Quick fade-in of the LORI logo on initial page load, then reveal carousel
  useEffect(() => {
    if (introDone) return;
    const timer = window.setTimeout(() => setIntroDone(true), 620);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  // Sync HTML dir & lang attributes for RTL Arabic support
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEYS.lang, JSON.stringify(language));
    } catch {
      // ignore
    }
  }, [language]);

  // Persist cart, wishlist, and orders
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Sync browser back/forward for `/admin`
  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname === '/admin' ? 'admin' : 'home');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const selectedProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0],
    [selectedProductId]
  );

  const otherProducts = useMemo(
    () => PRODUCTS.filter((p) => p.id !== selectedProduct.id),
    [selectedProduct.id]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const navigateTo = (nextRoute: PageRoute, pushPath?: string) => {
    setRoute(nextRoute);
    if (pushPath && window.location.pathname !== pushPath) {
      window.history.pushState({}, '', pushPath);
    }
  };

  const handleSelectCategory = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    setActiveIndex(0);
    if (route !== 'home') {
      navigateTo('home', '/');
    }
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProductId(product.id);
    const idxInFiltered = filteredProducts.findIndex((p) => p.id === product.id);
    if (idxInFiltered >= 0) {
      setActiveIndex(idxInFiltered);
    }
    navigateTo('detail', '/');
  };

  const handleAddToCart = (productId: string, variantId: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.variantId === variantId
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, variantId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, variantId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOrderComplete = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col bg-white text-[#111111]">
        <CursorFollower />

        {/* Quick initial logo intro fade-in */}
        <AnimatePresence>
          {!introDone && (
            <motion.div
              key="intro-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <LoriLogo size="lg" showBio />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky minimalist header */}
        <Header
          language={language}
          onChangeLanguage={setLanguage}
          activeCategory={activeCategory}
          route={route}
          onSelectCategoryNav={handleSelectCategory}
          onNavigateHome={() => navigateTo('home', '/')}
          onNavigateBlog={() => navigateTo('blog', '/')}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cartCount}
          t={t}
        />

        {/* Active View */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {route === 'home' && (
              <motion.div
                key="view-home"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <HeroShowcase
                  products={filteredProducts}
                  allProducts={PRODUCTS}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                  viewMode={viewMode}
                  onChangeViewMode={setViewMode}
                  activeIndex={activeIndex}
                  onChangeIndex={setActiveIndex}
                  onOpenProduct={handleOpenProduct}
                  language={language}
                  t={t}
                />
              </motion.div>
            )}

            {route === 'detail' && (
              <ProductDetailPage
                key={`view-detail-${selectedProduct.id}`}
                product={selectedProduct}
                otherProducts={otherProducts}
                language={language}
                t={t}
                onBack={() => navigateTo('home', '/')}
                onSelectProduct={handleOpenProduct}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.includes(selectedProduct.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {route === 'blog' && (
              <BlogView
                key="view-blog"
                articles={BLOG_ARTICLES}
                products={PRODUCTS}
                language={language}
                t={t}
                onBackHome={() => navigateTo('home', '/')}
                onOpenProduct={handleOpenProduct}
              />
            )}

            {route === 'admin' && (
              <AdminOrdersPage
                key="view-admin"
                orders={orders}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onDeleteOrder={handleDeleteOrder}
                onBackToStore={() => navigateTo('home', '/')}
                t={t}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Quiet minimalist footer */}
        <footer className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-7 text-[10px] uppercase tracking-[0.12em] text-[#9A9A9A] sm:px-8 lg:px-12">
          <span>
            © {new Date().getFullYear()} {t.footer.rights}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <span>{t.footer.naturalFormula}</span>
            <span aria-hidden="true">·</span>
            <span>{t.footer.codWorldwide}</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => navigateTo('admin', '/admin')}
              className="cursor-pointer uppercase transition-colors hover:text-[#111111]"
            >
              {t.footer.admin}
            </button>
          </div>
        </footer>

        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={handleOpenProduct}
          language={language}
          t={t}
        />

        {/* Slide-in Cart & COD Checkout Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          products={PRODUCTS}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onOrderComplete={handleOrderComplete}
          language={language}
          t={t}
        />
      </div>
    </MotionConfig>
  );
}
