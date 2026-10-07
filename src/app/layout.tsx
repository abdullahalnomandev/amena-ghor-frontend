import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ফুলেল — প্রিমিয়াম কৃত্রিম ফুল ও হোম ডেকোরেশন",
  description: "প্রিমিয়াম কৃত্রিম ফুল, সিরামিক ফুলদানি ও হোম ডেকোরেশন — সারা বাংলাদেশে দ্রুত ডেলিভারি।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Noto+Serif+Bengali:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="bg-paper text-ink font-sans antialiased selection:bg-rose/20 selection:text-rose-dark min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
