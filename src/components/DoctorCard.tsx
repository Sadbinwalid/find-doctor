"use client";
import Link from "next/link";
import { Doctor } from "@/data/doctors";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Star, Stethoscope, Phone } from "lucide-react";
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
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col gap-4">
      {/* Header */}
      <div className="flex gap-4 items-start">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0"
          style={{ backgroundColor: category?.color || "#0066CC" }}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
            {t(doctor.nameEn, doctor.nameBn)}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {t(doctor.nameBn, doctor.nameEn)}
          </p>

          {/* Specialty badge */}
          {category && (
            <span
              className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ color: category.color, backgroundColor: category.bgColor }}
            >
              {t(category.nameEn, category.nameBn)}
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="flex-shrink-0">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              doctor.available
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {doctor.available ? t("Available", "উপলব্ধ") : t("Unavailable", "অনুপলব্ধ")}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <Stethoscope size={13} className="mt-0.5 flex-shrink-0 text-gray-400" />
          <span className="truncate">{t(doctor.hospitalEn, doctor.hospitalBn)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin size={13} className="flex-shrink-0 text-gray-400" />
          <span>{doctor.district}, {doctor.division}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Phone size={13} className="flex-shrink-0 text-gray-400" />
          <span>{doctor.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <div className="flex items-center gap-1">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
            <span className="text-xs text-gray-400">({doctor.reviewCount})</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {doctor.experienceYears} {t("yrs exp.", "বছরের অভিজ্ঞতা")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#0066CC]">৳{doctor.fee}</p>
          <p className="text-xs text-gray-400">{t("per visit", "প্রতি ভিজিট")}</p>
        </div>
      </div>

      <Link
        href={`/doctors/${doctor.id}`}
        className="w-full text-center text-sm font-medium py-2 border border-[#0066CC] text-[#0066CC] rounded-lg hover:bg-[#0066CC] hover:text-white transition-colors"
      >
        {t("View Profile", "প্রোফাইল দেখুন")}
      </Link>
    </div>
  );
}
