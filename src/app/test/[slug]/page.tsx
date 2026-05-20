"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FlaskConical, MapPin, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { tests } from "@/data/tests";
import { diseases } from "@/data/diseases";
import { use } from "react";

export default function TestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useLanguage();

  const test = tests.find((t) => t.slug === slug);
  if (!test) notFound();

  const linkedDiseases = diseases.filter((d) => test.linkedDiseases.includes(d.slug));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-100 to-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1 flex-wrap">
            <Link href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</Link>
            <ChevronRight size={12} />
            <Link href="/tests" className="hover:text-[#059669]">{t("Tests", "পরীক্ষা")}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">{t(test.nameEn, test.nameBn)}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <FlaskConical size={22} className="text-gray-800" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t(test.nameEn, test.nameBn)}
              </h1>
              {test.commonNamesEn.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {t(
                    `Also called: ${test.commonNamesEn.join(", ")}`,
                    `অন্য নাম: ${test.commonNamesBn.join(", ")}`
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* What it measures */}
        <section className="border border-gray-200 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-2">{t("What It Measures", "কী পরিমাপ করে")}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t(test.whatItMeasuresEn, test.whatItMeasuresBn)}</p>
        </section>

        {/* Why it's done */}
        <section className="border border-emerald-100 bg-emerald-50/40 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-2">{t("Why It's Done", "কেন করা হয়")}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{t(test.whyItsDoneEn, test.whyItsDoneBn)}</p>
        </section>

        {/* How to prepare */}
        <section className="border border-green-100 bg-green-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-green-700" />
            <h2 className="text-base font-bold text-gray-900">{t("How to Prepare", "কীভাবে প্রস্তুতি নেবেন")}</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{t(test.howToPrepareEn, test.howToPrepareBn)}</p>
        </section>

        {/* Where to get it */}
        <section className="flex items-start gap-3 border border-gray-200 rounded-xl p-5">
          <MapPin size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">{t("Where to Get It", "কোথায় করাবেন")}</h2>
            <p className="text-sm text-gray-600">{t(test.facilityType, test.facilityTypeBn)}</p>
          </div>
        </section>

        {/* Linked diseases */}
        {linkedDiseases.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">
              {t("Related Diseases & Conditions", "সম্পর্কিত রোগ ও অবস্থা")}
            </h2>
            <div className="flex flex-col gap-2">
              {linkedDiseases.map((disease) => (
                <Link
                  key={disease.slug}
                  href={`/disease/${disease.slug}`}
                  className="group flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:border-[#059669] hover:bg-emerald-50 transition-all"
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900 group-hover:text-[#059669] transition-colors">
                      {t(disease.nameEn, disease.nameBn)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{t(disease.shortDescEn, disease.shortDescBn)}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-[#059669] flex-shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="text-center pt-2">
          <Link href="/tests" className="text-sm text-[#059669] hover:underline">
            ← {t("Back to all tests", "সব পরীক্ষায় ফিরে যান")}
          </Link>
        </div>
      </div>
    </div>
  );
}
