import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { isLocale } from "@/i18n/dict";
import { getDict } from "@/i18n/dict";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: {
      default: `${site.name[lang]} — ${lang === "bn"
        ? "প্রিমিয়াম কৃত্রিম ফুল ও হোম ডেকোরেশন"
        : "Artificial Flowers & Home Decor"
        }`,
      template: `%s | ${site.name[lang]}`,
    },
    openGraph: {
      type: "website",
      locale: lang === "bn" ? "bn_BD" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return site.locales.map((lang) => ({ lang }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar lang={lang} />
        <main>{children}</main>
      </div>

      {/* Luxury Royal Blue & Navy Footer */}
      <footer className="mt-24 border-t border-blue-900/30 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-300">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href={`/${lang}`} className="inline-block transition-transform hover:scale-105">
              <Image
                src="/images/logo.png"
                alt={site.name[lang]}
                width={160}
                height={50}
                className="h-12 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2 text-amber-400">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              <span className="text-xs font-bold uppercase tracking-wider">{t.deliveryBadge}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 border-b border-blue-800/50 pb-2">
              {t.home} & {t.products}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li>
                <Link href={`/${lang}`} className="hover:text-blue-400 transition-colors">
                  • {t.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products`} className="hover:text-blue-400 transition-colors">
                  • {t.products}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products?cat=bouquets`} className="hover:text-blue-400 transition-colors">
                  • {lang === "bn" ? "ফুলের তোড়া" : "Flower Bouquets"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/products?cat=vases`} className="hover:text-blue-400 transition-colors">
                  • {lang === "bn" ? "ফুলদানি" : "Vases"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 border-b border-blue-800/50 pb-2">
              {t.whyUsTitle}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> {t.feature1Title}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> {t.feature2Title}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> {t.feature3Title}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span> {t.stat3}
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 border-b border-blue-800/50 pb-2">
              {t.contactUs}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
              <li>📍 {site.address[lang]}</li>
              <li>📞 {site.phone}</li>
              <li>⏰ {site.hours[lang]}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-blue-900/40 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t.copyright} • Designed for Royal Living</p>
        </div>
      </footer>

      <WhatsAppFloat lang={lang} />
    </div>
  );
}
