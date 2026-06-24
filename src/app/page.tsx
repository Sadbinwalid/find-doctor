"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
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
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0066CC] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full" />
              {t("1,200+ Verified Doctors", "১,২০০+ যাচাইকৃত ডাক্তার")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {t("Find the right doctor,", "সঠিক ডাক্তার খুঁজুন,")}
              <br />
              <span className="text-[#0066CC]">{t("near you", "আপনার কাছে")}</span>
            </h1>
            <p className="text-gray-500 text-base">
              {t(
                "Search across all 8 divisions of Bangladesh by specialty, location, and fee",
                "বিশেষজ্ঞতা, অবস্থান ও ফি অনুযায়ী বাংলাদেশের সব ৮টি বিভাগে অনুসন্ধান করুন"
              )}
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-3 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder={t("Doctor name, specialty, or condition...", "ডাক্তারের নাম, বিশেষজ্ঞতা বা রোগের নাম...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 text-sm outline-none text-gray-900 placeholder-gray-400 bg-transparent"
              />
            </div>

            <div className="hidden md:block w-px bg-gray-200 my-1" />

            <div className="flex items-center gap-2 px-3 py-2 relative">
              <MapPin size={16} className="text-gray-400 flex-shrink-0" />
              <select
                value={selectedDivision}
                onChange={(e) => { setSelectedDivision(e.target.value); setSelectedDistrict(""); }}
                className="text-sm text-gray-700 outline-none bg-transparent appearance-none pr-5 cursor-pointer"
              >
                <option value="">{t("All Divisions", "সব বিভাগ")}</option>
                {divisions.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="text-gray-400 absolute right-3 pointer-events-none" />
            </div>

            {selectedDivision && (
              <>
                <div className="hidden md:block w-px bg-gray-200 my-1" />
                <div className="flex items-center gap-2 px-3 py-2 relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="text-sm text-gray-700 outline-none bg-transparent appearance-none pr-5 cursor-pointer"
                  >
                    <option value="">{t("All Districts", "সব জেলা")}</option>
                    {districts.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="text-gray-400 absolute right-3 pointer-events-none" />
                </div>
              </>
            )}

            <button
              onClick={handleSearch}
              className="bg-[#0066CC] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              {t("Search", "খুঁজুন")}
            </button>
          </div>

          {/* Quick tags */}
          <div className="max-w-3xl mx-auto mt-4 flex flex-wrap gap-2 justify-center">
            {[
              { en: "Heart Doctor", bn: "হৃদরোগ বিশেষজ্ঞ", slug: "cardiologist" },
              { en: "Child Specialist", bn: "শিশু বিশেষজ্ঞ", slug: "pediatrician" },
              { en: "Skin Doctor", bn: "চর্মরোগ বিশেষজ্ঞ", slug: "dermatologist" },
              { en: "Eye Doctor", bn: "চক্ষু বিশেষজ্ঞ", slug: "ophthalmologist" },
              { en: "General Physician", bn: "সাধারণ চিকিৎসক", slug: "general-physician" },
            ].map((tag) => (
              <button
                key={tag.slug}
                onClick={() => router.push(`/category/${tag.slug}`)}
                className="text-xs px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#0066CC] text-gray-600 rounded-full transition-colors"
              >
                {t(tag.en, tag.bn)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { en: "Verified Doctors", bn: "যাচাইকৃত ডাক্তার", value: "1,200+" },
            { en: "Specialties", bn: "বিশেষজ্ঞতা", value: "40+" },
            { en: "Divisions Covered", bn: "বিভাগ অন্তর্ভুক্ত", value: "8" },
            { en: "Districts", bn: "জেলা", value: "64" },
          ].map((stat) => (
            <div key={stat.en} className="text-center">
              <p className="text-2xl font-bold text-[#0066CC]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t(stat.en, stat.bn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor CTA Banner */}
      <section className="bg-[#0066CC] border-b border-blue-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white font-bold text-lg leading-tight">
              {t("Are you a doctor?", "আপনি কি একজন ডাক্তার?")}
            </p>
            <p className="text-blue-200 text-sm mt-0.5">
              {t("Join 1,200+ verified doctors — reach patients across Bangladesh.", "১,২০০+ যাচাইকৃত ডাক্তারদের সাথে যোগ দিন — বাংলাদেশ জুড়ে রোগীদের কাছে পৌঁছান।")}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="/verify"
              className="text-sm font-medium text-blue-200 hover:text-white border border-blue-400 px-4 py-2 rounded-xl hover:border-white transition-colors"
            >
              {t("How it works", "কিভাবে কাজ করে")}
            </a>
            <a
              href="/register/doctor"
              className="text-sm font-bold bg-white text-[#0066CC] px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              {t("Register Now", "এখনই নিবন্ধন করুন")}
            </a>
          </div>
        </div>
      </section>

      {/* Symptom Search */}
      <SymptomSearch />

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t("Browse by Specialty", "বিশেষজ্ঞতা অনুযায়ী খুঁজুন")}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{t("Find the right specialist for your condition", "আপনার রোগের জন্য সঠিক বিশেষজ্ঞ খুঁজুন")}</p>
          </div>
          <a href="/specialties" className="text-sm text-[#0066CC] hover:underline hidden md:block">
            {t("View all →", "সব দেখুন →")}
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("Featured Doctors", "বিশিষ্ট ডাক্তার")}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{t("Top-rated doctors currently available", "সর্বোচ্চ রেটেড ডাক্তার যারা এখন উপলব্ধ")}</p>
            </div>
            <a href="/doctors" className="text-sm text-[#0066CC] hover:underline hidden md:block">
              {t("View all doctors →", "সব ডাক্তার দেখুন →")}
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <a
              href="/doctors"
              className="inline-block px-6 py-2.5 border border-[#0066CC] text-[#0066CC] text-sm font-medium rounded-lg hover:bg-[#0066CC] hover:text-white transition-colors"
            >
              {t("View all doctors", "সব ডাক্তার দেখুন")}
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
          {t("How to find your doctor", "কীভাবে আপনার ডাক্তার খুঁজবেন")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              en: "Choose your specialty",
              bn: "আপনার বিশেষজ্ঞতা বেছে নিন",
              descEn: "Select from 40+ medical specialties based on your health condition",
              descBn: "আপনার স্বাস্থ্য অবস্থার উপর ভিত্তি করে ৪০+ চিকিৎসা বিশেষজ্ঞতা থেকে বেছে নিন",
            },
            {
              step: "2",
              en: "Filter by location",
              bn: "অবস্থান দিয়ে ফিল্টার করুন",
              descEn: "Narrow down by division, district, and upazila to find nearby doctors",
              descBn: "কাছের ডাক্তার খুঁজতে বিভাগ, জেলা ও উপজেলা দিয়ে সংকুচিত করুন",
            },
            {
              step: "3",
              en: "View profile & contact",
              bn: "প্রোফাইল দেখুন এবং যোগাযোগ করুন",
              descEn: "Check qualifications, fees, and contact the doctor directly",
              descBn: "যোগ্যতা, ফি দেখুন এবং সরাসরি ডাক্তারের সাথে যোগাযোগ করুন",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-[#0066CC] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{t(item.en, item.bn)}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t(item.descEn, item.descBn)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-50 border-t border-red-100">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-red-800 text-sm">
              {t("Medical Emergency?", "চিকিৎসা জরুরি?")}
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              {t("For emergencies, call the national health helpline immediately", "জরুরি অবস্থায়, অবিলম্বে জাতীয় স্বাস্থ্য হেল্পলাইনে কল করুন")}
            </p>
          </div>
          <a
            href="tel:16457"
            className="bg-red-600 text-white font-bold text-lg px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex-shrink-0"
          >
            16457
          </a>
        </div>
      </section>
    </div>
  );
}
