"use client";
import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { locations } from "@/data/locations";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BLANK = {
  nameEn: "",
  age: 0,
  bloodGroup: "",
  divisionEn: "",
  districtEn: "",
  phone: "",
  memberSince: String(new Date().getFullYear()),
  conditions: [] as string[],
};

export default function OnboardingModal() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(BLANK);

  useEffect(() => {
    if (!localStorage.getItem("user_onboarded")) setShow(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem("user_onboarded", "true");
    setShow(false);
  };

  const finish = () => {
    const existing = localStorage.getItem("profile_data");
    const base = existing ? JSON.parse(existing) : {};
    const merged = {
      ...base,
      memberSince: BLANK.memberSince,
      conditions: base.conditions ?? [],
      ...(form.nameEn && { nameEn: form.nameEn }),
      ...(form.phone && { phone: form.phone }),
      ...(form.bloodGroup && { bloodGroup: form.bloodGroup }),
      ...(form.age && { age: form.age }),
      ...(form.divisionEn && { divisionEn: form.divisionEn }),
      ...(form.districtEn && { districtEn: form.districtEn }),
    };
    localStorage.setItem("profile_data", JSON.stringify(merged));
    dismiss();
  };

  if (!show) return null;

  const districts = form.divisionEn
    ? (locations.find((l) => l.division === form.divisionEn)?.districts ?? [])
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Progress + close */}
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    s <= step ? "bg-[#0066CC] w-8" : "bg-gray-200 w-4"
                  }`}
                />
              ))}
            </div>
            <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 p-1">
              <X size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-400">{t(`Step ${step} of 3`, `ধাপ ${step}/৩`)}</p>
        </div>

        <div className="px-6 pb-6">
          {/* Step 1 — Basic Info */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("Welcome to DoctorBD!", "DoctorBD-তে স্বাগতম!")}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t("Tell us a bit about yourself to get started.", "শুরু করতে নিজের সম্পর্কে কিছু বলুন।")}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                  {t("Your Name", "আপনার নাম")} *
                </label>
                <input
                  type="text"
                  placeholder={t("Enter your full name", "আপনার পুরো নাম লিখুন")}
                  value={form.nameEn}
                  onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                  {t("Phone Number", "ফোন নম্বর")} ({t("optional", "ঐচ্ছিক")})
                </label>
                <input
                  type="tel"
                  placeholder="01X-XXXXXXXX"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
            </div>
          )}

          {/* Step 2 — Health Info */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("Health Information", "স্বাস্থ্য তথ্য")}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t("Helps doctors understand your background.", "ডাক্তারদের আপনার পটভূমি বুঝতে সাহায্য করে।")}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                  {t("Blood Group", "রক্তের গ্রুপ")}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {BLOOD_GROUPS.map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setForm((f) => ({ ...f, bloodGroup: bg }))}
                      className={`text-sm font-semibold py-2 rounded-lg border transition-colors ${
                        form.bloodGroup === bg
                          ? "bg-red-50 border-red-400 text-red-600"
                          : "border-gray-200 text-gray-600 hover:border-red-300"
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Age", "বয়স")}</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  placeholder={t("Your age", "আপনার বয়স")}
                  value={form.age || ""}
                  onChange={(e) => setForm((f) => ({ ...f, age: Number(e.target.value) }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
            </div>
          )}

          {/* Step 3 — Location */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{t("Your Location", "আপনার অবস্থান")}</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {t("We'll show you nearby doctors first.", "আমরা প্রথমে কাছের ডাক্তার দেখাব।")}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Division", "বিভাগ")}</label>
                <select
                  value={form.divisionEn}
                  onChange={(e) => setForm((f) => ({ ...f, divisionEn: e.target.value, districtEn: "" }))}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC] bg-white"
                >
                  <option value="">{t("Select division", "বিভাগ বেছে নিন")}</option>
                  {locations.map((l) => (
                    <option key={l.division} value={l.division}>
                      {l.division} / {l.divisionBn}
                    </option>
                  ))}
                </select>
              </div>
              {form.divisionEn && (
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("District", "জেলা")}</label>
                  <select
                    value={form.districtEn}
                    onChange={(e) => setForm((f) => ({ ...f, districtEn: e.target.value }))}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    <option value="">{t("Select district", "জেলা বেছে নিন")}</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} / {d.nameBn}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex-1 text-sm font-medium py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {t("Back", "পিছনে")}
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={step === 1 && !form.nameEn.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex-1 text-sm font-semibold py-2.5 rounded-xl bg-[#0066CC] text-white hover:bg-blue-700 transition-colors"
              >
                {t("Get Started", "শুরু করুন")}
              </button>
            )}
          </div>

          {step === 1 && (
            <button onClick={dismiss} className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 text-center">
              {t("Skip for now", "এখনের জন্য এড়িয়ে যান")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
