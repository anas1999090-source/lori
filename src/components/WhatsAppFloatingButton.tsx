import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from './OrderCodModal';
import { Translations } from '../data/translations';
import { trackContact } from '../lib/metaTracking';

interface WhatsAppFloatingButtonProps {
  t: Translations;
}

/**
 * Minimalist floating WhatsApp contact button (+212 621-572534)
 */
export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ t }) => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t.whatsapp.defaultGreeting
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact('whatsapp_floating')}
      aria-label={t.whatsapp.contactTooltip}
      title={t.whatsapp.contactTooltip}
      className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#4A5F34] px-4 py-3 text-white shadow-[0_10px_28px_rgba(74,95,52,0.28)] transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.9} />
      <span className="hidden sm:inline text-[11px] font-medium tracking-[0.04em]" dir="ltr">
        +212 621-572534
      </span>
    </a>
  );
};
