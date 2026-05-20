"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, FlaskConical } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { tests } from "@/data/tests";

export default function TestsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = tests.filter((test) => {
    const q = search.toLowerCase();
    return (
      !q ||
      test.nameEn.toLowerCase().includes(q) ||
      test.nameBn.includes(q) ||
      test.commonNamesEn.some((n) => n.toLowerCase().includes(q)) ||
      test.commonNamesBn.some((n) => n.includes(q))
    );
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <nav className="text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</Link>
            {" / "}
            <span className="text-gray-900">{t("Diagnostic Tests", "ডায়াগনস্টিক পরীক্ষা")}</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <FlaskConical size={20} className="text-gray-800" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t("Diagnostic Tests", "ডায়াগনস্টিক পরীক্ষা")}
            </h1>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            {t(
              "Learn about common medical tests — what they measure, how to prepare, and which diseases they help diagnose.",
              "সাধারণ চিকিৎসা পরীক্ষা সম্পর্কে জানুন — কী পরিমাপ করে, কীভাবে প্রস্তুতি নিতে হয় এবং কোন রোগ নির্ণয়ে সহায়তা করে।"
            )}
          </p>
          <div className="max-w-xl flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-3 shadow-sm">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("Search tests...", "পরীক্ষা খুঁজুন...")}
              className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {search && (
          <p className="text-sm text-gray-500 mb-4">{filtered.length} {t("results", "ফলাফল")}</p>
        )}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FlaskConical size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium text-gray-600">{t("No tests found", "কোনো পরীক্ষা পাওয়া যায়নি")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((test) => (
              <Link
                key={test.slug}
                href={`/test/${test.slug}`}
                className="group flex items-start gap-4 border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:bg-gray-100 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FlaskConical size={18} className="text-gray-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-900 transition-colors">
                    {t(test.nameEn, test.nameBn)}
                  </h3>
                  {test.commonNamesEn.length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {t(test.commonNamesEn.join(" • "), test.commonNamesBn.join(" • "))}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                    {t(test.whatItMeasuresEn, test.whatItMeasuresBn)}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {t("Where:", "কোথায়:")} {t(test.facilityType, test.facilityTypeBn)}
                  </p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
