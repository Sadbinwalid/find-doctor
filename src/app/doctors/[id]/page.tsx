"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Star, Award, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { doctors } from "@/data/doctors";
import { categories } from "@/data/categories";

export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) notFound();

  const category = categories.find((c) => c.slug === doctor.specialty);

  const initials = doctor.nameEn
    .split(" ")
    .filter((w) => w !== "Dr.")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Link href="/" className="hover:text-[#059669]">{t("Home", "হোম")}</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#059669]">{t("Doctors", "ডাক্তার")}</Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{t(doctor.nameEn, doctor.nameBn)}</span>
        </nav>

        <Link href="/doctors" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#059669] mb-5">
          <ArrowLeft size={15} />
          {t("Back to doctors", "ডাক্তারদের কাছে ফিরে যান")}
        </Link>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-5">
          <div className="flex gap-5 items-start">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
              style={{ backgroundColor: category?.color || "#059669" }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t(doctor.nameEn, doctor.nameBn)}</h1>
                  <p className="text-sm text-gray-500">{t(doctor.nameBn, doctor.nameEn)}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${
                    doctor.available ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {doctor.available ? t("Available", "উপলব্ধ") : t("Unavailable", "অনুপলব্ধ")}
                </span>
              </div>

              {category && (
                <span
                  className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ color: category.color, backgroundColor: category.bgColor }}
                >
                  {t(category.nameEn, category.nameBn)}
                </span>
              )}

              {/* Qualifications */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {doctor.qualifications.map((q) => (
                  <span key={q} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-900">{doctor.rating}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{doctor.reviewCount} {t("reviews", "রিভিউ")}</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="font-bold text-gray-900">{doctor.experienceYears}+</p>
              <p className="text-xs text-gray-500 mt-0.5">{t("Years exp.", "বছরের অভিজ্ঞতা")}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-[#059669]">৳{doctor.fee}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t("Per visit", "প্রতি ভিজিট")}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* About */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award size={16} className="text-[#059669]" />
                {t("About", "সম্পর্কে")}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(doctor.aboutEn, doctor.aboutBn)}
              </p>
            </div>

            {/* When to see */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <CheckCircle size={16} className="text-[#00A86B]" />
                {t("When to see this doctor", "কখন এই ডাক্তারকে দেখাবেন")}
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                {t("Consult this specialist if you experience:", "এই বিশেষজ্ঞকে দেখান যদি আপনার হয়:")}
              </p>
              <ul className="flex flex-col gap-2">
                {doctor.whenToSeeEn.map((item, i) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-2 flex-shrink-0" />
                        {t(item, doctor.whenToSeeBn[i] ?? item)}
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Contact */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-semibold text-gray-900 mb-4">{t("Contact & Location", "যোগাযোগ ও অবস্থান")}</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <Phone size={15} className="text-[#059669] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{t("Phone", "ফোন")}</p>
                    <a href={`tel:${doctor.phone}`} className="text-sm font-medium text-gray-900 hover:text-[#059669]">
                      {doctor.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#059669] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{t("Hospital", "হাসপাতাল")}</p>
                    <p className="text-sm font-medium text-gray-900">{t(doctor.hospitalEn, doctor.hospitalBn)}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t(doctor.addressEn, doctor.addressBn)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={15} className="text-[#00A86B] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">{t("Status", "অবস্থা")}</p>
                    <p className={`text-sm font-medium ${doctor.available ? "text-[#00A86B]" : "text-gray-400"}`}>
                      {doctor.available ? t("Currently Available", "বর্তমানে উপলব্ধ") : t("Not Available", "উপলব্ধ নয়")}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${doctor.phone}`}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-[#059669] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                <Phone size={15} />
                {t("Call Doctor", "ডাক্তারকে কল করুন")}
              </a>
            </div>

            {/* Fee card */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs text-[#059669] font-medium">{t("Consultation Fee", "পরামর্শ ফি")}</p>
              <p className="text-3xl font-bold text-[#059669] mt-1">৳{doctor.fee}</p>
              <p className="text-xs text-emerald-600 mt-0.5">{t("per visit", "প্রতি ভিজিট")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
