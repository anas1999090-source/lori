import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Disc, LayoutGrid } from 'lucide-react';
import { CategoryFilter, Language, Product, ViewMode } from '../types';
import { Translations } from '../data/translations';
import { CategorySidebar } from './CategorySidebar';
import { ProductVisual } from './ProductVisual';

interface HeroShowcaseProps {
  products: Product[];
  allProducts: Product[];
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onOpenProduct: (product: Product) => void;
  onOrderProduct: (product: Product) => void;
  language: Language;
  t: Translations;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const CATEGORIES: CategoryFilter[] = ['PACKS', 'SHAMPOO', 'OILS', 'KERATIN', 'ALL'];

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  products,
  allProducts,
  activeCategory,
  onSelectCategory,
  viewMode,
  onChangeViewMode,
  activeIndex,
  onChangeIndex,
  onOpenProduct,
  onOrderProduct,
  language,
  t,
}) => {
  const isRtl = language === 'ar';
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(products.length - 1, 0));
  const activeProduct = products[safeIndex] || allProducts[0];

  const wheelLockRef = useRef<number>(0);
  const touchStartX = useRef<number | null>(null);
  const [hoveredGridId, setHoveredGridId] = useState<string | null>(null);

  const goNext = useCallback(() => {
    if (products.length <= 1) return;
    onChangeIndex((safeIndex + 1) % products.length);
  }, [products.length, safeIndex, onChangeIndex]);

  const goPrev = useCallback(() => {
    if (products.length <= 1) return;
    onChangeIndex((safeIndex - 1 + products.length) % products.length);
  }, [products.length, safeIndex, onChangeIndex]);

  useEffect(() => {
    if (viewMode !== 'carousel') return;
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (isRtl) goPrev();
        else goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (isRtl) goNext();
        else goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [viewMode, isRtl, goNext, goPrev]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (viewMode !== 'carousel' || products.length <= 1) return;
    const primaryDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(primaryDelta) < 24) return;

    const now = Date.now();
    if (now - wheelLockRef.current < 480) return;
    wheelLockRef.current = now;

    if (primaryDelta > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || products.length <= 1) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 36) return;
    if (diff > 0) {
      if (isRtl) goPrev();
      else goNext();
    } else {
      if (isRtl) goNext();
      else goPrev();
    }
  };

  const handleSublinkClick = (product: Product) => {
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      if (viewMode === 'carousel') {
        if (idx === safeIndex) {
          onOpenProduct(product);
        } else {
          onChangeIndex(idx);
        }
      } else {
        onOpenProduct(product);
      }
    } else {
      onOpenProduct(product);
    }
  };

  const getRelativeOffset = (idx: number): number => {
    const len = products.length;
    if (len <= 1) return 0;
    let diff = idx - safeIndex;
    if (len === 2) {
      return diff === 0 ? 0 : diff > 0 ? 1 : -1;
    }
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1440px] flex-col px-4 pb-10 pt-2 sm:px-8 lg:px-12">
      {/* Top-right view mode toggle icons */}
      <div className="mb-3 flex items-center justify-end gap-2">
        <div
          role="group"
          aria-label="View mode"
          className="inline-flex items-center gap-1 rounded-full bg-[#F4F4F4] dark:bg-[#171917] p-1"
        >
          <button
            type="button"
            onClick={() => onChangeViewMode('carousel')}
            aria-label={t.hero.carouselView}
            title={t.hero.carouselView}
            className={`cursor-pointer flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
              viewMode === 'carousel'
                ? 'bg-white dark:bg-[#262926] text-[#111111] dark:text-[#F4F4F4] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#9A9A9A] hover:text-[#111111] dark:hover:text-[#F4F4F4]'
            }`}
          >
            <Disc className="h-3.5 w-3.5" strokeWidth={1.7} />
          </button>
          <button
            type="button"
            onClick={() => onChangeViewMode('grid')}
            aria-label={t.hero.gridView}
            title={t.hero.gridView}
            className={`cursor-pointer flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-[#262926] text-[#111111] dark:text-[#F4F4F4] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#9A9A9A] hover:text-[#111111] dark:hover:text-[#F4F4F4]'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.7} />
          </button>
        </div>
      </div>

      {/* Left Category Column + Right Carousel/Grid Stage */}
      <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:gap-10">
        <CategorySidebar
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          products={allProducts}
          activeProductId={activeProduct.id}
          onSelectProductSublink={handleSublinkClick}
          language={language}
          t={t}
        />

        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {viewMode === 'carousel' ? (
              <motion.div
                key="carousel-stage"
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: EASE }}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative flex min-h-[470px] sm:min-h-[540px] lg:min-h-[590px] w-full flex-col items-center justify-center select-none overflow-hidden"
              >
                {/* Floating transparent PNG product stage */}
                <div className="relative flex h-[290px] sm:h-[360px] lg:h-[395px] w-full items-center justify-center">
                  {products.map((product, idx) => {
                    const offset = getRelativeOffset(idx);
                    const isCenter = offset === 0;
                    const isVisibleSide = Math.abs(offset) === 1;
                    const dirMultiplier = isRtl ? -1 : 1;
                    const translateX = offset * 330 * dirMultiplier;

                    if (!isCenter && !isVisibleSide) {
                      return null;
                    }

                    return (
                      <motion.div
                        key={product.id}
                        initial={false}
                        animate={{
                          x: translateX,
                          scale: isCenter ? 1 : 0.64,
                          opacity: isCenter ? 1 : 0.42,
                          filter: isCenter ? 'blur(0px)' : 'blur(10px)',
                          rotate: isCenter ? -14 : offset < 0 ? -22 : -8,
                          zIndex: isCenter ? 20 : 10,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: EASE,
                        }}
                        onClick={() => {
                          if (isCenter) {
                            onOpenProduct(product);
                          } else {
                            onChangeIndex(idx);
                          }
                        }}
                        data-cursor="interactive"
                        className={`absolute flex flex-col items-center justify-center cursor-pointer ${
                          isCenter
                            ? 'w-[240px] sm:w-[300px] lg:w-[340px]'
                            : 'w-[220px] sm:w-[270px] hidden sm:flex'
                        }`}
                      >
                        <div className={isCenter ? 'animate-lori-float w-full' : 'w-full'}>
                          <motion.div
                            layoutId={isCenter ? `product-hero-${product.id}` : undefined}
                            transition={{ duration: 0.65, ease: EASE }}
                            className="relative flex aspect-square w-full items-center justify-center"
                          >
                            <ProductVisual
                              src={product.images[0]}
                              alt={product.name[language]}
                              label={product.shortName[language]}
                              accentColor={product.accentColor}
                              priority={isCenter}
                              className="h-full w-full drop-shadow-[0_18px_28px_rgba(17,17,17,0.1)]"
                            />
                          </motion.div>
                        </div>

                        <div
                          aria-hidden="true"
                          className={`mt-2 h-4 w-[58%] rounded-[100%] bg-[#111111]/20 dark:bg-black/60 blur-md ${
                            isCenter ? 'animate-lori-shadow' : 'opacity-20'
                          }`}
                        />
                      </motion.div>
                    );
                  })}

                  {products.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={isRtl ? goNext : goPrev}
                        aria-label="Previous product"
                        className="cursor-pointer absolute start-1 sm:start-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 dark:bg-[#171917]/90 text-[#9A9A9A] transition-all duration-200 hover:bg-[#F4F4F4] dark:hover:bg-[#232623] hover:text-[#111111] dark:hover:text-[#F4F4F4]"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
                      </button>
                      <button
                        type="button"
                        onClick={isRtl ? goPrev : goNext}
                        aria-label="Next product"
                        className="cursor-pointer absolute end-1 sm:end-3 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 dark:bg-[#171917]/90 text-[#9A9A9A] transition-all duration-200 hover:bg-[#F4F4F4] dark:hover:bg-[#232623] hover:text-[#111111] dark:hover:text-[#F4F4F4]"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
                      </button>
                    </>
                  )}
                </div>

                {/* Masked text reveal + Details & Cash on Delivery actions */}
                <div className="mt-4 flex flex-col items-center text-center">
                  <div className="overflow-hidden py-1">
                    <AnimatePresence mode="wait">
                      <motion.h1
                        key={`${activeProduct.id}-${language}-title`}
                        initial={{ y: 36, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -32, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="font-display text-[32px] sm:text-[44px] lg:text-[50px] font-bold uppercase leading-[1.05] text-[#111111] dark:text-[#F4F4F4]"
                      >
                        {activeProduct.name[language]}
                      </motion.h1>
                    </AnimatePresence>
                  </div>

                  <div className="overflow-hidden mt-2">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${activeProduct.id}-${language}-sub`}
                        initial={{ y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="text-xs sm:text-[13px] text-[#9A9A9A] tabular-nums"
                      >
                        <span>{activeProduct.subtitle[language]}</span>
                        <span className="mx-2 text-[#D4D4D4] dark:text-[#3A3D3A]">|</span>
                        <span className="font-bold text-[#111111] dark:text-[#F4F4F4]">
                          {activeProduct.price} {t.hero.currency}
                        </span>
                        {activeProduct.freeDelivery && (
                          <>
                            <span className="mx-2 text-[#D4D4D4] dark:text-[#3A3D3A]">·</span>
                            <span className="font-semibold text-[#4A5F34] dark:text-[#A9BC93]">
                              {t.hero.freeDeliveryTag}
                            </span>
                          </>
                        )}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenProduct(activeProduct)}
                      className="cursor-pointer rounded-full bg-[#F4F4F4] dark:bg-[#171917] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#111111] dark:text-[#F4F4F4] transition-all duration-300 hover:bg-[#111111] hover:text-white dark:hover:bg-[#F4F4F4] dark:hover:text-[#0D0E0D]"
                    >
                      {t.hero.seeMore}
                    </button>
                    <button
                      type="button"
                      onClick={() => onOrderProduct(activeProduct)}
                      className="cursor-pointer rounded-full bg-[#4A5F34] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-opacity duration-300 hover:opacity-90"
                    >
                      {t.hero.orderNow}
                    </button>
                  </div>

                  {products.length > 1 && (
                    <div className="mt-6 flex items-center gap-2">
                      {products.map((p, idx) => {
                        const isDotActive = idx === safeIndex;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => onChangeIndex(idx)}
                            aria-label={p.shortName[language]}
                            className="cursor-pointer p-1"
                          >
                            <span
                              className="block h-1.5 rounded-full transition-all duration-500"
                              style={{
                                width: isDotActive ? '22px' : '6px',
                                backgroundColor: isDotActive ? p.accentColor : '#DCDCDC',
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* 3-Column Grid View on Desktop / 2-Column on Mobile */
              <motion.div
                key="grid-stage"
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: EASE }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-12 py-4"
              >
                {products.map((product) => {
                  const isHovered = hoveredGridId === product.id;
                  return (
                    <article
                      key={product.id}
                      onClick={() => onOpenProduct(product)}
                      onMouseEnter={() => setHoveredGridId(product.id)}
                      onMouseLeave={() => setHoveredGridId(null)}
                      data-cursor="interactive"
                      className="group cursor-pointer flex flex-col"
                    >
                      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-[#F4F4F4] dark:bg-[#171917] p-6 sm:p-8">
                        <motion.div
                          layoutId={`product-hero-${product.id}`}
                          animate={{
                            scale: isHovered ? 1.05 : 1,
                            rotate: isHovered ? -10 : -4,
                          }}
                          transition={{ duration: 0.55, ease: EASE }}
                          className="relative flex h-full w-full items-center justify-center"
                        >
                          <ProductVisual
                            src={product.images[0]}
                            alt={product.name[language]}
                            label={product.shortName[language]}
                            accentColor={product.accentColor}
                            className="h-[84%] w-[84%] drop-shadow-[0_14px_22px_rgba(17,17,17,0.08)]"
                          />
                        </motion.div>

                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-6 h-3 w-[48%] rounded-[100%] bg-[#111111]/12 dark:bg-black/50 blur-md transition-transform duration-500 group-hover:scale-90"
                        />
                      </div>

                      <div className="mt-3.5 flex items-baseline justify-between gap-2">
                        <h2 className="font-display text-sm sm:text-base font-bold uppercase text-[#111111] dark:text-[#F4F4F4]">
                          {product.shortName[language]}
                        </h2>
                        <span className="font-display text-sm sm:text-base font-bold text-[#111111] dark:text-[#F4F4F4] tabular-nums whitespace-nowrap shrink-0">
                          {product.price} {t.hero.currency}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#9A9A9A] line-clamp-1">
                        {product.subtitle[language]}
                      </p>
                    </article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
