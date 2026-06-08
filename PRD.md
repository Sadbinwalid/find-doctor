# DoctorBD — Product Requirements Document
### The Single Source of Truth

**Version:** 7.0  
**Date:** 2026-06-09  
**Status:** Active Sprint  
**Team:** @Sadbinwalid · @rajibraju02 · @shojolislam

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [What We Are Building](#2-what-we-are-building)
3. [Who Is This For](#3-who-is-this-for)
4. [Complete Feature List](#4-complete-feature-list)
5. [Disease Taxonomy — 75 Diseases](#5-disease-taxonomy)
6. [Doctor Specialties — 20 Types](#6-doctor-specialties)
7. [Disease → Doctor → Test Mapping](#7-disease--doctor--test-mapping)
8. [Diagnostic Tests & Bangladesh Costs](#8-diagnostic-tests--bangladesh-costs)
9. [Doctor Fee Guide by City](#9-doctor-fee-guide-by-city)
10. [City & Area Coverage](#10-city--area-coverage)
11. [UX Flows — How Users Navigate](#11-ux-flows)
12. [Design System](#12-design-system)
13. [Tech Stack](#13-tech-stack)
14. [Page Map](#14-page-map)
15. [What Is Already Built](#15-what-is-already-built)
16. [What Needs to Be Done](#16-what-needs-to-be-done)
17. [Sprint Plan — 8 Working Days](#17-sprint-plan)
18. [Definition of Done](#18-definition-of-done)

---

## 1. The Problem

Bangladesh has a critical gap in health information access. When someone falls ill, they face three problems at once:

**Problem 1 — People don't know which doctor to see**
Most people in Bangladesh cannot connect their symptoms to the right type of doctor. Someone with chest tightness does not know if they need a cardiologist, a pulmonologist, or a general physician. Someone with chronic fatigue does not know if it could be diabetes, anemia, or thyroid disease. Almost no Bangla-language content bridges symptoms → disease → specialist.

**Problem 2 — No reliable doctor directory exists**
There is no centralized, verified, up-to-date database of doctors in Bangladesh organized by specialty and searchable by location. Word of mouth drives almost all doctor discovery. The well-connected get good care. Everyone else guesses.

**Problem 3 — Costs are completely opaque**
Patients have no idea what a consultation will cost before they travel. Doctor fees range from ৳100 to ৳2,500 depending on city and seniority. Diagnostic test prices vary significantly across labs. People delay or avoid care because they fear unknown costs.

**The consequence:** People see the wrong doctor first, waste money on unnecessary tests, and let preventable diseases worsen — because they simply did not know who to call.

---

## 2. What We Are Building

**DoctorBD** — a bilingual (Bengali + English) doctor discovery platform for Bangladesh.

### The One-Line Vision
> A person anywhere in Bangladesh — from Gulshan to Gaibandha — can identify their health problem, find the right verified specialist nearby, understand what it will cost, and call that doctor in under 60 seconds.

### What It Does
- Lets users search for doctors by name, specialty, disease, or location
- Explains diseases and symptoms in plain Bangla so users know which doctor they need
- Shows the full disease → diagnostic test chain (what test you need and what it costs)
- Gives transparent fee ranges by city so there are no surprises
- Provides an AI assistant that triages symptoms to the right specialist in Bengali or English

### What It Does NOT Do (v1)
- No appointment booking
- No payments
- No telemedicine
- No prescriptions or medical records

---

## 3. Who Is This For

| User | What They Need | How DoctorBD Helps |
|---|---|---|
| **Patient** | Which doctor do I see? Where? What will it cost? | Search by disease or symptom → specialist → doctor profile → tap-to-call |
| **Family member** | My child/parent is sick — who do I call? | Disease page explains condition + links to right specialist |
| **First-timer** | I've never seen a specialist before | AI chat guides them in Bengali step by step |
| **Rural user** | I can only afford one visit — I need the right doctor first time | Location filter narrows to nearest district; fee guide sets expectations |

### User Roles (v1)

| Role | Can Do |
|---|---|
| **Visitor** | Browse, search, disease explorer, AI chat |
| **Registered User** | + Save doctors, view appointment history, edit personal profile |
| **Doctor / Admin** | v2 only |

---

## 4. Complete Feature List

### 4.1 Doctor Search & Discovery
- Search bar on homepage and in navbar — searches doctor name, specialty, hospital, district, disease
- Works in Bengali and English simultaneously
- Quick-tag chips: Heart Doctor · Child Specialist · Skin Doctor · Eye Doctor · General Physician
- Results page filters: specialty (multi-select) · division · district · sort by rating or experience
- Doctor list card: avatar initials · name EN+BN · specialty · hospital · district · rating · experience · availability

### 4.2 Doctor Profile
Every profile gives the user enough to pick up the phone.

| Field | Required |
|---|---|
| Full name — English & Bengali | Yes |
| Degrees / qualifications | Yes |
| Specialty | Yes |
| Hospital (primary) | Yes |
| Chamber address | Yes |
| Phone — tap-to-call | Yes |
| Division + District | Yes |
| Visiting hours | Yes |
| When to see this doctor (bilingual bullet list) | Yes |
| Google Maps deep-link | Yes |
| Experience years | No |
| Rating + review count | No |
| Availability flag | No |
| About / bio (max 300 chars) | No |

> **Fee information is excluded.** Fees change constantly — stale data destroys trust.

### 4.3 Specialty Browse
- `/specialties` — grid of all 12 launch specialties
- `/category/[slug]` — all doctors in that specialty with division/district filters

### 4.4 Disease Explorer
The differentiating feature. Users who know their symptom but not the specialty can still find the right doctor.

- Homepage disease chip row — 8 most-searched conditions
- `/diseases` — full list with body-system tabs (10 categories) and live search in EN + BN
- `/disease/[slug]` — each disease page contains:
  - Plain-language description (EN + BN)
  - Symptoms list (bilingual)
  - Causes & risk factors (bilingual)
  - When to see a doctor — specific triggers
  - Linked specialties → `/category/[slug]`
  - Linked diagnostic tests → `/test/[slug]`
  - Medical disclaimer on every page

### 4.5 Diagnostic Tests Directory
- `/tests` — full list of all tests
- `/test/[slug]` — each test page contains:
  - What it measures (plain language)
  - Why it's ordered
  - How to prepare (fasting, medication holds)
  - Cost range in ৳ — 3 tiers: budget · mid-range · premium
  - Where to get it — major lab chains and cities
  - Linked diseases

### 4.6 AI Chat Assistant
- Floating button — available on every page
- Powered by Claude Haiku (Anthropic API)
- Responds in the same language the user writes in (Bengali or English)
- Triages symptoms → suggests disease pages + specialist links
- Responses under 120 words, always actionable
- Never diagnoses — only guides to the right specialist
- Emergency: chest pain / breathing difficulty → "Call 16457 now"
- Graceful fallback if API key is unavailable

### 4.7 User Profile — `/profile`
Works via localStorage in v1 — no login required.

- Avatar initials, name, location, blood group, age, phone, conditions tags
- Edit Profile modal — all fields editable, persists via localStorage
- Stats: total appointments · saved doctors · cancelled count
- Appointment history — status badges (Completed / Cancelled), collapsible
- Saved doctors — links to profiles with availability
- Recently visited — populated as user browses doctor profiles
- Spend summary — total ৳ spent, average per visit
- Preferred specialties — quick links to categories

### 4.8 Mobile Bottom Navigation
4-tab bar on mobile: **Home** · **Doctors** · **Diseases** · **Profile**

### 4.9 Doctor Fee Guide
- City-tier fee table (see Section 9)
- Displayed on `/about` page
- Labeled: "Approximate — confirm by phone before visiting"

### 4.10 Bilingual UI — EN / BN
- `EN | বাং` toggle in navbar, saved in localStorage
- 100% of UI strings have Bengali and English versions
- Search works in both scripts simultaneously

### 4.11 Emergency Banner
- Red banner on homepage and `/diseases`
- "Medical Emergency? Call 16457" — tap-to-call on mobile
- Visible above the fold without scrolling

---

## 5. Disease Taxonomy

75 diseases across 15 body-system categories. Each links to a specialist and required tests.

### Category 1 — Heart & Blood (হৃদয় ও রক্ত)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Hypertension | উচ্চ রক্তচাপ | Headache, dizziness, blurred vision | Cardiologist / GP |
| Heart Disease | হৃদরোগ | Chest pain, shortness of breath, left arm pain | Cardiologist |
| Heart Failure | হার্ট ফেইলিউর | Swollen ankles, breathlessness, fatigue | Cardiologist |
| Arrhythmia | অনিয়মিত হৃদস্পন্দন | Palpitations, fluttering chest, fainting | Cardiologist |
| Anemia | রক্তশূন্যতা | Fatigue, pale skin, dizziness, breathlessness | GP / Hematologist |
| DVT | শিরায় রক্ত জমাট | Leg swelling, warmth, redness | GP / Vascular Surgeon |

### Category 2 — Digestive & Liver (পাচনতন্ত্র ও যকৃত)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Gastric / Peptic Ulcer | গ্যাস্ট্রিক আলসার | Burning stomach pain, nausea, bloating | Gastroenterologist / GP |
| Hepatitis B | হেপাটাইটিস বি | Jaundice, fatigue, nausea, abdominal pain | Gastroenterologist |
| Hepatitis C | হেপাটাইটিস সি | Jaundice, fatigue, dark urine, joint pain | Gastroenterologist |
| Liver Cirrhosis | যকৃতের সিরোসিস | Jaundice, abdominal swelling, easy bruising | Gastroenterologist |
| IBS | আইবিএস | Cramping, diarrhea, constipation, bloating | Gastroenterologist |
| Appendicitis | অ্যাপেন্ডিসাইটিস | Severe right lower abdominal pain, fever | Surgeon (emergency) |
| Jaundice | জন্ডিস | Yellow skin/eyes, dark urine, fatigue | GP / Gastroenterologist |

### Category 3 — Endocrine & Hormones (হরমোন ও বিপাক)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Type 2 Diabetes | ডায়াবেটিস | Frequent urination, excessive thirst, fatigue | Endocrinologist / GP |
| Hypothyroidism | হাইপোথাইরয়েডিজম | Weight gain, fatigue, cold intolerance, depression | Endocrinologist |
| Hyperthyroidism | হাইপারথাইরয়েডিজম | Weight loss, rapid heartbeat, sweating, anxiety | Endocrinologist |
| PCOS | পিসিওএস | Irregular periods, acne, weight gain, hair loss | Gynecologist / Endocrinologist |
| Obesity | স্থূলতা | Excess weight, joint pain, fatigue | GP / Endocrinologist |

### Category 4 — Respiratory (শ্বাসতন্ত্র)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Asthma | হাঁপানি | Wheezing, chest tightness, coughing | Pulmonologist / GP |
| COPD | সিওপিডি | Chronic cough, mucus, breathlessness | Pulmonologist |
| Pneumonia | নিউমোনিয়া | High fever, cough with phlegm, chest pain | GP / Pulmonologist |
| Tuberculosis (TB) | যক্ষ্মা | Chronic cough 3+ weeks, blood in sputum, night sweats | Pulmonologist / GP |
| Bronchitis | ব্রংকাইটিস | Cough, mucus, fatigue, mild fever | GP |

### Category 5 — Kidney & Urinary (কিডনি ও মূত্রতন্ত্র)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Chronic Kidney Disease | কিডনি রোগ | Swollen ankles, fatigue, nausea, reduced urination | Nephrologist |
| Kidney Stones | কিডনিতে পাথর | Severe back/side pain, blood in urine, nausea | Urologist / Nephrologist |
| UTI | মূত্রনালীর সংক্রমণ | Burning urination, frequent urge, cloudy urine | GP / Urologist |
| Nephrotic Syndrome | নেফ্রোটিক সিন্ড্রোম | Severe swelling, protein in urine, weight gain | Nephrologist |

### Category 6 — Skin & Hair (ত্বক ও চুল)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Eczema | একজিমা | Itchy, red, inflamed dry skin patches | Dermatologist |
| Psoriasis | সোরিয়াসিস | Scaly silver patches, redness, itching | Dermatologist |
| Fungal Infection | দাদ / ছত্রাক | Ring-shaped rash, itching, scaling | Dermatologist / GP |
| Acne | ব্রণ | Pimples, blackheads, inflammation | Dermatologist |
| Skin Allergy | ত্বকের অ্যালার্জি | Hives, redness, swelling, itching | Dermatologist / GP |
| Hair Loss | চুল পড়া | Thinning hair, bald patches | Dermatologist |

### Category 7 — Brain & Nervous System (মস্তিষ্ক ও স্নায়ু)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Migraine | মাইগ্রেন | Severe one-sided headache, nausea, light sensitivity | Neurologist |
| Epilepsy | মৃগীরোগ | Seizures, loss of consciousness, confusion | Neurologist |
| Stroke | স্ট্রোক | Facial drooping, arm weakness, speech difficulty | Neurologist (emergency) |
| Parkinson's | পার্কিনসন্স | Tremors, stiff muscles, slow movement | Neurologist |
| Vertigo | ভার্টিগো | Spinning sensation, balance loss, nausea | Neurologist / ENT |

### Category 8 — Bone, Joint & Muscle (হাড়, জয়েন্ট ও পেশি)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Osteoarthritis | অস্টিওআর্থ্রাইটিস | Joint pain, stiffness, reduced flexibility | Orthopedic |
| Rheumatoid Arthritis | রিউমাটয়েড আর্থ্রাইটিস | Joint pain, morning stiffness, fatigue | Rheumatologist / Orthopedic |
| Back Pain / Disc | পিঠ ব্যথা | Lower back pain, radiating leg pain, numbness | Orthopedic / Neurologist |
| Gout | গেঁটেবাত | Sudden intense joint pain, swelling, redness | Rheumatologist / GP |
| Osteoporosis | অস্টিওপোরোসিস | Bone fractures from minor falls, back pain | Orthopedic / Endocrinologist |

### Category 9 — Women's Health (নারী স্বাস্থ্য)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Pregnancy Complications | গর্ভাবস্থার জটিলতা | Bleeding, swelling, high BP, severe vomiting | Gynecologist |
| Cervical Cancer | জরায়ুমুখের ক্যান্সার | Abnormal bleeding, discharge, pelvic pain | Gynecologist / Oncologist |
| Breast Cancer | স্তন ক্যান্সার | Lump, nipple discharge, skin changes | Gynecologist / Oncologist |
| Menstrual Disorders | মাসিকের সমস্যা | Irregular, heavy, or painful periods | Gynecologist |
| Infertility | বন্ধ্যাত্ব | Unable to conceive after 1 year | Gynecologist / Endocrinologist |

### Category 10 — Child Health (শিশু স্বাস্থ্য)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Childhood Fever | শিশুর জ্বর | High temperature, irritability, loss of appetite | Pediatrician |
| Malnutrition | অপুষ্টি | Low weight, poor growth, frequent illness | Pediatrician / Nutritionist |

### Category 11 — Eye Diseases (চোখের রোগ)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Cataract | ছানি | Cloudy/blurry vision, glare, poor night vision | Ophthalmologist |
| Glaucoma | গ্লুকোমা | Gradual vision loss, halos around lights, eye pain | Ophthalmologist |
| Diabetic Retinopathy | ডায়াবেটিক রেটিনোপ্যাথি | Blurred vision, floaters, dark spots | Ophthalmologist |
| Conjunctivitis | চোখ ওঠা | Red eyes, discharge, itching, watering | Ophthalmologist / GP |

### Category 12 — Ear, Nose & Throat (নাক-কান-গলা)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Sinusitis | সাইনুসাইটিস | Facial pain, nasal congestion, headache | ENT Specialist |
| Tonsillitis | টনসিলাইটিস | Sore throat, difficulty swallowing, fever | ENT Specialist / GP |
| Hearing Loss | শ্রবণশক্তি হ্রাস | Reduced hearing, muffled sounds, tinnitus | ENT Specialist |
| Ear Infection | কানের সংক্রমণ | Ear pain, fluid discharge, reduced hearing | ENT / GP |

### Category 13 — Infectious & Tropical Diseases (সংক্রামক রোগ)
*Highest prevalence in Bangladesh — priority content.*

| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Dengue Fever | ডেঙ্গু জ্বর | High fever, severe headache, eye pain, muscle pain, rash | GP (hospitalize if platelets drop) |
| Typhoid Fever | টাইফয়েড জ্বর | Sustained high fever, stomach pain, headache | GP |
| Malaria | ম্যালেরিয়া | Cyclical fever, chills, sweating, headache | GP |
| Chickenpox | জলবসন্ত | Itchy blisters, fever, fatigue | GP / Dermatologist |
| Cholera | কলেরা | Severe watery diarrhea, vomiting, dehydration | GP (emergency) |
| COVID-19 | কোভিড-১৯ | Fever, cough, breathlessness, loss of taste/smell | GP / Pulmonologist |
| Scabies | খোস-পাঁচড়া | Intense night itching, rash, burrow tracks | Dermatologist / GP |

### Category 14 — Mental Health (মানসিক স্বাস্থ্য)
| Disease | Bengali | Key Symptoms | Specialist |
|---|---|---|---|
| Depression | বিষণ্নতা | Persistent sadness, loss of interest, hopelessness | Psychiatrist |
| Anxiety Disorder | উদ্বেগ ব্যাধি | Excessive worry, restlessness, rapid heartbeat | Psychiatrist |
| Panic Disorder | প্যানিক ডিসঅর্ডার | Sudden intense fear, racing heart, trembling | Psychiatrist |
| Insomnia | ঘুমের সমস্যা | Difficulty sleeping, daytime fatigue | Psychiatrist / GP |
| Substance Use Disorder | মাদকাসক্তি | Dependency, withdrawal symptoms | Psychiatrist |

### Category 15 — Cancer (ক্যান্সার)
*Common cancers in Bangladesh.*

| Disease | Bengali | Warning Signs | Specialist |
|---|---|---|---|
| Oral Cancer | মুখের ক্যান্সার | White/red patches, non-healing sores, difficulty swallowing | Oncologist / ENT |
| Stomach Cancer | পাকস্থলীর ক্যান্সার | Persistent stomach pain, unexplained weight loss | Gastroenterologist / Oncologist |
| Lung Cancer | ফুসফুসের ক্যান্সার | Chronic cough, blood in sputum, chest pain | Pulmonologist / Oncologist |
| Colorectal Cancer | কোলন ক্যান্সার | Blood in stool, changed bowel habits, weight loss | Gastroenterologist / Oncologist |
| Liver Cancer | যকৃতের ক্যান্সার | Right abdominal pain, jaundice, swelling | Gastroenterologist / Oncologist |

---

## 6. Doctor Specialties

### 12 Launch Specialties

| Specialty | Bengali | Treats |
|---|---|---|
| Cardiologist | হৃদরোগ বিশেষজ্ঞ | Heart disease, hypertension, arrhythmia, heart failure |
| Dermatologist | চর্মরোগ বিশেষজ্ঞ | Eczema, psoriasis, acne, fungal infections, hair loss |
| Neurologist | স্নায়ুরোগ বিশেষজ্ঞ | Migraine, epilepsy, stroke, Parkinson's, vertigo |
| Pediatrician | শিশু বিশেষজ্ঞ | All childhood diseases, vaccinations, growth, malnutrition |
| Gynecologist | স্ত্রীরোগ বিশেষজ্ঞ | Pregnancy, PCOS, menstrual disorders, infertility |
| Orthopedic | অস্থি বিশেষজ্ঞ | Fractures, arthritis, back pain, knee/hip problems |
| Gastroenterologist | পরিপাক বিশেষজ্ঞ | Gastric ulcer, hepatitis, liver disease, IBS |
| ENT Specialist | নাক-কান-গলা বিশেষজ্ঞ | Sinusitis, tonsillitis, hearing loss, ear infections |
| Ophthalmologist | চক্ষু বিশেষজ্ঞ | Cataract, glaucoma, diabetic retinopathy |
| Psychiatrist | মনোরোগ বিশেষজ্ঞ | Depression, anxiety, panic, insomnia, addiction |
| Nephrologist | কিডনি বিশেষজ্ঞ | CKD, kidney stones, dialysis, high creatinine |
| General Physician | সাধারণ চিকিৎসক | Fever, dengue, typhoid, diabetes, routine care |

### 8 Planned Specialties (v1.1)
Endocrinologist · Pulmonologist · Oncologist · Urologist · Rheumatologist · Hepatologist · Hematologist · Nutritionist

---

## 7. Disease → Doctor → Test Mapping

| Disease | See This Doctor | Tests Required | Urgency |
|---|---|---|---|
| Hypertension | Cardiologist / GP | ECG, Lipid Profile, Kidney Function, Blood Sugar | Routine |
| Heart Disease | Cardiologist | ECG, Echocardiogram, Troponin, Lipid Profile, Chest X-Ray | Urgent |
| Diabetes | Endocrinologist / GP | Fasting Blood Sugar, HbA1c, Lipid Profile, Kidney Function | Routine |
| Thyroid Disorder | Endocrinologist | TSH, T3, T4, Thyroid Ultrasound | Routine |
| Dengue Fever | GP | Dengue NS1 Ag, CBC, Platelet Count (twice daily if severe) | Urgent |
| Typhoid Fever | GP | Widal Test, Blood Culture, CBC | Urgent |
| Malaria | GP | Malaria RDT, CBC | Urgent |
| Hepatitis B | Gastroenterologist | HBsAg, Liver Function Test, HBV DNA, Ultrasound Abdomen | Routine |
| Hepatitis C | Gastroenterologist | Anti-HCV, Liver Function Test, Ultrasound Abdomen | Routine |
| Gastric Ulcer | Gastroenterologist / GP | H. pylori Test, Endoscopy, CBC | Routine |
| Kidney Disease | Nephrologist | Creatinine, Urine R/E, Ultrasound Kidney | Urgent |
| Kidney Stones | Urologist / Nephrologist | Ultrasound Kidney, Urine R/E, Uric Acid, CT KUB | Urgent |
| UTI | GP / Urologist | Urine R/E, Urine Culture | Routine |
| Asthma | Pulmonologist | Spirometry, Chest X-Ray, Allergy Test (IgE) | Routine |
| Tuberculosis | Pulmonologist | Sputum AFB, Chest X-Ray, GeneXpert | Urgent |
| Pneumonia | GP / Pulmonologist | Chest X-Ray, CBC, CRP | Urgent |
| Migraine | Neurologist | MRI Brain (if new/severe), CBC | Routine |
| Stroke | Neurologist | CT Scan Brain, MRI Brain, ECG | Emergency |
| Osteoarthritis | Orthopedic | X-Ray Joints, ESR, CRP, Uric Acid | Routine |
| PCOS | Gynecologist | Pelvic Ultrasound, FSH, LH, Testosterone | Routine |
| Pregnancy Care | Gynecologist | Pregnancy Test, Blood Group, CBC, Blood Sugar, Ultrasound | Routine |
| Depression | Psychiatrist | Clinical assessment; TSH to rule out thyroid | Routine |
| Cataract | Ophthalmologist | Visual Acuity, Slit Lamp Exam | Routine |
| Anemia | GP / Hematologist | CBC, Serum Ferritin, Vitamin B12, Folate | Routine |

---

## 8. Diagnostic Tests & Bangladesh Costs

### Cost Tiers
- **Budget** — smaller diagnostic centers, upazila-level
- **Mid-range** — established chains (Ibn Sina, Delta, Lab Aid outside Dhanmondi)
- **Premium** — hospital-grade Dhaka flagship (Square, Lab Aid Dhanmondi, Praava, BIRDEM)

| Test | Bengali | Budget (৳) | Mid-range (৳) | Premium (৳) | Diseases |
|---|---|---|---|---|---|
| CBC | রক্তের সম্পূর্ণ পরীক্ষা | 200–300 | 300–450 | 450–600 | Anemia, Dengue, Infections |
| Fasting Blood Sugar | ফাস্টিং ব্লাড সুগার | 80–120 | 120–180 | 180–250 | Diabetes |
| HbA1c | হিমোগ্লোবিন এ১সি | 450–550 | 550–700 | 700–900 | Diabetes monitoring |
| Lipid Profile | লিপিড প্রোফাইল | 400–550 | 550–750 | 750–1,000 | Heart disease, Hypertension |
| TSH (Thyroid) | থাইরয়েড টেস্ট | 450–600 | 600–800 | 800–1,100 | Thyroid disorders |
| Liver Function Test | যকৃত পরীক্ষা | 500–700 | 700–900 | 900–1,300 | Hepatitis, Jaundice, Cirrhosis |
| Kidney Function Test | কিডনি পরীক্ষা | 450–650 | 650–850 | 850–1,200 | CKD, Hypertension |
| Urine R/E | প্রস্রাব পরীক্ষা | 100–150 | 150–220 | 220–350 | UTI, CKD, Diabetes |
| ECG | ইসিজি | 200–350 | 350–500 | 500–800 | Arrhythmia, Heart Disease |
| Echocardiogram | ইকোকার্ডিওগ্রাম | 2,000–3,000 | 3,000–4,500 | 4,500–7,000 | Heart Failure |
| Chest X-Ray | বুকের এক্স-রে | 300–450 | 450–650 | 650–1,000 | Pneumonia, TB |
| Ultrasound Abdomen | পেটের আলট্রাসাউন্ড | 800–1,200 | 1,200–1,800 | 1,800–2,800 | Liver disease, Kidney stones |
| MRI Brain | মাথার এমআরআই | 5,000–7,000 | 7,000–10,000 | 10,000–15,000 | Stroke, Epilepsy, Migraine |
| CT Scan Brain | সিটি স্ক্যান | 3,500–5,000 | 5,000–7,000 | 7,000–11,000 | Stroke (emergency) |
| Dengue NS1 Ag | ডেঙ্গু এনএস১ | 500–700 | 700–900 | 900–1,200 | Dengue (Day 1–5) |
| Platelet Count | প্লেটলেট গণনা | 100–150 | 150–200 | 200–350 | Dengue |
| Widal Test | উইডাল টেস্ট | 150–250 | 250–350 | 350–500 | Typhoid |
| Blood Culture | ব্লাড কালচার | 600–900 | 900–1,300 | 1,300–2,000 | Typhoid, Sepsis |
| HBsAg (Hepatitis B) | হেপাটাইটিস বি | 200–350 | 350–500 | 500–700 | Hepatitis B |
| Sputum AFB | কফ পরীক্ষা | 200–350 | 350–500 | 500–750 | Tuberculosis |
| GeneXpert (TB) | জিনএক্সপার্ট | 800–1,200 | 1,200–1,800 | 1,800–2,800 | Tuberculosis |
| Pap Smear | প্যাপ স্মিয়ার | 500–800 | 800–1,200 | 1,200–1,800 | Cervical Cancer |
| Uric Acid | ইউরিক এসিড | 150–200 | 200–300 | 300–400 | Gout, Kidney Stones |
| Allergy Test (IgE) | অ্যালার্জি টেস্ট | 600–900 | 900–1,300 | 1,300–1,800 | Asthma, Eczema |
| Vitamin B12 | ভিটামিন বি১২ | 600–900 | 900–1,300 | 1,300–1,800 | Anemia, Nerve symptoms |
| Pregnancy Test | গর্ভাবস্থা পরীক্ষা | 50–80 | 80–120 | 120–200 | Pregnancy |
| Blood Group | রক্তের গ্রুপ | 100–150 | 150–200 | 200–350 | Pre-surgery, Pregnancy |

### Major Lab Chains in Bangladesh
| Lab | Cities | Notes |
|---|---|---|
| Popular Diagnostic | Dhaka (12+ branches), Chattogram, Sylhet, Rajshahi, Khulna | Largest chain; most accessible |
| Lab Aid | Dhaka (Dhanmondi, Uttara, Mirpur, Gulshan), Chattogram | Premium; highest cost |
| Ibn Sina | Dhaka (multiple), Chattogram, Rajshahi, Sylhet | Mid-range; reliable |
| BIRDEM Diagnostic | Dhaka (Shahbag) | Best for diabetes tests; lower cost |
| Square Hospital | Dhaka (Panthapath) | Hospital-grade premium |
| Praava Health | Dhaka (Bashundhara, Dhanmondi) | Premium; internationally accredited |
| Government Hospital Labs | All districts | Very low cost (৳20–200); long wait times |
| Upazila Health Complex | All upazilas | Basic tests; free or near-free |

---

## 9. Doctor Fee Guide by City

| City Tier | GP Consultation | Specialist | Senior Specialist |
|---|---|---|---|
| **Dhaka** | ৳400–700 | ৳800–1,500 | ৳1,500–2,500 |
| **Chattogram / Sylhet** | ৳300–500 | ৳500–1,000 | ৳1,000–1,800 |
| **Rajshahi / Khulna / Mymensingh** | ৳200–400 | ৳400–700 | ৳700–1,200 |
| **District Towns** | ৳100–300 | ৳300–500 | ৳500–900 |
| **Upazila / Rural** | ৳30–100 | Referral to city | — |

### Dhaka Sub-Area Breakdown
| Area | Typical Specialist Fee | Key Hospitals / Clinics |
|---|---|---|
| Dhanmondi | ৳1,000–2,500 | Green Life, Lab Aid, private chambers |
| Gulshan / Banani | ৳1,200–2,500 | United Hospital, premium private |
| Bashundhara | ৳1,000–2,000 | Evercare (Apollo), Praava Health |
| Uttara | ৳700–1,500 | Kuwait-Bangladesh Friendship Hospital |
| Mirpur | ৳600–1,200 | National Heart Foundation, Delta Medical |
| Shahbag / Panthapath | ৳500–1,500 | BSMMU, BIRDEM, Square Hospital |
| Mohammadpur | ৳500–1,000 | Ibn Sina Hospital |
| Motijheel | ৳500–1,000 | Business district specialists |

> All fees are approximate. Always confirm by phone before visiting.

---

## 10. City & Area Coverage

### Rollout Plan
| Phase | Coverage | Doctor Target |
|---|---|---|
| **Launch** | Dhaka (all sub-areas) + Chattogram city | 50+ Dhaka, 20+ Chattogram |
| **Month 2** | Sylhet, Rajshahi, Khulna | 10+ each |
| **Month 3** | Mymensingh, Rangpur, Barishal | 5+ each |
| **Month 4–6** | All 64 district sadar towns | Min 3 per district |

### Key Medical Areas by Division
| Division | City | Key Areas |
|---|---|---|
| Dhaka | Dhaka city | Dhanmondi, Shahbag, Mirpur, Gulshan, Uttara, Bashundhara, Mohammadpur |
| Chattogram | Chattogram city | Nasirabad/GEC, Panchlaish, Agrabad, Halishahar, Khulshi |
| Rajshahi | Rajshahi city | Boalia, Shah Makhdum; also Bogura Sadar |
| Sylhet | Sylhet city | Sylhet Sadar, Zindabazar, Ambarkhana |
| Khulna | Khulna city | Khulna Sadar; also Jessore |
| Mymensingh | Mymensingh city | Mymensingh Sadar |
| Rangpur | Rangpur city | Rangpur Sadar; also Dinajpur |
| Barishal | Barishal city | Barishal Sadar |

---

## 11. UX Flows

### Flow 1 — I Know What Doctor I Need
```
Homepage → Search bar (type specialty or name)
→ Doctor list → Filter by division/district
→ Doctor profile → Tap-to-call
```

### Flow 2 — I Know My Disease
```
Homepage disease chip → Disease detail page
→ "See doctors for this condition"
→ Specialty category → Doctor profile → Tap-to-call
```

### Flow 3 — I Only Know My Symptom
```
Homepage → AI Chat → Describe symptom (Bengali or English)
→ AI suggests disease + specialist link
→ Disease page or Specialty category
→ Doctor profile → Tap-to-call
```

### Flow 4 — I Need to Know About a Test
```
Disease page → "Tests required" chips
→ Test detail page → Cost range + where to get it → Nearest lab
```

### Flow 5 — I Want to Save a Doctor for Later
```
Doctor profile → Save → Stored in localStorage
→ /profile → Saved Doctors section
```

### Flow 6 — I Want to Browse by Body System
```
/diseases → Click body system tab
→ List of diseases in that category
→ Disease page → Specialist → Doctor → Call
```

---

## 12. Design System

| Role | Value | Usage |
|---|---|---|
| Primary | `#059669` Emerald | CTAs, links, active states, nav underline |
| Primary dark | `#047857` | Hover on primary buttons |
| Background | `#FFFFFF` | All pages |
| Border | `#E5E7EB` | Cards, dividers |
| Text primary | `#111827` | Headings, body |
| Text secondary | `#6B7280` | Subtitles, metadata |
| Text muted | `#9CA3AF` | Placeholders |
| Icon background | `#F3F4F6` | All icon containers — unified gray |
| Icon color | `#1F2937` | All icons — unified dark |
| Emergency | `#DC2626` | Emergency banner only |

**Font:** Hind Siliguri — covers Bengali and Latin  
**Icons:** Lucide React — unified black on gray  
**Rule:** One primary color (emerald). No per-specialty accent colors. No fee (৳) symbols on doctor profiles.

---

## 13. Tech Stack

| Layer | v1 | v2 |
|---|---|---|
| Framework | Next.js 16 — App Router, Turbopack | — |
| Styling | Tailwind CSS v4 | — |
| Language | TypeScript | — |
| Icons | Lucide React | — |
| Font | Hind Siliguri | — |
| AI | Claude Haiku via Anthropic API | Claude Sonnet for complex queries |
| Data | Static TypeScript files | PostgreSQL + Prisma |
| Auth | None (localStorage) | NextAuth.js + SMS OTP (SSL Wireless BD) |
| Search | Client-side filter | Meilisearch |
| Hosting | Vercel | Vercel |

---

## 14. Page Map

| Page | Route | Status |
|---|---|---|
| Homepage | `/` | ✅ Launch |
| Find Doctors | `/doctors` | ✅ Launch |
| Doctor Profile | `/doctors/[id]` | ✅ Launch |
| Specialties browse | `/specialties` | ✅ Launch |
| Specialty category | `/category/[slug]` | ✅ Launch |
| Diseases browse | `/diseases` | ✅ Launch |
| Disease detail | `/disease/[slug]` | ✅ Launch |
| Tests list | `/tests` | ✅ Launch |
| Test detail | `/test/[slug]` | ✅ Launch |
| User Profile | `/profile` | ✅ Launch |
| About / Fee Guide | `/about` | ✅ Launch |
| 404 | — | ✅ Launch |
| Login / Register | `/auth` | 🔜 v2 |
| Submit Doctor | `/submit` | 🔜 v2 |
| Admin Panel | `/admin` | 🔜 v2 |

---

## 15. What Is Already Built

### On `doctor-site` branch
| Feature | Status | Notes |
|---|---|---|
| Homepage with search | ✅ Done | Emerald design applied |
| Doctor list + filters | ⚠️ Needs fix | Fee filter must be removed |
| Doctor profile + tap-to-call | ✅ Done | Maps link missing |
| Specialty browse | ✅ Done | |
| Disease Explorer — 10 diseases | ✅ Done | 65 more diseases needed |
| Diagnostic Tests — 14 tests | ✅ Done | Cost ranges not yet added |
| AI Chat component | ✅ Done | API key + system prompt update needed |
| Bilingual EN/BN | ✅ Done | |
| Emergency banner (16457) | ✅ Done | |

### On `rajibraju/profile` branch (not yet merged)
| Feature | Status |
|---|---|
| User profile page `/profile` | ✅ Ready to merge |
| Mobile bottom nav (4 tabs) | ✅ Ready to merge |
| Recently visited tracking | ✅ Ready to merge |

---

## 16. What Needs to Be Done

### 🔴 P0 — Must be done before launch

| Task | Detail |
|---|---|
| Fix fee on `/doctors` page | Remove sort-by-fee and fee range filter. No ৳ anywhere. |
| Google Maps on every doctor profile | "Get Directions" link → opens Maps app on Android |
| Doctor data — Dhaka 50+ | All 12 specialties, minimum 5 doctors each. All fields complete. |
| Doctor data — Chattogram 20+ | Currently only 3. Need 20+ with all fields complete. |
| Data quality pass | No placeholders. All phones formatted `01X-XXXXXXX`. All `whenToSee` arrays filled. |
| AI Chat working end-to-end | `ANTHROPIC_API_KEY` in Vercel. 10 EN + 10 BN queries pass. Emergency trigger works. |
| All routes return 200 | Curl sweep across full page map confirms zero broken routes. |
| Mobile QA at 375px | No horizontal scroll. All tap targets ≥ 44px. |
| 100% bilingual | Zero English strings visible in Bengali mode. |

### 🟡 P1 — Should be done before launch

| Task | Detail |
|---|---|
| Merge profile + bottom nav from `rajibraju/profile` | Port profile page and BottomNav.tsx (remove fee display first) |
| Test cost ranges on all test pages | Add 3-tier ৳ cost to `tests.ts`. Render on every `/test/[slug]`. |
| Doctor fee guide on `/about` | City-tier table + Dhaka sub-area breakdown |
| 65 more diseases | All remaining diseases from taxonomy in Section 5 |
| 36 more tests | All remaining tests from Section 8 |
| Bengali search accuracy | Test 5 Bengali queries. Fix Unicode normalization if broken. |
| 404 page | `src/app/not-found.tsx` — bilingual, links to homepage |
| `.env.local.example` | Document `ANTHROPIC_API_KEY` for developer onboarding |
| Other divisions data | Rajshahi, Sylhet, Khulna — 5+ doctors each |
| AI Chat system prompt update | Add all 10 diseases, all 12 specialties, test cost instructions |

### 🟢 P2 — Post-launch (v1.1)

| Task | Detail |
|---|---|
| All 75 diseases fully seeded | Complete taxonomy from Section 5 |
| All 50+ tests fully seeded | Complete directory from Section 8 |
| All 8 divisions seeded | Full geographic coverage |
| About page — real content | Team section, mission, medical disclaimer |
| Analytics | Vercel Analytics or PostHog |

---

## 17. Sprint Plan

**8 working days. Zero to launch.**

| Day | What Gets Done | Owner | Done When |
|---|---|---|---|
| **Day 1** | Fix fee violations on `/doctors` · Add Google Maps link to doctor profiles · Create `.env.local.example` | @shojolislam | No ৳ anywhere; Maps link opens on Android |
| **Day 2** | Merge profile page + bottom nav from `rajibraju/profile` · Port recently visited tracking | @rajibraju02 | `/profile` live; 4-tab nav works on 375px |
| **Day 3** | Add cost ranges to all 14 test pages · Build doctor fee guide on `/about` · Create 404 page | @shojolislam | Every test page shows 3-tier ৳ cost; fee guide visible |
| **Day 4** | Doctor data — Dhaka 50+ (all 12 specialties, ≥ 5 each, all fields complete) | @Sadbinwalid + @rajibraju02 | 50 Dhaka doctors verified, no placeholders |
| **Day 5** | Doctor data — Chattogram 20+ · AI Chat 20-query test (10 EN + 10 BN) | @Sadbinwalid + @shojolislam | 20 Chattogram doctors; all AI queries pass |
| **Day 6** | Expand diseases (65 more from taxonomy) · Expand tests (36 more) · Bengali search test | @rajibraju02 | All disease + test pages populated and bilingual |
| **Day 7** | Full QA — all routes 200, mobile 375px, bilingual sweep, DoD checklist | All three | All 12 DoD criteria checked off |
| **Day 8** | Vercel deploy · Domain · Real user test in Dhaka · Stakeholder demo | @Sadbinwalid | Live in production, demo recorded |

---

## 18. Definition of Done

### The North Star
> **The project is done when a person in Bangladesh — on a cheap Android phone, on mobile data, in Bengali — can go from "I feel unwell" to calling the right doctor in under 60 seconds.**

---

### Level 1 — A Feature Is Done When All 5 Pass:
1. Works in English **and** Bengali — zero missing translation strings
2. Works on mobile 375px — no horizontal scroll, no broken layout
3. Works on Chrome Android 80+
4. All internal links go to correct routes — no dead links
5. No TypeScript errors, no console errors on load

A feature that passes 4 out of 5 is **not done**.

---

### Level 2 — Project Is Ready to Launch When All 12 Pass:

| # | Criterion | How to Verify |
|---|---|---|
| 1 | **60-second doctor discovery** | Real user on Android + mobile data: finds doctor + taps call in ≤ 60 seconds |
| 2 | **Disease → Doctor flow end-to-end** | `/diseases` → disease → specialist → doctor profile — zero broken steps |
| 3 | **AI chat triages correctly** | 10 EN + 10 BN queries return correct specialty/disease links; no hallucinated names |
| 4 | **Fee & cost guide live** | City-tier fee table and test cost ranges visible on site |
| 5 | **User profile persists** | Edit profile → close browser → reopen → data still there |
| 6 | **100% bilingual** | Switch to BN → zero English strings visible anywhere |
| 7 | **No fee data on doctor profiles** | `grep -r "৳" src/components/DoctorCard.tsx` returns 0 results |
| 8 | **Emergency above fold on mobile** | 16457 visible without scrolling on homepage at 375px |
| 9 | **All pages load** | Every route in page map returns HTTP 200 |
| 10 | **Performance** | Lighthouse mobile score ≥ 80; homepage transfer < 200 KB |
| 11 | **Code clean** | `npx tsc --noEmit` + `npm run lint` — zero errors |
| 12 | **Live on Vercel** | Production URL up; `ANTHROPIC_API_KEY` set; domain resolves |

---

### Sign-Off Ownership

| Area | Owner |
|---|---|
| Disease Explorer, AI Chat, UX polish, test cost pages | @shojolislam |
| Profile page, bottom nav, doctor data, disease/test content | @rajibraju02 |
| Final launch sign-off — all 12 criteria | @Sadbinwalid |

---

### What "Done" Is NOT
- ❌ "It works on my machine" — must work on Chrome Android 80+
- ❌ "The English version works" — both languages must pass
- ❌ "It builds without errors" — must also pass QA on a real device
- ❌ "Most features work" — all 12 Level 2 criteria, not most
- ❌ "We'll fix it after launch" — P0 bugs block launch, no exceptions
