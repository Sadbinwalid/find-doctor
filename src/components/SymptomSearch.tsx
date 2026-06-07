"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { symptoms } from "@/data/symptoms";
import { categories } from "@/data/categories";

export default function SymptomSearch() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return symptoms;
    const q = query.toLowerCase();
    return symptoms.filter(
      (s) => s.nameEn.toLowerCase().includes(q) || s.nameBn.includes(q)
    );
  }, [query]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const recommendedSpecialties = useMemo(() => {
    const slugSet = new Set<string>();
    selected.forEach((id) => {
      const sym = symptoms.find((s) => s.id === id);
      sym?.specialties.forEach((slug) => slugSet.add(slug));
    });
    return Array.from(slugSet)
      .map((slug) => categories.find((c) => c.slug === slug))
      .filter(Boolean) as typeof categories;
  }, [selected]);

  const handleFind = () => {
    if (recommendedSpecialties.length === 0) return;
    const slugs = recommendedSpecialties.map((c) => c.slug).join(",");
    router.push(`/doctors?specialties=${slugs}`);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-100">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          {t("Find doctor by symptoms", "লক্ষণ দিয়ে ডাক্তার খুঁজুন")}
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {t(
            "Select one or more symptoms — we'll recommend the right specialist",
            "এক বা একাধিক লক্ষণ বেছে নিন — আমরা সঠিক বিশেষজ্ঞ সুপারিশ করব"
          )}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        {/* Search input */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 mb-4">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              "Type a symptom (e.g. fever, headache...)",
              "লক্ষণ টাইপ করুন (যেমন জ্বর, মাথাব্যথা...)"
            )}
            className="flex-1 text-sm outline-none text-gray-900 placeholder-gray-400 bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Symptom chips */}
        <div className="flex flex-wrap gap-2">
          {filtered.map((symptom) => {
            const isSelected = selected.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                onClick={() => toggle(symptom.id)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1 ${
                  isSelected
                    ? "bg-[#0066CC] text-white border-[#0066CC]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0066CC] hover:text-[#0066CC]"
                }`}
              >
                {t(symptom.nameEn, symptom.nameBn)}
                {isSelected && <X size={10} strokeWidth={2.5} />}
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 py-1">
              {t("No matching symptoms found", "কোনো মিলিত লক্ষণ পাওয়া যায়নি")}
            </p>
          )}
        </div>

        {/* Recommendations + CTA */}
        {selected.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  {t("Recommended specialists:", "প্রস্তাবিত বিশেষজ্ঞ:")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {recommendedSpecialties.map((cat) => (
                    <span
                      key={cat.slug}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ color: cat.color, backgroundColor: cat.bgColor }}
                    >
                      {t(cat.nameEn, cat.nameBn)}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleFind}
                className="flex items-center gap-2 bg-[#0066CC] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex-shrink-0"
              >
                {t("Find Doctors", "ডাক্তার খুঁজুন")}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
