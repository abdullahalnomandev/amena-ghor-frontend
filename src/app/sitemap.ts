import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
const base=process.env.NEXT_PUBLIC_SITE_URL??"https://example.com";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const ps=await getProducts();
 return ["bn","en"].flatMap(l=>[{url:`${base}/${l}`},{url:`${base}/${l}/products`},...ps.map(p=>({url:`${base}/${l}/products/${p.slug}`}))])}
