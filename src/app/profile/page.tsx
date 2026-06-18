"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin, Phone, Star, Heart, Calendar,
  ChevronRight, Stethoscope, Clock, CheckCircle, XCircle, History, Pencil, X, Plus, LogOut,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { doctors } from "@/data/doctors";
import { categories } from "@/data/categories";

const SAVED_DOCTOR_IDS = ["1", "4", "10"];
const PREFERRED_SPECIALTIES = ["cardiologist", "pediatrician", "ophthalmologist", "general-physician"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const APPOINTMENTS = [
  { doctorId: "14", date: "2026-05-20", status: "completed" },
  { doctorId: "4",  date: "2026-05-10", status: "completed" },
  { doctorId: "7",  date: "2026-04-28", status: "cancelled" },
  { doctorId: "10", date: "2026-04-15", status: "completed" },
  { doctorId: "3",  date: "2026-03-30", status: "cancelled" },
  { doctorId: "1",  date: "2026-03-10", status: "completed" },
  { doctorId: "11", date: "2026-02-20", status: "completed" },
];

const DEFAULT_PROFILE = {
  nameEn: "Rajib Raju",
  age: 28,
  bloodGroup: "B+",
  divisionEn: "Dhaka",
  districtEn: "Dhaka",
  phone: "01712-000000",
  memberSince: "2024",
  conditions: ["Hypertension", "Seasonal Allergies"],
};

type ProfileData = typeof DEFAULT_PROFILE;

function formatDate(dateStr: string, lang: "en" | "bn") {
  const date = new Date(dateStr);
  if (lang === "bn") {
    return date.toLocaleDateString("bn-BD", { day: "numeric", month: "short", year: "numeric" });
  }
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ProfilePage() {
  const { t, lang } = useLanguage();
  const { logout } = useAuth();
  const router = useRouter();
  const [recentlyVisited, setRecentlyVisited] = useState<string[]>([]);
  const [showAllAppts, setShowAllAppts] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileData>(DEFAULT_PROFILE);
  const [newCondition, setNewCondition] = useState("");

  useEffect(() => {
    const rv = localStorage.getItem("recently_visited");
    if (rv) setRecentlyVisited(JSON.parse(rv));
    const pd = localStorage.getItem("profile_data");
    if (pd) {
      const parsed = JSON.parse(pd);
      setProfile(parsed);
      setForm(parsed);
    }
  }, []);

  const openEdit = () => {
    setForm({ ...profile });
    setNewCondition("");
    setEditing(true);
  };

  const saveEdit = () => {
    setProfile(form);
    localStorage.setItem("profile_data", JSON.stringify(form));
    setEditing(false);
  };

  const addCondition = () => {
    const val = newCondition.trim();
    if (!val || form.conditions.includes(val)) return;
    setForm((f) => ({ ...f, conditions: [...f.conditions, val] }));
    setNewCondition("");
  };

  const removeCondition = (c: string) => {
    setForm((f) => ({ ...f, conditions: f.conditions.filter((x) => x !== c) }));
  };

  const savedDoctors = doctors.filter((d) => SAVED_DOCTOR_IDS.includes(d.id));
  const preferredCategories = categories.filter((c) => PREFERRED_SPECIALTIES.includes(c.slug));
  const recentDoctors = recentlyVisited
    .map((id) => doctors.find((d) => d.id === id))
    .filter(Boolean) as typeof doctors;

  const completedAppts = APPOINTMENTS.filter((a) => a.status === "completed");
  const cancelledCount = APPOINTMENTS.filter((a) => a.status === "cancelled").length;
  const totalSpent = completedAppts.reduce((sum, a) => {
    const doc = doctors.find((d) => d.id === a.doctorId);
    return sum + (doc?.fee ?? 0);
  }, 0);
  const visibleAppts = showAllAppts ? APPOINTMENTS : APPOINTMENTS.slice(0, 3);
  const initials = profile.nameEn.split(" ").slice(0, 2).map((w) => w[0]).join("");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900">{profile.nameEn}</h1>
              <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                <MapPin size={13} />
                <span>{profile.districtEn}, {profile.divisionEn}</span>
              </div>
              {/* Basic info tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs bg-red-50 text-red-600 font-semibold px-2.5 py-1 rounded-full">
                  {t("Blood", "রক্ত")} {profile.bloodGroup}
                </span>
                <span className="text-xs bg-blue-50 text-[#0066CC] px-2.5 py-1 rounded-full">
                  {t(`Age ${profile.age}`, `বয়স ${profile.age}`)}
                </span>
                <div className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                  <Phone size={11} />
                  <span>{profile.phone}</span>
                </div>
              </div>
              {/* Conditions row */}
              {profile.conditions.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400 font-medium">{t("Conditions:", "অবস্থা:")}</span>
                  {profile.conditions.map((c) => (
                    <span key={c} className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
            <div className="text-center">
              <p className="font-bold text-gray-900">{APPOINTMENTS.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t("Appointments", "অ্যাপয়েন্টমেন্ট")}</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="font-bold text-[#0066CC]">{savedDoctors.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t("Saved Doctors", "সংরক্ষিত ডাক্তার")}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-red-500">{cancelledCount}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t("Cancelled", "বাতিল")}</p>
            </div>
          </div>

          {/* Card footer: member since + edit button */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              {t(`Member since ${profile.memberSince}`, `${profile.memberSince} থেকে সদস্য`)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={openEdit}
                className="flex items-center gap-1.5 text-xs font-medium text-[#0066CC] border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Pencil size={12} />
                {t("Edit Profile", "প্রোফাইল সম্পাদনা")}
              </button>
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="flex items-center gap-1.5 text-xs font-medium text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut size={12} />
                {t("Sign Out", "সাইন আউট")}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="md:col-span-2 flex flex-col gap-5">

            {/* Appointment History */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar size={16} className="text-[#0066CC]" />
                  {t("Appointment History", "অ্যাপয়েন্টমেন্টের ইতিহাস")}
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                {visibleAppts.map((appt, i) => {
                  const doc = doctors.find((d) => d.id === appt.doctorId);
                  const cat = categories.find((c) => c.slug === doc?.specialty);
                  if (!doc) return null;
                  const docInitials = doc.nameEn
                    .split(" ").filter((w) => w !== "Dr.").slice(0, 2).map((w) => w[0]).join("");
                  return (
                    <Link
                      key={i}
                      href={`/doctors/${doc.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#0066CC] hover:bg-blue-50 transition-colors"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                        style={{ backgroundColor: cat?.color || "#0066CC" }}
                      >
                        {docInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{t(doc.nameEn, doc.nameBn)}</p>
                        <p className="text-xs text-gray-500">{cat ? t(cat.nameEn, cat.nameBn) : ""} · {formatDate(appt.date, lang as "en" | "bn")}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {appt.status === "completed" ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-[#00A86B] bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle size={11} />
                            {t("Done", "সম্পন্ন")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-50 px-2 py-0.5 rounded-full">
                            <XCircle size={11} />
                            {t("Cancelled", "বাতিল")}
                          </span>
                        )}
                        {appt.status === "completed" && (
                          <span className="text-xs font-semibold text-[#0066CC]">৳{doc.fee}</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              {APPOINTMENTS.length > 3 && (
                <button
                  onClick={() => setShowAllAppts((v) => !v)}
                  className="mt-3 w-full text-sm text-[#0066CC] font-medium py-2 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
                >
                  {showAllAppts
                    ? t("Show less", "কম দেখুন")
                    : t(`View ${APPOINTMENTS.length - 3} more`, `আরও ${APPOINTMENTS.length - 3}টি দেখুন`)}
                </button>
              )}
            </div>

            {/* Recently Visited */}
            {recentDoctors.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <History size={16} className="text-gray-500" />
                    {t("Recently Visited", "সম্প্রতি দেখা")}
                  </h2>
                  <Link href="/doctors" className="text-xs text-[#0066CC] hover:underline flex items-center gap-0.5">
                    {t("View all", "সব দেখুন")} <ChevronRight size={13} />
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  {recentDoctors.map((doc) => {
                    const cat = categories.find((c) => c.slug === doc.specialty);
                    const docInitials = doc.nameEn
                      .split(" ").filter((w) => w !== "Dr.").slice(0, 2).map((w) => w[0]).join("");
                    return (
                      <Link
                        key={doc.id}
                        href={`/doctors/${doc.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#0066CC] hover:bg-blue-50 transition-colors"
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                          style={{ backgroundColor: cat?.color || "#0066CC" }}
                        >
                          {docInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{t(doc.nameEn, doc.nameBn)}</p>
                          <p className="text-xs text-gray-500">{cat ? t(cat.nameEn, cat.nameBn) : ""} · {t(doc.hospitalEn, doc.hospitalBn)}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs text-gray-600">{doc.rating}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Saved Doctors */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Heart size={16} className="text-red-500" />
                  {t("Saved Doctors", "সংরক্ষিত ডাক্তার")}
                </h2>
                <Link href="/doctors" className="text-xs text-[#0066CC] hover:underline flex items-center gap-0.5">
                  {t("View all", "সব দেখুন")} <ChevronRight size={13} />
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                {savedDoctors.map((doc) => {
                  const cat = categories.find((c) => c.slug === doc.specialty);
                  const docInitials = doc.nameEn
                    .split(" ").filter((w) => w !== "Dr.").slice(0, 2).map((w) => w[0]).join("");
                  return (
                    <Link
                      key={doc.id}
                      href={`/doctors/${doc.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#0066CC] hover:bg-blue-50 transition-colors"
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
                        style={{ backgroundColor: cat?.color || "#0066CC" }}
                      >
                        {docInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{t(doc.nameEn, doc.nameBn)}</p>
                        <p className="text-xs text-gray-500 truncate">{cat ? t(cat.nameEn, cat.nameBn) : ""} · {t(doc.hospitalEn, doc.hospitalBn)}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs text-gray-600">{doc.rating}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${doc.available ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                          {doc.available ? t("Available", "উপলব্ধ") : t("Unavailable", "অনুপলব্ধ")}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Preferred Specialties */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Stethoscope size={16} className="text-[#0066CC]" />
                {t("Preferred Specialties", "পছন্দের বিশেষজ্ঞতা")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {preferredCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:opacity-80"
                    style={{ color: cat.color, backgroundColor: cat.bgColor, borderColor: cat.bgColor }}
                  >
                    {t(cat.nameEn, cat.nameBn)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">

            {/* Spend Summary */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs text-[#0066CC] font-medium flex items-center gap-1.5">
                <Clock size={13} />
                {t("Spend Summary", "খরচের সারসংক্ষেপ")}
              </p>
              <p className="text-3xl font-bold text-[#0066CC] mt-1">৳{totalSpent.toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-0.5">
                {t(`across ${completedAppts.length} completed visits`, `${completedAppts.length}টি সম্পন্ন ভিজিট`)}
              </p>
              <div className="mt-3 pt-3 border-t border-blue-200 flex justify-between text-xs text-blue-700">
                <span>{t("Avg. per visit", "প্রতি ভিজিটে গড়")}</span>
                <span className="font-semibold">৳{Math.round(totalSpent / completedAppts.length).toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ChevronRight size={16} className="text-[#0066CC]" />
                {t("Quick Actions", "দ্রুত অ্যাকশন")}
              </h2>
              <div className="flex flex-col gap-2">
                <Link
                  href="/doctors"
                  className="text-sm text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center justify-between transition-colors"
                >
                  {t("Find a Doctor", "ডাক্তার খুঁজুন")}
                  <ChevronRight size={14} />
                </Link>
                <Link
                  href="/specialties"
                  className="text-sm text-gray-700 hover:text-[#0066CC] hover:bg-blue-50 px-3 py-2 rounded-lg flex items-center justify-between transition-colors"
                >
                  {t("Browse Specialties", "বিশেষজ্ঞতা দেখুন")}
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">{t("Edit Profile", "প্রোফাইল সম্পাদনা")}</h2>
              <button onClick={() => setEditing(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Full Name", "পুরো নাম")}</label>
                <input
                  type="text"
                  value={form.nameEn}
                  onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Age", "বয়স")}</label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={form.age}
                    onChange={(e) => setForm((f) => ({ ...f, age: Number(e.target.value) }))}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Blood Group", "রক্তের গ্রুপ")}</label>
                  <select
                    value={form.bloodGroup}
                    onChange={(e) => setForm((f) => ({ ...f, bloodGroup: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Division", "বিভাগ")}</label>
                  <input
                    type="text"
                    value={form.divisionEn}
                    onChange={(e) => setForm((f) => ({ ...f, divisionEn: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("District", "জেলা")}</label>
                  <input
                    type="text"
                    value={form.districtEn}
                    onChange={(e) => setForm((f) => ({ ...f, districtEn: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Phone", "ফোন")}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Conditions", "অবস্থা")}</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.conditions.map((c) => (
                    <span key={c} className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                      {c}
                      <button onClick={() => removeCondition(c)} className="hover:text-red-500">
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t("Add condition…", "অবস্থা যোগ করুন…")}
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCondition()}
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0066CC]"
                  />
                  <button
                    onClick={addCondition}
                    className="px-3 py-2 rounded-lg bg-blue-50 text-[#0066CC] hover:bg-blue-100 transition-colors"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 text-sm font-medium py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Cancel", "বাতিল")}
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 text-sm font-medium py-2.5 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 transition-colors"
              >
                {t("Save Changes", "পরিবর্তন সংরক্ষণ")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
