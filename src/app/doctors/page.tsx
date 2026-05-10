"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { doctors } from "@/data/doctors";
import { categories } from "@/data/categories";
import { locations } from "@/data/locations";
import DoctorCard from "@/components/DoctorCard";

function DoctorsPageInner() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDivision, setSelectedDivision] = useState(searchParams.get("division") || "");
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get("district") || "");
  const [maxFee, setMaxFee] = useState(2000);
  const [sortBy, setSortBy] = useState<"rating" | "fee_asc" | "fee_desc" | "experience">("rating");
  const [showFilters, setShowFilters] = useState(false);

  const districts = selectedDivision
    ? locations.find((l) => l.division === selectedDivision)?.districts ?? []
    : [];

  const toggleSpecialty = (slug: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filtered = useMemo(() => {
    let result = [...doctors];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(q) ||
          d.nameBn.includes(q) ||
          d.specialty.includes(q) ||
          d.hospitalEn.toLowerCase().includes(q) ||
          d.district.toLowerCase().includes(q)
      );
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter((d) => selectedSpecialties.includes(d.specialty));
    }

    if (selectedDivision) {
      result = result.filter((d) => d.division === selectedDivision);
    }

    if (selectedDistrict) {
      result = result.filter((d) => d.district === selectedDistrict);
    }

    result = result.filter((d) => d.fee <= maxFee);

    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "fee_asc") return a.fee - b.fee;
      if (sortBy === "fee_desc") return b.fee - a.fee;
      if (sortBy === "experience") return b.experienceYears - a.experienceYears;
      return 0;
    });

    return result;
  }, [search, selectedSpecialties, selectedDivision, selectedDistrict, maxFee, sortBy]);

  const activeFiltersCount =
    selectedSpecialties.length +
    (selectedDivision ? 1 : 0) +
    (selectedDistrict ? 1 : 0) +
    (maxFee < 2000 ? 1 : 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-4">
        <a href="/" className="hover:text-[#0066CC]">{t("Home", "হোম")}</a>
        {" / "}
        <span className="text-gray-900">{t("Find Doctors", "ডাক্তার খুঁজুন")}</span>
      </nav>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t("Find Doctors", "ডাক্তার খুঁজুন")}</h1>
          <p className="text-sm text-gray-500">{filtered.length} {t("doctors found", "জন ডাক্তার পাওয়া গেছে")}</p>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
          <Search size={15} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("Search doctors...", "ডাক্তার খুঁজুন...")}
            className="flex-1 text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400"
          />
          {search && <button onClick={() => setSearch("")}><X size={14} className="text-gray-400 hover:text-gray-600" /></button>}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar — desktop */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-5 sticky top-20">
            {/* Specialty */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">{t("Specialty", "বিশেষজ্ঞতা")}</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedSpecialties.includes(cat.slug)}
                      onChange={() => toggleSpecialty(cat.slug)}
                      className="w-3.5 h-3.5 accent-[#0066CC]"
                    />
                    <span className="text-xs text-gray-600 group-hover:text-gray-900">
                      {t(cat.nameEn, cat.nameBn)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Division */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{t("Division", "বিভাগ")}</h3>
              <div className="relative">
                <select
                  value={selectedDivision}
                  onChange={(e) => { setSelectedDivision(e.target.value); setSelectedDistrict(""); }}
                  className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none appearance-none bg-white text-gray-700"
                >
                  <option value="">{t("All", "সব")}</option>
                  {locations.map((l) => (
                    <option key={l.division} value={l.division}>{l.division}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* District */}
            {selectedDivision && (
              <div>
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{t("District", "জেলা")}</h3>
                <div className="relative">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 outline-none appearance-none bg-white text-gray-700"
                  >
                    <option value="">{t("All", "সব")}</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Fee range */}
            <div>
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{t("Max Fee", "সর্বোচ্চ ফি")}</h3>
              <input
                type="range"
                min={200}
                max={2000}
                step={100}
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-[#0066CC]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>৳200</span>
                <span className="font-medium text-[#0066CC]">৳{maxFee}</span>
              </div>
            </div>

            {/* Clear */}
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSelectedSpecialties([]);
                  setSelectedDivision("");
                  setSelectedDistrict("");
                  setMaxFee(2000);
                }}
                className="text-xs text-red-500 hover:text-red-700 text-left"
              >
                {t("Clear all filters", "সব ফিল্টার মুছুন")} ({activeFiltersCount})
              </button>
            )}
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Mobile search + filter toggle */}
          <div className="md:hidden flex gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Search...", "খুঁজুন...")}
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white"
            >
              <SlidersHorizontal size={15} />
              {activeFiltersCount > 0 && (
                <span className="bg-[#0066CC] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{activeFiltersCount}</span>
              )}
            </button>
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <p className="text-sm text-gray-500 hidden md:block">
              {filtered.length} {t("results", "ফলাফল")}
            </p>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-gray-500">{t("Sort by:", "সাজান:")}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 outline-none bg-white text-gray-700"
              >
                <option value="rating">{t("Rating", "রেটিং")}</option>
                <option value="fee_asc">{t("Fee: Low to High", "ফি: কম থেকে বেশি")}</option>
                <option value="fee_desc">{t("Fee: High to Low", "ফি: বেশি থেকে কম")}</option>
                <option value="experience">{t("Experience", "অভিজ্ঞতা")}</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium text-gray-600">{t("No doctors found", "কোনো ডাক্তার পাওয়া যায়নি")}</p>
              <p className="text-sm mt-1">{t("Try adjusting your filters", "আপনার ফিল্টার পরিবর্তন করুন")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense>
      <DoctorsPageInner />
    </Suspense>
  );
}
