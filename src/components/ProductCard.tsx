import Link from "next/link";
import { discount } from "@/lib/products";
import { productOrderUrl } from "@/lib/whatsapp";
import { getDict } from "@/i18n/dict";
import type { Locale } from "@/config/site";
import type { Product } from "@/types";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({ p, lang }: { p: Product; lang: Locale }) {
  const t = getDict(lang);
  const d = discount(p);
  const imgUrl =
    p.images && p.images.length > 0
      ? p.images[0]
      : "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-blue-100 shadow-sm hover-lift transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-blue-50/50">
        <img
          src={imgUrl}
          alt={p.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {d > 0 && (
            <span className="rounded-full badge-rose px-3 py-1 text-xs font-bold shadow-md">
              -{d}%
            </span>
          )}
          {p.badge && (
            <span className="rounded-full badge-gold px-3 py-1 text-xs font-bold shadow-md">
              {p.badge[lang]}
            </span>
          )}
        </div>

        {/* Stock Status Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
            ✓ {t.inStock}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Star Rating */}
        {p.rating && (
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
            <span>{"★".repeat(Math.floor(p.rating))}</span>
            <span className="text-slate-500">
              {p.rating} ({p.reviewsCount || 12})
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          <Link href={`/${lang}/products/${p.slug}`}>{p.name[lang]}</Link>
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-xs text-slate-600 leading-relaxed">
          {p.description[lang]}
        </p>

        {/* Pricing */}
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-blue-700">
            {t.taka}
            {p.price}
          </span>
          {p.oldPrice && (
            <span className="text-xs text-slate-400 line-through">
              {t.taka}
              {p.oldPrice}
            </span>
          )}
        </div>

        {/* Clean Direct Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link
            href={`/${lang}/products/${p.slug}`}
            className="flex items-center justify-center rounded-full border border-blue-200 bg-blue-50/80 py-2.5 text-center text-xs font-bold text-blue-900 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            {t.view}
          </Link>

          <a
            href={productOrderUrl(p, 1, lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] py-2.5 text-center text-xs font-bold text-white shadow-sm hover:shadow transition-all duration-300"
          >
            <WhatsAppIcon className="h-4 w-4 fill-white shrink-0" />
            <span>{t.order}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
