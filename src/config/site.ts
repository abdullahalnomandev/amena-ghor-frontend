export const site = {
  name: { bn: "ফুলেল", en: "Phulel" },
  whatsapp: "8801825390056", // updated WhatsApp number
  phone: "+880 1825-390056",
  facebook: "https://facebook.com/phulel",
  address: { bn: "মিরপুর-১০, ঢাকা", en: "Mirpur-10, Dhaka" },
  hours: { bn: "প্রতিদিন সকাল ১০টা – রাত ৯টা", en: "Daily 10am – 9pm" },
  locales: ["bn", "en"] as const,
  defaultLocale: "bn" as const,
};
export type Locale = (typeof site.locales)[number];
