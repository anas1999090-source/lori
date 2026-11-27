import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Language } from '../types';

interface ConsentBannerProps {
  visible: boolean;
  language: Language;
  onAccept: () => void;
  onDecline: () => void;
}

const COPY: Record<
  Language,
  { title: string; body: string; accept: string; decline: string }
> = {
  ar: {
    title: 'إعدادات الخصوصية',
    body: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس فعالية الإعلانات بأمان. يمكنك القبول أو الرفض في أي وقت.',
    accept: 'موافق',
    decline: 'رفض',
  },
  fr: {
    title: 'Confidentialité & Cookies',
    body: 'Nous utilisons des cookies pour améliorer votre expérience et mesurer la performance de nos annonces en toute confidentialité.',
    accept: 'Accepter',
    decline: 'Refuser',
  },
  en: {
    title: 'Privacy Preferences',
    body: 'We use cookies and privacy-safe analytics to improve your shopping experience and measure campaign performance.',
    accept: 'Accept',
    decline: 'Decline',
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  visible,
  language,
  onAccept,
  onDecline,
}) => {
  const copy = COPY[language];

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: EASE }}
          role="dialog"
          aria-live="polite"
          aria-label={copy.title}
          className="fixed bottom-4 start-4 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-sm border border-[#EAEAEA] dark:border-[#262926] bg-white/95 dark:bg-[#141614]/95 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#111111] dark:text-[#F4F4F4]">
            {copy.title}
          </p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#666666] dark:text-[#B4B8B4]">
            {copy.body}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onAccept}
              className="cursor-pointer rounded-full bg-[#4A5F34] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
            >
              {copy.accept}
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="cursor-pointer rounded-full bg-[#F4F4F4] dark:bg-[#1E211E] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#111111] dark:text-[#F4F4F4] transition-colors hover:bg-[#EAEAEA] dark:hover:bg-[#272A27]"
            >
              {copy.decline}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
