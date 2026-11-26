import React, { useState } from 'react';

interface ProductVisualProps {
  src: string;
  alt: string;
  label?: string;
  accentColor?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders transparent-background PNG product imagery from `/public/images/`
 * with lazy-loading and a minimalist soft-grey fallback if an image fails to load.
 */
export const ProductVisual: React.FC<ProductVisualProps> = ({
  src,
  alt,
  label,
  accentColor = '#A9BC93',
  className = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-[2.25rem] bg-[#F4F4F4] p-8 text-center ${className}`}
      >
        <div
          className="mb-4 h-12 w-12 rounded-full opacity-75"
          style={{ backgroundColor: accentColor }}
        />
        <span className="font-display text-sm uppercase tracking-[0.08em] text-[#111111]">
          {label || alt}
        </span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#9A9A9A]">
          LORI BIO
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`select-none object-contain ${className}`}
      draggable={false}
    />
  );
};
