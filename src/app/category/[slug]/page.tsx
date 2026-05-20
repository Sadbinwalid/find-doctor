"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Link href="/" className="hover:text-[#C84B31]">{t("Home", "হোম")}</Link>
          <span>/</span>
          <Link href="/specialties" className="hover:text-[#C84B31]">{t("Specialties", "বিশেষজ্ঞতা")}</Link>
          <span>/</span>
          <span className="text-gray-900">{t(category.nameEn, category.nameBn)}</span>
        </nav>

        <Link href="/specialties" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#C84B31] mb-5">
          <ArrowLeft size={15} />
          {t("All Specialties", "সব বিশেষজ্ঞতা")}
        </Link>

        {/* Category header */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: category.bgColor }}
            >
              <Icon size={28} style={{ color: category.color }} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{t(category.nameEn, category.nameBn)}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{t(category.descriptionEn, category.descriptionBn)}</p>

              <div
                className="mt-4 flex items-start gap-2 p-3 rounded-lg text-sm"
                style={{ backgroundColor: category.bgColor }}
              >
                <Info size={15} style={{ color: category.color }} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-800 text-xs uppercase tracking-wide mb-1">
                    {t("When to see a", "কখন দেখাবেন")} {t(category.nameEn, category.nameBn)}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {t(category.whenToSeeEn, category.whenToSeeBn)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">
            {categoryDoctors.length} {t(category.nameEn, category.nameBn)} {t("in Bangladesh", "বাংলাদেশে")}
          </h2>
        </div>

        {categoryDoctors.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
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
