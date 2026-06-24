"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Clock, X, Check, Users, BadgeCheck, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { doctors } from "@/data/doctors";
import { categories } from "@/data/categories";

type PendingApp = {
  appId: string;
  nameEn: string;
  nameBn?: string;
  phone: string;
  email?: string;
  gender: string;
  specialty: string;
  bmdc: string;
  qualifications: string[];
  experienceYears: string;
  hospitalEn: string;
  division: string;
  district: string;
  fee: string;
  agreed: boolean;
  submittedAt: string;
  status?: "pending" | "approved" | "rejected";
};

const PIN = "0000";

export default function AdminDoctorsPage() {
  const { t } = useLanguage();
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [tab, setTab] = useState<"all" | "pending">("pending");
  const [pending, setPending] = useState<PendingApp[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("pending_doctor_registrations");
    if (raw) setPending(JSON.parse(raw));
  }, [unlocked]);

  const tryUnlock = () => {
    if (pin === PIN) { setUnlocked(true); setPinError(false); }
    else { setPinError(true); setPin(""); }
  };

  const updateStatus = (appId: string, status: "approved" | "rejected") => {
    const updated = pending.map((p) => (p.appId === appId ? { ...p, status } : p));
    setPending(updated);
    localStorage.setItem("pending_doctor_registrations", JSON.stringify(updated));
  };

  const verifiedCount = doctors.filter((d) => d.verified).length;
  const unverifiedCount = doctors.length - verifiedCount;
  const pendingCount = pending.filter((p) => !p.status || p.status === "pending").length;

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-sm w-full shadow-sm text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={24} className="text-gray-500" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 mb-1">{t("Admin Panel", "অ্যাডমিন প্যানেল")}</h1>
          <p className="text-sm text-gray-500 mb-5">{t("Enter PIN to access", "অ্যাক্সেস করতে PIN লিখুন")}</p>
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setPinError(false); }}
            onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
            placeholder="••••"
            maxLength={4}
            className={`w-full text-center text-xl font-bold tracking-[0.5em] border rounded-lg px-3 py-3 focus:outline-none mb-3 ${
              pinError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#0066CC]"
            }`}
          />
          {pinError && <p className="text-xs text-red-500 mb-3">{t("Incorrect PIN", "ভুল PIN")}</p>}
          <button
            onClick={tryUnlock}
            className="w-full bg-[#0066CC] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            {t("Unlock", "আনলক করুন")}
          </button>
          <p className="text-xs text-gray-300 mt-3">{t("Demo PIN: 0000", "ডেমো PIN: 0000")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t("Doctor Management", "ডাক্তার ব্যবস্থাপনা")}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{t("Review registrations and manage verification status", "নিবন্ধন পর্যালোচনা করুন এবং যাচাই অবস্থা পরিচালনা করুন")}</p>
          </div>
          <Link href="/" className="text-sm text-gray-500 hover:text-[#0066CC]">{t("← Home", "← হোম")}</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: t("Total Doctors", "মোট ডাক্তার"), value: doctors.length, color: "text-gray-900" },
            { label: t("Verified", "যাচাইকৃত"), value: verifiedCount, color: "text-[#0066CC]" },
            { label: t("Unverified", "অযাচাইকৃত"), value: unverifiedCount, color: "text-gray-500" },
            { label: t("Pending Review", "পর্যালোচনা বাকি"), value: pendingCount, color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
          {(["pending", "all"] as const).map((t_) => (
            <button
              key={t_}
              onClick={() => setTab(t_)}
              className={`text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ${
                tab === t_ ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t_ === "pending" ? t("Pending Applications", "বাকি আবেদন") : t("All Doctors", "সব ডাক্তার")}
              {t_ === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 bg-amber-500 text-white text-xs w-4 h-4 rounded-full inline-flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pending Applications Tab */}
        {tab === "pending" && (
          <div>
            {pending.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users size={32} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium text-gray-600">{t("No pending applications", "কোনো বাকি আবেদন নেই")}</p>
                <p className="text-sm mt-1">{t("New doctor registrations will appear here", "নতুন ডাক্তার নিবন্ধন এখানে দেখাবে")}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {pending.map((app) => {
                  const cat = categories.find((c) => c.slug === app.specialty);
                  const isPending = !app.status || app.status === "pending";
                  return (
                    <div key={app.appId} className={`bg-white border rounded-xl p-5 ${
                      app.status === "approved" ? "border-green-200" :
                      app.status === "rejected" ? "border-red-200" :
                      "border-gray-200"
                    }`}>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{app.nameEn}</p>
                            {app.status === "approved" && (
                              <span className="flex items-center gap-1 text-xs font-medium text-[#00A86B] bg-green-50 px-2 py-0.5 rounded-full">
                                <Check size={10} /> {t("Approved", "অনুমোদিত")}
                              </span>
                            )}
                            {app.status === "rejected" && (
                              <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                <X size={10} /> {t("Rejected", "প্রত্যাখ্যাত")}
                              </span>
                            )}
                            {isPending && (
                              <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                <Clock size={10} /> {t("Pending", "বাকি")}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mt-2">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t("Specialty", "বিশেষজ্ঞতা")}</p>
                              <p className="text-xs font-medium text-gray-700">{cat ? t(cat.nameEn, cat.nameBn) : app.specialty}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">BMDC</p>
                              <p className="text-xs font-medium text-gray-700">{app.bmdc}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t("Hospital", "হাসপাতাল")}</p>
                              <p className="text-xs font-medium text-gray-700 truncate">{app.hospitalEn}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wide">{t("Location", "অবস্থান")}</p>
                              <p className="text-xs font-medium text-gray-700">{app.district}, {app.division}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {app.qualifications.map((q) => (
                              <span key={q} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{q}</span>
                            ))}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-2">
                            {t("App ID", "আবেদন আইডি")}: {app.appId} · {t("Submitted", "জমা")}: {new Date(app.submittedAt).toLocaleDateString("en-GB")}
                          </p>
                        </div>

                        {isPending && (
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => updateStatus(app.appId, "rejected")}
                              className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <X size={13} /> {t("Reject", "প্রত্যাখ্যান")}
                            </button>
                            <button
                              onClick={() => updateStatus(app.appId, "approved")}
                              className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#00A86B] px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <BadgeCheck size={13} /> {t("Approve", "অনুমোদন")}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* All Doctors Tab */}
        {tab === "all" && (
          <div className="flex flex-col gap-2">
            {doctors.map((doc) => {
              const cat = categories.find((c) => c.slug === doc.specialty);
              return (
                <div key={doc.id} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: cat?.color || "#0066CC" }}
                  >
                    {doc.nameEn.split(" ").filter((w) => w !== "Dr.").slice(0, 2).map((w) => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.nameEn}</p>
                    <p className="text-xs text-gray-500 truncate">{cat ? t(cat.nameEn, cat.nameBn) : ""} · {doc.hospitalEn}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${doc.available ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {doc.available ? t("Available", "উপলব্ধ") : t("Unavailable", "অনুপলব্ধ")}
                    </span>
                    {doc.verified ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-[#0066CC] bg-blue-50 px-2 py-0.5 rounded-full">
                        <ShieldCheck size={11} /> {t("Verified", "যাচাইকৃত")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        <AlertCircle size={11} /> {t("Unverified", "অযাচাইকৃত")}
                      </span>
                    )}
                    <Link href={`/doctors/${doc.id}`} className="text-xs text-[#0066CC] hover:underline">
                      {t("View", "দেখুন")}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
