"use client";
import Link from "next/link";
import { Category } from "@/data/categories";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Heart, Scan, Brain, Baby, Cross, Bone, Stethoscope, Ear, Eye, SmilePlus, Droplets, Activity } from "lucide-react";

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
      className="group flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#C84B31] hover:bg-red-50/30 transition-all"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: category.bgColor }}
      >
        <Icon size={17} style={{ color: category.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-[#C84B31] transition-colors">
          {t(category.nameEn, category.nameBn)}
        </p>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {t(category.descriptionEn, category.descriptionBn)}
        </p>
      </div>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#C84B31] flex-shrink-0 transition-colors" />
    </Link>
  );
}
