import type { Locale } from "@/config/site";

export type L10n = Record<Locale, string>;

export interface Product {
  id: string;
  slug: string;
  name: L10n;
  description: L10n;
  price: number;
  oldPrice?: number;
  category: string;
  images: string[];
  featured: boolean;
  available: boolean;
  rating?: number;
  reviewsCount?: number;
  badge?: L10n;
  features?: L10n[];
}

export interface Category {
  id: string;
  name: L10n;
  icon?: string;
}

export interface OrderInput {
  name: string;
  phone: string;
  whatsapp?: string;
  address: string;
  productId: string;
  quantity: number;
  date?: string;
  time?: string;
  message?: string;
}
