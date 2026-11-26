import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronDown, Heart, MessageCircle, Star } from 'lucide-react';
import { Language, Product } from '../types';
import { Translations } from '../data/translations';
import { ProductVisual } from './ProductVisual';

interface ProductDetailPageProps {
  product: Product;
  otherProducts: Product[];
  language: Language;
  t: Translations;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onOrderCod: (product: Product, variantId: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  otherProducts,
  language,
  t,
  onBack,
  onSelectProduct,
  onOrderCod,
  isWishlisted,
  onToggleWishlist,
}) => {
  const isRtl = language === 'ar';
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [openAccordion, setOpenAccordion] = useState<'details' | 'delivery' | 'reviews' | null>(
    'details'
  );

  useEffect(() => {
    setSelectedVariantId(product.variants[0].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const toggleAccordion = (key: 'details' | 'delivery' | 'reviews') => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-3 sm:px-8 lg:px-12"
    >
      {/* Top-left circular Back button */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label={t.pdp.back}
          className="cursor-pointer group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.08em] text-[#9A9A9A] transition-colors duration-200 hover:text-[#111111]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-transform duration-300 group-hover:scale-105">
            {isRtl ? (
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            ) : (
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
            )}
          </span>
          <span>{t.pdp.back}</span>
        </button>
      </div>

      {/* Main 2-column PDP grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
        {/* Left: Tall white card with vertically stacked transparent PNG gallery */}
        <div className="relative rounded-sm bg-white shadow-[0_14px_50px_rgba(17,17,17,0.045)]">
          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:block absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white to-transparent"
          />

          <div className="gallery-scroll-mask flex flex-col gap-6 p-6 sm:p-10 lg:max-h-[calc(100vh-145px)] lg:overflow-y-auto">
            {product.images.map((imgSrc, index) => (
              <div
                key={`${product.id}-${index}`}
                className="relative flex flex-col items-center justify-center overflow-hidden rounded-sm bg-[#F4F4F4]/65 px-6 py-10 sm:py-14"
              >
                {index === 0 ? (
                  <motion.div
                    layoutId={`product-hero-${product.id}`}
                    transition={{ duration: 0.65, ease: EASE }}
                    className="flex w-full max-w-[380px] items-center justify-center"
                  >
                    <ProductVisual
                      src={imgSrc}
                      alt={`${product.name[language]} — ${product.imageLabels[language][index]}`}
                      label={product.imageLabels[language][index]}
                      accentColor={product.accentColor}
                      priority
                      className="h-[260px] w-[260px] sm:h-[340px] sm:w-[340px] drop-shadow-[0_18px_28px_rgba(17,17,17,0.09)]"
                    />
                  </motion.div>
                ) : (
                  <div className="flex w-full max-w-[380px] items-center justify-center">
                    <ProductVisual
                      src={imgSrc}
                      alt={`${product.name[language]} — ${product.imageLabels[language][index]}`}
                      label={product.imageLabels[language][index]}
                      accentColor={product.accentColor}
                      className={`h-[240px] w-[240px] sm:h-[310px] sm:w-[310px] drop-shadow-[0_16px_26px_rgba(17,17,17,0.07)] ${
                        index === 1 ? 'scale-105' : ''
                      }`}
                    />
                  </div>
                )}

                <span className="mt-5 text-[10px] uppercase tracking-[0.12em] text-[#9A9A9A]">
                  0{index + 1} · {product.imageLabels[language][index]}
                </span>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none hidden lg:block absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white to-transparent"
          />
        </div>

        {/* Right: Sticky product info, hair care role & Cash-on-Delivery trigger */}
        <div className="lg:sticky lg:top-24 flex flex-col">
          {/* Title + Category + Price */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h1 className="font-display text-[30px] sm:text-[38px] font-bold uppercase leading-[1.06] text-[#111111]">
                {product.name[language]}
              </h1>
              <span className="font-display text-[20px] sm:text-[24px] font-bold uppercase leading-none text-[#CCCCCC]">
                {product.categoryLabel[language]}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-display text-[28px] sm:text-[32px] font-bold uppercase leading-none text-[#111111] tabular-nums whitespace-nowrap">
                {activeVariant.price} {t.hero.currency}
              </span>
              {product.freeDelivery && (
                <span className="mt-1 text-[11px] font-semibold text-[#4A5F34]">
                  {t.pdp.freeDeliveryBadge}
                </span>
              )}
            </div>
          </div>

          <p className="mt-2 text-xs text-[#9A9A9A]">{product.subtitle[language]}</p>

          {/* Variant dots + Size dropdown + CASH ON DELIVERY button + Wishlist */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#F4F4F4] px-3 py-2">
              {product.variants.map((variant) => {
                const isSelected = variant.id === activeVariant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    aria-label={variant.label}
                    title={variant.label}
                    className={`cursor-pointer h-4 w-4 rounded-full transition-transform duration-200 ${
                      isSelected
                        ? 'scale-115 ring-2 ring-[#111111] ring-offset-2 ring-offset-[#F4F4F4]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: variant.dotColor }}
                  />
                );
              })}
            </div>

            <div className="relative">
              <select
                aria-label={t.pdp.size}
                value={activeVariant.id}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                className="cursor-pointer appearance-none rounded-full bg-[#F4F4F4] py-2.5 ps-4 pe-8 text-[11px] font-medium text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
              >
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label} — {v.price} {t.hero.currency}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute end-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9A9A9A]"
                strokeWidth={1.6}
              />
            </div>

            {/* Cash on Delivery -> WhatsApp primary action */}
            <button
              type="button"
              onClick={() => onOrderCod(product, activeVariant.id)}
              className="cursor-pointer inline-flex flex-1 min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#4A5F34] px-6 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.06em] text-white transition-opacity duration-200 hover:opacity-90 whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              <span>{t.pdp.orderCod}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? t.pdp.wishlistSaved : t.pdp.wishlistAdd}
              title={isWishlisted ? t.pdp.wishlistSaved : t.pdp.wishlistAdd}
              className={`cursor-pointer flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                isWishlisted
                  ? 'bg-[#F4C2C2]/45 text-[#111111]'
                  : 'bg-[#F4F4F4] text-[#111111] hover:bg-[#EAEAEA]'
              }`}
            >
              <Heart
                className="h-4 w-4"
                strokeWidth={1.6}
                fill={isWishlisted ? '#F4C2C2' : 'none'}
              />
            </button>
          </div>

          {/* Short overview */}
          <p className="mt-6 text-[13px] leading-[1.8] text-[#666666]">
            {product.description[language]}
          </p>

          {/* Always-visible Product Role & Purpose Block (لماذا يُستعمل ودوره في الشعر) */}
          <div className="mt-6 space-y-4 rounded-sm bg-[#F4F4F4] p-5">
            <div>
              <h2 className="text-xs font-bold text-[#111111]">
                {t.pdp.needForTitle}
              </h2>
              <p className="mt-1 text-xs leading-[1.8] text-[#555555]">
                {product.needFor[language]}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E6E6E6]">
              <h2 className="text-xs font-bold text-[#111111]">
                {t.pdp.hairRoleTitle}
              </h2>
              <p className="mt-1 text-xs leading-[1.8] text-[#555555]">
                {product.hairRole[language]}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E6E6E6]">
              <h2 className="text-xs font-bold text-[#4A5F34]">
                {t.pdp.howToUseTitle}
              </h2>
              <p className="mt-1 text-xs leading-[1.8] text-[#555555]">
                {product.howToUse[language]}
              </p>
            </div>
          </div>

          {/* 3 Smooth Accordions */}
          <div className="mt-6 divide-y divide-[#EFEFEF]">
            {/* 1. Details */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion('details')}
                className="cursor-pointer flex w-full items-center justify-between py-1 text-start text-xs font-medium text-[#111111]"
              >
                <span>{t.pdp.details}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9A9A9A] transition-transform duration-300 ${
                    openAccordion === 'details' ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.6}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'details' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-4 text-[12px] leading-relaxed text-[#666666]">
                      <div>
                        <p className="mb-1.5 text-[11px] font-semibold text-[#111111]">
                          {t.pdp.benefitsTitle}
                        </p>
                        <ul className="space-y-1">
                          {product.benefits[language].map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: product.accentColor }}
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1.5 text-[11px] font-semibold text-[#111111]">
                          {t.pdp.ingredientsTitle}
                        </p>
                        <ul className="space-y-1 text-[#9A9A9A]">
                          {product.ingredients[language].map((ing) => (
                            <li key={ing}>{ing}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Delivery & COD */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion('delivery')}
                className="cursor-pointer flex w-full items-center justify-between py-1 text-start text-xs font-medium text-[#111111]"
              >
                <span>{t.pdp.delivery}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9A9A9A] transition-transform duration-300 ${
                    openAccordion === 'delivery' ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.6}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'delivery' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-2 text-[12px] leading-relaxed text-[#666666]">
                      {t.pdp.deliveryBody.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Reviews (20) */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleAccordion('reviews')}
                className="cursor-pointer flex w-full items-center justify-between py-1 text-start text-xs font-medium text-[#111111]"
              >
                <span>
                  {t.pdp.reviews} ({product.reviewCount})
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#9A9A9A] transition-transform duration-300 ${
                    openAccordion === 'reviews' ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.6}
                />
              </button>
              <AnimatePresence initial={false}>
                {openAccordion === 'reviews' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-4">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-medium text-[#111111]">
                              {rev.author} · <span className="text-[#9A9A9A]">{rev.city}</span>
                            </span>
                            <div className="flex items-center gap-0.5 text-[#4A5F34]">
                              {Array.from({ length: rev.rating }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  className="h-3 w-3 fill-[#4A5F34]"
                                  strokeWidth={1.5}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-[12px] leading-relaxed text-[#666666]">
                            {rev.comment[language]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: "You may also like" row */}
      <section className="mt-24">
        <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#111111]">
          {t.pdp.youMayAlsoLike}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {otherProducts.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectProduct(item)}
              data-cursor="interactive"
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm bg-[#F4F4F4] p-8">
                <ProductVisual
                  src={item.images[0]}
                  alt={item.name[language]}
                  label={item.shortName[language]}
                  accentColor={item.accentColor}
                  className="h-[80%] w-[80%] -rotate-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-12"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-sm sm:text-base font-bold uppercase text-[#111111]">
                  {item.shortName[language]}
                </h3>
                <span className="font-display text-sm sm:text-base font-bold text-[#111111] tabular-nums">
                  {item.price} {t.hero.currency}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-[#9A9A9A]">{item.subtitle[language]}</p>
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
