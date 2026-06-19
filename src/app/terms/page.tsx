"use client";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const sections = [
  {
    titleEn: "1. Acceptance of Terms",
    titleBn: "১. শর্তাবলী গ্রহণ",
    bodyEn: "By accessing or using DoctorBD, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the platform.",
    bodyBn: "DoctorBD ব্যবহার করে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। আপনি যদি এই শর্তে সম্মত না হন, তাহলে অনুগ্রহ করে প্ল্যাটফর্মটি ব্যবহার করবেন না।",
  },
  {
    titleEn: "2. Nature of Service",
    titleBn: "২. সেবার প্রকৃতি",
    bodyEn: "DoctorBD is a directory platform that helps patients find and connect with licensed medical professionals in Bangladesh. We do not provide medical advice, diagnoses, or treatment. Always consult a qualified doctor for medical decisions.",
    bodyBn: "DoctorBD একটি ডিরেক্টরি প্ল্যাটফর্ম যা বাংলাদেশে রোগীদের লাইসেন্সপ্রাপ্ত চিকিৎসকদের সাথে সংযুক্ত করতে সহায়তা করে। আমরা চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসা প্রদান করি না। চিকিৎসাগত সিদ্ধান্তের জন্য সর্বদা একজন যোগ্য ডাক্তারের পরামর্শ নিন।",
  },
  {
    titleEn: "3. User Accounts",
    titleBn: "৩. ব্যবহারকারীর অ্যাকাউন্ট",
    bodyEn: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and truthful information during registration. Accounts found to contain false information may be suspended or removed.",
    bodyBn: "আপনি আপনার অ্যাকাউন্টের তথ্যের গোপনীয়তা বজায় রাখার জন্য দায়ী। নিবন্ধনের সময় আপনাকে সঠিক এবং সত্যিকারের তথ্য প্রদান করতে হবে। মিথ্যা তথ্য সম্বলিত অ্যাকাউন্ট স্থগিত বা মুছে ফেলা হতে পারে।",
  },
  {
    titleEn: "4. Doctor Verification",
    titleBn: "৪. ডাক্তার যাচাইকরণ",
    bodyEn: "Doctors listed on DoctorBD are verified against BMDC registration records. However, we encourage users to independently verify credentials before booking appointments. The 'Verified' badge indicates our internal verification process only.",
    bodyBn: "DoctorBD-তে তালিকাভুক্ত ডাক্তারদের BMDC নিবন্ধন রেকর্ডের বিপরীতে যাচাই করা হয়। তবে, অ্যাপয়েন্টমেন্ট নেওয়ার আগে আমরা ব্যবহারকারীদের স্বাধীনভাবে যোগ্যতা যাচাই করতে উৎসাহিত করি। 'যাচাইকৃত' ব্যাজ শুধুমাত্র আমাদের অভ্যন্তরীণ যাচাই প্রক্রিয়া নির্দেশ করে।",
  },
  {
    titleEn: "5. Prohibited Conduct",
    titleBn: "৫. নিষিদ্ধ আচরণ",
    bodyEn: "You may not use DoctorBD to post false or misleading information, impersonate medical professionals, engage in any unlawful activity, or attempt to gain unauthorized access to any part of our platform.",
    bodyBn: "আপনি DoctorBD ব্যবহার করে মিথ্যা বা বিভ্রান্তিকর তথ্য পোস্ট করতে, চিকিৎসা পেশাদারদের ছদ্মবেশ ধারণ করতে, কোনো বেআইনি কার্যকলাপে নিয়োজিত হতে বা প্ল্যাটফর্মের যেকোনো অংশে অননুমোদিত প্রবেশের চেষ্টা করতে পারবেন না।",
  },
  {
    titleEn: "6. Limitation of Liability",
    titleBn: "৬. দায়বদ্ধতার সীমাবদ্ধতা",
    bodyEn: "DoctorBD is not liable for the accuracy of doctor listings, outcomes of medical consultations, or any indirect or consequential damages arising from use of the platform. Use of this service is at your own risk.",
    bodyBn: "DoctorBD ডাক্তারের তালিকার নির্ভুলতা, চিকিৎসা পরামর্শের ফলাফল, বা প্ল্যাটফর্ম ব্যবহার থেকে উদ্ভূত কোনো পরোক্ষ ক্ষতির জন্য দায়ী নয়। এই সেবার ব্যবহার আপনার নিজের ঝুঁকিতে।",
  },
  {
    titleEn: "7. Changes to Terms",
    titleBn: "৭. শর্তাবলীর পরিবর্তন",
    bodyEn: "We may update these Terms at any time. Continued use of DoctorBD after changes are posted constitutes acceptance of the revised Terms. We will notify users of significant changes via in-app notification.",
    bodyBn: "আমরা যেকোনো সময় এই শর্তাবলী আপডেট করতে পারি। পরিবর্তন পোস্ট করার পরে DoctorBD ব্যবহার অব্যাহত রাখা সংশোধিত শর্তাবলী গ্রহণ হিসেবে গণ্য হবে।",
  },
];

export default function TermsPage() {
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
          <div className="bg-[#0066CC] px-6 py-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t("Terms & Conditions", "শর্তাবলী")}</h1>
                <p className="text-blue-200 text-xs">{t("Last updated: June 2026", "সর্বশেষ আপডেট: জুন ২০২৬")}</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              {t(
                "Please read these terms carefully before using DoctorBD.",
                "DoctorBD ব্যবহার করার আগে অনুগ্রহ করে এই শর্তগুলি মনোযোগ দিয়ে পড়ুন।"
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
                {t("For questions about these Terms, contact us at", "এই শর্তাবলী সম্পর্কে প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন:")}{" "}
                <a href="mailto:legal@doctorbd.com" className="text-[#0066CC] hover:underline">legal@doctorbd.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
