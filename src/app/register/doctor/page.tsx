"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, CheckCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import { locations } from "@/data/locations";

type FormData = {
  nameEn: string;
  nameBn: string;
  phone: string;
  email: string;
  gender: string;
  specialty: string;
  bmdc: string;
  qualifications: string[];
  experienceYears: string;
  hospitalEn: string;
  hospitalBn: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  fee: string;
  agreed: boolean;
};

const BLANK: FormData = {
  nameEn: "", nameBn: "", phone: "", email: "", gender: "",
  specialty: "", bmdc: "", qualifications: [], experienceYears: "",
  hospitalEn: "", hospitalBn: "", division: "", district: "", upazila: "", address: "", fee: "",
  agreed: false,
};

const STEPS = ["Personal Info", "Professional", "Hospital", "Documents"];

export default function DoctorRegisterPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(BLANK);
  const [qualInput, setQualInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [appId] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));

  const set = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [field]: value }));

  const addQual = () => {
    const v = qualInput.trim();
    if (!v || form.qualifications.includes(v)) return;
    set("qualifications", [...form.qualifications, v]);
    setQualInput("");
  };

  const removeQual = (q: string) =>
    set("qualifications", form.qualifications.filter((x) => x !== q));

  const districts = form.division
    ? (locations.find((l) => l.division === form.division)?.districts ?? [])
    : [];
  const upazilas = form.district
    ? (districts.find((d) => d.name === form.district)?.upazilas ?? [])
    : [];

  const canNext = () => {
    if (step === 1) return form.nameEn.trim() && form.phone.trim() && form.gender;
    if (step === 2) return form.specialty && form.bmdc.trim() && form.qualifications.length > 0 && form.experienceYears;
    if (step === 3) return form.hospitalEn.trim() && form.division && form.district && form.fee;
    if (step === 4) return form.agreed;
    return false;
  };

  const handleSubmit = () => {
    const pending = JSON.parse(localStorage.getItem("pending_doctor_registrations") || "[]");
    pending.push({ ...form, appId, submittedAt: new Date().toISOString() });
    localStorage.setItem("pending_doctor_registrations", JSON.stringify(pending));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#00A86B]" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{t("Application Submitted!", "আবেদন জমা দেওয়া হয়েছে!")}</h1>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {t(
              "Your registration has been received. Our verification team will review your information and contact you within 3–5 business days.",
              "আপনার নিবন্ধন পাওয়া গেছে। আমাদের যাচাইকরণ দল ৩–৫ কার্যদিবসের মধ্যে আপনার তথ্য পর্যালোচনা করে যোগাযোগ করবে।"
            )}
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-gray-500">{t("Application ID", "আবেদন আইডি")}</p>
            <p className="text-2xl font-bold text-[#0066CC] tracking-widest mt-0.5">{appId}</p>
          </div>
          <Link
            href="/"
            className="w-full inline-block text-sm font-semibold py-2.5 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 transition-colors"
          >
            {t("Back to Home", "হোমে ফিরে যান")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0066CC] mb-6">
          <ArrowLeft size={15} />
          {t("Back to Home", "হোমে ফিরে যান")}
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t("Register as a Doctor", "ডাক্তার হিসেবে নিবন্ধন করুন")}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t("Join DoctorBD and connect with patients across Bangladesh.", "DoctorBD-তে যোগ দিন এবং বাংলাদেশ জুড়ে রোগীদের সাথে সংযুক্ত হন।")}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((label, i) => {
            const s = i + 1;
            return (
              <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      s < step ? "bg-[#00A86B] text-white" :
                      s === step ? "bg-[#0066CC] text-white" :
                      "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s < step ? "✓" : s}
                  </div>
                  <span className={`text-xs hidden sm:block ${s === step ? "text-[#0066CC] font-medium" : "text-gray-400"}`}>
                    {t(label, label)}
                  </span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px ${s < step ? "bg-[#00A86B]" : "bg-gray-200"}`} />}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">{t("Personal Information", "ব্যক্তিগত তথ্য")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Full Name (English)", "পুরো নাম (ইংরেজি)")} *</label>
                  <input
                    type="text"
                    placeholder="Dr. Full Name"
                    value={form.nameEn}
                    onChange={(e) => set("nameEn", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Full Name (Bengali)", "পুরো নাম (বাংলা)")} ({t("optional", "ঐচ্ছিক")})</label>
                  <input
                    type="text"
                    placeholder="ডা. পুরো নাম"
                    value={form.nameBn}
                    onChange={(e) => set("nameBn", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Phone Number", "ফোন নম্বর")} *</label>
                  <input
                    type="tel"
                    placeholder="01X-XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Email", "ইমেইল")} ({t("optional", "ঐচ্ছিক")})</label>
                  <input
                    type="email"
                    placeholder="doctor@example.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-2 block">{t("Gender", "লিঙ্গ")} *</label>
                <div className="flex gap-3">
                  {[["Male", "পুরুষ"], ["Female", "মহিলা"], ["Other", "অন্যান্য"]].map(([en, bn]) => (
                    <button
                      key={en}
                      onClick={() => set("gender", en)}
                      className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
                        form.gender === en
                          ? "bg-blue-50 border-[#0066CC] text-[#0066CC] font-medium"
                          : "border-gray-200 text-gray-600 hover:border-blue-300"
                      }`}
                    >
                      {t(en, bn)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">{t("Professional Details", "পেশাদার বিবরণ")}</h2>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Medical Specialty", "চিকিৎসা বিশেষজ্ঞতা")} *</label>
                <select
                  value={form.specialty}
                  onChange={(e) => set("specialty", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC] bg-white"
                >
                  <option value="">{t("Select specialty", "বিশেষজ্ঞতা বেছে নিন")}</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{t(c.nameEn, c.nameBn)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("BMDC Registration No.", "BMDC নিবন্ধন নং")} *</label>
                <input
                  type="text"
                  placeholder="A-XXXXX"
                  value={form.bmdc}
                  onChange={(e) => set("bmdc", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Qualifications", "যোগ্যতা")} * ({t("press Enter to add", "যোগ করতে Enter চাপুন")})</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.qualifications.map((q) => (
                    <span key={q} className="flex items-center gap-1 text-xs bg-blue-50 text-[#0066CC] px-2 py-1 rounded-md">
                      {q}
                      <button onClick={() => removeQual(q)} className="hover:text-red-500"><X size={11} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t("e.g. MBBS, MD (Cardiology)", "যেমন MBBS, MD (Cardiology)")}
                    value={qualInput}
                    onChange={(e) => setQualInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addQual())}
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                  <button
                    onClick={addQual}
                    className="px-3 py-2 rounded-lg bg-blue-50 text-[#0066CC] hover:bg-blue-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Years of Experience", "অভিজ্ঞতার বছর")} *</label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  placeholder="0"
                  value={form.experienceYears}
                  onChange={(e) => set("experienceYears", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Hospital */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-semibold text-gray-900">{t("Practice Information", "অনুশীলনের তথ্য")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Hospital / Clinic Name (English)", "হাসপাতাল / ক্লিনিক নাম (ইংরেজি)")} *</label>
                  <input
                    type="text"
                    value={form.hospitalEn}
                    onChange={(e) => set("hospitalEn", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Hospital / Clinic Name (Bengali)", "হাসপাতাল / ক্লিনিক নাম (বাংলা)")} ({t("optional", "ঐচ্ছিক")})</label>
                  <input
                    type="text"
                    value={form.hospitalBn}
                    onChange={(e) => set("hospitalBn", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Division", "বিভাগ")} *</label>
                  <select
                    value={form.division}
                    onChange={(e) => { set("division", e.target.value); set("district", ""); set("upazila", ""); }}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    <option value="">{t("Select", "বেছে নিন")}</option>
                    {locations.map((l) => <option key={l.division} value={l.division}>{l.division}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("District", "জেলা")} *</label>
                  <select
                    value={form.district}
                    onChange={(e) => set("district", e.target.value)}
                    disabled={!form.division}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC] bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">{t("Select", "বেছে নিন")}</option>
                    {districts.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Upazila", "উপজেলা")} ({t("optional", "ঐচ্ছিক")})</label>
                  <select
                    value={form.upazila}
                    onChange={(e) => set("upazila", e.target.value)}
                    disabled={!form.district}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC] bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="">{t("Select", "বেছে নিন")}</option>
                    {upazilas.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Consultation Fee (৳)", "পরামর্শ ফি (৳)")} *</label>
                  <input
                    type="number"
                    min={100}
                    placeholder="500"
                    value={form.fee}
                    onChange={(e) => set("fee", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Full Address", "সম্পূর্ণ ঠিকানা")} ({t("optional", "ঐচ্ছিক")})</label>
                <input
                  type="text"
                  placeholder={t("Building, Road, Area, City", "ভবন, রোড, এলাকা, শহর")}
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-semibold text-gray-900">{t("Required Documents", "প্রয়োজনীয় কাগজপত্র")}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t(
                    "Our team will contact you to collect these documents for verification.",
                    "আমাদের দল যাচাইকরণের জন্য এই কাগজপত্র সংগ্রহ করতে আপনার সাথে যোগাযোগ করবে।"
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { en: "BMDC Registration Certificate", bn: "BMDC নিবন্ধন সনদ" },
                  { en: "Medical Degree Certificate(s) — MBBS, MD, MS, etc.", bn: "মেডিকেল ডিগ্রি সনদ — MBBS, MD, MS ইত্যাদি" },
                  { en: "Hospital / Clinic Affiliation Letter", bn: "হাসপাতাল / ক্লিনিক অ্যাফিলিয়েশন পত্র" },
                  { en: "National ID Card (NID)", bn: "জাতীয় পরিচয়পত্র (NID)" },
                ].map((doc) => (
                  <div key={doc.en} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <CheckCircle size={16} className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{t(doc.en, doc.bn)}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="text-xs text-[#0066CC] leading-relaxed">
                  {t(
                    "After submitting this form, our verification team will review your information within 3–5 business days. You will be contacted via the phone number provided.",
                    "এই ফর্ম জমা দেওয়ার পরে, আমাদের যাচাইকরণ দল ৩–৫ কার্যদিবসের মধ্যে আপনার তথ্য পর্যালোচনা করবে। প্রদত্ত ফোন নম্বরে আপনার সাথে যোগাযোগ করা হবে।"
                  )}
                </p>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => set("agreed", e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#0066CC] flex-shrink-0"
                />
                <span className="text-sm text-gray-700">
                  {t(
                    "I confirm that all information provided is accurate and I consent to DoctorBD verifying my credentials.",
                    "আমি নিশ্চিত করছি যে প্রদত্ত সমস্ত তথ্য সঠিক এবং আমি DoctorBD-কে আমার যোগ্যতা যাচাই করার অনুমতি দিচ্ছি।"
                  )}
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6 pt-5 border-t border-gray-100">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 text-sm font-medium py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Back", "পিছনে")}
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Next", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext()}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Submit Application", "আবেদন জমা দিন")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
