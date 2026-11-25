import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Minus, Plus, Trash2, X } from 'lucide-react';
import { CartItem, Language, Order, Product } from '../types';
import { Translations } from '../data/translations';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  products: Product[];
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onOrderComplete: (order: Order) => void;
  language: Language;
  t: Translations;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const FREE_DELIVERY_THRESHOLD = 250;
const STANDARD_DELIVERY_FEE = 30;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete,
  language,
  t,
}) => {
  const isRtl = language === 'ar';
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const resolvedItems = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      const variant =
        product.variants.find((v) => v.id === item.variantId) || product.variants[0];
      return {
        ...item,
        product,
        variant,
      };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const subtotal = resolvedItems.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const handleClose = () => {
    onClose();
    window.setTimeout(() => {
      if (step === 'success') {
        setStep('cart');
        setCompletedOrder(null);
      }
      setFormError('');
    }, 350);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
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
      setFormError(t.cart.validationError);
      return;
    }

    const order: Order = {
      id: `LORI-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      fullName: cleanName,
      phone: cleanPhone,
      city: cleanCity,
      address: cleanAddress,
      items: resolvedItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name[language],
        variantLabel: item.variant.label,
        quantity: item.quantity,
        unitPrice: item.variant.price,
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: 'COD',
      status: 'pending',
    };

    onOrderComplete(order);
    setCompletedOrder(order);
    setStep('success');
    setFormError('');
    setFullName('');
    setPhone('');
    setCity('');
    setAddress('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Soft translucent backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
          />

          {/* Slide-in white drawer */}
          <motion.aside
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            aria-label={t.cart.title}
            className="fixed inset-y-0 end-0 z-50 flex w-full max-w-[430px] flex-col bg-white shadow-[-24px_0_60px_rgba(0,0,0,0.08)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] text-[#111111]">
                {step === 'success' ? t.cart.successTitle : t.cart.title}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close bag"
                className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F4] text-[#111111] transition-colors hover:bg-[#EAEAEA]"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {step === 'success' && completedOrder ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A9BC93]/30 text-[#4A5F34]">
                    <Check className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-bold uppercase text-[#111111]">
                    {t.cart.successTitle}
                  </h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#9A9A9A]">
                    {t.cart.successSub}
                  </p>

                  <div className="mt-7 w-full rounded-sm bg-[#F4F4F4] p-5 text-start text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#9A9A9A]">{t.cart.orderRef}</span>
                      <span className="font-semibold text-[#111111] tabular-nums">
                        {completedOrder.id}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[#9A9A9A]">{t.cart.fullName}</span>
                      <span className="text-[#111111]">{completedOrder.fullName}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[#9A9A9A]">{t.cart.city}</span>
                      <span className="text-[#111111]">{completedOrder.city}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-[#E5E5E5] font-semibold">
                      <span className="text-[#111111]">{t.cart.total}</span>
                      <span className="text-[#111111] tabular-nums">
                        {completedOrder.total} {t.hero.currency}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="cursor-pointer mt-8 rounded-full bg-[#111111] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85"
                  >
                    {t.cart.continueShopping}
                  </button>
                </div>
              ) : resolvedItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <p className="font-display text-2xl uppercase text-[#111111]">
                    {t.cart.empty}
                  </p>
                  <p className="mt-2 max-w-[240px] text-xs text-[#9A9A9A]">
                    {t.cart.emptySub}
                  </p>
                </div>
              ) : step === 'cart' ? (
                <div className="space-y-5">
                  {/* Free shipping note */}
                  <div className="rounded-sm bg-[#F4F4F4] px-4 py-3 text-[11px] text-[#666666]">
                    {subtotal >= FREE_DELIVERY_THRESHOLD ? (
                      <span className="font-medium text-[#4A5F34]">
                        {t.cart.freeShippingUnlocked}
                      </span>
                    ) : (
                      <span>
                        {t.cart.freeShippingNote.replace(
                          '{amount}',
                          String(FREE_DELIVERY_THRESHOLD - subtotal)
                        )}
                      </span>
                    )}
                  </div>

                  {resolvedItems.map(({ product, variant, quantity }) => (
                    <div
                      key={`${product.id}-${variant.id}`}
                      className="flex items-center gap-4 py-2"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm bg-[#F4F4F4] p-2">
                        <ProductVisual
                          src={product.images[0]}
                          alt={product.shortName[language]}
                          label={product.shortName[language]}
                          accentColor={product.accentColor}
                          className="h-full w-full"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-sm font-bold uppercase text-[#111111] truncate">
                          {product.shortName[language]}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-[#9A9A9A]">
                          {variant.label} · {variant.price} {t.hero.currency}
                        </p>

                        <div className="mt-2.5 flex items-center gap-3">
                          <div className="inline-flex items-center rounded-full bg-[#F4F4F4] px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, variant.id, -1)}
                              aria-label="Decrease quantity"
                              className="cursor-pointer p-1 text-[#111111] hover:opacity-60"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2.5 text-[11px] font-medium tabular-nums text-[#111111]">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, variant.id, 1)}
                              aria-label="Increase quantity"
                              className="cursor-pointer p-1 text-[#111111] hover:opacity-60"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id, variant.id)}
                            aria-label="Remove item"
                            className="cursor-pointer text-[#9A9A9A] transition-colors hover:text-[#111111]"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                          </button>
                        </div>
                      </div>

                      <div className="font-display text-sm font-bold text-[#111111] tabular-nums">
                        {variant.price * quantity} {t.hero.currency}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* COD Checkout Form */
                <form id="cod-checkout-form" onSubmit={handleSubmitOrder} className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="cursor-pointer text-[11px] uppercase tracking-[0.12em] text-[#9A9A9A] hover:text-[#111111]"
                  >
                    ← {t.cart.backToCart}
                  </button>

                  <div className="rounded-sm bg-[#F4F4F4] px-4 py-3 text-[11px] font-medium text-[#4A5F34]">
                    {t.cart.codBadge}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A9A9A]">
                      {t.cart.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-sm bg-[#F4F4F4] px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A9A9A]">
                      {t.cart.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 00 00 00 00"
                      className="w-full rounded-sm bg-[#F4F4F4] px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A9A9A]">
                      {t.cart.city}
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-sm bg-[#F4F4F4] px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A9A9A]">
                      {t.cart.address}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full resize-none rounded-sm bg-[#F4F4F4] px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
                    />
                  </div>

                  {formError && (
                    <p className="text-[11px] text-[#9E2A2B]">{formError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Footer totals & CTA */}
            {resolvedItems.length > 0 && step !== 'success' && (
              <div className="bg-white px-6 py-5 shadow-[0_-12px_30px_rgba(0,0,0,0.03)]">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#9A9A9A]">
                    <span>{t.cart.subtotal}</span>
                    <span className="tabular-nums">
                      {subtotal} {t.hero.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#9A9A9A]">
                    <span>{t.cart.delivery}</span>
                    <span className="tabular-nums">
                      {deliveryFee === 0 ? t.cart.free : `${deliveryFee} ${t.hero.currency}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-sm font-semibold text-[#111111]">
                    <span>{t.cart.total}</span>
                    <span className="font-display text-lg tabular-nums">
                      {total} {t.hero.currency}
                    </span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="cursor-pointer mt-5 w-full rounded-full bg-[#111111] py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85"
                  >
                    {t.cart.checkoutCta}
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="cod-checkout-form"
                    className="cursor-pointer mt-5 w-full rounded-full bg-[#4A5F34] py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
                  >
                    {t.cart.placeOrder} · {total} {t.hero.currency}
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
