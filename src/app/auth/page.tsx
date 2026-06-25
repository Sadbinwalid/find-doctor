"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, ChevronRight, CheckCircle, Plus, X, User, Stethoscope } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { locations } from "@/data/locations";
import { categories } from "@/data/categories";

type Role = "patient" | "doctor";
type Step =
  | "role"
  | "method"
  | "phone" | "otp" | "email"
  | "patient-profile" | "patient-location"
  | "doc-personal" | "doc-professional" | "doc-hospital"
  | "done";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AuthPage() {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState<Step>("role");
  const [isSignIn, setIsSignIn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Shared auth fields
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Patient profile fields
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [optionalPhone, setOptionalPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  // Doctor-specific fields
  const [docName, setDocName] = useState("");
  const [docPhone, setDocPhone] = useState("");
  const [docGender, setDocGender] = useState("");
  const [docSpecialty, setDocSpecialty] = useState("");
  const [docBmdc, setDocBmdc] = useState("");
  const [docQualifications, setDocQualifications] = useState<string[]>([]);
  const [docQualInput, setDocQualInput] = useState("");
  const [docExperience, setDocExperience] = useState("");
  const [docHospitalEn, setDocHospitalEn] = useState("");
  const [docDivision, setDocDivision] = useState("");
  const [docDistrict, setDocDistrict] = useState("");
  const [docFee, setDocFee] = useState("");

  // Read ?role= and ?mode= from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("role");
    const mode = params.get("mode");
    if (r === "patient" || r === "doctor") {
      setRole(r);
      setStep("method");
    }
    if (mode === "signin") setIsSignIn(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && step !== "done") router.replace("/profile");
  }, [isAuthenticated, step, router]);

  const patientDistricts = division
    ? (locations.find((l) => l.division === division)?.districts ?? [])
    : [];
  const docDistricts = docDivision
    ? (locations.find((l) => l.division === docDivision)?.districts ?? [])
    : [];

  // After auth method completes, go to the right profile step
  const afterAuth = () => {
    if (isSignIn) { finishSignIn(); return; }
    if (role === "doctor") setStep("doc-personal");
    else setStep("patient-profile");
  };

  const finishSignIn = () => {
    login();
    setStep("done");
    setTimeout(() => router.push("/profile"), 2000);
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => { setGoogleLoading(false); afterAuth(); }, 1200);
  };

  const addQual = () => {
    const v = docQualInput.trim();
    if (!v || docQualifications.includes(v)) return;
    setDocQualifications((prev) => [...prev, v]);
    setDocQualInput("");
  };

  const savePatientAndFinish = () => {
    const existing = localStorage.getItem("profile_data");
    const base = existing ? JSON.parse(existing) : {};
    const merged = {
      ...base,
      role: "patient",
      memberSince: String(new Date().getFullYear()),
      conditions: base.conditions ?? [],
      ...(name && { nameEn: name }),
      ...(dob && { dob }),
      ...(bloodGroup && { bloodGroup }),
      ...(optionalPhone && { phone: optionalPhone }),
      ...(phone && !optionalPhone && { phone }),
      ...(division && { divisionEn: division }),
      ...(district && { districtEn: district }),
    };
    localStorage.setItem("profile_data", JSON.stringify(merged));
    login();
    setStep("done");
    setTimeout(() => router.push("/profile"), 2000);
  };

  const saveDoctorAndFinish = () => {
    const appId = String(Math.floor(100000 + Math.random() * 900000));
    const application = {
      appId,
      nameEn: docName,
      phone: docPhone || phone,
      gender: docGender,
      specialty: docSpecialty,
      bmdc: docBmdc,
      qualifications: docQualifications,
      experienceYears: docExperience,
      hospitalEn: docHospitalEn,
      division: docDivision,
      district: docDistrict,
      fee: docFee,
      agreed: true,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };
    const existing = JSON.parse(localStorage.getItem("pending_doctor_registrations") || "[]");
    existing.push(application);
    localStorage.setItem("pending_doctor_registrations", JSON.stringify(existing));

    const profileData = {
      role: "doctor",
      nameEn: docName,
      memberSince: String(new Date().getFullYear()),
      conditions: [],
      divisionEn: docDivision,
      districtEn: docDistrict,
      phone: docPhone || phone,
      verificationStatus: "pending",
      doctorAppId: appId,
    };
    localStorage.setItem("profile_data", JSON.stringify(profileData));
    login();
    setStep("done");
    setTimeout(() => router.push("/profile"), 2000);
  };

  // Progress calculation
  const progress = (() => {
    if (step === "role") return 0;
    if (step === "method") return 10;
    if (step === "phone" || step === "email") return 22;
    if (step === "otp") return 33;
    if (role === "patient") {
      if (step === "patient-profile") return 65;
      if (step === "patient-location") return 83;
    }
    if (role === "doctor") {
      if (step === "doc-personal") return 50;
      if (step === "doc-professional") return 67;
      if (step === "doc-hospital") return 84;
    }
    if (step === "done") return 100;
    return 0;
  })();

  const showProgress = step !== "role" && step !== "done";

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0066CC]">
          <ArrowLeft size={15} />
          {t("DoctorBD", "DoctorBD")}
        </Link>
        {showProgress && (
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
          {showProgress && `${progress}% ${t("complete", "সম্পন্ন")}`}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">

          {/* ── Step 1: Role selection ── */}
          {step === "role" && (
            <div>
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-[#0066CC] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isSignIn ? t("Welcome back", "স্বাগতম") : t("Join DoctorBD", "DoctorBD-তে যোগ দিন")}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {isSignIn
                    ? t("Choose how you'd like to sign in", "আপনি কীভাবে সাইন ইন করতে চান তা বেছে নিন")
                    : t("Who are you signing up as?", "আপনি কে হিসেবে নিবন্ধন করছেন?")}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setRole("patient"); setStep("method"); }}
                  className="w-full flex items-center gap-4 bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-left hover:border-[#0066CC] hover:bg-blue-50 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-[#0066CC] flex items-center justify-center flex-shrink-0 transition-colors">
                    <User size={20} className="text-[#0066CC] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      {isSignIn ? t("Patient Login", "রোগী হিসেবে লগইন") : t("I'm a Patient", "আমি একজন রোগী")}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {t("Find doctors, book appointments", "ডাক্তার খুঁজুন, অ্যাপয়েন্টমেন্ট নিন")}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0066CC] transition-colors" />
                </button>

                <button
                  onClick={() => { setRole("doctor"); setStep("method"); }}
                  className="w-full flex items-center gap-4 bg-white border-2 border-gray-200 rounded-2xl px-5 py-4 text-left hover:border-[#00A86B] hover:bg-green-50 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-50 group-hover:bg-[#00A86B] flex items-center justify-center flex-shrink-0 transition-colors">
                    <Stethoscope size={20} className="text-[#00A86B] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      {isSignIn ? t("Doctor Login", "ডাক্তার হিসেবে লগইন") : t("I'm a Doctor", "আমি একজন ডাক্তার")}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {t("List your practice, get verified", "আপনার প্র্যাকটিস যোগ করুন, যাচাই পান")}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#00A86B] transition-colors" />
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
            </div>
          )}

          {/* ── Step 2: Auth method ── */}
          {step === "method" && (
            <div>
              <button onClick={() => setStep("role")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>

              {/* Role badge */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-5 ${
                role === "doctor" ? "bg-green-50 text-[#00A86B]" : "bg-blue-50 text-[#0066CC]"
              }`}>
                {role === "doctor" ? <Stethoscope size={12} /> : <User size={12} />}
                {role === "doctor"
                  ? t("Doctor Account", "ডাক্তার অ্যাকাউন্ট")
                  : t("Patient Account", "রোগীর অ্যাকাউন্ট")}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {isSignIn ? t("Welcome back", "স্বাগতম") : t("Create your account", "অ্যাকাউন্ট তৈরি করুন")}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {isSignIn
                  ? t("Sign in to continue", "চালিয়ে যেতে সাইন ইন করুন")
                  : t("Choose how to get started", "কীভাবে শুরু করবেন তা বেছে নিন")}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleGoogle}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm disabled:opacity-70"
                >
                  {googleLoading
                    ? <div className="w-4 h-4 border-2 border-gray-300 border-t-[#0066CC] rounded-full animate-spin" />
                    : <GoogleIcon />}
                  {googleLoading ? t("Connecting...", "সংযুক্ত হচ্ছে...") : t("Continue with Google", "Google দিয়ে চালিয়ে যান")}
                </button>

                <button
                  onClick={() => setStep("phone")}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <Phone size={17} className="text-gray-500" />
                  {t("Continue with Phone Number", "ফোন নম্বর দিয়ে চালিয়ে যান")}
                </button>

                <button
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                >
                  <Mail size={17} className="text-gray-500" />
                  {t("Continue with Email", "ইমেইল দিয়ে চালিয়ে যান")}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                {t(
                  "By continuing, you agree to our",
                  "চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের"
                )}{" "}
                <Link href="/terms" className="underline hover:text-gray-600">{t("Terms", "শর্তাবলী")}</Link>
                {" "}{t("and", "ও")}{" "}
                <Link href="/privacy" className="underline hover:text-gray-600">{t("Privacy Policy", "গোপনীয়তা নীতি")}</Link>
                {t(".", "।")}
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
              <p className="text-sm text-gray-500 mb-6">{t("We'll send a one-time code to verify.", "যাচাইয়ের জন্য একটি কোড পাঠানো হবে।")}</p>
              <div className="flex gap-2 mb-4">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 bg-gray-50 text-sm text-gray-600 font-medium flex-shrink-0">+880</div>
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
                autoComplete="one-time-code"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full text-center text-2xl font-bold tracking-[0.5em] border border-gray-200 rounded-xl px-3 py-4 focus:outline-none focus:border-[#0066CC] mb-4"
              />
              <p className="text-xs text-gray-400 text-center mb-4">{t("Enter any 6 digits for demo", "ডেমোর জন্য যেকোনো ৬ সংখ্যা লিখুন")}</p>
              <button
                onClick={afterAuth}
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
              <p className="text-sm text-gray-500 mb-6">
                {isSignIn ? t("Sign in to your account", "আপনার অ্যাকাউন্টে সাইন ইন করুন") : t("Create your account using email", "ইমেইল দিয়ে অ্যাকাউন্ট তৈরি করুন")}
              </p>
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
                onClick={afterAuth}
                disabled={!email.includes("@") || password.length < 4}
                className="w-full flex items-center justify-center gap-1.5 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ════════════════════════════════
              PATIENT FLOW
          ════════════════════════════════ */}

          {/* ── Patient: Profile ── */}
          {step === "patient-profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Your health profile", "আপনার স্বাস্থ্য প্রোফাইল")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("Helps us show the most relevant doctors for you.", "আপনার জন্য সবচেয়ে প্রাসঙ্গিক ডাক্তার দেখাতে সাহায্য করে।")}</p>

              <div className="flex flex-col gap-4">
                {/* Full name */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Full Name", "পুরো নাম")} *</label>
                  <input
                    type="text"
                    placeholder={t("Enter your name", "আপনার নাম লিখুন")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>

                {/* Date of birth */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Date of Birth", "জন্ম তারিখ")}</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC] bg-white"
                  />
                </div>

                {/* Blood group */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">{t("Blood Group", "রক্তের গ্রুপ")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_GROUPS.map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBloodGroup(bg === bloodGroup ? "" : bg)}
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

                {/* Optional phone */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    {t("Phone Number", "ফোন নম্বর")}{" "}
                    <span className="text-gray-400 font-normal">({t("optional", "ঐচ্ছিক")})</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01X-XXXXXXXX"
                    value={optionalPhone}
                    onChange={(e) => setOptionalPhone(e.target.value.replace(/\D/g, ""))}
                    maxLength={11}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep("patient-location")}
                disabled={!name.trim()}
                className="w-full flex items-center justify-center gap-1.5 mt-6 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Patient: Location ── */}
          {step === "patient-location" && (
            <div>
              <button onClick={() => setStep("patient-profile")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>
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
                      {patientDistricts.map((d) => (
                        <option key={d.name} value={d.name}>{d.name} / {d.nameBn}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("patient-profile")}
                  className="flex-1 text-sm font-medium py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t("Back", "পিছনে")}
                </button>
                <button
                  onClick={savePatientAndFinish}
                  className="flex-1 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {t("Get Started", "শুরু করুন")}
                </button>
              </div>
              <button onClick={savePatientAndFinish} className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 text-center">
                {t("Skip for now", "এখনের জন্য এড়িয়ে যান")}
              </button>
            </div>
          )}

          {/* ════════════════════════════════
              DOCTOR FLOW
          ════════════════════════════════ */}

          {/* ── Doctor: Personal Info ── */}
          {step === "doc-personal" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Personal Information", "ব্যক্তিগত তথ্য")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("Your basic details for your doctor profile.", "আপনার ডাক্তার প্রোফাইলের জন্য মৌলিক তথ্য।")}</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Full Name", "পুরো নাম")} *</label>
                  <input
                    type="text"
                    placeholder="Dr. Full Name"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    {t("Phone Number", "ফোন নম্বর")}{" "}
                    <span className="text-gray-400 font-normal">({t("optional if used above", "উপরে দিলে ঐচ্ছিক")})</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01X-XXXXXXXX"
                    value={docPhone}
                    onChange={(e) => setDocPhone(e.target.value.replace(/\D/g, ""))}
                    maxLength={11}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-2 block">{t("Gender", "লিঙ্গ")} *</label>
                  <div className="flex gap-3">
                    {([["Male", "পুরুষ"], ["Female", "মহিলা"], ["Other", "অন্যান্য"]] as const).map(([en, bn]) => (
                      <button
                        key={en}
                        onClick={() => setDocGender(en)}
                        className={`flex-1 text-sm py-2 rounded-lg border transition-colors ${
                          docGender === en
                            ? "bg-blue-50 border-[#0066CC] text-[#0066CC] font-medium"
                            : "border-gray-200 text-gray-600 hover:border-blue-300"
                        }`}
                      >
                        {t(en, bn)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("doc-professional")}
                disabled={!docName.trim() || !docGender}
                className="w-full flex items-center justify-center gap-1.5 mt-6 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Doctor: Professional Details ── */}
          {step === "doc-professional" && (
            <div>
              <button onClick={() => setStep("doc-personal")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Professional Details", "পেশাদার বিবরণ")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("Your credentials and specialty.", "আপনার সনদ ও বিশেষজ্ঞতা।")}</p>

              <div className="flex flex-col gap-4">
                {/* Specialty */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Medical Specialty", "চিকিৎসা বিশেষজ্ঞতা")} *</label>
                  <select
                    value={docSpecialty}
                    onChange={(e) => setDocSpecialty(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    <option value="">{t("Select specialty", "বিশেষজ্ঞতা বেছে নিন")}</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{t(c.nameEn, c.nameBn)}</option>
                    ))}
                  </select>
                </div>

                {/* BMDC */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("BMDC Registration No.", "BMDC নিবন্ধন নং")} *</label>
                  <input
                    type="text"
                    placeholder="A-XXXXX"
                    value={docBmdc}
                    onChange={(e) => setDocBmdc(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>

                {/* Qualifications */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    {t("Qualifications", "যোগ্যতা")} * <span className="font-normal text-gray-400">({t("press Enter to add", "যোগ করতে Enter চাপুন")})</span>
                  </label>
                  {docQualifications.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {docQualifications.map((q) => (
                        <span key={q} className="flex items-center gap-1 text-xs bg-blue-50 text-[#0066CC] px-2 py-1 rounded-md">
                          {q}
                          <button onClick={() => setDocQualifications((prev) => prev.filter((x) => x !== q))} className="hover:text-red-500">
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t("e.g. MBBS, MD (Cardiology)", "যেমন MBBS, MD")}
                      value={docQualInput}
                      onChange={(e) => setDocQualInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addQual())}
                      className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                    />
                    <button onClick={addQual} className="px-3 py-2 rounded-xl bg-blue-50 text-[#0066CC] hover:bg-blue-100 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Years of Experience", "অভিজ্ঞতার বছর")} *</label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    placeholder="0"
                    value={docExperience}
                    onChange={(e) => setDocExperience(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep("doc-hospital")}
                disabled={!docSpecialty || !docBmdc.trim() || docQualifications.length === 0 || !docExperience}
                className="w-full flex items-center justify-center gap-1.5 mt-6 bg-[#0066CC] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t("Continue", "পরবর্তী")} <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* ── Doctor: Hospital & Location ── */}
          {step === "doc-hospital" && (
            <div>
              <button onClick={() => setStep("doc-professional")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0066CC] mb-6">
                <ArrowLeft size={15} /> {t("Back", "পিছনে")}
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{t("Practice Information", "অনুশীলনের তথ্য")}</h2>
              <p className="text-sm text-gray-500 mb-6">{t("Where do you practice?", "আপনি কোথায় প্র্যাকটিস করেন?")}</p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Hospital / Clinic Name", "হাসপাতাল / ক্লিনিক নাম")} *</label>
                  <input
                    type="text"
                    placeholder={t("e.g. Dhaka Medical College Hospital", "যেমন ঢাকা মেডিকেল কলেজ হাসপাতাল")}
                    value={docHospitalEn}
                    onChange={(e) => setDocHospitalEn(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Division", "বিভাগ")} *</label>
                  <select
                    value={docDivision}
                    onChange={(e) => { setDocDivision(e.target.value); setDocDistrict(""); }}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC] bg-white"
                  >
                    <option value="">{t("Select division", "বিভাগ বেছে নিন")}</option>
                    {locations.map((l) => (
                      <option key={l.division} value={l.division}>{l.division} / {l.divisionBn}</option>
                    ))}
                  </select>
                </div>

                {docDivision && (
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("District", "জেলা")} *</label>
                    <select
                      value={docDistrict}
                      onChange={(e) => setDocDistrict(e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC] bg-white"
                    >
                      <option value="">{t("Select district", "জেলা বেছে নিন")}</option>
                      {docDistricts.map((d) => (
                        <option key={d.name} value={d.name}>{d.name} / {d.nameBn}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">{t("Consultation Fee (৳)", "পরামর্শ ফি (৳)")} *</label>
                  <input
                    type="number"
                    min={100}
                    placeholder="500"
                    value={docFee}
                    onChange={(e) => setDocFee(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
                {t(
                  "Your application will be reviewed within 3–5 business days. You'll be notified once your profile is verified.",
                  "আপনার আবেদন ৩–৫ কার্যদিবসের মধ্যে পর্যালোচনা করা হবে। প্রোফাইল যাচাই হলে আপনাকে জানানো হবে।"
                )}
              </div>

              <button
                onClick={saveDoctorAndFinish}
                disabled={!docHospitalEn.trim() || !docDivision || !docDistrict || !docFee}
                className="w-full flex items-center justify-center gap-1.5 mt-4 bg-[#00A86B] text-white text-sm font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle size={15} /> {t("Submit Application", "আবেদন জমা দিন")}
              </button>
            </div>
          )}

          {/* ── Done ── */}
          {step === "done" && (
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
                role === "doctor" ? "bg-green-50" : "bg-green-50"
              }`}>
                <CheckCircle size={40} className={role === "doctor" ? "text-[#00A86B]" : "text-[#00A86B]"} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {role === "doctor"
                  ? (docName ? t(`Welcome, Dr. ${docName.replace(/^Dr\.?\s*/i, "").split(" ")[0]}!`, `স্বাগতম, ডা. ${docName.replace(/^Dr\.?\s*/i, "").split(" ")[0]}!`) : t("Application submitted!", "আবেদন জমা হয়েছে!"))
                  : (name ? t(`Welcome, ${name.split(" ")[0]}!`, `স্বাগতম, ${name.split(" ")[0]}!`) : t("All set!", "সম্পন্ন!"))}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {role === "doctor"
                  ? t("Your application is under review. Taking you to your profile...", "আপনার আবেদন পর্যালোচনায় আছে। প্রোফাইলে নিয়ে যাচ্ছি...")
                  : t("Your account is ready. Taking you to your profile...", "আপনার অ্যাকাউন্ট প্রস্তুত। প্রোফাইলে নিয়ে যাচ্ছি...")}
              </p>
              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0066CC] rounded-full animate-spin mx-auto" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
