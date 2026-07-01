"use client";
import Link from "next/link";
import { Doctor } from "@/data/doctors";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Star, Check } from "lucide-react";
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
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Coloured top strip + avatar */}
      <div className="h-2 w-full" style={{ backgroundColor: category?.color || "#0066CC" }} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header row */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: category?.color || "#0066CC" }}
            >
              {initials}
            </div>
            {doctor.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0066CC] rounded-full flex items-center justify-center border-2 border-white">
                <Check size={11} className="text-white" strokeWidth={3} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 text-base leading-tight truncate">
                  {t(doctor.nameEn, doctor.nameBn)}
                </h3>
                {category && (
                  <span
                    className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ color: category.color, backgroundColor: category.bgColor }}
                  >
                    {t(category.nameEn, category.nameBn)}
                  </span>
                )}
              </div>
              <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                doctor.available ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-400"
              }`}>
                {doctor.available ? t("Available", "উপলব্ধ") : t("Unavailable", "অনুপলব্ধ")}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    size={13}
                    className={s <= Math.round(doctor.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
              <span className="text-xs text-gray-400">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} className="text-gray-400 flex-shrink-0" />
          <span className="truncate">{t(doctor.hospitalEn, doctor.hospitalBn)}, {doctor.district}</span>
        </div>

        {/* Fee + experience row */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <div>
            <p className="text-xs text-gray-400">{t("Consultation fee", "পরামর্শ ফি")}</p>
            <p className="text-xl font-bold text-[#0066CC]">৳{doctor.fee}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">{t("Experience", "অভিজ্ঞতা")}</p>
            <p className="text-base font-bold text-gray-800">{doctor.experienceYears}+ {t("yrs", "বছর")}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/doctors/${doctor.id}`}
          className="mt-auto block w-full text-center text-sm font-bold py-3 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 active:scale-95 transition-all"
        >
          {t("View Profile", "প্রোফাইল দেখুন")}
        </Link>
      </div>
    </div>
  );
}
