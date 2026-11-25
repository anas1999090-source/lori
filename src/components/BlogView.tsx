import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogArticle, Language, Product } from '../types';
import { Translations } from '../data/translations';

interface BlogViewProps {
  articles: BlogArticle[];
  products: Product[];
  language: Language;
  t: Translations;
  onBackHome: () => void;
  onOpenProduct: (product: Product) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const BlogView: React.FC<BlogViewProps> = ({
  articles,
  products,
  language,
  t,
  onBackHome,
  onOpenProduct,
}) => {
  const isRtl = language === 'ar';

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-6 sm:px-8"
    >
      <button
        type="button"
        onClick={onBackHome}
        className="cursor-pointer group inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.12em] text-[#9A9A9A] hover:text-[#111111]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-transform duration-300 group-hover:scale-105">
          {isRtl ? (
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          ) : (
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
          )}
        </span>
        <span>{t.blog.backHome}</span>
      </button>

      <header className="mt-10 max-w-2xl">
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.98] text-[#111111]">
          {t.blog.title}
        </h1>
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#9A9A9A]">
          {t.blog.subtitle}
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {articles.map((article) => {
          const relatedProduct = products.find((p) => p.id === article.relatedProductId);
          return (
            <article
              key={article.id}
              className="flex flex-col justify-between rounded-sm bg-[#F4F4F4] p-7"
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#9A9A9A]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: article.accentColor }}
                  />
                  <span>{article.category[language]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime[language]}</span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-[1.08] text-[#111111]">
                  {article.title[language]}
                </h2>

                <p className="mt-3 text-xs leading-relaxed text-[#666666]">
                  {article.excerpt[language]}
                </p>

                <div className="mt-4 space-y-2.5 text-[11px] leading-relaxed text-[#8A8A8A]">
                  {article.body[language].map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </div>

              {relatedProduct && (
                <button
                  type="button"
                  onClick={() => onOpenProduct(relatedProduct)}
                  className="cursor-pointer mt-7 self-start rounded-full bg-white px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
                >
                  {t.blog.shopFormula} · {relatedProduct.shortName[language]}
                </button>
              )}
            </article>
          );
        })}
      </div>
    </motion.section>
  );
};
