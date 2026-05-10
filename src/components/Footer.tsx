"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#0066CC] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-bold text-gray-900">DoctorBD</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t(
                "Bangladesh's trusted platform for finding qualified doctors by specialty and location.",
                "বিশেষজ্ঞতা ও অবস্থান অনুযায়ী যোগ্য ডাক্তার খুঁজে পেতে বাংলাদেশের বিশ্বস্ত প্ল্যাটফর্ম।"
              )}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {t("Quick Links", "দ্রুত লিঙ্ক")}
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/doctors", en: "Find Doctors", bn: "ডাক্তার খুঁজুন" },
                { href: "/specialties", en: "Specialties", bn: "বিশেষজ্ঞতা" },
                { href: "/about", en: "About Us", bn: "আমাদের সম্পর্কে" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-gray-500 hover:text-[#0066CC]">
                    {t(l.en, l.bn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {t("Divisions", "বিভাগ")}
            </h4>
            <ul className="flex flex-col gap-2">
              {["Dhaka", "Chattogram", "Rajshahi", "Sylhet", "Khulna"].map((d) => (
                <li key={d}>
                  <Link href={`/doctors?division=${d}`} className="text-xs text-gray-500 hover:text-[#0066CC]">
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {t("Emergency", "জরুরি")}
            </h4>
            <p className="text-xs text-gray-500">{t("National Health Helpline", "জাতীয় স্বাস্থ্য হেল্পলাইন")}</p>
            <p className="text-xl font-bold text-[#0066CC] mt-1">16457</p>
            <p className="text-xs text-gray-400 mt-1">{t("24/7 available", "২৪/৭ উপলব্ধ")}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2025 DoctorBD · {t("Made for Bangladesh", "বাংলাদেশের জন্য তৈরি")}
          </p>
        </div>
      </div>
    </footer>
  );
}
