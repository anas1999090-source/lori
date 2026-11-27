import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { BLOG_ARTICLES, PRODUCTS } from './data/products';
import { TRANSLATIONS } from './data/translations';
import {
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
import { OrderCodModal } from './components/OrderCodModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { SearchOverlay } from './components/SearchOverlay';
import { BlogView } from './components/BlogView';
import { AdminOrdersPage } from './components/AdminOrdersPage';
import { CursorFollower } from './components/CursorFollower';
import { LoriLogo } from './components/LoriLogo';
import { ConsentBanner } from './components/ConsentBanner';
import {
  TrackingConsent,
  applyTrackingConsent,
  getStoredConsent,
  resetViewContentDedupe,
  trackInitiateCheckout,
  trackPageView,
} from './lib/metaTracking';

const STORAGE_KEYS = {
  orders: 'lori_orders_v1',
  wishlist: 'lori_wishlist_v1',
  lang: 'lori_lang_v2',
  theme: 'lori_theme_v1',
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
  // Default to Arabic (RTL) as requested
  const [language, setLanguage] = useState<Language>(() =>
    readStorage<Language>(STORAGE_KEYS.lang, 'ar')
  );
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    readStorage<'light' | 'dark'>(STORAGE_KEYS.theme, 'light')
  );
  const [route, setRoute] = useState<PageRoute>(() =>
    window.location.pathname === '/admin' ? 'admin' : 'home'
  );
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [viewMode, setViewMode] = useState<ViewMode>('carousel');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);

  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.wishlist, [])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.orders, [])
  );

  const [orderModalState, setOrderModalState] = useState<{
    isOpen: boolean;
    product: Product | null;
    variantId?: string;
  }>({
    isOpen: false,
    product: null,
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [consent, setConsent] = useState<TrackingConsent | null>(() => getStoredConsent());
  const [consentBannerOpen, setConsentBannerOpen] = useState<boolean>(
    () => getStoredConsent() === null
  );
  const [introDone, setIntroDone] = useState<boolean>(() =>
    window.location.pathname === '/admin'
  );

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (introDone) return;
    const timer = window.setTimeout(() => setIntroDone(true), 580);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEYS.lang, JSON.stringify(language));
    } catch {
      // ignore
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme));
    } catch {
      // ignore
    }
  }, [theme]);

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

  useEffect(() => {
    const onPopState = () => {
      setRoute(window.location.pathname === '/admin' ? 'admin' : 'home');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const currentRouteKey =
    route === 'detail' ? `detail:${selectedProductId}` : route;

  useEffect(() => {
    if (route !== 'detail') {
      resetViewContentDedupe();
    }
    if (consent === 'granted') {
      trackPageView(currentRouteKey);
    }
  }, [route, currentRouteKey, consent]);

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

  const handleOpenOrderModal = (product: Product, variantId?: string) => {
    const chosenVariant =
      product.variants.find((v) => v.id === variantId) || product.variants[0];
    trackInitiateCheckout(product, chosenVariant.price, 1);

    setOrderModalState({
      isOpen: true,
      product,
      variantId,
    });
  };

  const handleAcceptConsent = () => {
    applyTrackingConsent('granted');
    setConsent('granted');
    setConsentBannerOpen(false);
    trackPageView(currentRouteKey, true);
  };

  const handleDeclineConsent = () => {
    applyTrackingConsent('denied');
    setConsent('denied');
    setConsentBannerOpen(false);
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
      <div className="relative flex min-h-screen flex-col bg-white dark:bg-[#0D0E0D] text-[#111111] dark:text-[#F4F4F4] transition-colors duration-300">
        <CursorFollower />

        {/* Quick initial logo intro fade-in */}
        <AnimatePresence>
          {!introDone && (
            <motion.div
              key="intro-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-[#0D0E0D]"
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
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          activeCategory={activeCategory}
          route={route}
          onSelectCategoryNav={handleSelectCategory}
          onNavigateHome={() => navigateTo('home', '/')}
          onNavigateBlog={() => navigateTo('blog', '/')}
          onOpenSearch={() => setIsSearchOpen(true)}
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
                  onOrderProduct={(p) => handleOpenOrderModal(p)}
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
                onOrderCod={handleOpenOrderModal}
                isWishlisted={wishlist.includes(selectedProduct.id)}
                onToggleWishlist={handleToggleWishlist}
                consentGranted={consent === 'granted'}
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
        <footer className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-7 text-[10px] uppercase tracking-[0.08em] text-[#9A9A9A] sm:px-8 lg:px-12">
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
              className="cursor-pointer uppercase transition-colors hover:text-[#111111] dark:hover:text-[#F4F4F4]"
            >
              {t.footer.admin}
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setConsentBannerOpen(true)}
              className="cursor-pointer uppercase transition-colors hover:text-[#111111] dark:hover:text-[#F4F4F4]"
            >
              {language === 'ar'
                ? 'الخصوصية'
                : language === 'fr'
                  ? 'Confidentialité'
                  : 'Privacy'}
            </button>
          </div>
        </footer>

        {/* Floating WhatsApp Contact Button (+212 621-572534) */}
        <WhatsAppFloatingButton t={t} />

        {/* Privacy Consent Banner */}
        <ConsentBanner
          visible={consentBannerOpen}
          language={language}
          onAccept={handleAcceptConsent}
          onDecline={handleDeclineConsent}
        />

        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={handleOpenProduct}
          language={language}
          t={t}
        />

        {/* Cash on Delivery -> WhatsApp Order Modal */}
        <OrderCodModal
          isOpen={orderModalState.isOpen}
          onClose={() => setOrderModalState((prev) => ({ ...prev, isOpen: false }))}
          product={orderModalState.product}
          initialVariantId={orderModalState.variantId}
          onOrderComplete={handleOrderComplete}
          language={language}
          t={t}
        />
      </div>
    </MotionConfig>
  );
}
