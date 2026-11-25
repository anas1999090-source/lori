import React, { useState } from 'react';
import { ArrowLeft, Download, Lock, Trash2 } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { Translations } from '../data/translations';

interface AdminOrdersPageProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onBackToStore: () => void;
  t: Translations;
}

/**
 * Simple local password-protected order management view accessible at `/admin`.
 * Change ADMIN_PASSWORD below before deploying to production.
 */
const ADMIN_PASSWORD = 'lori2026';

export const AdminOrdersPage: React.FC<AdminOrdersPageProps> = ({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
  onBackToStore,
  t,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('lori_admin_auth') === '1';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      setError('');
      try {
        sessionStorage.setItem('lori_admin_auth', '1');
      } catch {
        // ignore storage restrictions
      }
    } else {
      setError(t.admin.wrongPassword);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPasswordInput('');
    try {
      sessionStorage.removeItem('lori_admin_auth');
    } catch {
      // ignore
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  const handleExportCsv = () => {
    const header = ['Order ID', 'Date', 'Customer', 'Phone', 'City', 'Address', 'Items', 'Total (DH)', 'Status'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.fullName.replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.city.replace(/"/g, '""')}"`,
      `"${o.address.replace(/"/g, '""')}"`,
      `"${o.items.map((i) => `${i.quantity}x ${i.productName} (${i.variantLabel})`).join('; ')}"`,
      String(o.total),
      o.status,
    ]);
    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lori-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isUnlocked) {
    return (
      <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-md flex-col items-center justify-center px-4">
        <div className="w-full rounded-sm bg-[#F4F4F4] p-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111111]">
            <Lock className="h-4 w-4" strokeWidth={1.6} />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold uppercase text-[#111111]">
            {t.admin.title}
          </h1>
          <p className="mt-1.5 text-xs text-[#9A9A9A]">{t.admin.subtitle}</p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-3 text-start">
            <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A9A9A]">
              {t.admin.passwordLabel}
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoFocus
              className="w-full rounded-sm bg-white px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#111111]"
            />
            {error && <p className="text-[11px] text-[#9E2A2B]">{error}</p>}
            <button
              type="submit"
              className="cursor-pointer w-full rounded-full bg-[#111111] py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85"
            >
              {t.admin.unlock}
            </button>
          </form>

          <button
            type="button"
            onClick={onBackToStore}
            className="cursor-pointer mt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-[#9A9A9A] hover:text-[#111111]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t.admin.backToStore}</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-6 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToStore}
            className="cursor-pointer mb-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[#9A9A9A] hover:text-[#111111]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t.admin.backToStore}</span>
          </button>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#111111]">
            {t.admin.title}
          </h1>
          <p className="mt-1 text-xs text-[#9A9A9A]">{t.admin.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {orders.length > 0 && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#F4F4F4] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#111111] hover:bg-[#EAEAEA]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t.admin.exportCsv}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleLock}
            className="cursor-pointer rounded-full bg-[#111111] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white hover:opacity-85"
          >
            {t.admin.logout}
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="rounded-sm bg-[#F4F4F4] p-5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#9A9A9A]">
            {t.admin.totalOrders}
          </p>
          <p className="mt-1 font-display text-3xl font-bold text-[#111111] tabular-nums">
            {orders.length}
          </p>
        </div>
        <div className="rounded-sm bg-[#F4F4F4] p-5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#9A9A9A]">
            {t.admin.revenue}
          </p>
          <p className="mt-1 font-display text-3xl font-bold text-[#111111] tabular-nums">
            {totalRevenue} {t.hero.currency}
          </p>
        </div>
      </div>

      {/* Orders table */}
      {orders.length === 0 ? (
        <div className="mt-10 rounded-sm bg-[#F4F4F4] p-12 text-center text-xs text-[#9A9A9A]">
          {t.admin.noOrders}
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-sm bg-[#F4F4F4]/60">
          <table className="w-full min-w-[760px] text-start text-xs">
            <thead>
              <tr className="border-b border-[#EAEAEA] text-[10px] uppercase tracking-[0.14em] text-[#9A9A9A]">
                <th className="px-5 py-4 text-start font-medium">ID</th>
                <th className="px-5 py-4 text-start font-medium">{t.admin.date}</th>
                <th className="px-5 py-4 text-start font-medium">{t.admin.customer}</th>
                <th className="px-5 py-4 text-start font-medium">{t.admin.items}</th>
                <th className="px-5 py-4 text-start font-medium">{t.admin.total}</th>
                <th className="px-5 py-4 text-start font-medium">{t.admin.status}</th>
                <th className="px-5 py-4 text-end font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFEF]">
              {orders.map((order) => (
                <tr key={order.id} className="bg-white/80">
                  <td className="px-5 py-4 font-semibold text-[#111111] tabular-nums">
                    {order.id}
                  </td>
                  <td className="px-5 py-4 text-[#9A9A9A] tabular-nums">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#111111]">{order.fullName}</p>
                    <p className="text-[11px] text-[#9A9A9A]">{order.phone}</p>
                    <p className="text-[11px] text-[#9A9A9A]">
                      {order.city} — {order.address}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <ul className="space-y-1 text-[11px] text-[#555555]">
                      {order.items.map((i, idx) => (
                        <li key={idx}>
                          {i.quantity}× {i.productName} ({i.variantLabel})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-5 py-4 font-display text-base font-bold text-[#111111] tabular-nums">
                    {order.total} {t.hero.currency}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="cursor-pointer rounded-full bg-[#F4F4F4] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#111111] focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-end">
                    <button
                      type="button"
                      onClick={() => onDeleteOrder(order.id)}
                      aria-label={t.admin.clearOrder}
                      className="cursor-pointer p-1.5 text-[#9A9A9A] hover:text-[#111111]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
