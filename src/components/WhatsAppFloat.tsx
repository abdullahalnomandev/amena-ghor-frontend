import { whatsappUrl } from "@/lib/whatsapp";
import type { Locale } from "@/config/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFloat({ lang }: { lang: Locale }) {
  return (
    <a
      href={whatsappUrl(
        lang === "bn"
          ? "আসসালামু আলাইকুম, আমি প্রিমিয়াম ফুল সম্পর্কে কিছু জানতে চাই।"
          : "Hello, I have a question about your products."
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-5 py-3.5 font-bold text-white shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
      aria-label="Order on WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6 fill-white shrink-0" />
      <span className="text-sm font-semibold tracking-wide">
        {lang === "bn" ? "WhatsApp" : "WhatsApp"}
      </span>
    </a>
  );
}
