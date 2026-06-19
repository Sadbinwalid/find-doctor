"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { LogIn, ChevronDown } from "lucide-react";

type ProfileSnap = {
  name: string;
  initials: string;
  location: string;
};

type DoctorSnap = {
  appId: string;
  status?: "pending" | "approved" | "rejected";
} | null;

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileSnap>({ name: "", initials: "U", location: "" });
  const [doctorApp, setDoctorApp] = useState<DoctorSnap>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Load profile data whenever auth state changes (so initials show in trigger button)
  useEffect(() => {
    if (!isAuthenticated) return;
    try {
      const pd = localStorage.getItem("profile_data");
      if (pd) {
        const p = JSON.parse(pd);
        const name: string = p.nameEn || "";
        const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w: string) => w[0]).join("") || "U";
        const location = [p.districtEn, p.divisionEn].filter(Boolean).join(", ");
        setProfile({ name, initials, location });
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
  }, [isAuthenticated]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const close = () => setOpen(false);

  const doctorStatusLabel =
    doctorApp?.status === "approved" ? t("Approved", "অনুমোদিত") :
    doctorApp?.status === "rejected" ? t("Rejected", "প্রত্যাখ্যাত") :
    t("Under Review", "পর্যালোচনায়");

  const doctorStatusColor =
    doctorApp?.status === "approved" ? "text-green-700 bg-green-50" :
    doctorApp?.status === "rejected" ? "text-red-500 bg-red-50" :
    "text-amber-600 bg-amber-50";

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

          {/* Desktop nav links */}
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

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/register/doctor"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-[#0066CC] text-white hover:bg-blue-700 transition-colors"
            >
              {t("For Doctors", "ডাক্তারদের জন্য")}
            </Link>

            {isAuthenticated ? (
              /* ── Profile dropdown (desktop) ── */
              <div className="relative hidden md:block" ref={wrapRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-xs">
                    {profile.initials}
                  </div>
                  <ChevronDown
                    size={13}
                    className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel — LinkedIn style */}
                {open && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] overflow-hidden">

                    {/* Profile card */}
                    <div className="p-4 pb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {profile.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 leading-snug truncate">
                            {profile.name || t("My Account", "আমার অ্যাকাউন্ট")}
                          </p>
                          {profile.location && (
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{profile.location}</p>
                          )}
                          <p className="text-xs text-gray-400">{t("DoctorBD Member", "DoctorBD সদস্য")}</p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        onClick={close}
                        className="block w-full text-center text-sm font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg py-1.5 hover:bg-blue-50 transition-colors"
                      >
                        {t("View profile", "প্রোফাইল দেখুন")}
                      </Link>
                    </div>

                    {/* Account section */}
                    <div className="border-t border-gray-100 py-1.5">
                      <p className="px-4 pt-1.5 pb-1 text-xs font-bold text-gray-900">
                        {t("Account", "অ্যাকাউন্ট")}
                      </p>
                      <Link
                        href="/profile?edit=true"
                        onClick={close}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {t("Settings & Privacy", "সেটিংস ও গোপনীয়তা")}
                      </Link>
                      <button
                        onClick={() => { toggle(); close(); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {t("Language: English", "Language: বাংলা")}
                      </button>
                      <Link
                        href="/terms"
                        onClick={close}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {t("Terms & Conditions", "শর্তাবলী")}
                      </Link>
                      <Link
                        href="/privacy"
                        onClick={close}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {t("Privacy Policy", "গোপনীয়তা নীতি")}
                      </Link>
                    </div>

                    {/* Doctor verification status (if applicable) */}
                    {doctorApp && (
                      <div className="border-t border-gray-100 py-1.5">
                        <p className="px-4 pt-1.5 pb-1 text-xs font-bold text-gray-900">
                          {t("Manage", "পরিচালনা")}
                        </p>
                        <div className="px-4 py-2 flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {t("Doctor Verification", "ডাক্তার যাচাইকরণ")}
                          </span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${doctorStatusColor}`}>
                            {doctorStatusLabel}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Sign out */}
                    <div className="border-t border-gray-100 py-1.5">
                      <button
                        onClick={() => { logout(); router.push("/"); close(); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {t("Sign out", "সাইন আউট")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth"
                  className={`hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                    pathname === "/auth"
                      ? "bg-[#0066CC] text-white"
                      : "border border-gray-200 text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC]"
                  }`}
                >
                  <LogIn size={14} />
                  {t("Sign In", "সাইন ইন")}
                </Link>

                {/* Language toggle only for logged-out users; logged-in users use dropdown */}
                <button
                  onClick={toggle}
                  className="hidden md:block text-sm font-medium px-3 py-1.5 border border-gray-200 rounded-md text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors"
                >
                  {lang === "en" ? "বাং" : "EN"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
