"use client";
import Link from "next/link";
import { ShieldCheck, FileText, Search, BadgeCheck, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function VerificationPage() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      en: "Submit Registration",
      bn: "নিবন্ধন জমা দিন",
      descEn: "Doctor completes the registration form with personal details, specialty, BMDC number, hospital info, and consultation fee.",
      descBn: "ডাক্তার ব্যক্তিগত তথ্য, বিশেষজ্ঞতা, BMDC নম্বর, হাসপাতাল তথ্য এবং পরামর্শ ফি সহ নিবন্ধন ফর্ম পূরণ করেন।",
    },
    {
      icon: Search,
      en: "Document Review",
      bn: "নথি পর্যালোচনা",
      descEn: "Our team collects and reviews BMDC certificate, medical degrees, hospital affiliation, and NID. Typically takes 3–5 business days.",
      descBn: "আমাদের দল BMDC সনদ, মেডিকেল ডিগ্রি, হাসপাতাল অ্যাফিলিয়েশন এবং NID সংগ্রহ ও পর্যালোচনা করে। সাধারণত ৩–৫ কার্যদিবস সময় লাগে।",
    },
    {
      icon: ShieldCheck,
      en: "Background Check",
      bn: "ব্যাকগ্রাউন্ড যাচাই",
      descEn: "We cross-reference details with BMDC's official registry and confirm the doctor is currently in active practice.",
      descBn: "আমরা BMDC-এর অফিসিয়াল রেজিস্ট্রির সাথে তথ্য যাচাই করি এবং নিশ্চিত করি যে ডাক্তার বর্তমানে সক্রিয় অনুশীলনে আছেন।",
    },
    {
      icon: BadgeCheck,
      en: "Verified Badge Awarded",
      bn: "যাচাই ব্যাজ প্রদান",
      descEn: "Once approved, the doctor's profile receives the blue 'Verified by FindDoctor' badge visible to all users.",
      descBn: "অনুমোদনের পরে, ডাক্তারের প্রোফাইলে সকল ব্যবহারকারীর কাছে দৃশ্যমান নীল 'FindDoctor দ্বারা যাচাইকৃত' ব্যাজ পাওয়া যায়।",
    },
  ];

  const documents = [
    {
      en: "BMDC Registration Certificate",
      bn: "BMDC নিবন্ধন সনদ",
      noteEn: "Must be current and valid",
      noteBn: "বর্তমান ও বৈধ হতে হবে",
    },
    {
      en: "Medical Degree Certificate(s)",
      bn: "মেডিকেল ডিগ্রি সনদ",
      noteEn: "MBBS, MD, MS, FCPS, or equivalent",
      noteBn: "MBBS, MD, MS, FCPS বা সমতুল্য",
    },
    {
      en: "Hospital / Clinic Affiliation Letter",
      bn: "হাসপাতাল / ক্লিনিক অ্যাফিলিয়েশন পত্র",
      noteEn: "Signed by hospital authority",
      noteBn: "হাসপাতাল কর্তৃপক্ষের স্বাক্ষরিত",
    },
    {
      en: "National ID Card (NID)",
      bn: "জাতীয় পরিচয়পত্র (NID)",
      noteEn: "Government-issued photo ID",
      noteBn: "সরকার-প্রদত্ত ছবিযুক্ত পরিচয়পত্র",
    },
  ];

  const faqs = [
    {
      qEn: "How long does verification take?",
      qBn: "যাচাইকরণে কতদিন লাগে?",
      aEn: "Typically 3–5 business days after all required documents have been submitted.",
      aBn: "সমস্ত প্রয়োজনীয় নথি জমা দেওয়ার পরে সাধারণত ৩–৫ কার্যদিবস।",
    },
    {
      qEn: "Can a doctor lose their verified badge?",
      qBn: "একজন ডাক্তার কি তার যাচাই ব্যাজ হারাতে পারেন?",
      aEn: "Yes. Badges are reviewed annually and can be revoked if BMDC registration lapses, complaints are validated, or the doctor is no longer in active practice.",
      aBn: "হ্যাঁ। ব্যাজ বার্ষিকভাবে পর্যালোচনা করা হয় এবং BMDC নিবন্ধন মেয়াদোত্তীর্ণ হলে, অভিযোগ প্রমাণিত হলে বা ডাক্তার আর সক্রিয় অনুশীলনে না থাকলে বাতিল করা যেতে পারে।",
    },
    {
      qEn: "Is verification free for doctors?",
      qBn: "ডাক্তারদের জন্য যাচাইকরণ কি বিনামূল্যে?",
      aEn: "Yes. DoctorBD verification is completely free for all registered doctors.",
      aBn: "হ্যাঁ। DoctorBD যাচাইকরণ সমস্ত নিবন্ধিত ডাক্তারদের জন্য সম্পূর্ণ বিনামূল্যে।",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} className="text-[#0066CC]" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#0066CC] bg-blue-50 px-2.5 py-1 rounded-full">
                {t("Platform Trust & Safety", "প্ল্যাটফর্ম বিশ্বাস ও নিরাপত্তা")}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {t("How Doctor Verification Works", "ডাক্তার যাচাইকরণ কিভাবে কাজ করে")}
          </h1>
          <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
            {t(
              "Every doctor with a blue verified badge on DoctorBD has passed our multi-step credential check. Here's exactly what we verify and how.",
              "DoctorBD-তে নীল যাচাই ব্যাজ সহ প্রতিটি ডাক্তার আমাদের বহু-ধাপের শংসাপত্র যাচাই পাস করেছেন। আমরা ঠিক কী যাচাই করি এবং কিভাবে তা এখানে দেওয়া হলো।"
            )}
          </p>
        </div>
      </section>

      {/* What the badge means */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
          <div className="w-10 h-10 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">{t('What "Verified by FindDoctor" means', '"FindDoctor দ্বারা যাচাইকৃত" মানে কী')}</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t(
                "When you see this badge, it means DoctorBD has independently confirmed the doctor holds a valid BMDC registration, their stated qualifications are genuine, and they are currently in active clinical practice.",
                "যখন আপনি এই ব্যাজ দেখেন, তার মানে DoctorBD স্বাধীনভাবে নিশ্চিত করেছে যে ডাক্তারের বৈধ BMDC নিবন্ধন আছে, তাদের উল্লিখিত যোগ্যতা সত্যিকারের এবং তারা বর্তমানে সক্রিয় ক্লিনিক্যাল অনুশীলনে আছেন।"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t("The Verification Process", "যাচাইকরণ প্রক্রিয়া")}</h2>
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex gap-4 items-start bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#0066CC]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">0{i + 1}</span>
                    <h3 className="font-semibold text-gray-900 text-sm">{t(step.en, step.bn)}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(step.descEn, step.descBn)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="mt-5 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-3.5">
          <Clock size={16} className="text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            {t(
              "Average total time from registration to verified badge: 3–5 business days.",
              "নিবন্ধন থেকে যাচাই ব্যাজ পর্যন্ত মোট গড় সময়: ৩–৫ কার্যদিবস।"
            )}
          </p>
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t("Required Documents", "প্রয়োজনীয় নথি")}</h2>
          <p className="text-sm text-gray-500 mb-6">
            {t(
              "Doctors must submit the following to receive the verified badge.",
              "যাচাই ব্যাজ পেতে ডাক্তারদের নিচের নথিগুলো জমা দিতে হবে।"
            )}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <div key={doc.en} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 flex gap-3 items-start">
                <CheckCircle size={16} className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{t(doc.en, doc.bn)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t(doc.noteEn, doc.noteBn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t("Frequently Asked Questions", "প্রায়শই জিজ্ঞাসিত প্রশ্ন")}</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <div key={faq.qEn} className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="font-semibold text-gray-900 text-sm mb-1.5">{t(faq.qEn, faq.qBn)}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{t(faq.aEn, faq.aBn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0066CC]">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{t("Ready to get verified?", "যাচাই হতে প্রস্তুত?")}</h2>
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
            {t("Register as a Doctor", "ডাক্তার হিসেবে নিবন্ধন করুন")} <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
