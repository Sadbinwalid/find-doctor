"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Stethoscope, LayoutGrid, UserCircle, LogIn,
  X, Pencil, LogOut, FileText, Shield, ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

function SheetItem({
  icon,
  iconBg,
  label,
  labelClass = "text-gray-800",
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  labelClass?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${labelClass}`}>{label}</span>
      </div>
      <ChevronRight size={15} className="text-gray-300" />
    </button>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [showSheet, setShowSheet] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("U");

  useEffect(() => {
    if (!showSheet) return;
    const pd = localStorage.getItem("profile_data");
    if (pd) {
      try {
        const parsed = JSON.parse(pd);
        const name: string = parsed.nameEn || "";
        setUserName(name);
        const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w: string) => w[0]).join("");
        setUserInitials(initials || "U");
      } catch {
        // ignore parse errors
      }
    }
  }, [showSheet]);

  const staticNavItems = [
    { href: "/", icon: Home, en: "Home", bn: "হোম" },
    { href: "/doctors", icon: Stethoscope, en: "Doctors", bn: "ডাক্তার" },
    { href: "/specialties", icon: LayoutGrid, en: "Specialties", bn: "বিশেষজ্ঞ" },
  ];

  const close = () => setShowSheet(false);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-stretch h-16">
          {staticNavItems.map(({ href, icon: Icon, en, bn }) => {
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

          {isAuthenticated ? (
            <button
              onClick={() => setShowSheet(true)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                pathname === "/profile" ? "text-[#0066CC]" : "text-gray-400"
              }`}
            >
              <UserCircle size={21} strokeWidth={pathname === "/profile" ? 2.5 : 1.75} />
              <span className={`text-[10px] leading-none ${pathname === "/profile" ? "font-semibold" : ""}`}>
                {t("Profile", "প্রোফাইল")}
              </span>
            </button>
          ) : (
            <Link
              href="/auth"
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                pathname === "/auth" ? "text-[#0066CC]" : "text-gray-400"
              }`}
            >
              <LogIn size={21} strokeWidth={pathname === "/auth" ? 2.5 : 1.75} />
              <span className={`text-[10px] leading-none ${pathname === "/auth" ? "font-semibold" : ""}`}>
                {t("Sign In", "সাইন ইন")}
              </span>
            </Link>
          )}
        </div>
      </nav>

      {/* Profile bottom sheet */}
      {showSheet && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={close}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-2xl shadow-2xl">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Mini profile header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {userInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {userName || t("My Account", "আমার অ্যাকাউন্ট")}
                  </p>
                  <p className="text-xs text-gray-400">{t("DoctorBD Member", "DoctorBD সদস্য")}</p>
                </div>
              </div>
              <button
                onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* Menu items */}
            <div className="px-3 py-2">
              <SheetItem
                icon={<UserCircle size={17} className="text-[#0066CC]" />}
                iconBg="bg-blue-50"
                label={t("View Profile", "প্রোফাইল দেখুন")}
                onClick={() => { close(); router.push("/profile"); }}
              />
              <SheetItem
                icon={<Pencil size={15} className="text-[#0066CC]" />}
                iconBg="bg-blue-50"
                label={t("Edit Profile", "প্রোফাইল সম্পাদনা")}
                onClick={() => { close(); router.push("/profile?edit=true"); }}
              />

              <div className="my-1 h-px bg-gray-100 mx-2" />

              <SheetItem
                icon={<FileText size={15} className="text-gray-500" />}
                iconBg="bg-gray-100"
                label={t("Terms & Conditions", "শর্তাবলী")}
                onClick={() => { close(); router.push("/terms"); }}
              />
              <SheetItem
                icon={<Shield size={15} className="text-gray-500" />}
                iconBg="bg-gray-100"
                label={t("Privacy Policy", "গোপনীয়তা নীতি")}
                onClick={() => { close(); router.push("/privacy"); }}
              />

              <div className="my-1 h-px bg-gray-100 mx-2" />

              <SheetItem
                icon={<LogOut size={15} className="text-red-500" />}
                iconBg="bg-red-50"
                label={t("Sign Out", "সাইন আউট")}
                labelClass="text-red-500"
                onClick={() => { logout(); router.push("/"); close(); }}
              />
            </div>

            {/* Safe area spacing */}
            <div className="h-6" />
          </div>
        </>
      )}
    </>
  );
}
