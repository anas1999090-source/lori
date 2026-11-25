import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { CategoryFilter, Language, PageRoute } from '../types';
import { Translations } from '../data/translations';
import { LoriLogo } from './LoriLogo';

interface HeaderProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  activeCategory: CategoryFilter;
  route: PageRoute;
  onSelectCategoryNav: (category: CategoryFilter) => void;
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onChangeLanguage,
  activeCategory,
  route,
  onSelectCategoryNav,
  onNavigateHome,
  onNavigateBlog,
  onOpenSearch,
  onOpenCart,
  cartCount,
  t,
}) => {
  const navItems: Array<{ label: string; action: () => void; active: boolean }> = [
    {
      label: t.nav.soap,
      action: () => onSelectCategoryNav('SOAP'),
      active: route === 'home' && activeCategory === 'SOAP',
    },
    {
      label: t.nav.shampoo,
      action: () => onSelectCategoryNav('SHAMPOO'),
      active: route === 'home' && activeCategory === 'SHAMPOO',
    },
    {
      label: t.nav.oils,
      action: () => onSelectCategoryNav('OILS'),
      active: route === 'home' && activeCategory === 'OILS',
    },
    {
      label: t.nav.blog,
      action: onNavigateBlog,
      active: route === 'blog',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-3 items-center px-4 sm:h-[72px] sm:px-8 lg:px-12">
        {/* Left Zone: Minimal uppercase navigation */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-3 sm:gap-6"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={`cursor-pointer whitespace-nowrap shrink-0 text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                item.active
                  ? 'text-[#111111] underline underline-offset-4 decoration-[#111111]'
                  : 'text-[#9A9A9A] hover:text-[#111111]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Center Zone: Centered LORI logo */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onNavigateHome}
            aria-label="LORI Home"
            className="cursor-pointer transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111]"
          >
            <LoriLogo size="sm" className="sm:h-10" />
          </button>
        </div>

        {/* Right Zone: Search, Cart (with tiny black dot counter), Language Toggle */}
        <div className="flex items-center justify-end gap-3 sm:gap-5">
          {/* Language switcher: EN / FR / AR */}
          <div
            role="group"
            aria-label="Language"
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] tracking-[0.08em]"
          >
            {(['en', 'fr', 'ar'] as Language[]).map((lang, idx) => (
              <React.Fragment key={lang}>
                {idx > 0 && (
                  <span aria-hidden="true" className="text-[#D4D4D4]">
                    /
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onChangeLanguage(lang)}
                  className={`cursor-pointer uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    language === lang
                      ? 'font-semibold text-[#111111]'
                      : 'text-[#9A9A9A] hover:text-[#111111]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Search trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search products"
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-[#111111] transition-colors duration-200 hover:bg-[#F4F4F4]"
          >
            <Search className="h-[17px] w-[17px]" strokeWidth={1.6} />
          </button>

          {/* Cart trigger with tiny black dot counter */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Open bag"
            className="cursor-pointer relative flex h-9 w-9 items-center justify-center rounded-full text-[#111111] transition-colors duration-200 hover:bg-[#F4F4F4]"
          >
            <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span
                className="absolute top-1 right-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#111111] px-1 text-[8px] font-semibold leading-none text-white tabular-nums"
                aria-label={`${cartCount} items in bag`}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
