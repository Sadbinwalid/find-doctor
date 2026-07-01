"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import { doctors } from "@/data/doctors";
import {
  Heart, Scan, Brain, Baby, Cross, Bone, Stethoscope, Ear, Eye, SmilePlus, Droplets, Activity,
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

export default function SpecialtiesPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f4f6f9] min-h-screen">

      {/* Hero strip */}
      <div className="bg-gradient-to-b from-[#0066CC] to-[#0052a3]">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            {t("12 specialties · All across Bangladesh", "১২টি বিশেষজ্ঞতা · সারা বাংলাদেশে")}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t("Medical Specialties", "চিকিৎসা বিশেষজ্ঞতা")}
          </h1>
          <p className="text-blue-200 text-sm max-w-md mx-auto">
            {t("Find the right specialist for your health condition", "আপনার স্বাস্থ্য অবস্থার জন্য সঠিক বিশেষজ্ঞ খুঁজুন")}
          </p>
        </div>
      </div>

      {/* Pull-up grid */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const count = doctors.filter((d) => d.specialty === cat.slug).length;
            const Icon = iconMap[cat.slug] || Stethoscope;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  <Icon size={26} style={{ color: cat.color }} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{t(cat.nameEn, cat.nameBn)}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{t(cat.descriptionEn, cat.descriptionBn)}</p>
                  <p className="text-xs font-semibold mt-1.5" style={{ color: cat.color }}>
                    {count} {t("doctors", "জন ডাক্তার")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
