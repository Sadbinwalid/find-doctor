"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Stethoscope } from "lucide-react";
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
    router.push(`/doctors?specialties=${recommendedSpecialties.map((c) => c.slug).join(",")}`);
  };

  return (
    <section className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Stethoscope size={20} className="text-[#0066CC]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {t("What are you feeling?", "আপনার কেমন লাগছে?")}
            </h2>
            <p className="text-sm text-gray-500">
              {t("Pick your symptoms — we'll find the right doctor", "লক্ষণ বেছে নিন — আমরা সঠিক ডাক্তার খুঁজে দেব")}
            </p>
          </div>
        </div>

        <div className="mt-5 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          {/* Search */}
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4">
            <Search size={17} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search symptoms (e.g. fever, headache)", "লক্ষণ খুঁজুন (যেমন জ্বর, মাথাব্যথা)")}
              className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-0.5">
                <X size={15} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Symptom chips — larger and easier to tap */}
          <div className="flex flex-wrap gap-2">
            {filtered.map((symptom) => {
              const isSelected = selected.includes(symptom.id);
              return (
                <button
                  key={symptom.id}
                  onClick={() => toggle(symptom.id)}
                  className={`text-sm px-4 py-2 rounded-xl border font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#0066CC] text-white border-[#0066CC] shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#0066CC] hover:text-[#0066CC]"
                  }`}
                >
                  {t(symptom.nameEn, symptom.nameBn)}
                  {isSelected && <X size={12} strokeWidth={2.5} />}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-sm text-gray-400 py-2">
                {t("No symptoms found", "কোনো লক্ষণ পাওয়া যায়নি")}
              </p>
            )}
          </div>

          {/* Recommended specialists + find button */}
          {selected.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-200">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                {t("Recommended specialists", "প্রস্তাবিত বিশেষজ্ঞ")}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendedSpecialties.map((cat) => (
                  <span
                    key={cat.slug}
                    className="text-sm font-semibold px-3 py-1.5 rounded-xl"
                    style={{ color: cat.color, backgroundColor: cat.bgColor }}
                  >
                    {t(cat.nameEn, cat.nameBn)}
                  </span>
                ))}
              </div>
              <button
                onClick={handleFind}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0066CC] text-white text-base font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
              >
                {t("Find Doctors", "ডাক্তার খুঁজুন")}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
