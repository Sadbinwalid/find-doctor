"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0066CC] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg leading-none block">DoctorBD</span>
              <span className="text-xs text-gray-500 leading-none">ডাক্তার বিডি</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">
              {t("Home", "হোম")}
            </Link>
            <Link href="/doctors" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">
              {t("Find Doctors", "ডাক্তার খুঁজুন")}
            </Link>
            <Link href="/diseases" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">
              {t("Diseases", "রোগ")}
            </Link>
            <Link href="/tests" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">
              {t("Tests", "পরীক্ষা")}
            </Link>
            <Link href="/specialties" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">
              {t("Specialties", "বিশেষজ্ঞতা")}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="text-sm font-medium px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors"
            >
              {lang === "en" ? "বাং" : "EN"}
            </button>
            <button
              className="md:hidden p-1.5 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-1">
            {[
              { href: "/", en: "Home", bn: "হোম" },
              { href: "/doctors", en: "Find Doctors", bn: "ডাক্তার খুঁজুন" },
              { href: "/diseases", en: "Diseases", bn: "রোগ" },
              { href: "/tests", en: "Tests", bn: "পরীক্ষা" },
              { href: "/specialties", en: "Specialties", bn: "বিশেষজ্ঞতা" },
              { href: "/about", en: "About", bn: "আমাদের সম্পর্কে" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-2 py-2 text-sm text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 rounded-md"
              >
                {t(item.en, item.bn)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
