"use client";
import Link from "next/link";
import { Doctor } from "@/data/doctors";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Star, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { t } = useLanguage();
  const category = categories.find((c) => c.slug === doctor.specialty);

  const initials = doctor.nameEn
    .split(" ")
    .filter((w) => w !== "Dr.")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="group flex items-center gap-4 px-5 py-4 bg-white border border-gray-200 rounded-xl hover:border-[#059669] hover:bg-emerald-50/30 transition-all"
    >
      {/* Avatar — gray bg, dark initials */}
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800 font-bold text-sm flex-shrink-0">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#059669] transition-colors">
          {t(doctor.nameEn, doctor.nameBn)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {t(category?.nameEn ?? "", category?.nameBn ?? "")} · {t(doctor.hospitalEn, doctor.hospitalBn)}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <MapPin size={11} />
          <span>{doctor.district}</span>
          <span>·</span>
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span>{doctor.rating}</span>
          <span>·</span>
          <span>{doctor.experienceYears} {t("yrs", "বছর")}</span>
        </div>
      </div>

      <ChevronRight size={16} className="text-gray-300 group-hover:text-[#059669] flex-shrink-0 transition-colors" />
    </Link>
  );
}
