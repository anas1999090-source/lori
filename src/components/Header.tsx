import React from 'react';
import { MessageCircle, Moon, Search, Sun } from 'lucide-react';
import { CategoryFilter, Language, PageRoute } from '../types';
import { Translations } from '../data/translations';
import { LoriLogo } from './LoriLogo';
import { WHATSAPP_NUMBER } from './OrderCodModal';

interface HeaderProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  activeCategory: CategoryFilter;
  route: PageRoute;
  onSelectCategoryNav: (category: CategoryFilter) => void;
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
  onOpenSearch: () => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onChangeLanguage,
  theme,
  onToggleTheme,
  activeCategory,
  route,
  onSelectCategoryNav,
  onNavigateHome,
  onNavigateBlog,
  onOpenSearch,
  t,
}) => {
  const navItems: Array<{ label: string; action: () => void; active: boolean }> = [
    {
      label: t.nav.packs,
      action: () => onSelectCategoryNav('PACKS'),
      active: route === 'home' && activeCategory === 'PACKS',
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
      label: t.nav.keratin,
      action: () => onSelectCategoryNav('KERATIN'),
      active: route === 'home' && activeCategory === 'KERATIN',
    },
    {
      label: t.nav.blog,
      action: onNavigateBlog,
      active: route === 'blog',
    },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.whatsapp.defaultGreeting
  )}`;

  const themeLabel =
    language === 'ar'
      ? theme === 'dark'
        ? 'الوضع النهاري'
        : 'الوضع الليلي'
      : theme === 'dark'
        ? 'Light mode'
        : 'Dark mode';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0D0E0D]/95 backdrop-blur-xs transition-colors duration-300">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-3 items-center px-4 sm:h-[72px] sm:px-8 lg:px-12">
        {/* Left Zone: Minimal uppercase navigation */}
        <nav
          aria-label="Primary navigation"
          className="flex min-w-0 items-center gap-3 overflow-x-auto no-scrollbar sm:gap-5 lg:gap-6"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className={`cursor-pointer whitespace-nowrap shrink-0 text-[10px] sm:text-[11px] font-medium tracking-[0.06em] uppercase transition-colors duration-200 ${
                item.active
                  ? 'text-[#111111] dark:text-[#F4F4F4] underline underline-offset-4 decoration-[#111111] dark:decoration-[#F4F4F4]'
                  : 'text-[#9A9A9A] hover:text-[#111111] dark:hover:text-[#F4F4F4]'
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
            className="cursor-pointer transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] dark:focus-visible:ring-[#F4F4F4]"
          >
            <LoriLogo size="sm" className="sm:h-10" />
          </button>
        </div>

        {/* Right Zone: Language Toggle, Theme Toggle, Search, WhatsApp Contact */}
        <div className="flex items-center justify-end gap-2 sm:gap-3.5">
          <div
            role="group"
            aria-label="Language"
            className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] tracking-[0.06em]"
          >
            {(['ar', 'fr', 'en'] as Language[]).map((lang, idx) => (
              <React.Fragment key={lang}>
                {idx > 0 && (
                  <span aria-hidden="true" className="text-[#D4D4D4] dark:text-[#3A3D3A]">
                    /
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onChangeLanguage(lang)}
                  className={`cursor-pointer uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    language === lang
                      ? 'font-semibold text-[#111111] dark:text-[#F4F4F4]'
                      : 'text-[#9A9A9A] hover:text-[#111111] dark:hover:text-[#F4F4F4]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Dark / Light mode toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-[#111111] dark:text-[#F4F4F4] transition-colors duration-200 hover:bg-[#F4F4F4] dark:hover:bg-[#1A1C1A]"
          >
            {theme === 'dark' ? (
              <Sun className="h-[16px] w-[16px]" strokeWidth={1.6} />
            ) : (
              <Moon className="h-[16px] w-[16px]" strokeWidth={1.6} />
            )}
          </button>

          {/* Search trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search products"
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full text-[#111111] dark:text-[#F4F4F4] transition-colors duration-200 hover:bg-[#F4F4F4] dark:hover:bg-[#1A1C1A]"
          >
            <Search className="h-[17px] w-[17px]" strokeWidth={1.6} />
          </button>

          {/* Direct WhatsApp contact icon */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp.contactTooltip}
            title={t.whatsapp.contactTooltip}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A5F34]/12 dark:bg-[#A9BC93]/18 text-[#4A5F34] dark:text-[#A9BC93] transition-colors duration-200 hover:bg-[#4A5F34] hover:text-white dark:hover:bg-[#A9BC93] dark:hover:text-[#0D0E0D]"
          >
            <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </header>
  );
};
