import { getProducts, getCategories } from "@/lib/products";
import { getDict, isLocale } from "@/i18n/dict";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Products({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; cat?: string; sort?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;

  const { q = "", cat = "", sort = "" } = await searchParams;
  const t = getDict(lang);

  let items = (await getProducts()).filter(
    (p) =>
      (!cat || p.category === cat) &&
      (!q ||
        (p.name.bn + p.name.en + p.description.bn + p.description.en)
          .toLowerCase()
          .includes(q.toLowerCase()))
  );

  if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);

  const cats = await getCategories();
  const tabs = [{ id: "", name: { bn: t.all, en: t.all }, icon: "💐" }, ...cats];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-8 bg-gradient-to-r from-blue-50 via-paper to-blue-50/60 border border-blue-100 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="rounded-full badge-gold px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            🌸 {t.products}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            {t.products} ({items.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.deliveryBadge}
          </p>
        </div>

        {/* Search & Sort Form */}
        <form className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          {cat && <input type="hidden" name="cat" value={cat} />}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">🔍</span>
            <input
              name="q"
              defaultValue={q}
              placeholder={t.search}
              aria-label={t.search}
              className="w-full rounded-full border border-slate-200 bg-white/90 pl-10 pr-4 py-2 text-xs font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <select
            name="sort"
            defaultValue={sort}
            aria-label="Sort"
            className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 outline-none"
          >
            <option value="">Sort: Default</option>
            <option value="low">Price: Low to High (৳ ↑)</option>
            <option value="high">Price: High to Low (৳ ↓)</option>
          </select>

          <button className="rounded-full bg-blue-600 px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-all">
            OK
          </button>
        </form>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-blue-100">
        {tabs.map((c) => {
          const active = cat === c.id;
          return (
            <Link
              key={c.id}
              href={`/${lang}/products?${new URLSearchParams({
                ...(q ? { q } : {}),
                ...(c.id ? { cat: c.id } : {}),
                ...(sort ? { sort } : {}),
              }).toString()}`}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-700 border border-blue-200 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              <span>{c.icon || "🌸"}</span>
              <span>{c.name[lang]}</span>
            </Link>
          );
        })}
      </div>

      {/* Product Grid */}
      {items.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-card rounded-3xl space-y-4 border border-blue-100">
          <div className="text-5xl">🌸</div>
          <p className="font-serif text-lg font-bold text-slate-900">{t.empty}</p>
          <Link
            href={`/${lang}/products`}
            className="inline-block rounded-full bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md"
          >
            {t.all}
          </Link>
        </div>
      )}
    </div>
  );
}
