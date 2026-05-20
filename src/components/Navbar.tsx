"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", en: "Home", bn: "হোম" },
    { href: "/doctors", en: "Find Doctors", bn: "ডাক্তার খুঁজুন" },
    { href: "/diseases", en: "Diseases", bn: "রোগ" },
    { href: "/tests", en: "Tests", bn: "পরীক্ষা" },
    { href: "/specialties", en: "Specialties", bn: "বিশেষজ্ঞতা" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C84B31] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ড</span>
            </div>
            <span className="font-bold text-gray-900 text-base">DoctorBD</span>
          </Link>

          {/* Desktop Nav — tab style */}
          <div className="hidden md:flex items-center h-14">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 h-14 flex items-center text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-[#C84B31]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {t(link.en, link.bn)}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C84B31] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle — EN | বাং style */}
            <div className="hidden md:flex items-center gap-1 text-sm">
              <button
                onClick={lang === "bn" ? toggle : undefined}
                className={`px-2 py-1 rounded transition-colors ${lang === "en" ? "font-semibold text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={lang === "en" ? toggle : undefined}
                className={`px-2 py-1 rounded transition-colors ${lang === "bn" ? "font-semibold text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
              >
                বাং
              </button>
            </div>

            {/* Mobile menu */}
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
          <div className="md:hidden border-t border-gray-100 py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 text-sm rounded-lg ${
                  isActive(link.href)
                    ? "text-[#C84B31] font-medium bg-red-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {t(link.en, link.bn)}
              </Link>
            ))}
            <div className="flex items-center gap-1 px-3 py-2 mt-1 border-t border-gray-100 text-sm">
              <button onClick={lang === "bn" ? toggle : undefined} className={lang === "en" ? "font-semibold text-gray-900" : "text-gray-400"}>EN</button>
              <span className="text-gray-300 mx-1">|</span>
              <button onClick={lang === "en" ? toggle : undefined} className={lang === "bn" ? "font-semibold text-gray-900" : "text-gray-400"}>বাং</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
