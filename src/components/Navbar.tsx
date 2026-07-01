"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { LogIn, ChevronDown, ClipboardList, User, Stethoscope } from "lucide-react";

type ProfileSnap = { name: string; initials: string; location: string };
type PendingDoc = { appId: string; nameEn: string };

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileSnap>({ name: "", initials: "U", location: "" });
  const [pendingDocs, setPendingDocs] = useState<PendingDoc[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
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
  }, [isAuthenticated]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  useEffect(() => {
    if (!signInOpen) return;
    const handle = (e: MouseEvent) => {
      if (signInRef.current && !signInRef.current.contains(e.target as Node)) setSignInOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [signInOpen]);

  const close = () => setOpen(false);
  const pendingCount = pendingDocs.length;
  const previewDocs = pendingDocs.slice(0, 2);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0066CC] to-[#0052a3] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <Stethoscope size={19} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-[17px] tracking-tight leading-none">
              <span className="font-medium text-gray-800">Doctor</span><span className="font-bold text-[#0066CC]">BD</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { href: "/", en: "Home", bn: "হোম" },
              { href: "/doctors", en: "Find Doctors", bn: "ডাক্তার খুঁজুন" },
              { href: "/specialties", en: "Specialties", bn: "বিশেষজ্ঞতা" },
              { href: "/about", en: "About", bn: "আমাদের সম্পর্কে" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href ? "text-[#0066CC] font-medium" : "text-gray-600 hover:text-[#0066CC]"
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
              <div className="relative hidden md:block" ref={wrapRef}>
                {/* Avatar trigger with notification dot */}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-xs">
                      {profile.initials}
                    </div>
                    {pendingCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <ChevronDown
                    size={13}
                    className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {open && (
                  <div className="absolute right-0 top-full mt-2 w-76 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[100] overflow-hidden" style={{ width: "300px" }}>

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
                      <Link href="/profile?edit=true" onClick={close} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        {t("Settings & Privacy", "সেটিংস ও গোপনীয়তা")}
                      </Link>
                      <button onClick={() => { toggle(); close(); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        {t("Language: English", "Language: বাংলা")}
                      </button>
                      <Link href="/terms" onClick={close} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        {t("Terms & Conditions", "শর্তাবলী")}
                      </Link>
                      <Link href="/privacy" onClick={close} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        {t("Privacy Policy", "গোপনীয়তা নীতি")}
                      </Link>
                    </div>

                    {/* Manage section — admin review panel */}
                    <div className="border-t border-gray-100 py-1.5">
                      <div className="px-4 pt-1.5 pb-2 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-900">{t("Manage", "পরিচালনা")}</p>
                        {pendingCount > 0 && (
                          <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                            {pendingCount} {t("pending", "বাকি")}
                          </span>
                        )}
                      </div>

                      {pendingCount > 0 ? (
                        <div className="mx-3 mb-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardList size={13} className="text-amber-600 flex-shrink-0" />
                            <p className="text-xs font-semibold text-amber-800">
                              {t("Doctor Applications", "ডাক্তার আবেদন")}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 mb-2.5">
                            {previewDocs.map((doc) => (
                              <div key={doc.appId} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                                <span className="text-xs text-gray-700 truncate">{doc.nameEn}</span>
                              </div>
                            ))}
                            {pendingCount > 2 && (
                              <p className="text-xs text-gray-400 pl-2.5">
                                +{pendingCount - 2} {t("more", "আরো")}
                              </p>
                            )}
                          </div>
                          <Link
                            href="/admin/doctors"
                            onClick={close}
                            className="block w-full text-center text-xs font-semibold text-[#0066CC] border border-[#0066CC] rounded-lg py-1.5 hover:bg-blue-50 transition-colors"
                          >
                            {t("Review all →", "সব দেখুন →")}
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href="/admin/doctors"
                          onClick={close}
                          className="flex items-center justify-between px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 transition-colors"
                        >
                          <span>{t("Doctor Applications", "ডাক্তার আবেদন")}</span>
                          <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                            {t("0 pending", "০ বাকি")}
                          </span>
                        </Link>
                      )}
                    </div>

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
                {/* Sign In dropdown */}
                <div className="relative hidden md:block" ref={signInRef}>
                  <button
                    onClick={() => setSignInOpen((v) => !v)}
                    className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                      pathname === "/auth"
                        ? "bg-[#0066CC] text-white"
                        : "border border-gray-200 text-gray-600 hover:border-[#0066CC] hover:text-[#0066CC]"
                    }`}
                  >
                    <LogIn size={14} />
                    {t("Sign In", "সাইন ইন")}
                    <ChevronDown size={12} className={`transition-transform duration-200 ${signInOpen ? "rotate-180" : ""}`} />
                  </button>

                  {signInOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden py-1.5">
                      <p className="px-4 pt-1.5 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                        {t("Sign in as", "সাইন ইন করুন")}
                      </p>
                      <Link
                        href="/auth?role=patient"
                        onClick={() => setSignInOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0066CC] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <User size={14} className="text-[#0066CC]" />
                        </div>
                        <div>
                          <p className="font-medium leading-none">{t("Patient", "রোগী")}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{t("Find doctors", "ডাক্তার খুঁজুন")}</p>
                        </div>
                      </Link>
                      <Link
                        href="/auth?role=doctor"
                        onClick={() => setSignInOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#00A86B] transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Stethoscope size={14} className="text-[#00A86B]" />
                        </div>
                        <div>
                          <p className="font-medium leading-none">{t("Doctor", "ডাক্তার")}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{t("List your practice", "প্র্যাকটিস যোগ করুন")}</p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

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
