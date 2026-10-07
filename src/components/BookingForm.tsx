"use client";

import { useState } from "react";
import { getDict } from "@/i18n/dict";
import { submitOrder } from "@/lib/orders";
import type { Locale } from "@/config/site";
import type { Product } from "@/types";
import { productOrderUrl, whatsappUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "./WhatsAppIcon";

function formatNumber(num: number, lang: Locale): string {
  if (lang === "bn") {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
  }
  return num.toString();
}

export default function BookingForm({
  lang,
  productId,
  quantity = 1,
  product,
}: {
  lang: Locale;
  productId: string;
  quantity?: number;
  product?: Product;
}) {
  const t = getDict(lang);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form) as any) as Record<string, string>;
    const er: Record<string, string> = {};

    if (!f.name?.trim()) {
      er.name = t.reqName;
    }
    const phone = (f.phone || "").replace(/[\s-]/g, "");
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      er.phone = t.badPhone;
    }
    if (!f.address?.trim()) {
      er.address = t.reqAddr;
    }

    setErrs(er);
    if (Object.keys(er).length > 0) return;

    setState("loading");
    try {
      await submitOrder({
        name: f.name.trim(),
        phone,
        address: f.address.trim(),
        productId,
        quantity,
        message: f.message?.trim() || "",
      });
      setState("ok");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const waUrl = product
    ? productOrderUrl(product, quantity, lang)
    : whatsappUrl(
      lang === "bn"
        ? "আসসালামু আলাইকুম, আমি অর্ডার করতে চাই।"
        : "Hello, I want to place an order."
    );

  const totalPrice = product ? product.price * quantity : 0;

  if (state === "ok") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-emerald-300 bg-emerald-50 p-8 text-center shadow-lg"
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
          ✓
        </div>
        <h3 className="font-serif text-xl font-bold text-emerald-800">
          {t.ok}
        </h3>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-blue-100"
    >
      {/* Header */}
      <div className="mb-2">
        <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-slate-900">
          <span>🛍️</span>
          <span>{t.quickOrder}</span>
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {t.deliveryBadge}
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-900">
          {t.name} <span className="text-blue-600">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder={t.reqName}
          className={`w-full rounded-2xl border ${errs.name ? "border-rose-500" : "border-slate-200"
            } bg-white/40 backdrop-blur-sm py-3 px-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
          aria-invalid={!!errs.name}
        />
        {errs.name && (
          <span
            role="alert"
            className="mt-1 block text-xs font-semibold text-rose-600"
          >
            ⚠️ {errs.name}
          </span>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-900">
          {t.phone} <span className="text-blue-600">*</span>
        </label>
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          placeholder="01712345678"
          className={`w-full rounded-2xl border ${errs.phone ? "border-rose-500" : "border-slate-200"
            } bg-white/40 backdrop-blur-sm py-3 px-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
          aria-invalid={!!errs.phone}
        />
        {errs.phone && (
          <span
            role="alert"
            className="mt-1 block text-xs font-semibold text-rose-600"
          >
            ⚠️ {errs.phone}
          </span>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-900">
          {t.address} <span className="text-blue-600">*</span>
        </label>
        <input
          name="address"
          type="text"
          placeholder={t.reqAddr}
          className={`w-full rounded-2xl border ${errs.address ? "border-rose-500" : "border-slate-200"
            } bg-white/40 backdrop-blur-sm py-3 px-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100`}
          aria-invalid={!!errs.address}
        />
        {errs.address && (
          <span
            role="alert"
            className="mt-1 block text-xs font-semibold text-rose-600"
          >
            ⚠️ {errs.address}
          </span>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-900">
          {t.message}
        </label>
        <textarea
          name="message"
          rows={2}
          placeholder="..."
          className="w-full rounded-2xl border border-slate-200 bg-white/40 backdrop-blur-sm px-4 py-3 text-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Server Error */}
      {state === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600"
        >
          ⚠️ {t.fail}
        </p>
      )}

      {/* Action Buttons Container */}
      <div className="pt-2 space-y-2">
        {/* 1. Submit Button (🛍️ অর্ডার কনফার্ম করুন) */}
        <button
          type="submit"
          disabled={state === "loading"}
          className="flex w-full cursor-pointer transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-900 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
        >
          <span>{state === "loading" ? "⏳" : "🛍️"}</span>
          <span>
            {state === "loading"
              ? t.sending
              : totalPrice > 0
                ? `${t.send} (৳${formatNumber(totalPrice, lang)})`
                : t.send}
          </span>
        </button>

        {/* 2. Small Divider ("অথবা") */}
        <div className="text-center text-xs font-bold text-slate-400 py-1">
          {lang === "bn" ? "অথবা" : "OR"}
        </div>

        {/* 3. WhatsApp Button (🟢 WhatsApp-) */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full transform items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-lg active:scale-95 sm:text-base"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0 fill-white" />
          <span>{t.wa}</span>
        </a>
      </div>
    </form>
  );
}