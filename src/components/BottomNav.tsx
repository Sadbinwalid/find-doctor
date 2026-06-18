"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Stethoscope, LayoutGrid, UserCircle, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { href: "/", icon: Home, en: "Home", bn: "হোম" },
    { href: "/doctors", icon: Stethoscope, en: "Doctors", bn: "ডাক্তার" },
    { href: "/specialties", icon: LayoutGrid, en: "Specialties", bn: "বিশেষজ্ঞ" },
    isAuthenticated
      ? { href: "/profile", icon: UserCircle, en: "Profile", bn: "প্রোফাইল" }
      : { href: "/auth", icon: LogIn, en: "Sign In", bn: "সাইন ইন" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="flex items-stretch h-16 pb-safe">
        {navItems.map(({ href, icon: Icon, en, bn }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                active ? "text-[#0066CC]" : "text-gray-400"
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.5 : 1.75} />
              <span className={`text-[10px] leading-none ${active ? "font-semibold" : ""}`}>
                {t(en, bn)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
