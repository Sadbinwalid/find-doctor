"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { categories } from "@/data/categories";
import { doctors } from "@/data/doctors";
import { locations } from "@/data/locations";
import CategoryCard from "@/components/CategoryCard";
import DoctorCard from "@/components/DoctorCard";
import SymptomSearch from "@/components/SymptomSearch";

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const divisions = locations.map((l) => ({ value: l.division, label: `${l.division} / ${l.divisionBn}` }));
  const districts = selectedDivision
    ? locations.find((l) => l.division === selectedDivision)?.districts.map((d) => ({ value: d.name, label: `${d.name} / ${d.nameBn}` })) ?? []
    : [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedDivision) params.set("division", selectedDivision);
    if (selectedDistrict) params.set("district", selectedDistrict);
    router.push(`/doctors?${params.toString()}`);
  };

  const featuredDoctors = doctors.filter((d) => d.available).slice(0, 6);

  return (
    <div className="bg-[#f4f6f9]">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#0066CC] to-[#0052a3]">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-20">

          {/* Trust badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              {t("1,200+ Verified Doctors across Bangladesh", "বাংলাদেশে ১,২০০+ যাচাইকৃত ডাক্তার")}
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
              {t("Find the right", "সঠিক ডাক্তার")}
              <br />
              <span className="text-blue-200">{t("doctor, near you", "আপনার কাছেই")}</span>
            </h1>
            <p className="text-blue-100 text-base md:text-lg max-w-xl mx-auto">
              {t(
                "Search by specialty, location, and fee — all 8 divisions covered",
                "বিশেষজ্ঞতা, অবস্থান ও ফি অনুযায়ী খুঁজুন — ৮টি বিভাগ অন্তর্ভুক্ত"
              )}
            </p>
          </div>

          {/* Search card — lifts up from the blue hero */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-3">
            {/* Main search row */}
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder={t("Doctor name, specialty, condition...", "ডাক্তারের নাম, বিশেষজ্ঞতা বা রোগ...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1 md:flex-none flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 relative">
                  <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                  <select
                    value={selectedDivision}
                    onChange={(e) => { setSelectedDivision(e.target.value); setSelectedDistrict(""); }}
                    className="text-sm text-gray-700 outline-none bg-transparent appearance-none pr-5 cursor-pointer min-w-0"
                  >
                    <option value="">{t("Division", "বিভাগ")}</option>
                    {divisions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                  <ChevronDown size={13} className="text-gray-400 absolute right-3 pointer-events-none" />
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-[#0066CC] text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex-shrink-0 flex items-center gap-2"
                >
                  <Search size={16} />
                  <span className="hidden sm:inline">{t("Search", "খুঁজুন")}</span>
                </button>
              </div>
            </div>

            {/* Quick specialty tags */}
            <div className="flex flex-wrap gap-2 mt-3 px-1">
              {[
                { en: "Heart", bn: "হৃদরোগ", slug: "cardiologist" },
                { en: "Child", bn: "শিশু", slug: "pediatrician" },
                { en: "Skin", bn: "চর্মরোগ", slug: "dermatologist" },
                { en: "Eye", bn: "চক্ষু", slug: "ophthalmologist" },
                { en: "General", bn: "সাধারণ", slug: "general-physician" },
                { en: "ENT", bn: "নাক-কান-গলা", slug: "ent" },
              ].map((tag) => (
                <button
                  key={tag.slug}
                  onClick={() => router.push(`/category/${tag.slug}`)}
                  className="text-xs font-medium px-3 py-1.5 bg-blue-50 text-[#0066CC] rounded-full hover:bg-blue-100 active:scale-95 transition-all"
                >
                  {t(tag.en, tag.bn)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-4 gap-2 md:gap-4">
          {[
            { en: "Doctors", bn: "ডাক্তার", value: "1,200+" },
            { en: "Specialties", bn: "বিশেষজ্ঞতা", value: "40+" },
            { en: "Divisions", bn: "বিভাগ", value: "8" },
            { en: "Districts", bn: "জেলা", value: "64" },
          ].map((stat) => (
            <div key={stat.en} className="text-center">
              <p className="text-xl md:text-2xl font-bold text-[#0066CC]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t(stat.en, stat.bn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Symptom Search ── */}
      <SymptomSearch />

      {/* ── Browse by Specialty ── */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("Browse by Specialty", "বিশেষজ্ঞতা অনুযায়ী খুঁজুন")}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{t("Tap a specialty to see available doctors", "বিশেষজ্ঞতা ট্যাপ করুন এবং ডাক্তার দেখুন")}</p>
            </div>
            <a href="/specialties" className="text-sm font-medium text-[#0066CC] hidden md:flex items-center gap-1 hover:underline">
              {t("See all", "সব দেখুন")} <ArrowRight size={14} />
            </a>
          </div>
          {/* 3 cols on mobile (easy to tap), 4 on tablet, 6 on desktop */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
          <div className="mt-4 text-center md:hidden">
            <a href="/specialties" className="text-sm font-medium text-[#0066CC] flex items-center gap-1 justify-center">
              {t("See all specialties", "সব বিশেষজ্ঞতা দেখুন")} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Doctor CTA Banner ── */}
      <section className="bg-[#0066CC]">
        <div className="max-w-6xl mx-auto px-4 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg">{t("Are you a doctor?", "আপনি কি একজন ডাক্তার?")}</p>
            <p className="text-blue-200 text-sm mt-0.5">
              {t("Join 1,200+ verified doctors on DoctorBD", "DoctorBD-তে ১,২০০+ যাচাইকৃত ডাক্তারদের সাথে যোগ দিন")}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="/verify" className="text-sm font-medium text-blue-200 hover:text-white border border-blue-400 px-4 py-2.5 rounded-xl hover:border-white transition-colors">
              {t("How it works", "কিভাবে কাজ করে")}
            </a>
            <a href="/register/doctor" className="text-sm font-bold bg-white text-[#0066CC] px-5 py-2.5 rounded-xl hover:bg-blue-50 active:scale-95 transition-all">
              {t("Register Now", "এখনই নিবন্ধন")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Doctors ── */}
      <section className="bg-[#f4f6f9]">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("Featured Doctors", "বিশিষ্ট ডাক্তার")}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{t("Top-rated, currently available", "সর্বোচ্চ রেটেড, এখন উপলব্ধ")}</p>
            </div>
            <a href="/doctors" className="text-sm font-medium text-[#0066CC] hidden md:flex items-center gap-1 hover:underline">
              {t("See all", "সব দেখুন")} <ArrowRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="/doctors"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0066CC] text-white text-sm font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
            >
              {t("See all doctors", "সব ডাক্তার দেখুন")} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            {t("How it works", "কীভাবে কাজ করে")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                key: "1",
                stepEn: "1", stepBn: "১",
                en: "Choose a specialty",
                bn: "বিশেষজ্ঞতা বেছে নিন",
                descEn: "Pick from 40+ specialties based on your health need",
                descBn: "আপনার স্বাস্থ্য অবস্থার উপর ভিত্তি করে বিশেষজ্ঞ বেছে নিন",
              },
              {
                key: "2",
                stepEn: "2", stepBn: "২",
                en: "Filter by location",
                bn: "অবস্থান দিয়ে ফিল্টার করুন",
                descEn: "Find doctors near your division, district, or upazila",
                descBn: "আপনার বিভাগ, জেলা বা উপজেলার কাছের ডাক্তার খুঁজুন",
              },
              {
                key: "3",
                stepEn: "3", stepBn: "৩",
                en: "Call the doctor",
                bn: "ডাক্তারকে ফোন করুন",
                descEn: "Check fees and qualifications, then call directly",
                descBn: "ফি ও যোগ্যতা দেখুন, তারপর সরাসরি কল করুন",
              },
            ].map((item) => (
              <div key={item.key} className="flex gap-4 items-start p-5 bg-gray-50 rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-[#0066CC] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                  {t(item.stepEn, item.stepBn)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{t(item.en, item.bn)}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{t(item.descEn, item.descBn)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency Banner ── */}
      <section className="bg-red-600">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-center md:text-left">
            <p className="font-bold text-white text-base">
              {t("Medical Emergency?", "চিকিৎসা জরুরি?")}
            </p>
            <p className="text-red-100 text-sm mt-0.5">
              {t("Call the national health helpline now", "এখনই জাতীয় স্বাস্থ্য হেল্পলাইনে কল করুন")}
            </p>
          </div>
          <a
            href="tel:16457"
            className="flex items-center gap-2 bg-white text-red-600 font-bold text-xl px-8 py-3 rounded-xl hover:bg-red-50 active:scale-95 transition-all flex-shrink-0"
          >
            <Phone size={20} />
            16457
          </a>
        </div>
      </section>
    </div>
  );
}
