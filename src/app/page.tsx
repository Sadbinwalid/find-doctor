"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import { doctors } from "@/data/doctors";
import { diseases } from "@/data/diseases";
import CategoryCard from "@/components/CategoryCard";
import DoctorCard from "@/components/DoctorCard";

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) router.push(`/doctors?q=${encodeURIComponent(searchQuery)}`);
    else router.push("/doctors");
  };

  const featuredDoctors = doctors.filter((d) => d.available).slice(0, 6);
  const topDiseases = ["diabetes", "hypertension", "dengue", "typhoid", "gastric", "heart-disease", "asthma", "child-fever"];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {t("Find the right doctor", "সঠিক ডাক্তার খুঁজুন")}
            <br />
            <span className="text-[#059669]">{t("in Bangladesh", "বাংলাদেশে")}</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {t(
              "Search by doctor name, specialty, disease, or location to find and contact a doctor directly.",
              "ডাক্তারের নাম, বিশেষজ্ঞতা, রোগ বা অবস্থান দিয়ে খুঁজুন এবং সরাসরি যোগাযোগ করুন।"
            )}
          </p>

          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-white shadow-sm max-w-xl mx-auto">
            <Search size={16} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder={t(
                "Doctor name, specialty, disease…",
                "ডাক্তারের নাম, বিশেষজ্ঞতা, রোগ…"
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
            />
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-gray-400 border border-gray-200 rounded">/</kbd>
          </div>

          {/* Quick specialty chips */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {[
              { en: "Heart Doctor", bn: "হৃদরোগ", slug: "cardiologist" },
              { en: "Child Specialist", bn: "শিশু বিশেষজ্ঞ", slug: "pediatrician" },
              { en: "Skin Doctor", bn: "চর্মরোগ", slug: "dermatologist" },
              { en: "Eye Doctor", bn: "চক্ষু বিশেষজ্ঞ", slug: "ophthalmologist" },
              { en: "General Physician", bn: "সাধারণ চিকিৎসক", slug: "general-physician" },
            ].map((tag) => (
              <button
                key={tag.slug}
                onClick={() => router.push(`/category/${tag.slug}`)}
                className="text-xs px-3 py-1.5 border border-gray-200 rounded-full text-gray-600 hover:border-[#059669] hover:text-[#059669] transition-colors"
              >
                {t(tag.en, tag.bn)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "1,200+", en: "Verified Doctors", bn: "যাচাইকৃত ডাক্তার" },
            { value: "40+", en: "Specialties", bn: "বিশেষজ্ঞতা" },
            { value: "8", en: "Divisions", bn: "বিভাগ" },
            { value: "64", en: "Districts", bn: "জেলা" },
          ].map((stat, i) => (
            <div key={i} className="border border-gray-200 rounded-xl px-4 py-4 text-center">
              <p className={`text-2xl font-bold ${i === 1 ? "text-[#059669]" : "text-gray-900"}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{t(stat.en, stat.bn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse by Disease */}
      <section className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {t("Browse by Disease", "রোগ অনুযায়ী খুঁজুন")}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {t("Don't know the specialty? Start with your condition.", "বিশেষজ্ঞতা জানেন না? রোগ দিয়ে শুরু করুন।")}
              </p>
            </div>
            <a href="/diseases" className="flex items-center gap-1 text-xs text-[#059669] hover:underline font-medium">
              {t("View all", "সব দেখুন")} <ChevronRight size={12} />
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {topDiseases.map((slug) => {
              const d = diseases.find((x) => x.slug === slug);
              if (!d) return null;
              return (
                <a
                  key={slug}
                  href={`/disease/${slug}`}
                  className="px-3 py-1.5 border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#059669] hover:text-[#059669] transition-colors"
                >
                  {t(d.nameEn, d.nameBn)}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">{t("Browse by Specialty", "বিশেষজ্ঞতা অনুযায়ী")}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t("Find the right specialist for your condition", "আপনার রোগের সঠিক বিশেষজ্ঞ")}</p>
            </div>
            <a href="/specialties" className="flex items-center gap-1 text-xs text-[#059669] hover:underline font-medium">
              {t("View all", "সব দেখুন")} <ChevronRight size={12} />
            </a>
          </div>
          <div className="flex flex-col gap-2">
            {categories.slice(0, 8).map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">{t("Available Doctors", "উপলব্ধ ডাক্তার")}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t("Top-rated doctors available now", "এখন উপলব্ধ শীর্ষ রেটেড ডাক্তার")}</p>
            </div>
            <a href="/doctors" className="flex items-center gap-1 text-xs text-[#059669] hover:underline font-medium">
              {t("View all", "সব দেখুন")} <ChevronRight size={12} />
            </a>
          </div>
          <div className="flex flex-col gap-2">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section>
        <div className="max-w-2xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900 text-sm">{t("Medical Emergency?", "চিকিৎসা জরুরি?")}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {t("Call the national health helpline immediately", "অবিলম্বে জাতীয় স্বাস্থ্য হেল্পলাইনে কল করুন")}
            </p>
          </div>
          <a
            href="tel:16457"
            className="bg-[#059669] text-white font-bold text-lg px-6 py-2 rounded-lg hover:bg-[#047857] transition-colors flex-shrink-0"
          >
            16457
          </a>
        </div>
      </section>
    </div>
  );
}
