"use client";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, MapPin, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f4f6f9]">

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0066CC] to-[#0052a3] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <nav className="text-xs text-blue-200 mb-5 flex items-center justify-center gap-1">
            <a href="/" className="hover:text-white">{t("Home", "হোম")}</a>
            <span>/</span>
            <span className="text-white">{t("About", "আমাদের সম্পর্কে")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("About DoctorBD", "DoctorBD সম্পর্কে")}
          </h1>
          <p className="text-blue-100 text-base max-w-xl mx-auto">
            {t(
              "Bangladesh's trusted doctor directory — making healthcare accessible to everyone, everywhere.",
              "বাংলাদেশের বিশ্বস্ত ডাক্তার ডিরেক্টরি — সবার কাছে স্বাস্থ্যসেবা সহজলভ্য করা।"
            )}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 grid grid-cols-4 gap-2">
          {[
            { value: "1,200+", en: "Doctors", bn: "ডাক্তার" },
            { value: "40+", en: "Specialties", bn: "বিশেষজ্ঞতা" },
            { value: "8", en: "Divisions", bn: "বিভাগ" },
            { value: "64", en: "Districts", bn: "জেলা" },
          ].map((s) => (
            <div key={s.en} className="text-center">
              <p className="text-xl font-bold text-[#0066CC]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t(s.en, s.bn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-5">
          {[
            {
              icon: ShieldCheck,
              color: "#0066CC",
              bg: "#EBF5FF",
              titleEn: "Our Mission",
              titleBn: "আমাদের লক্ষ্য",
              descEn: "DoctorBD exists to make healthcare accessible to every Bangladeshi citizen. We believe finding the right doctor should be simple — whether you're in Dhaka or a rural upazila of Sylhet.",
              descBn: "DoctorBD প্রতিটি বাংলাদেশী নাগরিকের কাছে স্বাস্থ্যসেবা সহজলভ্য করতে বিদ্যমান। আমরা বিশ্বাস করি সঠিক ডাক্তার খুঁজে পাওয়া সহজ হওয়া উচিত — ঢাকায় হোক বা সিলেটের প্রত্যন্ত উপজেলায়।",
            },
            {
              icon: MapPin,
              color: "#00A86B",
              bg: "#E6F7EF",
              titleEn: "What We Offer",
              titleBn: "আমরা কী অফার করি",
              descEn: "A comprehensive, searchable directory of verified doctors across all 8 divisions and 64 districts of Bangladesh. Filter by specialty, location, fee, and availability.",
              descBn: "বাংলাদেশের সব ৮টি বিভাগ ও ৬৪টি জেলার যাচাইকৃত ডাক্তারদের একটি ব্যাপক, অনুসন্ধানযোগ্য ডিরেক্টরি। বিশেষজ্ঞতা, অবস্থান, ফি ও উপলব্ধতা দিয়ে ফিল্টার করুন।",
            },
            {
              icon: Users,
              color: "#8B5CF6",
              bg: "#F3F0FF",
              titleEn: "For Doctors",
              titleBn: "ডাক্তারদের জন্য",
              descEn: "Are you a verified doctor? Join DoctorBD to reach patients across Bangladesh. Submit your BMDC credentials and get a verified badge on your profile.",
              descBn: "আপনি কি একজন যাচাইকৃত ডাক্তার? DoctorBD-তে যোগ দিন এবং বাংলাদেশ জুড়ে রোগীদের কাছে পৌঁছান। আপনার BMDC সনদ জমা দিন এবং প্রোফাইলে যাচাই ব্যাজ পান।",
            },
            {
              icon: Phone,
              color: "#DC2626",
              bg: "#FEF2F2",
              titleEn: "Emergency Help",
              titleBn: "জরুরি সাহায্য",
              descEn: "For medical emergencies, always call the National Health Helpline at 16457. Available 24/7 across Bangladesh.",
              descBn: "চিকিৎসা জরুরি অবস্থায়, সর্বদা ১৬৪৫৭ নম্বরে জাতীয় স্বাস্থ্য হেল্পলাইনে কল করুন। বাংলাদেশ জুড়ে ২৪/৭ উপলব্ধ।",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.titleEn} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.bg }}
                >
                  <Icon size={22} style={{ color: item.color }} strokeWidth={1.75} />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 mb-1.5">{t(item.titleEn, item.titleBn)}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(item.descEn, item.descBn)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/doctors"
            className="flex-1 flex items-center justify-center gap-2 bg-[#0066CC] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-sm"
          >
            {t("Find a Doctor", "ডাক্তার খুঁজুন")}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/register/doctor"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0066CC] text-[#0066CC] font-bold py-3.5 px-6 rounded-xl hover:bg-blue-50 active:scale-95 transition-all text-sm"
          >
            {t("Register as Doctor", "ডাক্তার হিসেবে নিবন্ধন")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Emergency banner */}
      <section className="bg-red-600 px-4 py-5">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <p className="font-bold text-white text-base">{t("Medical Emergency?", "চিকিৎসা জরুরি?")}</p>
            <p className="text-red-100 text-sm mt-0.5">{t("Call the national health helpline now", "এখনই জাতীয় স্বাস্থ্য হেল্পলাইনে কল করুন")}</p>
          </div>
          <a
            href="tel:16457"
            className="flex items-center gap-2 bg-white text-red-600 font-bold text-xl px-8 py-3 rounded-xl hover:bg-red-50 active:scale-95 transition-all flex-shrink-0"
          >
            <Phone size={20} />
            16457
          </a>
        </div>
      </section>
    </div>
  );
}
