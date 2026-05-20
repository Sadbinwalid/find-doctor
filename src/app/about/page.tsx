"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-500 mb-4">
        <a href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</a>
        {" / "}
        <span className="text-gray-900">{t("About", "আমাদের সম্পর্কে")}</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("About DoctorBD", "DoctorBD সম্পর্কে")}</h1>
      <p className="text-gray-500 text-sm mb-8">
        {t("Bangladesh's trusted doctor directory platform", "বাংলাদেশের বিশ্বস্ত ডাক্তার ডিরেক্টরি প্ল্যাটফর্ম")}
      </p>

      <div className="flex flex-col gap-6">
        {[
          {
            titleEn: "Our Mission",
            titleBn: "আমাদের লক্ষ্য",
            descEn: "DoctorBD exists to make healthcare accessible to every Bangladeshi citizen. We believe finding the right doctor should be simple — whether you're in Dhaka or in a rural upazila of Sylhet.",
            descBn: "DoctorBD প্রতিটি বাংলাদেশী নাগরিকের কাছে স্বাস্থ্যসেবা সহজলভ্য করতে বিদ্যমান। আমরা বিশ্বাস করি সঠিক ডাক্তার খুঁজে পাওয়া সহজ হওয়া উচিত।",
          },
          {
            titleEn: "What We Offer",
            titleBn: "আমরা কী অফার করি",
            descEn: "A comprehensive, searchable directory of verified doctors across all 8 divisions and 64 districts of Bangladesh. Filter by specialty, location, fee, and availability.",
            descBn: "বাংলাদেশের সব ৮টি বিভাগ ও ৬৪টি জেলার যাচাইকৃত ডাক্তারদের একটি ব্যাপক, অনুসন্ধানযোগ্য ডিরেক্টরি।",
          },
          {
            titleEn: "Emergency Help",
            titleBn: "জরুরি সাহায্য",
            descEn: "For medical emergencies, always call the National Health Helpline at 16457. Available 24/7 across Bangladesh.",
            descBn: "চিকিৎসা জরুরি অবস্থায়, সর্বদা ১৬৪৫৭ নম্বরে জাতীয় স্বাস্থ্য হেল্পলাইনে কল করুন। বাংলাদেশ জুড়ে ২৪/৭ উপলব্ধ।",
          },
        ].map((item) => (
          <div key={item.titleEn} className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-900 mb-2">{t(item.titleEn, item.titleBn)}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{t(item.descEn, item.descBn)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
