import React from 'react';
import { CategoryFilter, Language, Product } from '../types';
import { Translations } from '../data/translations';

interface CategorySidebarProps {
  categories: CategoryFilter[];
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  products: Product[];
  activeProductId: string;
  onSelectProductSublink: (product: Product) => void;
  language: Language;
  t: Translations;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  products,
  activeProductId,
  onSelectProductSublink,
  language,
  t,
}) => {
  const getSubItemsForCategory = (cat: CategoryFilter): Product[] => {
    if (cat === 'ALL') return products;
    return products.filter((p) => p.category === cat);
  };

  return (
    <aside className="w-full lg:w-[230px] xl:w-[260px] shrink-0 z-20">
      {/* Mobile: Horizontal scroll category strip */}
      <div className="flex lg:hidden items-center gap-5 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`cursor-pointer font-display text-3xl uppercase leading-none whitespace-nowrap shrink-0 transition-all duration-300 ${
                isActive ? 'category-solid' : 'category-outlined'
              }`}
            >
              {t.categories[cat]}
            </button>
          );
        })}
      </div>

      {/* Mobile: Compact sub-links row */}
      <div className="flex lg:hidden items-center gap-4 overflow-x-auto no-scrollbar pt-1 pb-3">
        {getSubItemsForCategory(activeCategory).map((product) => {
          const isSelected = product.id === activeProductId;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectProductSublink(product)}
              className={`cursor-pointer whitespace-nowrap shrink-0 text-[11px] transition-colors duration-200 ${
                isSelected
                  ? 'text-[#111111] underline underline-offset-4 decoration-[#111111]'
                  : 'text-[#9A9A9A] hover:text-[#111111]'
              }`}
            >
              {product.shortName[language]}
            </button>
          );
        })}
      </div>

      {/* Desktop: Editorial stacked outlined/solid category list */}
      <div className="hidden lg:flex flex-col items-start gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const subItems = getSubItemsForCategory(cat);

          return (
            <div key={cat} className="flex flex-col items-start">
              <button
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`cursor-pointer font-display text-[44px] xl:text-[52px] font-bold uppercase leading-[0.95] tracking-[-0.02em] transition-all duration-500 ${
                  isActive ? 'category-solid' : 'category-outlined'
                }`}
              >
                {t.categories[cat]}
              </button>

              {/* Sub-links directly beneath active category */}
              {isActive && (
                <div className="mt-2.5 mb-3 flex flex-col items-start gap-1.5 ps-0.5">
                  {subItems.map((product) => {
                    const isSelected = product.id === activeProductId;
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => onSelectProductSublink(product)}
                        className={`cursor-pointer text-[11px] leading-snug tracking-[0.02em] transition-colors duration-200 ${
                          isSelected
                            ? 'font-medium text-[#111111] underline underline-offset-4 decoration-[#111111]'
                            : 'text-[#9A9A9A] hover:text-[#111111]'
                        }`}
                      >
                        {product.shortName[language]}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
