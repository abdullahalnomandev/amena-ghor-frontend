"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import type { Locale } from "@/config/site";

export default function ClientProviders({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer lang={lang} />
    </CartProvider>
  );
}
