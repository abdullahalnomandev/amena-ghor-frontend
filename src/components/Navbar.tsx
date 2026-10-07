"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { site, type Locale } from "@/config/site";
import { getDict } from "@/i18n/dict";
import TranslateIcon from "./TranslateIcon";

export default function Navbar({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const other = lang === "bn" ? "en" : "bn";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar - Royal Navy & Gold */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-2 px-4 text-xs font-medium text-white shadow-inner">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-emerald-300">
              {t.deliveryBadge}
            </span>
          </div>
          <div className="hidden sm:block font-medium text-amber-300">
            ✨ {t.heroBadge}
          </div>
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-1.5 font-mono text-blue-200 hover:text-white transition-colors"
          >
            <span>📞</span>
            <span>{site.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar - Crisp White Glass */}
      <div
        className={`bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${scrolled
            ? "border-blue-100 shadow-md py-2"
            : "border-slate-100/80 py-3"
          }`}
      >
        <nav
          aria-label="Main Navigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          {/* Brand Logo */}
          <Link
            href={`/${lang}`}
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src="/images/logo.png"
              alt={site.name[lang]}
              width={150}
              height={45}
              className="h-10 sm:h-11 w-auto object-contain drop-shadow-sm"
              priority
            />
          </Link>

          {/* Navigation Links & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ul className="flex items-center gap-1 sm:gap-2 text-sm font-semibold text-slate-800">
              <li>
                <Link
                  href={`/${lang}`}
                  className="rounded-full px-4 py-2 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/products`}
                  className="rounded-full px-4 py-2 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  {t.products}
                </Link>
              </li>
            </ul>

            {/* Professional Language Switcher Pill */}
            <Link
              href={`/${other}`}
              className="group flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-1.5 text-xs font-bold text-blue-950 transition-all duration-300 shadow-sm"
              hrefLang={other}
              aria-label="Switch Language"
            >
              <TranslateIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
              <span>{lang === "bn" ? "English" : "বাংলা"}</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
