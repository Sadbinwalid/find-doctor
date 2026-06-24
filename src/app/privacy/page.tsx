"use client";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const sections = [
  {
    titleEn: "1. Information We Collect",
    titleBn: "১. আমরা যে তথ্য সংগ্রহ করি",
    bodyEn: "We collect information you provide directly: your name, age, blood group, phone number, and location (division/district). We also collect information about how you use the platform, such as doctors you view or save.",
    bodyBn: "আমরা আপনার প্রদত্ত তথ্য সংগ্রহ করি: আপনার নাম, বয়স, রক্তের গ্রুপ, ফোন নম্বর এবং অবস্থান (বিভাগ/জেলা)। আমরা আপনি যেভাবে প্ল্যাটফর্ম ব্যবহার করেন সে সম্পর্কেও তথ্য সংগ্রহ করি।",
  },
  {
    titleEn: "2. How We Use Your Information",
    titleBn: "২. আমরা কীভাবে আপনার তথ্য ব্যবহার করি",
    bodyEn: "Your information is used to personalise your experience, show relevant doctors near your location, remember your saved preferences, and improve our platform. We do not sell your personal data to third parties.",
    bodyBn: "আপনার তথ্য আপনার অভিজ্ঞতা ব্যক্তিগতকৃত করতে, আপনার অবস্থানের কাছে প্রাসঙ্গিক ডাক্তার দেখাতে, আপনার সংরক্ষিত পছন্দ মনে রাখতে এবং আমাদের প্ল্যাটফর্ম উন্নত করতে ব্যবহৃত হয়। আমরা আপনার ব্যক্তিগত ডেটা তৃতীয় পক্ষের কাছে বিক্রি করি না।",
  },
  {
    titleEn: "3. Data Storage",
    titleBn: "৩. ডেটা সংরক্ষণ",
    bodyEn: "Your profile data is currently stored locally on your device (browser storage). This means your data stays on your device and is not transmitted to external servers in this version of the app.",
    bodyBn: "আপনার প্রোফাইল ডেটা বর্তমানে আপনার ডিভাইসে (ব্রাউজার স্টোরেজে) স্থানীয়ভাবে সংরক্ষিত হয়। এর অর্থ আপনার ডেটা আপনার ডিভাইসে থাকে এবং এই সংস্করণে বাহ্যিক সার্ভারে প্রেরণ করা হয় না।",
  },
  {
    titleEn: "4. Sharing of Information",
    titleBn: "৪. তথ্য ভাগাভাগি",
    bodyEn: "We do not share your personal health information with doctors or third parties without your explicit consent. Doctor contact details displayed are publicly available information provided by the registered practitioners themselves.",
    bodyBn: "আমরা আপনার স্পষ্ট সম্মতি ছাড়া আপনার ব্যক্তিগত স্বাস্থ্য তথ্য ডাক্তার বা তৃতীয় পক্ষের সাথে শেয়ার করি না।",
  },
  {
    titleEn: "5. Health Data",
    titleBn: "৫. স্বাস্থ্য ডেটা",
    bodyEn: "Any health information you enter (blood group, medical conditions, age) is used solely to improve your experience within the app — for example, to suggest relevant specialties. This information is not shared with any medical institution or insurer.",
    bodyBn: "আপনি যে স্বাস্থ্য তথ্য প্রদান করেন (রক্তের গ্রুপ, চিকিৎসাগত অবস্থা, বয়স) শুধুমাত্র অ্যাপের মধ্যে আপনার অভিজ্ঞতা উন্নত করতে ব্যবহৃত হয়। এই তথ্য কোনো চিকিৎসা প্রতিষ্ঠান বা বীমা প্রতিষ্ঠানের সাথে শেয়ার করা হয় না।",
  },
  {
    titleEn: "6. Your Rights",
    titleBn: "৬. আপনার অধিকার",
    bodyEn: "You have the right to access, correct, or delete your personal data at any time via the Edit Profile option. You can also sign out and clear your data by using the Sign Out option, which removes all locally stored profile information.",
    bodyBn: "আপনি যেকোনো সময় প্রোফাইল সম্পাদনা বিকল্পের মাধ্যমে আপনার ব্যক্তিগত ডেটা অ্যাক্সেস, সংশোধন বা মুছতে পারেন। সাইন আউট করলে স্থানীয়ভাবে সংরক্ষিত সমস্ত প্রোফাইল তথ্য মুছে যায়।",
  },
  {
    titleEn: "7. Cookies & Local Storage",
    titleBn: "৭. কুকিজ ও লোকাল স্টোরেজ",
    bodyEn: "DoctorBD uses browser local storage and session storage to remember your preferences and session state. No tracking cookies are used. You can clear this data at any time by signing out or clearing your browser data.",
    bodyBn: "DoctorBD আপনার পছন্দ এবং সেশনের অবস্থা মনে রাখতে ব্রাউজার লোকাল স্টোরেজ এবং সেশন স্টোরেজ ব্যবহার করে। কোনো ট্র্যাকিং কুকিজ ব্যবহার করা হয় না।",
  },
  {
    titleEn: "8. Contact",
    titleBn: "৮. যোগাযোগ",
    bodyEn: "If you have questions about this Privacy Policy or how your data is handled, please contact our privacy team at privacy@doctorbd.com.",
    bodyBn: "এই গোপনীয়তা নীতি বা আপনার ডেটা কীভাবে পরিচালনা করা হয় সে সম্পর্কে প্রশ্ন থাকলে, privacy@doctorbd.com-এ আমাদের সাথে যোগাযোগ করুন।",
  },
];

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/profile" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#0066CC] mb-6">
          <ArrowLeft size={15} />
          {t("Back", "পিছনে")}
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#00A86B] px-6 py-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t("Privacy Policy", "গোপনীয়তা নীতি")}</h1>
                <p className="text-green-100 text-xs">{t("Last updated: June 2026", "সর্বশেষ আপডেট: জুন ২০২৬")}</p>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              {t(
                "Your privacy matters to us. Here's exactly how we handle your data.",
                "আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। আমরা কীভাবে আপনার ডেটা পরিচালনা করি তা এখানে দেওয়া হলো।"
              )}
            </p>
          </div>

          {/* Sections */}
          <div className="p-6 flex flex-col gap-6">
            {sections.map((s) => (
              <div key={s.titleEn}>
                <h2 className="text-sm font-semibold text-gray-900 mb-2">{t(s.titleEn, s.titleBn)}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{t(s.bodyEn, s.bodyBn)}</p>
              </div>
            ))}

            <div className="border-t border-gray-100 pt-5 text-center">
              <p className="text-xs text-gray-400">
                {t("Questions? Email us at", "প্রশ্ন? আমাদের ইমেইল করুন:")}{" "}
                <a href="mailto:privacy@doctorbd.com" className="text-[#0066CC] hover:underline">privacy@doctorbd.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
