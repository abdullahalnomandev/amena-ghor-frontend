import Link from "next/link";
import { getProducts, getCategories } from "@/lib/products";
import { getDict, isLocale } from "@/i18n/dict";
import ProductCard from "@/components/ProductCard";
import FaqSection from "@/components/FaqSection";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappUrl } from "@/lib/whatsapp";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;

  const t = getDict(lang);
  const products = await getProducts();
  const items = products.filter((p) => p.featured);
  const categories = await getCategories();

  // Testimonials data
  const testimonials = [
    {
      name: lang === "bn" ? "আফরিন সুলতানা" : "Afrin Sultana",
      location: lang === "bn" ? "ধানমন্ডি, ঢাকা" : "Dhanmondi, Dhaka",
      text:
        lang === "bn"
          ? "গোলাপের তোড়াটি হাতে পেয়ে অবাক হয়েছি! হুবহু আসল ফুলের মতো দেখায় এবং ফিনিশিং অসাধারণ।"
          : "Extremely impressed with the rose bouquet! It looks identical to real flowers and finishing is top notch.",
      rating: 5,
    },
    {
      name: lang === "bn" ? "মাহমুদুল হাসান" : "Mahmudul Hasan",
      location: lang === "bn" ? "উত্তরা, ঢাকা" : "Uttara, Dhaka",
      text:
        lang === "bn"
          ? "সিরামিক ফুলদানিটি আমার ডাইনিং টেবিলের লুক পুরো বদলে দিয়েছে। প্যাকেজিংও খুব ভালো ছিল।"
          : "The ceramic vase completely elevated my dining table decor. Excellent packaging and quick delivery.",
      rating: 5,
    },
    {
      name: lang === "bn" ? "সামিরা জাহান" : "Samira Jahan",
      location: lang === "bn" ? "খুলশী, চট্টগ্রাম" : "Khulshi, Chattogram",
      text:
        lang === "bn"
          ? "৩ডি ফ্লোরাল ওয়াল ফ্রেমটি দেয়ালে ঝুলানোর পর দারুণ সুন্দর লাগছে। ক্যাশ অন ডেলিভারিতে ধন্যবাদ!"
          : "The 3D floral wall frame looks stunning on my living room wall. Thanks for smooth cash on delivery!",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-slate-50 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-blue-100/60">
        {/* Decorative glowing gradient orbs */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-xs font-bold text-blue-900 shadow-sm backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
                <span>✨ {t.heroBadge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.2] tracking-tight">
                {lang === "bn" ? (
                  <>
                    আপনার ঘরের রূপ বদলাতে{" "}
                    <span className="bg-gradient-to-r from-blue-700 via-blue-800 to-amber-600 bg-clip-text text-transparent">
                      প্রিমিয়াম কৃত্রিম ফুল
                    </span>{" "}
                    ও হোম ডেকোর
                  </>
                ) : (
                  <>
                    Transform Your Home with{" "}
                    <span className="bg-gradient-to-r from-blue-700 via-blue-800 to-amber-600 bg-clip-text text-transparent">
                      Luxury Silk Blooms
                    </span>{" "}
                    & Decor
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 leading-relaxed">
                {t.heroSub}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href={`/${lang}/products`}
                  className="rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-8 py-4 font-bold text-white shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:-translate-y-0.5 sm:text-base text-sm"
                >
                  {t.browse} →
                </Link>
              </div>

              {/* Highlights pills */}
              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                    ✓
                  </span>
                  <span>{t.deliveryBadge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                    ✓
                  </span>
                  <span>{t.qualityBadge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold">
                    ★
                  </span>
                  <span>{t.stat1}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative glass-card rounded-3xl p-4 shadow-2xl animate-float border border-blue-100/80 bg-white/90">
                  <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-blue-50">
                    <img
                      src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80"
                      alt="Luxury Silk Roses"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                    <div className="absolute top-4 right-4 bg-rose-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                      🔥 {lang === "bn" ? "হট সেলিং" : "Hot Selling"}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <span className="inline-block rounded-full bg-amber-400 text-slate-950 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                        {lang === "bn" ? "প্রিমিয়াম তোড়া" : "Premium Bouquet"}
                      </span>
                      <h3 className="font-serif text-lg font-bold">
                        {lang === "bn"
                          ? "রয়্যাল ক্লাসিক সিল্ক গোলাপ"
                          : "Royal Classic Silk Roses"}
                      </h3>
                    </div>
                  </div>

                  {/* Floating Stat Badge */}
                  <div className="absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-blue-100 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600">
                      🌸
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{t.stat1}</p>
                      <p className="text-[11px] text-amber-500 font-bold">
                        ★★★★★ (4.9/5 Rating)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORY CARDS SECTION
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {lang === "bn" ? "ক্যাটাগরি সমূহ" : "Categories"}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
            {t.categories}
          </h2>
          <div className="h-1 w-14 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <Link
            href={`/${lang}/products`}
            className="group glass-card rounded-2xl p-5 text-center space-y-3 hover-lift border border-blue-100 transition-all"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl group-hover:scale-110 transition-transform">
              💐
            </div>
            <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {t.all}
            </h3>
            <p className="text-[11px] text-slate-500 font-semibold">
              {products.length} {lang === "bn" ? "টি আইটেম" : "Items"}
            </p>
          </Link>

          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/${lang}/products?cat=${c.id}`}
              className="group glass-card rounded-2xl p-5 text-center space-y-3 hover-lift border border-blue-100 transition-all"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-3xl group-hover:scale-110 transition-transform">
                {c.icon || "🌸"}
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {c.name[lang]}
              </h3>
              <p className="text-[11px] text-slate-500 font-semibold">
                {lang === "bn" ? "কালেকশন দেখুন" : "View Collection"} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================
          FEATURED PRODUCTS SHOWCASE
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-blue-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {lang === "bn" ? "জনপ্রিয় পছন্দ" : "Popular Choice"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-0.5">
              {t.featured}
            </h2>
          </div>
          <Link
            href={`/${lang}/products`}
            className="rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-bold text-blue-900 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{t.browse}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} />
          ))}
        </div>
      </section>

      {/* =========================
          WHY CHOOSE US GRID
      ========================== */}
      <section className="bg-gradient-to-b from-blue-50/50 via-slate-50 to-blue-50/30 py-16 border-y border-blue-100/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {lang === "bn" ? "আমাদের বিশেষত্ব" : "Why Choose Us"}
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
              {t.whyUsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              {t.whyUsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-3xl p-7 text-center space-y-4 hover-lift border border-blue-100 bg-white/90">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-700 shadow-sm">
                🌸
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t.feature1Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.feature1Desc}
              </p>
            </div>

            <div className="glass-card rounded-3xl p-7 text-center space-y-4 hover-lift border border-blue-100 bg-white/90">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-700 shadow-sm">
                🧼
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t.feature2Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.feature2Desc}
              </p>
            </div>

            <div className="glass-card rounded-3xl p-7 text-center space-y-4 hover-lift border border-blue-100 bg-white/90">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl text-amber-700 shadow-sm">
                🚚
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t.feature3Title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CUSTOMER REVIEWS
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {lang === "bn" ? "গ্রাহক প্রতিক্রিয়া" : "Testimonials"}
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 mt-1">
            {t.reviewsTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1">{t.stat1}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 space-y-4 relative hover-lift border border-blue-100 bg-white/90 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="text-amber-500 text-sm font-bold">★★★★★</div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  ✓ Verified Buyer
                </span>
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{item.text}"
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{item.name}</span>
                <span className="text-slate-500">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          FAQS SECTION
      ========================== */}
      <FaqSection lang={lang} />

      {/* =========================
          CALL TO ACTION BANNER
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-14 text-white text-center shadow-2xl border border-blue-900/50">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-4xl">🌸</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              {lang === "bn"
                ? "আপনার ঘর সাজান প্রিমিয়াম কৃত্রিম ফুলে"
                : "Transform Your Space with Luxury Blooms"}
            </h2>
            <p className="text-sm opacity-90 text-blue-100 leading-relaxed">
              {lang === "bn"
                ? "সারা বাংলাদেশে দ্রুত ক্যাশ অন ডেলিভারিতে অর্ডার করতে এখনই WhatsApp-এ নক দিন।"
                : "Order now with nationwide cash on delivery support via WhatsApp."}
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl(
                  lang === "bn"
                    ? "আসসালামু আলাইকুম, আমি সরাসরি অর্ডার করতে চাই।"
                    : "Hello, I want to place an order."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-9 py-4 font-bold text-white shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-0.5 text-base"
              >
                <WhatsAppIcon className="h-6 w-6 fill-white shrink-0" />
                <span>WhatsApp-এ সরাসরি অর্ডার করুন</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
