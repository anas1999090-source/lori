import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, MessageCircle, Minus, Plus, X } from 'lucide-react';
import { Language, Order, Product } from '../types';
import { Translations } from '../data/translations';
import { ProductVisual } from './ProductVisual';
import { trackPurchase } from '../lib/metaTracking';

export const WHATSAPP_NUMBER = '212621572534';
export const WHATSAPP_DISPLAY = '+212 621-572534';

interface OrderCodModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  initialVariantId?: string;
  onOrderComplete: (order: Order) => void;
  language: Language;
  t: Translations;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const OrderCodModal: React.FC<OrderCodModalProps> = ({
  isOpen,
  onClose,
  product,
  initialVariantId,
  onOrderComplete,
  language,
  t,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<{
    order: Order;
    waUrl: string;
  } | null>(null);

  useEffect(() => {
    if (product && isOpen) {
      setSelectedVariantId(initialVariantId || product.variants[0].id);
      setQuantity(1);
      setFormError('');
      setSubmittedOrder(null);
    }
  }, [product, initialVariantId, isOpen]);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const subtotal = activeVariant.price * quantity;
  const isFreeDelivery = Boolean(product.freeDelivery) || subtotal >= 199;
  const deliveryFee = isFreeDelivery ? 0 : 30;
  const total = subtotal + deliveryFee;

  const buildWhatsappUrl = (order: Order): string => {
    const lines = [
      t.orderModal.whatsappGreeting,
      '',
      `• ${t.orderModal.orderRef}: ${order.id}`,
      `• المنتج: ${product.name[language]} (${activeVariant.label})`,
      `• ${t.orderModal.quantity}: ${quantity}`,
      `• ${t.orderModal.delivery}: ${
        deliveryFee === 0 ? t.orderModal.freeDelivery : `${deliveryFee} ${t.hero.currency}`
      }`,
      `• ${t.orderModal.total}: ${total} ${t.hero.currency} (الدفع عند الاستلام)`,
      '',
      `• ${t.orderModal.fullName}: ${order.fullName}`,
      `• ${t.orderModal.phone}: ${order.phone}`,
      `• ${t.orderModal.city}: ${order.city}`,
      `• ${t.orderModal.address}: ${order.address}`,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();
    const cleanCity = city.trim();
    const cleanAddress = address.trim();

    if (
      cleanName.length < 2 ||
      cleanPhone.replace(/\D/g, '').length < 8 ||
      cleanCity.length < 2 ||
      cleanAddress.length < 4
    ) {
      setFormError(t.orderModal.validationError);
      return;
    }

    const order: Order = {
      id: `LORI-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      fullName: cleanName,
      phone: cleanPhone,
      city: cleanCity,
      address: cleanAddress,
      items: [
        {
          productId: product.id,
          productName: product.name[language],
          variantLabel: activeVariant.label,
          quantity,
          unitPrice: activeVariant.price,
        },
      ],
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'COD',
      status: 'pending',
    };

    const waUrl = buildWhatsappUrl(order);
    onOrderComplete(order);
    trackPurchase(order);
    setSubmittedOrder({ order, waUrl });
    setFormError('');

    // Open WhatsApp via synthetic anchor element (avoids window.open blocks)
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={t.orderModal.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto relative flex max-h-[92vh] w-full max-w-[490px] flex-col overflow-hidden rounded-sm bg-white dark:bg-[#141614] text-[#111111] dark:text-[#F4F4F4] shadow-[0_24px_70px_rgba(0,0,0,0.14)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2F2F2] dark:border-[#232623]">
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#111111] dark:text-[#F4F4F4]">
                  {submittedOrder ? t.orderModal.successTitle : t.orderModal.title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.orderModal.close}
                  className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F4] dark:bg-[#1D201D] text-[#111111] dark:text-[#F4F4F4] hover:bg-[#EAEAEA] dark:hover:bg-[#272A27]"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {submittedOrder ? (
                  <div className="flex flex-col items-center py-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A9BC93]/30 text-[#4A5F34] dark:text-[#A9BC93]">
                      <Check className="h-6 w-6" strokeWidth={2} />
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold uppercase text-[#111111] dark:text-[#F4F4F4]">
                      {t.orderModal.successTitle}
                    </h3>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#7A7A7A] dark:text-[#A1A5A1]">
                      {t.orderModal.successSub}
                    </p>

                    <div className="mt-6 w-full rounded-sm bg-[#F4F4F4] dark:bg-[#1B1E1B] p-4 text-start text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#9A9A9A]">{t.orderModal.orderRef}</span>
                        <span className="font-semibold text-[#111111] dark:text-[#F4F4F4] tabular-nums">
                          {submittedOrder.order.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9A9A9A]">{product.shortName[language]}</span>
                        <span className="text-[#111111] dark:text-[#F4F4F4]">
                          {quantity} × {activeVariant.label}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9A9A9A]">{t.orderModal.delivery}</span>
                        <span className="font-medium text-[#4A5F34] dark:text-[#A9BC93]">
                          {deliveryFee === 0
                            ? t.orderModal.freeDelivery
                            : `${deliveryFee} ${t.hero.currency}`}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#E6E6E6] dark:border-[#2A2D2A] font-semibold">
                        <span>{t.orderModal.total}</span>
                        <span className="tabular-nums">
                          {total} {t.hero.currency}
                        </span>
                      </div>
                    </div>

                    <a
                      href={submittedOrder.waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4A5F34] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                      <span>{t.orderModal.openWhatsappBtn}</span>
                    </a>
                  </div>
                ) : (
                  <form id="cod-whatsapp-form" onSubmit={handleSubmit} className="space-y-4">
                    {/* Selected Product Summary */}
                    <div className="flex items-center gap-4 rounded-sm bg-[#F4F4F4] dark:bg-[#1B1E1B] p-3.5">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm bg-white dark:bg-[#141614] p-2">
                        <ProductVisual
                          src={product.images[0]}
                          alt={product.name[language]}
                          label={product.shortName[language]}
                          accentColor={product.accentColor}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-sm sm:text-base font-bold uppercase text-[#111111] dark:text-[#F4F4F4]">
                          {product.name[language]}
                        </h3>
                        <p className="mt-0.5 text-[11px] font-medium text-[#4A5F34] dark:text-[#A9BC93]">
                          {activeVariant.price} {t.hero.currency}
                          {isFreeDelivery && ` · ${t.orderModal.freeDelivery}`}
                        </p>

                        {/* Variant + Quantity */}
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          <select
                            aria-label={t.pdp.size}
                            value={activeVariant.id}
                            onChange={(e) => setSelectedVariantId(e.target.value)}
                            className="cursor-pointer rounded-full bg-white dark:bg-[#141614] px-3 py-1 text-[11px] text-[#111111] dark:text-[#F4F4F4] focus:outline-none"
                          >
                            {product.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.label} — {v.price} {t.hero.currency}
                              </option>
                            ))}
                          </select>

                          <div className="inline-flex items-center rounded-full bg-white dark:bg-[#141614] px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                              aria-label="Decrease quantity"
                              className="cursor-pointer p-1 text-[#111111] dark:text-[#F4F4F4] hover:opacity-60"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-[11px] font-medium tabular-nums">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => q + 1)}
                              aria-label="Increase quantity"
                              className="cursor-pointer p-1 text-[#111111] dark:text-[#F4F4F4] hover:opacity-60"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-sm bg-[#A9BC93]/20 dark:bg-[#A9BC93]/15 px-4 py-2.5 text-[11px] font-medium text-[#4A5F34] dark:text-[#A9BC93]">
                      {t.orderModal.codBadge}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-[11px] font-medium text-[#666666] dark:text-[#A1A5A1]">
                          {t.orderModal.fullName}
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-sm bg-[#F4F4F4] dark:bg-[#1D201D] px-3.5 py-2.5 text-xs text-[#111111] dark:text-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#F4F4F4]"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-[11px] font-medium text-[#666666] dark:text-[#A1A5A1]">
                          {t.orderModal.phone}
                        </label>
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="06 00 00 00 00"
                          className="w-full rounded-sm bg-[#F4F4F4] dark:bg-[#1D201D] px-3.5 py-2.5 text-xs text-[#111111] dark:text-[#F4F4F4] placeholder-[#9A9A9A] focus:outline-none focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#F4F4F4]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-[#666666] dark:text-[#A1A5A1]">
                        {t.orderModal.city}
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-sm bg-[#F4F4F4] dark:bg-[#1D201D] px-3.5 py-2.5 text-xs text-[#111111] dark:text-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#F4F4F4]"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-[#666666] dark:text-[#A1A5A1]">
                        {t.orderModal.address}
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full resize-none rounded-sm bg-[#F4F4F4] dark:bg-[#1D201D] px-3.5 py-2 text-xs text-[#111111] dark:text-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-[#111111] dark:focus:ring-[#F4F4F4]"
                      />
                    </div>

                    {formError && (
                      <p className="text-[11px] text-[#9E2A2B] dark:text-[#F4C2C2]">{formError}</p>
                    )}

                    {/* Price Summary */}
                    <div className="space-y-1.5 border-t border-[#F0F0F0] dark:border-[#232623] pt-3 text-xs">
                      <div className="flex justify-between text-[#9A9A9A]">
                        <span>{t.orderModal.subtotal}</span>
                        <span className="tabular-nums">
                          {subtotal} {t.hero.currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#9A9A9A]">
                        <span>{t.orderModal.delivery}</span>
                        <span className={deliveryFee === 0 ? 'font-medium text-[#4A5F34] dark:text-[#A9BC93]' : 'tabular-nums'}>
                          {deliveryFee === 0
                            ? t.orderModal.freeDelivery
                            : t.orderModal.standardDelivery}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1.5 text-sm font-bold text-[#111111] dark:text-[#F4F4F4]">
                        <span>{t.orderModal.total}</span>
                        <span className="font-display text-lg tabular-nums">
                          {total} {t.hero.currency}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4A5F34] py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                      <span>
                        {t.orderModal.submitWhatsapp} · {total} {t.hero.currency}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
