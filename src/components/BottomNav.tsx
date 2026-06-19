"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Stethoscope, LayoutGrid, UserCircle, LogIn, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

type ProfileSnap = { name: string; initials: string; location: string };
type DoctorSnap = { appId: string; status?: "pending" | "approved" | "rejected" } | null;

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, toggle, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();

  const [showSheet, setShowSheet] = useState(false);
  const [profile, setProfile] = useState<ProfileSnap>({ name: "", initials: "U", location: "" });
  const [doctorApp, setDoctorApp] = useState<DoctorSnap>(null);

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
        const list = JSON.parse(apps);
        if (list.length > 0) {
          const latest = [...list].sort(
            (a: { submittedAt: string }, b: { submittedAt: string }) =>
              new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          )[0];
          setDoctorApp({ appId: latest.appId, status: latest.status });
        }
      }
    } catch {}
  }, [showSheet]);

  const close = () => setShowSheet(false);

  const doctorStatusLabel =
    doctorApp?.status === "approved" ? t("Approved", "অনুমোদিত") :
    doctorApp?.status === "rejected" ? t("Rejected", "প্রত্যাখ্যাত") :
    t("Under Review", "পর্যালোচনায়");

  const doctorStatusColor =
    doctorApp?.status === "approved" ? "text-green-700 bg-green-50" :
    doctorApp?.status === "rejected" ? "text-red-500 bg-red-50" :
    "text-amber-600 bg-amber-50";

  const staticNavItems = [
    { href: "/", icon: Home, en: "Home", bn: "হোম" },
    { href: "/doctors", icon: Stethoscope, en: "Doctors", bn: "ডাক্তার" },
    { href: "/specialties", icon: LayoutGrid, en: "Specialties", bn: "বিশেষজ্ঞ" },
  ];

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
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${active ? "text-[#0066CC]" : "text-gray-400"}`}
              >
                <Icon size={21} strokeWidth={active ? 2.5 : 1.75} />
                <span className={`text-[10px] leading-none ${active ? "font-semibold" : ""}`}>{t(en, bn)}</span>
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

      {/* Profile sheet — LinkedIn style */}
      {showSheet && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/40" onClick={close} />
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-2xl shadow-2xl">

            {/* Drag handle */}
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
                    {profile.location && (
                      <p className="text-xs text-gray-500 mt-0.5">{profile.location}</p>
                    )}
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
            <div className="py-2">
              <p className="px-5 pt-2 pb-1 text-xs font-bold text-gray-900">
                {t("Account", "অ্যাকাউন্ট")}
              </p>
              <button
                onClick={() => { close(); router.push("/profile?edit=true"); }}
                className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Settings & Privacy", "সেটিংস ও গোপনীয়তা")}
              </button>
              <button
                onClick={() => { toggle(); close(); }}
                className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Language: English", "Language: বাংলা")}
              </button>
              <button
                onClick={() => { close(); router.push("/terms"); }}
                className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Terms & Conditions", "শর্তাবলী")}
              </button>
              <button
                onClick={() => { close(); router.push("/privacy"); }}
                className="w-full text-left px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Privacy Policy", "গোপনীয়তা নীতি")}
              </button>
            </div>

            {/* Doctor verification status */}
            {doctorApp && (
              <div className="border-t border-gray-100 py-2">
                <p className="px-5 pt-2 pb-1 text-xs font-bold text-gray-900">
                  {t("Manage", "পরিচালনা")}
                </p>
                <div className="px-5 py-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t("Doctor Verification", "ডাক্তার যাচাইকরণ")}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${doctorStatusColor}`}>
                    {doctorStatusLabel}
                  </span>
                </div>
              </div>
            )}

            {/* Sign out */}
            <div className="border-t border-gray-100 py-2">
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
    </>
  );
}
