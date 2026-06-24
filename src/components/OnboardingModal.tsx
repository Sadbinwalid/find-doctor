"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function OnboardingModal() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (pathname === "/auth") return;
    const onboarded = localStorage.getItem("user_onboarded");
    const dismissed = sessionStorage.getItem("welcome_dismissed");
    if (!onboarded && !dismissed) setShow(true);
  }, [pathname]);

  const dismiss = () => {
    sessionStorage.setItem("welcome_dismissed", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-40 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex gap-3 items-start">
      <div className="w-9 h-9 bg-[#0066CC] rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-sm">D</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{t("Welcome to DoctorBD!", "DoctorBD-তে স্বাগতম!")}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
          {t("Create a free account to save doctors and track your health.", "ডাক্তার সেভ করতে ও স্বাস্থ্য ট্র্যাক করতে বিনামূল্যে অ্যাকাউন্ট তৈরি করুন।")}
        </p>
        <button
          onClick={() => { dismiss(); router.push("/auth"); }}
          className="mt-2 text-xs font-semibold text-white bg-[#0066CC] px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("Get Started", "শুরু করুন")}
        </button>
      </div>
      <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 flex-shrink-0 -mt-0.5">
        <X size={16} />
      </button>
    </div>
  );
}
