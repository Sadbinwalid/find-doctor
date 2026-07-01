"use client";
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-500 mb-4">
        <a href="/" className="hover:text-[#0066CC]">{t("Home", "হোম")}</a>
        {" / "}
        <span className="text-gray-900">{t("Specialties", "বিশেষজ্ঞতা")}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t("Medical Specialties", "চিকিৎসা বিশেষজ্ঞতা")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t("Find the right specialist for your health condition", "আপনার স্বাস্থ্য অবস্থার জন্য সঠিক বিশেষজ্ঞ খুঁজুন")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = doctors.filter((d) => d.specialty === cat.slug).length;
          const Icon = iconMap[cat.slug] || Stethoscope;
          return (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
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
                <p className="text-xs font-medium mt-1" style={{ color: cat.color }}>
                  {count} {t("doctors", "জন ডাক্তার")}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
