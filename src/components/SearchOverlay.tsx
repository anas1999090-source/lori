import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { Language, Product } from '../types';
import { Translations } from '../data/translations';
import { ProductVisual } from './ProductVisual';
import { trackSearch } from '../lib/metaTracking';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  language: Language;
  t: Translations;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  language,
  t,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const normalized = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      normalized
        ? products.filter((p) => {
            const haystack = [
              p.name.en,
              p.name.fr,
              p.name.ar,
              p.subtitle.en,
              p.subtitle.fr,
              p.subtitle.ar,
              p.description[language],
              ...p.ingredients[language],
            ]
              .join(' ')
              .toLowerCase();
            return haystack.includes(normalized);
          })
        : products,
    [normalized, products, language]
  );

  useEffect(() => {
    if (!isOpen || normalized.length < 2) return;
    const timer = window.setTimeout(() => {
      trackSearch(
        query.trim(),
        filtered.map((p) => p.id)
      );
    }, 600);
    return () => window.clearTimeout(timer);
  }, [isOpen, normalized, query, filtered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/15 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-[#141614] px-4 pb-10 pt-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:px-8 lg:px-12"
          >
            <div className="mx-auto max-w-[1000px]">
              <div className="flex items-center gap-3 pb-4 border-b border-[#EFEFEF] dark:border-[#252825]">
                <Search className="h-4 w-4 text-[#9A9A9A]" strokeWidth={1.6} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="w-full bg-transparent text-sm text-[#111111] dark:text-[#F4F4F4] placeholder-[#9A9A9A] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.search.close}
                  className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F4] dark:bg-[#1D201D] text-[#111111] dark:text-[#F4F4F4] hover:bg-[#EAEAEA] dark:hover:bg-[#272A27]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {filtered.length === 0 ? (
                <p className="py-10 text-center text-xs text-[#9A9A9A]">
                  {t.search.noResults}
                </p>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {filtered.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="cursor-pointer group flex flex-col text-start"
                    >
                      <div className="flex aspect-square w-full items-center justify-center rounded-sm bg-[#F4F4F4] dark:bg-[#1B1E1B] p-4">
                        <ProductVisual
                          src={product.images[0]}
                          alt={product.name[language]}
                          label={product.shortName[language]}
                          accentColor={product.accentColor}
                          className="h-[80%] w-[80%] transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="mt-2.5 font-display text-sm font-bold uppercase text-[#111111] dark:text-[#F4F4F4]">
                        {product.shortName[language]}
                      </span>
                      <span className="text-[11px] text-[#9A9A9A] tabular-nums">
                        {product.price} {t.hero.currency}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
