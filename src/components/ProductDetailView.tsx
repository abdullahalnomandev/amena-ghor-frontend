"use client";

import { useState } from "react";
import Link from "next/link";

import { discount } from "@/lib/products";
import { getDict } from "@/i18n/dict";

import type { Locale } from "@/config/site";
import type { Product } from "@/types";

import BookingForm from "./BookingForm";

export default function ProductDetailView({
  p,
  lang,
}: {
  p: Product;
  lang: Locale;
}) {
  const t = getDict(lang);
  const d = discount(p);

  const imagesList =
    p.images && p.images.length > 0
      ? p.images
      : [
        "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
      ];

  const [selectedImg, setSelectedImg] = useState(imagesList[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <Link
          href={`/${lang}`}
          className="transition hover:text-blue-600"
        >
          {t.home}
        </Link>

        <span>/</span>

        <Link
          href={`/${lang}/products`}
          className="transition hover:text-blue-600"
        >
          {t.products}
        </Link>

        <span>/</span>

        <span className="max-w-[250px] truncate font-semibold text-slate-900">
          {p.name[lang]}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* =========================
            LEFT - PRODUCT GALLERY
        ========================== */}
        <div className="lg:col-span-6">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/50 shadow-lg">
              <img
                src={selectedImg}
                alt={p.name[lang]}
                className="h-full w-full object-cover transition-all duration-300"
              />

              {/* Product Badges */}
              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                {d > 0 && (
                  <span className="rounded-full bg-rose-500 px-4 py-1.5 text-xs font-bold text-white shadow-md">
                    -{d}% OFF
                  </span>
                )}

                {p.badge && (
                  <span className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-md">
                    {p.badge[lang]}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="absolute bottom-4 left-4 z-10">
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-bold shadow-md backdrop-blur-md ${p.available
                      ? "bg-white/95 text-emerald-700"
                      : "bg-white/95 text-rose-600"
                    }`}
                >
                  {p.available ? "✓ স্টকে আছে" : "✕ স্টকে নেই"}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImg(img)}
                    aria-label={`ছবি ${idx + 1} দেখুন`}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 shadow-sm transition-all ${selectedImg === img
                        ? "scale-105 border-blue-600 ring-2 ring-blue-200"
                        : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =========================
            RIGHT - PRODUCT DETAILS
        ========================== */}
        <div className="lg:col-span-6">
          <div className="space-y-7">
            {/* Category */}
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">
              {p.category}
            </span>

            {/* Product Name */}
            <h1 className="font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              {p.name[lang]}
            </h1>

            {/* Rating */}
            {p.rating && (
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold text-amber-500">
                  {"★".repeat(Math.floor(p.rating))}
                </div>

                <span className="text-xs text-slate-500">
                  {p.rating} ({p.reviewsCount || 15} {t.reviews})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-6">
              <span className="text-3xl font-extrabold text-blue-700">
                {t.taka}
                {p.price * qty}
              </span>

              {p.oldPrice && (
                <span className="text-lg text-slate-400 line-through">
                  {t.taka}
                  {p.oldPrice * qty}
                </span>
              )}

              {d > 0 && p.oldPrice && (
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  সাশ্রয় {t.taka}
                  {(p.oldPrice - p.price) * qty}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-7 text-slate-600">
              {p.description[lang]}
            </p>

            {/* Features */}
            {p.features && p.features.length > 0 && (
              <div className="border-t border-slate-100 pt-5">
                <h4 className="mb-3 text-sm font-bold text-slate-900">
                  পণ্যের বৈশিষ্ট্য
                </h4>

                <ul className="space-y-2">
                  {p.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 font-bold text-emerald-600">
                        ✓
                      </span>

                      <span>{feature[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-900">
                পরিমাণ:
              </span>

              <div className="flex items-center rounded-full border border-blue-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-slate-900 transition hover:bg-blue-100"
                  aria-label="পরিমাণ কমান"
                >
                  −
                </button>

                <span className="w-12 text-center text-sm font-bold text-slate-900">
                  {qty}
                </span>

                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-slate-900 transition hover:bg-blue-100"
                  aria-label="পরিমাণ বাড়ান"
                >
                  +
                </button>
              </div>
            </div>

            {/* Order / Booking Form */}
            <div className="border-t border-slate-100 pt-6">
              <BookingForm
                lang={lang}
                productId={p.id}
                quantity={qty}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}