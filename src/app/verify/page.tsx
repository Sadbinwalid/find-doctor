"use client";
import Link from "next/link";
import { ShieldCheck, FileText, Search, BadgeCheck, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function VerificationPage() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      num: "01",
      en: "Submit Registration",
      bn: "নিবন্ধন জমা দিন",
      descEn: "Complete the registration form with your personal details, specialty, BMDC number, and hospital info.",
      descBn: "ব্যক্তিগত তথ্য, বিশেষজ্ঞতা, BMDC নম্বর এবং হাসপাতাল তথ্য সহ নিবন্ধন ফর্ম পূরণ করুন।",
      color: "#EFF6FF",
      iconColor: "#0066CC",
    },
    {
      icon: Search,
      num: "02",
      en: "Document Review",
      bn: "নথি পর্যালোচনা",
      descEn: "Our team reviews your BMDC certificate, degrees, hospital letter, and NID within 3–5 business days.",
      descBn: "আমাদের দল ৩–৫ কার্যদিবসের মধ্যে আপনার BMDC সনদ, ডিগ্রি, হাসপাতাল পত্র এবং NID পর্যালোচনা করে।",
      color: "#F0FDF4",
      iconColor: "#00A86B",
    },
    {
      icon: ShieldCheck,
      num: "03",
      en: "Background Check",
      bn: "ব্যাকগ্রাউন্ড যাচাই",
      descEn: "We cross-reference your details with BMDC's official registry to confirm active practice.",
      descBn: "সক্রিয় অনুশীলন নিশ্চিত করতে আমরা BMDC-এর অফিসিয়াল রেজিস্ট্রির সাথে তথ্য মিলিয়ে দেখি।",
      color: "#FFFBEB",
      iconColor: "#D97706",
    },
    {
      icon: BadgeCheck,
      num: "04",
      en: "Verified Badge",
      bn: "যাচাই ব্যাজ",
      descEn: "Once approved, your profile gets the blue 'Verified by FindDoctor' badge visible to all patients.",
      descBn: "অনুমোদনের পরে, আপনার প্রোফাইলে সব রোগীদের কাছে দৃশ্যমান নীল 'FindDoctor দ্বারা যাচাইকৃত' ব্যাজ পাওয়া যায়।",
      color: "#EFF6FF",
      iconColor: "#0066CC",
    },
  ];

  const documents = [
    {
      en: "BMDC Registration Certificate",
      bn: "BMDC নিবন্ধন সনদ",
      noteEn: "Must be current and valid",
      noteBn: "বর্তমান ও বৈধ হতে হবে",
      required: true,
    },
    {
      en: "Medical Degree Certificate(s)",
      bn: "মেডিকেল ডিগ্রি সনদ",
      noteEn: "MBBS, MD, MS, FCPS, or equivalent",
      noteBn: "MBBS, MD, MS, FCPS বা সমতুল্য",
      required: true,
    },
    {
      en: "Hospital / Clinic Affiliation Letter",
      bn: "হাসপাতাল / ক্লিনিক অ্যাফিলিয়েশন পত্র",
      noteEn: "Signed by hospital authority",
      noteBn: "হাসপাতাল কর্তৃপক্ষের স্বাক্ষরিত",
      required: true,
    },
    {
      en: "National ID Card (NID)",
      bn: "জাতীয় পরিচয়পত্র (NID)",
      noteEn: "Government-issued photo ID",
      noteBn: "সরকার-প্রদত্ত ছবিযুক্ত পরিচয়পত্র",
      required: true,
    },
  ];

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0066CC] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <ShieldCheck size={13} />
            {t("Platform Trust & Safety", "প্ল্যাটফর্ম বিশ্বাস ও নিরাপত্তা")}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {t("How Doctor Verification Works", "ডাক্তার যাচাইকরণ কিভাবে কাজ করে")}
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t(
              "Every doctor with a blue verified badge has passed our multi-step credential check — so patients can trust who they're seeing.",
              "নীল যাচাই ব্যাজ সহ প্রতিটি ডাক্তার আমাদের বহু-ধাপের শংসাপত্র যাচাই পাস করেছেন — তাই রোগীরা বিশ্বাস করতে পারেন।"
            )}
          </p>
        </div>
      </section>

      {/* What the badge means */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4 items-start">
          <div className="w-10 h-10 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm mb-1">
              {t('What "Verified by FindDoctor" means', '"FindDoctor দ্বারা যাচাইকৃত" মানে কী')}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(
                "DoctorBD has independently confirmed: the doctor holds a valid BMDC registration, their qualifications are genuine, and they are in active clinical practice.",
                "DoctorBD স্বাধীনভাবে নিশ্চিত করেছে: ডাক্তারের বৈধ BMDC নিবন্ধন আছে, তাদের যোগ্যতা সত্যিকারের এবং তারা সক্রিয় ক্লিনিক্যাল অনুশীলনে আছেন।"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Process steps — 2×2 grid */}
      <section className="max-w-3xl mx-auto px-4 pb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-4">{t("The Verification Process", "যাচাইকরণ প্রক্রিয়া")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="rounded-2xl p-5 border border-gray-100"
                style={{ backgroundColor: step.color }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm"
                  >
                    <Icon size={17} style={{ color: step.iconColor }} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 tracking-widest">{step.num}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{t(step.en, step.bn)}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{t(step.descEn, step.descBn)}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <Clock size={14} className="text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            {t("Average time from registration to verified badge: 3–5 business days.", "নিবন্ধন থেকে যাচাই ব্যাজ পর্যন্ত গড় সময়: ৩–৫ কার্যদিবস।")}
          </p>
        </div>
      </section>

      {/* Required Documents — focal section */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">{t("Required Documents", "প্রয়োজনীয় নথি")}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {t(
                "You must submit all four documents. Our team contacts you after registration to collect these.",
                "আপনাকে অবশ্যই চারটি নথি জমা দিতে হবে। নিবন্ধনের পরে আমাদের দল এগুলো সংগ্রহ করতে আপনার সাথে যোগাযোগ করে।"
              )}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {documents.map((doc, i) => (
              <div
                key={doc.en}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-4"
              >
                <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{t(doc.en, doc.bn)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t(doc.noteEn, doc.noteBn)}</p>
                </div>
                <CheckCircle size={16} className="text-[#00A86B] flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0066CC]">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {t("Ready to get verified?", "যাচাই হতে প্রস্তুত?")}
          </h2>
          <p className="text-blue-200 text-sm mb-6">
            {t(
              "Register your profile and reach thousands of patients across Bangladesh.",
              "আপনার প্রোফাইল নিবন্ধন করুন এবং বাংলাদেশ জুড়ে হাজার হাজার রোগীর কাছে পৌঁছান।"
            )}
          </p>
          <Link
            href="/register/doctor"
            className="inline-flex items-center gap-2 bg-white text-[#0066CC] text-sm font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            {t("Register as a Doctor", "ডাক্তার হিসেবে নিবন্ধন করুন")} <ChevronRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
