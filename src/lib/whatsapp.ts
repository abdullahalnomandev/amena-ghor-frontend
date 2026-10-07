import { site, type Locale } from "@/config/site";
import type { Product } from "@/types";
export function whatsappUrl(text:string){return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`}
export function productOrderUrl(p:Product,qty:number,l:Locale){
  const head=l==="bn"?"আমি এই পণ্যটি অর্ডার করতে চাই:":"I would like to order this product:";
  return whatsappUrl(`${head}\n\nProduct: ${p.name[l]}\nPrice: ৳${p.price}\nQuantity: ${qty}`);
}
