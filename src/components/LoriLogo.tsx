import React from 'react';

interface LoriLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showBio?: boolean;
}

/**
 * Crisp vector reproduction of the LORI botanical wordmark:
 * ultra-light geometric "lori" lettering paired with overlapping
 * semi-transparent botanical leaves in dark green (#4A5F34),
 * sage (#A9BC93), and pastel pink (#F4C2C2).
 */
export const LoriLogo: React.FC<LoriLogoProps> = ({
  className = '',
  size = 'md',
  showBio = false,
}) => {
  const dimensions =
    size === 'sm'
      ? 'h-8 w-auto'
      : size === 'lg'
        ? 'h-14 w-auto'
        : 'h-10 w-auto';

  return (
    <svg
      viewBox="0 0 210 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions} select-none ${className}`}
      aria-label="LORI"
    >
      {/* Overlapping semi-transparent botanical leaves on the left */}
      <g>
        {/* Soft pink upper leaf */}
        <path
          d="M52 54 C52 34, 62 18, 70 10 C75 24, 72 42, 56 56 Z"
          fill="#F4C2C2"
          fillOpacity="0.88"
        />
        {/* Soft pink small side petal */}
        <path
          d="M56 54 C64 42, 76 34, 88 33 C82 44, 70 52, 56 56 Z"
          fill="#F4C2C2"
          fillOpacity="0.82"
        />
        {/* Sage green middle leaf */}
        <path
          d="M52 58 C44 42, 42 26, 36 16 C50 22, 58 38, 56 58 Z"
          fill="#A9BC93"
          fillOpacity="0.82"
        />
        {/* Dark green foreground leaf */}
        <path
          d="M54 62 C36 60, 24 48, 16 36 C32 36, 46 44, 56 60 Z"
          fill="#4A5F34"
          fillOpacity="0.92"
        />
        {/* Delicate pink lower accent leaf */}
        <path
          d="M56 64 C48 72, 38 74, 30 68 C38 64, 48 63, 56 64 Z"
          fill="#F4C2C2"
          fillOpacity="0.85"
        />
        {/* Subtle white leaf vein */}
        <path
          d="M52 60 C42 52, 32 45, 22 40"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      </g>

      {/* Ultra-light geometric lowercase wordmark: l o r i */}
      <g stroke="#111111" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {/* l */}
        <path d="M62 24 V60 C62 68, 66 72, 74 71" />
        {/* o */}
        <circle cx="96" cy="54" r="18" />
        {/* r */}
        <path d="M126 71 V37" />
        <path d="M126 48 C128 39, 136 36, 144 38" />
        {/* i */}
        <path d="M156 38 V71" />
      </g>
      <circle cx="156" cy="24" r="2.6" fill="#111111" />

      {showBio && (
        <text
          x="166"
          y="71"
          fill="#111111"
          fontFamily="Inter, sans-serif"
          fontSize="13"
          fontWeight="300"
          letterSpacing="1.2"
        >
          bio
        </text>
      )}
    </svg>
  );
};
