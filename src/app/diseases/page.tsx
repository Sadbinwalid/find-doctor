"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { diseases, bodySystems } from "@/data/diseases";

export default function DiseasesPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeSystem, setActiveSystem] = useState("all");

  const filtered = diseases.filter((d) => {
    const matchSystem = activeSystem === "all" || d.bodySystem === activeSystem;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.nameEn.toLowerCase().includes(q) ||
      d.nameBn.includes(q) ||
      d.commonNamesEn.some((n) => n.toLowerCase().includes(q)) ||
      d.commonNamesBn.some((n) => n.includes(q)) ||
      d.symptomsEn.some((s) => s.toLowerCase().includes(q));
    return matchSystem && matchSearch;
  });

  const commonDiseases = ["diabetes", "hypertension", "dengue", "typhoid", "gastric", "heart-disease", "asthma", "child-fever"];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <nav className="text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</Link>
            {" / "}
            <span className="text-gray-900">{t("Diseases & Conditions", "রোগ ও অবস্থা")}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t("Diseases & Conditions", "রোগ ও অবস্থা")}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {t(
              "Learn about diseases, their symptoms, required tests, and find the right doctor.",
              "রোগ সম্পর্কে জানুন, লক্ষণ, প্রয়োজনীয় পরীক্ষা এবং সঠিক ডাক্তার খুঁজুন।"
            )}
          </p>

          {/* Search */}
          <div className="max-w-xl flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-3 shadow-sm">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("Search by disease name or symptom...", "রোগের নাম বা লক্ষণ দিয়ে খুঁজুন...")}
              className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick access — common diseases */}
        {!search && activeSystem === "all" && (
          <div className="mb-10">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              {t("Commonly Searched", "সাধারণত খোঁজা হয়")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {commonDiseases.map((slug) => {
                const d = diseases.find((x) => x.slug === slug);
                if (!d) return null;
                return (
                  <Link
                    key={slug}
                    href={`/disease/${slug}`}
                    className="px-4 py-2 bg-emerald-50/40 hover:bg-emerald-100 text-[#059669] text-sm rounded-full transition-colors font-medium"
                  >
                    {t(d.nameEn, d.nameBn)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Body system filter */}
        {!search && (
          <div className="mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-1 min-w-max">
              <button
                onClick={() => setActiveSystem("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeSystem === "all"
                    ? "bg-[#059669] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("All Systems", "সব সিস্টেম")}
              </button>
              {bodySystems.map((sys) => (
                <button
                  key={sys.key}
                  onClick={() => setActiveSystem(sys.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSystem === sys.key
                      ? "bg-[#059669] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {t(sys.en, sys.bn)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-600">{t("No diseases found", "কোনো রোগ পাওয়া যায়নি")}</p>
            <p className="text-sm mt-1">{t("Try a different search term", "অন্য শব্দ দিয়ে চেষ্টা করুন")}</p>
          </div>
        ) : (
          <>
            {search && (
              <p className="text-sm text-gray-500 mb-4">{filtered.length} {t("results", "ফলাফল")}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((disease) => (
                <Link
                  key={disease.slug}
                  href={`/disease/${disease.slug}`}
                  className="group border border-gray-200 rounded-xl p-5 hover:border-[#059669] hover:shadow-sm transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#059669] transition-colors">
                        {t(disease.nameEn, disease.nameBn)}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t(disease.nameEn === disease.nameBn ? "" : disease.nameBn, disease.nameEn)}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#059669] flex-shrink-0 mt-1 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {t(disease.shortDescEn, disease.shortDescBn)}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <span>{disease.linkedSpecialties.length} {t("specialist type(s)", "বিশেষজ্ঞ ধরন")}</span>
                    <span>•</span>
                    <span>{disease.linkedTests.length} {t("test(s)", "পরীক্ষা")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
