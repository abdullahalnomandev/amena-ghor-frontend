// Data-access layer: swap JSON for API/DB here only.
import data from "@/data/products.json";
import cats from "@/data/categories.json";
import type { Product, Category } from "@/types";
export async function getProducts():Promise<Product[]>{return data as Product[]}
export async function getProduct(slug:string){return (await getProducts()).find(p=>p.slug===slug)??null}
export async function getCategories():Promise<Category[]>{return cats as Category[]}
export const discount=(p:Product)=>p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):0;
