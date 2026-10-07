"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { site, type Locale } from "@/config/site";
import { getDict } from "@/i18n/dict";
import { submitOrder } from "@/lib/orders";

export default function CartDrawer({ lang }: { lang: Locale }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const t = getDict(lang);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errs, setErrs] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  // Format WhatsApp multi-item message
  const whatsappItemsText = cart
    .map(
      (item) =>
        `• ${item.product.name[lang]} x${item.quantity} = ৳${
          item.product.price * item.quantity
        }`
    )
    .join("\n");

  const whatsappMessage =
    lang === "bn"
      ? `আসসালামু আলাইকুম! আমি নিম্নলিখিত পণ্যগুলো অর্ডার করতে চাই:\n\n${whatsappItemsText}\n\nমোট মূল্য: ৳${subtotal}`
      : `Hello! I would like to order the following items:\n\n${whatsappItemsText}\n\nTotal: ৳${subtotal}`;

  const whatsappCheckoutUrl = `https://wa.me/${
    site.whatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget) as any) as Record<
      string,
      string
    >;
    const er: Record<string, string> = {};

    if (!f.name?.trim()) er.name = t.reqName;
    if (!/^01[3-9]\d{8}$/.test((f.phone || "").replace(/[\s-]/g, "")))
      er.phone = t.badPhone;
    if (!f.address?.trim()) er.address = t.reqAddr;

    setErrs(er);
    if (Object.keys(er).length) return;

    setLoading(true);
    try {
      // Submit each item or combined order
      for (const item of cart) {
        await submitOrder({
          name: f.name,
          phone: f.phone,
          address: f.address,
          productId: item.product.id,
          quantity: item.quantity,
          message: f.message,
        });
      }
      setLoading(false);
      setSuccess(true);
      clearCart();
    } catch {
      setLoading(false);
      alert(t.fail);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-paper shadow-2xl flex flex-col justify-between border-l border-rose/15 transition-all">
          {/* Header */}
          <div className="p-5 border-b border-rose/15 flex items-center justify-between bg-blush/60">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <h2 className="font-serif text-xl font-bold text-ink">
                {lang === "bn" ? "শপিং ব্যাগ" : "Shopping Bag"} ({totalItems})
              </h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-ink-muted hover:text-rose hover:bg-rose-light transition-all shadow-sm"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-3xl text-white">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold text-leaf">
                  {t.ok}
                </h3>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setCheckoutMode(false);
                    setIsCartOpen(false);
                  }}
                  className="rounded-full bg-rose px-6 py-2.5 text-xs font-bold text-white shadow-md"
                >
                  {t.browse}
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="text-6xl">🌸</div>
                <p className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "আপনার ব্যাগটি খালি" : "Your cart is empty"}
                </p>
                <p className="text-xs text-ink-muted">
                  {lang === "bn"
                    ? "পছন্দের ফুল খুঁজে বের করুন এবং ব্যাগে যুক্ত করুন।"
                    : "Browse our collection and add items to your cart."}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full bg-rose px-6 py-2.5 text-xs font-bold text-white shadow-md"
                >
                  {t.browse}
                </button>
              </div>
            ) : checkoutMode ? (
              /* Quick Form Checkout */
              <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                <div className="flex items-center justify-between border-b border-rose/10 pb-2">
                  <h3 className="font-serif text-base font-bold text-ink">
                    {t.order}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCheckoutMode(false)}
                    className="text-xs font-bold text-rose hover:underline"
                  >
                    ← {lang === "bn" ? "ব্যাগ দেখুন" : "Back to cart"}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                    {t.name} *
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder={t.reqName}
                    className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-rose"
                  />
                  {errs.name && (
                    <span className="text-[11px] text-rose font-bold">
                      {errs.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                    {t.phone} *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="017XXXXXXXX"
                    className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-rose"
                  />
                  {errs.phone && (
                    <span className="text-[11px] text-rose font-bold">
                      {errs.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                    {t.address} *
                  </label>
                  <input
                    name="address"
                    type="text"
                    placeholder={t.reqAddr}
                    className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-rose"
                  />
                  {errs.address && (
                    <span className="text-[11px] text-rose font-bold">
                      {errs.address}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-xs outline-none focus:border-rose"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-rose to-rose-dark py-3.5 text-xs font-bold text-white shadow-lg disabled:opacity-60"
                >
                  {loading ? t.sending : t.send} (৳{subtotal})
                </button>
              </form>
            ) : (
              /* Item List */
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-rose/10 shadow-sm"
                >
                  <img
                    src={
                      item.product.images?.[0] ||
                      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={item.product.name[lang]}
                    className="h-16 w-16 rounded-xl object-cover bg-blush"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-ink line-clamp-1">
                      {item.product.name[lang]}
                    </h4>
                    <p className="text-xs font-bold text-rose mt-0.5">
                      {t.taka}
                      {item.product.price}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="h-6 w-6 rounded-lg bg-blush text-ink font-bold text-xs flex items-center justify-center hover:bg-rose/20"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-ink">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="h-6 w-6 rounded-lg bg-blush text-ink font-bold text-xs flex items-center justify-center hover:bg-rose/20"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-ink-muted hover:text-rose p-1 text-sm"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action buttons */}
          {!success && cart.length > 0 && !checkoutMode && (
            <div className="p-5 border-t border-rose/15 bg-blush/40 space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-ink">
                <span>{lang === "bn" ? "মোট মূল্য:" : "Subtotal:"}</span>
                <span className="text-xl text-rose">
                  {t.taka}
                  {subtotal}
                </span>
              </div>
              <p className="text-[11px] text-leaf font-semibold flex items-center gap-1">
                <span>✓</span> {t.deliveryBadge}
              </p>

              <div className="space-y-2 pt-1">
                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#1fa855] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#188e47] transition-all"
                >
                  <span>💬</span>
                  <span>
                    {lang === "bn"
                      ? "WhatsApp-এ সরাসরি অর্ডার করুন"
                      : "Order All on WhatsApp"}
                  </span>
                </a>

                <button
                  onClick={() => setCheckoutMode(true)}
                  className="w-full rounded-full border border-rose bg-white py-3 text-xs font-bold text-rose hover:bg-rose hover:text-white transition-all shadow-sm"
                >
                  {lang === "bn"
                    ? "ফর্ম পূরণ করে অর্ডার করুন"
                    : "Checkout with Delivery Form"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
