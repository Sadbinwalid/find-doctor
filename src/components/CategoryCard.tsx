"use client";
import Link from "next/link";
import { Category } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";
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

export default function CategoryCard({ category }: { category: Category }) {
  const { t } = useLanguage();
  const Icon = iconMap[category.slug] || Stethoscope;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ backgroundColor: category.bgColor }}
      >
        <Icon size={20} style={{ color: category.color }} />
      </div>

      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
        {t(category.nameEn, category.nameBn)}
      </h3>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
        {t(category.descriptionEn, category.descriptionBn)}
      </p>

      <p className="text-xs mt-2 font-medium group-hover:underline" style={{ color: category.color }}>
        {t("View doctors →", "ডাক্তার দেখুন →")}
      </p>
    </Link>
  );
}
