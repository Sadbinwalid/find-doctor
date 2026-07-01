"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { doctors } from "@/data/doctors";
import { categories } from "@/data/categories";
import DoctorCard from "@/components/DoctorCard";
import {
  Heart, Scan, Brain, Baby, Cross, Bone, Activity, Ear, Eye, SmilePlus, Droplets, Stethoscope,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  cardiologist: Heart,
  dermatologist: Scan,
  neurologist: Brain,
  pediatrician: Baby,
  gynecologist: Cross,
  orthopedic: Bone,
  gastroenterologist: Activity,
  ent: Ear,
  ophthalmologist: Eye,
  psychiatrist: SmilePlus,
  nephrologist: Droplets,
  "general-physician": Stethoscope,
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useLanguage();

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryDoctors = doctors.filter((d) => d.specialty === slug);
  const Icon = iconMap[slug] || Stethoscope;
  const verifiedCount = categoryDoctors.filter((d) => d.verified).length;
  const availableCount = categoryDoctors.filter((d) => d.available).length;

  return (
    <div className="bg-[#f4f6f9] min-h-screen">

      {/* ── Hero strip (category-coloured) ── */}
      <div className="bg-gradient-to-b from-[#0066CC] to-[#0052a3]">
        <div className="max-w-5xl mx-auto px-4 pt-5 pb-20">

          <Link
            href="/specialties"
            className="inline-flex items-center gap-1.5 text-sm text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            {t("All Specialties", "সব বিশেষজ্ঞতা")}
          </Link>

          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/20"
            >
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {t(category.nameEn, category.nameBn)}
              </h1>
              <p className="text-blue-200 text-sm mt-0.5 max-w-lg">
                {t(category.descriptionEn, category.descriptionBn)}
              </p>
            </div>
          </div>

          {/* Quick stats chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 text-white">
              {categoryDoctors.length} {t("doctors", "ডাক্তার")}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-400/20 text-green-200 border border-green-400/20">
              {availableCount} {t("available now", "এখন উপলব্ধ")}
            </span>
            {verifiedCount > 0 && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white">
                {verifiedCount} {t("verified", "যাচাইকৃত")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Pull-up content ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 pb-10">

        {/* When to see card */}
        <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
              {t("When to see a", "কখন দেখাবেন")} {t(category.nameEn, category.nameBn)}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {t(category.whenToSeeEn, category.whenToSeeBn)}
            </p>
          </div>
        </div>

        {/* Doctors heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 text-base">
            {categoryDoctors.length} {t(category.nameEn, category.nameBn)} {t("in Bangladesh", "বাংলাদেশে")}
          </h2>
          <Link href="/doctors" className="text-xs text-[#0066CC] hover:underline">
            {t("See all doctors →", "সব ডাক্তার দেখুন →")}
          </Link>
        </div>

        {categoryDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">👨‍⚕️</p>
            <p className="font-medium text-gray-600">{t("No doctors listed yet", "এখনো কোনো ডাক্তার তালিকাভুক্ত নেই")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
