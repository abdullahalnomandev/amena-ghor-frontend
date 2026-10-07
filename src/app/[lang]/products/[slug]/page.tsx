import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import { isLocale } from "@/i18n/dict";
import ProductDetailView from "@/components/ProductDetailView";

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const ps = await getProducts();
  return ps.flatMap((p) => ["bn", "en"].map((lang) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = await getProduct(slug);
  if (!p || !isLocale(lang)) return {};
  return {
    title: p.name[lang],
    description: p.description[lang],
    openGraph: { title: p.name[lang], description: p.description[lang] },
  };
}

export default async function Detail({ params }: P) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const p = await getProduct(slug);
  if (!p) notFound();

  return <ProductDetailView p={p} lang={lang} />;
}
