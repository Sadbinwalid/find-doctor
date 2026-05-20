"use client";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import { doctors } from "@/data/doctors";
import CategoryCard from "@/components/CategoryCard";

export default function SpecialtiesPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-500 mb-4">
        <a href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</a>
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
          return (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: cat.bgColor }}
              >
                <span className="text-xl font-bold" style={{ color: cat.color }}>
                  {cat.nameEn[0]}
                </span>
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
