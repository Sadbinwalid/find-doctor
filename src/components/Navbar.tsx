"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const pathname = usePathname();

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
            {[
              { href: "/", en: "Home", bn: "হোম" },
              { href: "/doctors", en: "Find Doctors", bn: "ডাক্তার খুঁজুন" },
              { href: "/specialties", en: "Specialties", bn: "বিশেষজ্ঞতা" },
              { href: "/about", en: "About", bn: "আমাদের সম্পর্কে" },
              { href: "/verify", en: "Verification", bn: "যাচাইকরণ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href
                    ? "text-[#0066CC] font-medium"
                    : "text-gray-600 hover:text-[#0066CC]"
                }`}
              >
                {t(item.en, item.bn)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/register/doctor"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-[#0066CC] text-white hover:bg-blue-700 transition-colors"
            >
              {t("For Doctors", "ডাক্তারদের জন্য")}
            </Link>
            <Link
              href="/profile"
              className={`hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                pathname === "/profile"
                  ? "bg-[#0066CC] text-white"
                  : "border border-gray-200 text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC]"
              }`}
            >
              <UserCircle size={15} />
              {t("Profile", "প্রোফাইল")}
            </Link>
            <button
              onClick={toggle}
              className="text-sm font-medium px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors"
            >
              {lang === "en" ? "বাং" : "EN"}
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}
