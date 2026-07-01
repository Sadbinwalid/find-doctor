"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Stethoscope, LayoutGrid, UserCircle, LogIn,
  X, ClipboardList, ChevronRight, MoreHorizontal,
  Globe, User, FileText,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

type ProfileSnap = { name: string; initials: string; location: string };
type PendingDoc = { appId: string; nameEn: string };

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, toggle, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const [showSheet, setShowSheet] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [profile, setProfile] = useState<ProfileSnap>({ name: "", initials: "U", location: "" });
  const [pendingDocs, setPendingDocs] = useState<PendingDoc[]>([]);

  useEffect(() => {
    if (!showSheet) return;
    try {
      const pd = localStorage.getItem("profile_data");
      if (pd) {
        const p = JSON.parse(pd);
        const name: string = p.nameEn || "";
        const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w: string) => w[0]).join("") || "U";
        setProfile({ name, initials, location: [p.districtEn, p.divisionEn].filter(Boolean).join(", ") });
      }
      const apps = localStorage.getItem("pending_doctor_registrations");
      if (apps) {
        const list: Array<{ appId: string; nameEn: string; status?: string }> = JSON.parse(apps);
        const pending = list.filter((a) => !a.status || a.status === "pending");
        setPendingDocs(pending.map((a) => ({ appId: a.appId, nameEn: a.nameEn })));
      }
    } catch {}
  }, [showSheet]);

  const close = () => setShowSheet(false);
  const closeMore = () => setShowMore(false);
  const pendingCount = pendingDocs.length;

  const staticNavItems = [
    { href: "/", icon: Home, en: "Home", bn: "হোম" },
    { href: "/doctors", icon: Stethoscope, en: "Doctors", bn: "ডাক্তার" },
    { href: "/specialties", icon: LayoutGrid, en: "Specialties", bn: "বিশেষজ্ঞ" },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-stretch h-16">

          {/* Static tabs: Home, Doctors, Specialties */}
          {staticNavItems.map(({ href, icon: Icon, en, bn }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${active ? "text-[#0066CC]" : "text-gray-400"}`}
              >
                <Icon size={21} strokeWidth={active ? 2.5 : 1.75} />
                <span className={`text-[10px] leading-none ${active ? "font-semibold" : ""}`}>{t(en, bn)}</span>
              </Link>
            );
          })}

          {/* 4th tab: Profile (auth) or Sign In (unauth) */}
          {isAuthenticated ? (
            <button
              onClick={() => setShowSheet(true)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative ${
                pathname === "/profile" ? "text-[#0066CC]" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <UserCircle size={21} strokeWidth={pathname === "/profile" ? 2.5 : 1.75} />
                {pendingCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 border border-white rounded-full" />
                )}
              </div>
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

          {/* 5th tab: More */}
          <button
            onClick={() => setShowMore(true)}
            className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors text-gray-400"
          >
            <MoreHorizontal size={21} strokeWidth={1.75} />
            <span className="text-[10px] leading-none">{t("More", "আরো")}</span>
          </button>

        </div>
      </nav>

      {/* ── Profile bottom sheet (authenticated) ── */}
      {showSheet && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/40" onClick={close} />
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-2xl shadow-2xl">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Profile card */}
            <div className="px-5 pt-3 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {profile.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      {profile.name || t("My Account", "আমার অ্যাকাউন্ট")}
                    </p>
                    {profile.location && <p className="text-xs text-gray-500 mt-0.5">{profile.location}</p>}
                    <p className="text-xs text-gray-400">{t("DoctorBD Member", "DoctorBD সদস্য")}</p>
                  </div>
                </div>
                <button onClick={close} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors flex-shrink-0">
                  <X size={17} />
                </button>
              </div>
              <button
                onClick={() => { close(); router.push("/profile"); }}
                className="w-full text-center text-sm font-semibold text-[#0066CC] border border-[#0066CC] rounded-xl py-2 hover:bg-blue-50 transition-colors"
              >
                {t("View profile", "প্রোফাইল দেখুন")}
              </button>
            </div>

            {/* Account section */}
            <div className="py-1">
              <p className="px-5 pt-3 pb-1 text-xs font-bold text-gray-900">{t("Account", "অ্যাকাউন্ট")}</p>
              <button onClick={() => { close(); router.push("/profile?edit=true"); }} className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                {t("Settings & Privacy", "সেটিংস ও গোপনীয়তা")}
              </button>
              <button onClick={() => { toggle(); }} className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                {lang === "en" ? "Language: English" : "Language: বাংলা"}
              </button>
              <button onClick={() => { close(); router.push("/terms"); }} className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                {t("Terms & Conditions", "শর্তাবলী")}
              </button>
              <button onClick={() => { close(); router.push("/privacy"); }} className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                {t("Privacy Policy", "গোপনীয়তা নীতি")}
              </button>
            </div>

            {/* Manage — admin review panel */}
            <div className="border-t border-gray-100 py-1">
              <div className="px-5 pt-3 pb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">{t("Manage", "পরিচালনা")}</p>
                {pendingCount > 0 && (
                  <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                    {pendingCount} {t("pending", "বাকি")}
                  </span>
                )}
              </div>
              {pendingCount > 0 ? (
                <div className="mx-4 mb-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <ClipboardList size={15} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{t("Doctor Applications", "ডাক্তার আবেদন")}</p>
                      <p className="text-xs text-amber-600">{pendingCount} {t("awaiting your review", "আপনার পর্যালোচনার অপেক্ষায়")}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-3 pl-1">
                    {pendingDocs.slice(0, 3).map((doc) => (
                      <div key={doc.appId} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{doc.nameEn}</span>
                      </div>
                    ))}
                    {pendingCount > 3 && (
                      <p className="text-xs text-gray-400 pl-3.5">+{pendingCount - 3} {t("more", "আরো")}</p>
                    )}
                  </div>
                  <button
                    onClick={() => { close(); router.push("/admin/doctors"); }}
                    className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[#0066CC] border border-[#0066CC] rounded-xl py-2.5 hover:bg-blue-50 transition-colors"
                  >
                    {t("Review all applications", "সব আবেদন পর্যালোচনা করুন")}
                    <ChevronRight size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { close(); router.push("/admin/doctors"); }}
                  className="w-full flex items-center justify-between px-5 py-2.5 text-sm text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  <span>{t("Doctor Applications", "ডাক্তার আবেদন")}</span>
                  <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">{t("0 pending", "০ বাকি")}</span>
                </button>
              )}
            </div>

            {/* Sign out */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => { logout(); router.push("/"); close(); }}
                className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Sign out", "সাইন আউট")}
              </button>
            </div>
            <div className="h-6" />
          </div>
        </>
      )}

      {/* ── More bottom sheet ── */}
      {showMore && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/40" onClick={closeMore} />
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-2xl shadow-2xl">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            <div className="px-5 pt-2 pb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">{t("More", "আরো")}</p>
              <button onClick={closeMore} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                <X size={17} />
              </button>
            </div>

            {/* Sign In options — only when not authenticated */}
            {!isAuthenticated && (
              <div className="px-4 pb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">
                  {t("Sign in as", "সাইন ইন করুন")}
                </p>
                <Link
                  href="/auth?role=patient"
                  onClick={closeMore}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 transition-colors mb-1"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-[#0066CC]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t("Patient", "রোগী")}</p>
                    <p className="text-xs text-gray-500">{t("Find doctors & manage health", "ডাক্তার খুঁজুন ও স্বাস্থ্য পরিচালনা করুন")}</p>
                  </div>
                  <ChevronRight size={15} className="text-gray-300 ml-auto" />
                </Link>
                <Link
                  href="/auth?role=doctor"
                  onClick={closeMore}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-green-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Stethoscope size={18} className="text-[#00A86B]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t("Doctor", "ডাক্তার")}</p>
                    <p className="text-xs text-gray-500">{t("List your practice, get verified", "প্র্যাকটিস যোগ করুন, যাচাই পান")}</p>
                  </div>
                  <ChevronRight size={15} className="text-gray-300 ml-auto" />
                </Link>
              </div>
            )}

            {/* For Doctors */}
            <div className={`border-t border-gray-100 px-4 py-2 ${!isAuthenticated ? "" : "pt-3"}`}>
              {!isAuthenticated && <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">{t("Doctors", "ডাক্তারদের জন্য")}</p>}
              <Link
                href="/register/doctor"
                onClick={closeMore}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={18} className="text-[#0066CC]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t("Register as a Doctor", "ডাক্তার হিসেবে নিবন্ধন")}</p>
                  <p className="text-xs text-gray-500">{t("Get verified and list your practice", "যাচাই পান এবং প্র্যাকটিস যোগ করুন")}</p>
                </div>
                <ChevronRight size={15} className="text-gray-300 ml-auto" />
              </Link>
            </div>

            {/* Language toggle */}
            <div className="border-t border-gray-100 px-4 py-2 pb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">{t("Language", "ভাষা")}</p>
              <button
                onClick={() => { toggle(); closeMore(); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-gray-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    {lang === "en" ? "English" : "বাংলা"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {lang === "en" ? "বাংলায় পরিবর্তন করুন" : "Switch to English"}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${lang === "en" ? "bg-[#0066CC] text-white" : "bg-gray-100 text-gray-400"}`}>EN</div>
                  <div className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${lang === "bn" ? "bg-[#0066CC] text-white" : "bg-gray-100 text-gray-400"}`}>বাং</div>
                </div>
              </button>
            </div>

            <div className="h-6" />
          </div>
        </>
      )}
    </>
  );
}
