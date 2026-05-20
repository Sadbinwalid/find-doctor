"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, ChevronRight, AlertCircle, FlaskConical, Stethoscope, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { diseases } from "@/data/diseases";
import { tests } from "@/data/tests";
import { categories } from "@/data/categories";
import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/DoctorCard";
import { use } from "react";

export default function DiseasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t, tArr } = useLanguage();

  const disease = diseases.find((d) => d.slug === slug);
  if (!disease) notFound();
  const linkedTests = tests.filter((test) => disease.linkedTests.includes(test.slug));
  const linkedCategories = categories.filter((cat) => disease.linkedSpecialties.includes(cat.slug));
  const linkedDoctors = doctors.filter((doc) => disease.linkedSpecialties.includes(doc.specialty)).slice(0, 3);
  const relatedDiseases = diseases.filter((d) => disease.relatedDiseases.includes(d.slug));

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1">
            <Link href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</Link>
            <ChevronRight size={12} />
            <Link href="/diseases" className="hover:text-[#059669]">{t("Diseases", "রোগ")}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">{t(disease.nameEn, disease.nameBn)}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {t(disease.nameEn, disease.nameBn)}
          </h1>
          {disease.commonNamesBn.length > 0 && (
            <p className="text-sm text-gray-500 mb-3">
              {t(
                `Also known as: ${disease.commonNamesEn.join(", ")}`,
                `পরিচিত নাম: ${disease.commonNamesBn.join(", ")}`
              )}
            </p>
          )}
          <p className="text-base text-gray-700 leading-relaxed">
            {t(disease.shortDescEn, disease.shortDescBn)}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Overview */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">{t("Overview", "সংক্ষিপ্ত বিবরণ")}</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            {t(disease.overviewEn, disease.overviewBn)}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Symptoms */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">
              {t("Symptoms", "লক্ষণসমূহ")}
            </h2>
            <ul className="space-y-2">
              {tArr(disease.symptomsEn, disease.symptomsBn).map((symptom, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </section>

          {/* Causes */}
          <section className="bg-gray-50 border border-gray-100 rounded-xl p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">
              {t("Causes & Risk Factors", "কারণ ও ঝুঁকির কারণ")}
            </h2>
            <ul className="space-y-2">
              {tArr(disease.causesEn, disease.causesBn).map((cause, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  {cause}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* When to see a doctor */}
        <section className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-[#059669]" />
            <h2 className="text-base font-bold text-gray-900">{t("When to See a Doctor", "কখন ডাক্তার দেখাবেন")}</h2>
          </div>
          <ul className="space-y-2">
            {tArr(disease.whenToSeeEn, disease.whenToSeeBn).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 bg-[#059669] rounded-full mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Tests you may need */}
        {linkedTests.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical size={18} className="text-gray-800" />
              <h2 className="text-lg font-bold text-gray-900">{t("Tests You May Need", "যে পরীক্ষাগুলো প্রয়োজন হতে পারে")}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {linkedTests.map((test) => (
                <Link
                  key={test.slug}
                  href={`/test/${test.slug}`}
                  className="group flex items-start gap-3 border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:bg-gray-100 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FlaskConical size={14} className="text-gray-800" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 group-hover:text-gray-900 transition-colors">
                      {t(test.nameEn, test.nameBn)}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                      {t(test.whatItMeasuresEn, test.whatItMeasuresBn)}
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-1 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Find a Doctor */}
        {linkedCategories.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope size={18} className="text-[#059669]" />
              <h2 className="text-lg font-bold text-gray-900">{t("Find a Doctor for this Condition", "এই রোগের জন্য ডাক্তার খুঁজুন")}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {linkedCategories.map((cat) => {
                const count = doctors.filter((d) => d.specialty === cat.slug).length;
                return (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="group flex items-center justify-between border border-gray-200 rounded-xl p-4 hover:border-[#059669] hover:bg-emerald-50 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-sm text-gray-900 group-hover:text-[#059669] transition-colors">
                        {t(cat.nameEn, cat.nameBn)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{t(cat.descriptionEn, cat.descriptionBn)}</p>
                      <p className="text-xs text-[#059669] mt-1">{count} {t("doctors available", "জন ডাক্তার উপলব্ধ")}</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-[#059669] flex-shrink-0 ml-3 transition-colors" />
                  </Link>
                );
              })}
            </div>

            {linkedDoctors.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{t("Available Doctors", "উপলব্ধ ডাক্তার")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {linkedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href={`/doctors?specialty=${disease.linkedSpecialties[0]}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] text-white text-sm font-medium rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    {t("View all doctors for this condition", "এই রোগের সব ডাক্তার দেখুন")}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </>
            )}
          </section>
        )}

        {/* Related diseases */}
        {relatedDiseases.length > 0 && (
          <section className="border-t border-gray-100 pt-6">
            <h2 className="text-base font-semibold text-gray-700 mb-3">{t("Related Conditions", "সম্পর্কিত রোগ")}</h2>
            <div className="flex flex-wrap gap-2">
              {relatedDiseases.map((d) => (
                <Link
                  key={d.slug}
                  href={`/disease/${d.slug}`}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#059669] hover:text-[#059669] transition-colors"
                >
                  {t(d.nameEn, d.nameBn)}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
          <strong>{t("Disclaimer:", "দ্রষ্টব্য:")}</strong>{" "}
          {t(
            "This information is for general education only and does not replace professional medical advice. Always consult a qualified doctor for diagnosis and treatment.",
            "এই তথ্য শুধুমাত্র সাধারণ শিক্ষামূলক উদ্দেশ্যে এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়। রোগ নির্ণয় ও চিকিৎসার জন্য সর্বদা একজন যোগ্য ডাক্তারের পরামর্শ নিন।"
          )}
        </div>
      </div>
    </div>
  );
}
