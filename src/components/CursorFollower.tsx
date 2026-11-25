import React, { useEffect, useRef, useState } from 'react';

/**
 * Minimalist desktop cursor-follower dot that scales subtly
 * when hovering over interactive elements. Disabled on touch devices.
 */
export const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) {
      return;
    }
    setEnabled(true);

    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        'a, button, select, input, textarea, [data-cursor="interactive"]'
      );
      setIsHovering(Boolean(interactive));
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 2.8 : 1})`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isHovering, isVisible]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full transition-opacity duration-200"
      style={{
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering
          ? 'rgba(169, 188, 147, 0.36)'
          : 'rgba(154, 154, 154, 0.42)',
        transition: 'background-color 200ms ease, opacity 200ms ease',
      }}
    />
  );
};
