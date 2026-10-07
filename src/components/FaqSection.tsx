"use client";

import { useState } from "react";
import type { Locale } from "@/config/site";

export default function FaqSection({ lang }: { lang: Locale }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q:
        lang === "bn"
          ? "অর্ডার করার কত দিনের মধ্যে ডেলিভারি পাব?"
          : "When will I receive my order?",
      a:
        lang === "bn"
          ? "ঢাকার ভেতরে ১-২ দিনের মধ্যে এবং ঢাকার বাইরে ২-৩ দিনের মধ্যে হোম ডেলিভারি প্রদান করা হয়।"
          : "Delivery takes 1-2 days within Dhaka and 2-3 days across other districts.",
    },
    {
      q:
        lang === "bn"
          ? "পণ্যগুলো কি পানি দিয়ে ধোয়া সম্ভব?"
          : "Are these artificial flowers washable?",
      a:
        lang === "bn"
          ? "হ্যাঁ, আমাদের প্রতিটি ফুল ও সিরামিক আইটেম ওয়াশযোগ্য। হালকা পানি বা ভিজা কাপড় দিয়ে সহজে পরিষ্কার করা যায়।"
          : "Yes! All our silk flowers and ceramic items are water-resistant and easy to clean with a damp cloth.",
    },
    {
      q:
        lang === "bn"
          ? "ক্যাশ অন ডেলিভারিতে অর্ডার দেওয়া যাবে?"
          : "Can I pay using Cash on Delivery?",
      a:
        lang === "bn"
          ? "জি, সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। পণ্য হাতে পেয়ে দেখে টাকা পরিশোধ করতে পারবেন।"
          : "Yes, we offer Cash on Delivery across all 64 districts in Bangladesh.",
    },
    {
      q:
        lang === "bn"
          ? "কাস্টমাইজড উপহার বা তোড়া তৈরি করা যাবে?"
          : "Can I request a customized bouquet?",
      a:
        lang === "bn"
          ? "অবশ্যই! আপনার পছন্দ অনুযায়ী ফুল সাজিয়ে নেওয়ার জন্য সরাসরি WhatsApp-এ বার্তা দিন।"
          : "Absolutely! Message us on WhatsApp to customize your flower arrangement.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <span className="rounded-full badge-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
          FAQ
        </span>
        <h2 className="font-serif text-3xl font-bold text-slate-900 mt-2">
          {lang === "bn" ? "সাধারণ জিজ্ঞাসিত প্রশ্নাবলী" : "Frequently Asked Questions"}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {lang === "bn"
            ? "আপনার যেকোনো প্রশ্নের উত্তর সহজে জেনে নিন"
            : "Everything you need to know about our products & delivery"}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-blue-100 shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-serif text-base font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="h-7 w-7 rounded-full bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0 ml-2">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-blue-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
