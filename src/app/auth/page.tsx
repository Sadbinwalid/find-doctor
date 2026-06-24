"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { locations } from "@/data/locations";

type Step = "method" | "phone" | "otp" | "email" | "profile" | "location" | "done";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AuthPage() {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("method");
  const [isSignIn, setIsSignIn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Fields
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (isAuthenticated && step !== "done") router.replace("/profile");
  }, [isAuthenticated, step, router]);

  const districts = division
    ? (locations.find((l) => l.division === division)?.districts ?? [])
    : [];

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setStep("profile");
    }, 1200);
  };

  const saveAndFinish = () => {
    const existing = localStorage.getItem("profile_data");
    const base = existing ? JSON.parse(existing) : {};
    const merged = {
      ...base,
      memberSince: String(new Date().getFullYear()),
      conditions: base.conditions ?? [],
      ...(name && { nameEn: name }),
      ...(bloodGroup && { bloodGroup }),
      ...(age && { age: Number(age) }),
      ...(division && { divisionEn: division }),
      ...(district && { districtEn: district }),
      ...(phone && { phone }),
    };
    localStorage.setItem("profile_data", JSON.stringify(merged));
    login();
    setStep("done");
    setTimeout(() => router.push("/profile"), 2000);
  };

  const progress =
    step === "method" ? 0 :
    step === "phone" || step === "email" ? 20 :
    step === "otp" ? 35 :
    step === "profile" ? 60 :
    step === "location" ? 80 :
    100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0066CC]">
          <ArrowLeft size={15} />
          {t("DoctorBD", "DoctorBD")}
        </Link>
        {step !== "method" && step !== "done" && (
          <div className="flex-1 max-w-xs mx-4">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0066CC] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <span className="text-xs text-gray-400 w-24 text-right hidden sm:block">
          {step !== "method" && step !== "done" && `${progress}% ${t("complete", "সম্পন্ন")}`}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">

          {/* ── Method selection ── */}
          {step === "method" && (
            <div>
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-[#0066CC] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isSignIn ? t("Welcome back", "স্বাগতম") : t("Create your account", "অ্যাকাউন্ট তৈরি করুন")}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {isSignIn
                    ? t("Sign in to your DoctorBD account", "আপনার DoctorBD অ্যাকাউন্টে সাইন ইন করুন")
                    : t("Join DoctorBD to manage your health", "স্বাস্থ্য পরিচালনা করতে DoctorBD-তে যোগ দিন")}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Google */}
                <button
                  onClick={handleGoogle}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm disabled:opacity-70"
                >
                  {googleLoading ? (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-[#0066CC] rounded-full animate-spin" />
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  )}
                  {googleLoading
                    ? t("Connecting...", "সংযুক্ত হচ্ছে...")
                    : t("Continue with Google", "Google দিয়ে চালিয়ে যান")}
                </button>

                {/* Phone */}
                <button
                  onClick={() => setStep("phone")}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <Phone size={17} className="text-gray-500" />
                  {t("Continue with Phone Number", "ফোন নম্বর দিয়ে চালিয়ে যান")}
                </button>

                {/* Email */}
                <button
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <Mail size={17} className="text-gray-500" />
                  {t("Continue with Email", "ইমেইল দিয়ে চালিয়ে যান")}
                </button>
              </div>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-50 px-3 text-xs text-gray-400">{t("or", "অথবা")}</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500">
                {isSignIn ? t("Don't have an account?", "অ্যাকাউন্ট নেই?") : t("Already have an account?", "ইতিমধ্যে অ্যাকাউন্ট আছে?")}{" "}
                <button onClick={() => setIsSignIn((v) => !v)} className="text-[#0066CC] font-medium hover:underline">
                  {isSignIn ? t("Create one", "তৈরি করুন") : t("Sign in", "সাইন ইন")}
                </button>
              </p>

              <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                {t(
                  "By continuing, you agree to our Terms of Service and Privacy Policy.",
                  "চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের Terms of Service ও Privacy Policy-তে সম্মত হচ্ছেন।"
                )}
              </p>
            </div>
          )}

          {/* ── Phone entry ── */}
          {step === "phone" && (
            <div>
              <button onClick={() => setStep("method")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Enter your phone number", "আপনার ফোন নম্বর লিখুন")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("We'll send a one-time code to verify your number.", "যাচাইয়ের জন্য একটি কোড পাঠানো হবে।")}</p>
              <div className="flex gap-2 mb-4">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm text-gray-600 font-medium flex-shrink-0">
                  +880
                </div>
                <input
                  type="tel"
                  placeholder="1X-XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:border-[#0066CC]"
                  maxLength={11}
                />
              </div>
              <button
                onClick={() => setStep("otp")}
                disabled={phone.length < 10}
                className="w-full flex items-center justify-center gap-1.5 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Send OTP", "OTP পাঠান")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── OTP entry ── */}
          {step === "otp" && (
            <div>
              <button onClick={() => setStep("phone")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Verify your number", "আপনার নম্বর যাচাই করুন")}</h2>
              <p className="text-sm text-gray-500 mb-1">{t("Enter the 6-digit code sent to", "এই নম্বরে পাঠানো ৬-সংখ্যার কোড লিখুন")}</p>
              <p className="text-sm font-semibold text-gray-900 mb-6">+880 {phone}</p>
              <input
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full text-center text-2xl font-bold tracking-[0.5em] border border-gray-200 rounded-xl px-3 py-4 focus:outline-none focus:border-[#0066CC] mb-4"
              />
              <p className="text-xs text-gray-400 text-center mb-4">{t("Enter any 6 digits for demo", "ডেমোর জন্য যেকোনো ৬ সংখ্যা লিখুন")}</p>
              <button
                onClick={() => setStep("profile")}
                disabled={otp.length < 6}
                className="w-full bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Verify", "যাচাই করুন")}
              </button>
            </div>
          )}

          {/* ── Email entry ── */}
          {step === "email" && (
            <div>
              <button onClick={() => setStep("method")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Continue with Email", "ইমেইল দিয়ে চালিয়ে যান")}</h2>
              <p className="text-sm text-gray-500 mb-6">{isSignIn ? t("Sign in to your account", "আপনার অ্যাকাউন্টে সাইন ইন করুন") : t("Create your account using email", "ইমেইল দিয়ে অ্যাকাউন্ট তৈরি করুন")}</p>
              <div className="flex flex-col gap-3 mb-4">
                <input
                  type="email"
                  placeholder={t("Email address", "ইমেইল ঠিকানা")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                />
                <input
                  type="password"
                  placeholder={t("Password", "পাসওয়ার্ড")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                />
              </div>
              <button
                onClick={() => setStep("profile")}
                disabled={!email.includes("@") || password.length < 4}
                className="w-full flex items-center justify-center gap-1.5 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Profile setup ── */}
          {step === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Tell us about yourself", "নিজের সম্পর্কে বলুন")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("This helps us personalise your experience.", "এটি আপনার অভিজ্ঞতা ব্যক্তিগতকৃত করতে সাহায্য করে।")}</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Your Full Name", "আপনার পুরো নাম")} *</label>
                  <input
                    type="text"
                    placeholder={t("Enter your name", "আপনার নাম লিখুন")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">{t("Blood Group", "রক্তের গ্রুপ")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_GROUPS.map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBloodGroup(bg)}
                        className={`text-sm font-semibold py-2 rounded-lg border transition-colors ${
                          bloodGroup === bg
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
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep("location")}
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-1.5 mt-6 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Location ── */}
          {step === "location" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Where are you located?", "আপনি কোথায় আছেন?")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("We'll show nearby doctors first.", "আমরা প্রথমে কাছের ডাক্তার দেখাব।")}</p>
              <div className="flex flex-col gap-3 mb-6">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Division", "বিভাগ")}</label>
                  <select
                    value={division}
                    onChange={(e) => { setDivision(e.target.value); setDistrict(""); }}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    <option value="">{t("Select your division", "আপনার বিভাগ বেছে নিন")}</option>
                    {locations.map((l) => (
                      <option key={l.division} value={l.division}>{l.division} / {l.divisionBn}</option>
                    ))}
                  </select>
                </div>
                {division && (
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("District", "জেলা")}</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC] bg-white"
                    >
                      <option value="">{t("Select your district", "আপনার জেলা বেছে নিন")}</option>
                      {districts.map((d) => (
                        <option key={d.name} value={d.name}>{d.name} / {d.nameBn}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("profile")}
                  className="flex-1 text-sm font-medium py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t("Back", "পিছনে")}
                </button>
                <button
                  onClick={saveAndFinish}
                  className="flex-1 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {t("Get Started", "শুরু করুন")}
                </button>
              </div>
              <button onClick={saveAndFinish} className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 text-center">
                {t("Skip location for now", "এখনের জন্য এড়িয়ে যান")}
              </button>
            </div>
          )}

          {/* ── Done ── */}
          {step === "done" && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={40} className="text-[#00A86B]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {name ? t(`Welcome, ${name.split(" ")[0]}!`, `স্বাগতম, ${name.split(" ")[0]}!`) : t("All set!", "সম্পন্ন!")}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {t("Your account is ready. Taking you to your profile...", "আপনার অ্যাকাউন্ট প্রস্তুত। প্রোফাইলে নিয়ে যাচ্ছি...")}
              </p>
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0066CC] rounded-full animate-spin mx-auto" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
