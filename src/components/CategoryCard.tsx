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
      className="group flex flex-col items-center text-center bg-white border border-gray-100 rounded-2xl p-4 py-5 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
    >
      {/* Large icon block */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: category.bgColor }}
      >
        <Icon size={28} style={{ color: category.color }} strokeWidth={1.75} />
      </div>

      <p className="text-sm font-bold text-gray-900 leading-snug">
        {t(category.nameEn, category.nameBn)}
      </p>
    </Link>
  );
}
