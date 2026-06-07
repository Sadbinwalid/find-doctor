# DoctorBD — Product Requirements Document

**Version:** 6.0 — Full Scope Edition  
**Date:** 2026-06-07  
**Status:** Approved for Sprint  
**Timeline:** 2 weeks (10 working days) — Zero to Launch  
**Branches consolidated:** `main` · `rajibraju/profile` · `doctor-site`

---

## Table of Contents

1. [The Problem — Bangladesh Context](#1-the-problem--bangladesh-context)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [User Types](#3-user-types)
4. [Complete Disease Taxonomy](#4-complete-disease-taxonomy)
5. [Doctor Specialty Directory](#5-doctor-specialty-directory)
6. [Disease → Doctor → Test Mapping](#6-disease--doctor--test-mapping)
7. [Diagnostic Tests & Costs](#7-diagnostic-tests--costs)
8. [Doctor Fee Guide by City](#8-doctor-fee-guide-by-city)
9. [City & Area Coverage](#9-city--area-coverage)
10. [Full Feature Set](#10-full-feature-set)
11. [UX Flows](#11-ux-flows)
12. [Design System](#12-design-system)
13. [Technology Stack](#13-technology-stack)
14. [Page Map](#14-page-map)
15. [Definition of Done](#15-definition-of-done)
16. [2-Week Sprint Plan](#16-2-week-sprint-plan)
17. [Post-Launch Roadmap (v2)](#17-post-launch-roadmap-v2)

---

## 1. The Problem — Bangladesh Context

### Why DoctorBD Needs to Exist

Bangladesh has a critical gap in health information access. When someone falls ill, they face three compounding problems:

**Problem 1 — Medical Illiteracy**  
Most people in Bangladesh cannot connect their symptoms to the right type of doctor. Someone with chest tightness does not know if they need a cardiologist, a pulmonologist, or a general physician. Someone with chronic fatigue does not know if it could be diabetes, anemia, or thyroid disease. There is almost no Bangla-language medical content that bridges symptoms → disease → specialist.

**Problem 2 — No Reliable Directory**  
There is no centralized, verified, up-to-date database of doctors in Bangladesh — organized by specialty, searchable by location, and showing actionable contact information. Word of mouth and informal referrals drive almost all doctor discovery. This means the well-connected get good care, and everyone else guesses.

**Problem 3 — Cost Opacity**  
Patients have no idea what a consultation will cost before they travel. Doctor fees vary widely — ৳300 to ৳2,500 — by city, seniority, and hospital. Diagnostic test prices also vary significantly across labs. People often avoid care because they fear unknown costs.

### The Consequence

People delay seeing the right doctor. They see the wrong specialist first. They waste time and money on unnecessary tests. Preventable diseases like diabetes, hypertension, and dengue worsen because the patient did not know which doctor to see or could not find one nearby.

### What DoctorBD Solves

| User Problem | DoctorBD Solution |
|---|---|
| "I don't know which doctor to see" | Disease Explorer: symptom/disease → recommended specialist |
| "I don't know what's wrong with me" | Disease pages: plain-language explanation, symptoms, causes |
| "I can't find a doctor near me" | Location-filtered search across all 8 divisions, 64 districts |
| "I don't know what tests I need" | Disease → Test mapping; each test explained in plain language |
| "I don't know what anything costs" | Fee guide by city tier; test cost ranges per lab |
| "I don't speak medical language" | Full bilingual interface — Bengali and English throughout |
| "I don't know if this doctor is real" | Verified badge system (v2); community-validated profiles |

---

## 2. Product Vision & Goals

### Vision
A person anywhere in Bangladesh — from Gulshan to Gaibandha — can identify their health problem, find the right verified specialist nearby, understand what it will cost, and call that doctor's chamber in under 60 seconds.

### Core Job-to-Be-Done
> Someone in Bangladesh feels unwell. In under 60 seconds they know: which type of doctor do I need, where are they near me, how do I reach them, and what will it cost?

### v1 Goals
- Searchable directory of verified doctors organized by specialty and location
- Disease Explorer connecting symptoms → disease → specialist → doctor
- Transparent fee and test cost information by city
- Full bilingual experience (Bengali + English)
- Cover all 8 divisions from day one; initial data density in Dhaka and Chattogram

### Non-Goals (v1)
- In-app appointment booking
- Payment processing
- Telemedicine / video consultations
- Prescription or medical record management
- Automated BMDC registry validation

---

## 3. User Types

| Role | v1 | v2 |
|---|---|---|
| **Visitor** | Browse, search, disease explorer, AI chat | — |
| **Registered User** | + Profile, saved doctors, appointment history | Full profile, review submission |
| **Doctor** | — | Claim and edit own profile, verification upload |
| **Contributor** | — | Submit new doctor, suggest edits |
| **Admin** | — | Full moderation, approval queue, category management |

> v1 ships with Visitor + Registered User (localStorage-based, no backend auth required).

---

## 4. Complete Disease Taxonomy

50 diseases across 15 body-system categories. Each disease links to a specialist and required tests.

---

### Category 1 — Heart & Blood (হৃদয় ও রক্ত)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 1 | Hypertension (High Blood Pressure) | উচ্চ রক্তচাপ | Headache, dizziness, blurred vision, chest tightness | Cardiologist / General Physician |
| 2 | Coronary Artery Disease / Heart Disease | হৃদরোগ | Chest pain, shortness of breath, left arm pain, fatigue | Cardiologist |
| 3 | Heart Failure | হার্ট ফেইলিউর | Swollen ankles, breathlessness, fatigue, rapid heartbeat | Cardiologist |
| 4 | Arrhythmia (Irregular Heartbeat) | অনিয়মিত হৃদস্পন্দন | Palpitations, fluttering chest, fainting, dizziness | Cardiologist |
| 5 | Anemia | রক্তশূন্যতা | Fatigue, pale skin, dizziness, shortness of breath | General Physician / Hematologist |
| 6 | Deep Vein Thrombosis (DVT) | শিরায় রক্ত জমাট | Leg swelling, warmth, redness, leg pain | General Physician / Vascular Surgeon |

---

### Category 2 — Digestive & Liver (পাচনতন্ত্র ও যকৃত)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 7 | Gastric / Peptic Ulcer | গ্যাস্ট্রিক / পেপটিক আলসার | Burning stomach pain, nausea, bloating, indigestion | Gastroenterologist / General Physician |
| 8 | Hepatitis B | হেপাটাইটিস বি | Jaundice, fatigue, nausea, abdominal pain | Gastroenterologist / Hepatologist |
| 9 | Hepatitis C | হেপাটাইটিস সি | Jaundice, fatigue, dark urine, joint pain | Gastroenterologist / Hepatologist |
| 10 | Liver Cirrhosis | যকৃতের সিরোসিস | Jaundice, abdominal swelling, easy bruising, confusion | Gastroenterologist / Hepatologist |
| 11 | Irritable Bowel Syndrome (IBS) | আইবিএস | Cramping, diarrhea, constipation, bloating | Gastroenterologist |
| 12 | Appendicitis | অ্যাপেন্ডিসাইটিস | Severe right lower abdominal pain, fever, nausea | Surgeon (emergency) |
| 13 | Jaundice | জন্ডিস | Yellow skin/eyes, dark urine, pale stool, fatigue | General Physician / Gastroenterologist |

---

### Category 3 — Endocrine & Hormones (হরমোন ও বিপাক)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 14 | Type 2 Diabetes | ডায়াবেটিস | Frequent urination, excessive thirst, fatigue, blurred vision | Endocrinologist / General Physician |
| 15 | Hypothyroidism | হাইপোথাইরয়েডিজম | Weight gain, fatigue, cold intolerance, constipation, depression | Endocrinologist |
| 16 | Hyperthyroidism | হাইপারথাইরয়েডিজম | Weight loss, rapid heartbeat, sweating, anxiety | Endocrinologist |
| 17 | PCOS (Polycystic Ovary Syndrome) | পিসিওএস | Irregular periods, acne, weight gain, hair loss | Gynecologist / Endocrinologist |
| 18 | Obesity | স্থূলতা | Excess weight, joint pain, fatigue, metabolic issues | General Physician / Endocrinologist |

---

### Category 4 — Respiratory (শ্বাসতন্ত্র)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 19 | Asthma | হাঁপানি | Wheezing, shortness of breath, chest tightness, coughing | Pulmonologist / General Physician |
| 20 | COPD | সিওপিডি | Chronic cough, mucus, shortness of breath, wheezing | Pulmonologist |
| 21 | Pneumonia | নিউমোনিয়া | High fever, cough with phlegm, chest pain, difficulty breathing | General Physician / Pulmonologist |
| 22 | Tuberculosis (TB) | যক্ষ্মা | Chronic cough (3+ weeks), blood in sputum, night sweats, weight loss | Pulmonologist / General Physician |
| 23 | Bronchitis | ব্রংকাইটিস | Cough, mucus, fatigue, mild fever, chest discomfort | General Physician |

---

### Category 5 — Kidney & Urinary (কিডনি ও মূত্রতন্ত্র)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 24 | Chronic Kidney Disease (CKD) | দীর্ঘস্থায়ী কিডনি রোগ | Swollen ankles, fatigue, nausea, reduced urination | Nephrologist |
| 25 | Kidney Stones | কিডনিতে পাথর | Severe back/side pain, blood in urine, nausea | Urologist / Nephrologist |
| 26 | Urinary Tract Infection (UTI) | মূত্রনালীর সংক্রমণ | Burning urination, frequent urge, cloudy urine, pelvic pain | General Physician / Urologist |
| 27 | Nephrotic Syndrome | নেফ্রোটিক সিন্ড্রোম | Severe swelling (face, legs), protein in urine, weight gain | Nephrologist |

---

### Category 6 — Skin & Hair (ত্বক ও চুল)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 28 | Eczema / Atopic Dermatitis | একজিমা | Itchy, red, inflamed, dry skin patches | Dermatologist |
| 29 | Psoriasis | সোরিয়াসিস | Scaly silver patches, redness, itching, dry cracked skin | Dermatologist |
| 30 | Fungal Skin Infection (Ringworm) | দাদ / ছত্রাক সংক্রমণ | Ring-shaped rash, itching, redness, scaling | Dermatologist / General Physician |
| 31 | Acne | ব্রণ | Pimples, blackheads, whiteheads, inflammation on face/back | Dermatologist |
| 32 | Skin Allergy / Urticaria | ত্বকের অ্যালার্জি | Hives, redness, swelling, itching | Dermatologist / General Physician |
| 33 | Hair Loss (Alopecia) | চুল পড়া | Thinning hair, bald patches, receding hairline | Dermatologist |

---

### Category 7 — Brain & Nervous System (মস্তিষ্ক ও স্নায়ু)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 34 | Migraine | মাইগ্রেন | Severe one-sided headache, nausea, light/sound sensitivity | Neurologist |
| 35 | Epilepsy / Seizures | মৃগীরোগ | Uncontrolled shaking, loss of consciousness, confusion | Neurologist |
| 36 | Stroke | স্ট্রোক | Sudden facial drooping, arm weakness, speech difficulty, vision loss | Neurologist (emergency) |
| 37 | Parkinson's Disease | পার্কিনসন্স রোগ | Tremors, stiff muscles, slow movement, balance problems | Neurologist |
| 38 | Vertigo | ভার্টিগো | Spinning sensation, dizziness, balance loss, nausea | Neurologist / ENT |

---

### Category 8 — Bone, Joint & Muscle (হাড়, জয়েন্ট ও পেশি)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 39 | Osteoarthritis | অস্টিওআর্থ্রাইটিস | Joint pain, stiffness, swelling, reduced flexibility | Orthopedic |
| 40 | Rheumatoid Arthritis | রিউমাটয়েড আর্থ্রাইটিস | Joint pain, morning stiffness, fatigue, swollen joints | Rheumatologist / Orthopedic |
| 41 | Back Pain / Disc Disease | পিঠ ব্যথা | Lower/upper back pain, radiating leg pain, numbness | Orthopedic / Neurologist |
| 42 | Gout | গেঁটেবাত | Sudden intense joint pain (often big toe), swelling, redness | Rheumatologist / General Physician |
| 43 | Osteoporosis | অস্টিওপোরোসিস | Bone fractures from minor falls, back pain, stooped posture | Orthopedic / Endocrinologist |

---

### Category 9 — Women's Health (নারী স্বাস্থ্য)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 44 | Pregnancy Complications | গর্ভাবস্থার জটিলতা | Bleeding, swelling, high BP, severe vomiting | Gynecologist |
| 45 | Cervical Cancer | জরায়ুমুখের ক্যান্সার | Abnormal vaginal bleeding, discharge, pelvic pain | Gynecologist / Oncologist |
| 46 | Breast Cancer | স্তন ক্যান্সার | Lump in breast, nipple discharge, skin changes | Gynecologist / Oncologist |
| 47 | Menstrual Disorders | মাসিকের সমস্যা | Irregular/heavy/painful periods | Gynecologist |
| 48 | Infertility | বন্ধ্যাত্ব | Inability to conceive after 1 year | Gynecologist / Endocrinologist |

---

### Category 10 — Child Health (শিশু স্বাস্থ্য)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 49 | Childhood Fever | শিশুর জ্বর | High temperature, irritability, loss of appetite | Pediatrician |
| 50 | Malnutrition / Stunting | অপুষ্টি | Low weight, poor growth, fatigue, frequent illness | Pediatrician / Nutritionist |

---

### Category 11 — Eye Diseases (চোখের রোগ)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 51 | Cataract | ছানি | Cloudy/blurry vision, glare sensitivity, poor night vision | Ophthalmologist |
| 52 | Glaucoma | গ্লুকোমা | Gradual vision loss, halos around lights, eye pain | Ophthalmologist |
| 53 | Diabetic Retinopathy | ডায়াবেটিক রেটিনোপ্যাথি | Blurred vision, floaters, dark spots (in diabetic patients) | Ophthalmologist |
| 54 | Conjunctivitis (Pink Eye) | চোখ ওঠা | Red eyes, discharge, itching, watering | Ophthalmologist / General Physician |

---

### Category 12 — Ear, Nose & Throat (নাক-কান-গলা)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 55 | Sinusitis | সাইনুসাইটিস | Facial pain/pressure, nasal congestion, headache, thick discharge | ENT Specialist |
| 56 | Tonsillitis | টনসিলাইটিস | Sore throat, difficulty swallowing, swollen tonsils, fever | ENT Specialist / General Physician |
| 57 | Hearing Loss | শ্রবণশক্তি হ্রাস | Reduced hearing, muffled sounds, ringing in ears (tinnitus) | ENT Specialist |
| 58 | Otitis Media (Ear Infection) | কানের সংক্রমণ | Ear pain, fluid discharge, reduced hearing, fever | ENT Specialist / General Physician |

---

### Category 13 — Infectious & Tropical Diseases (সংক্রামক রোগ)

*Highest prevalence in Bangladesh. Priority content.*

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 59 | Dengue Fever | ডেঙ্গু জ্বর | High fever, severe headache, eye pain, muscle/joint pain, rash | General Physician (hospitalize if platelet low) |
| 60 | Typhoid Fever | টাইফয়েড জ্বর | Sustained high fever, stomach pain, headache, loss of appetite | General Physician |
| 61 | Malaria | ম্যালেরিয়া | Cyclical fever, chills, sweating, headache, vomiting | General Physician / Infectious Disease |
| 62 | Chickenpox | জলবসন্ত | Itchy blisters, fever, fatigue, loss of appetite | General Physician / Dermatologist |
| 63 | Cholera | কলেরা | Severe watery diarrhea, vomiting, dehydration, muscle cramps | General Physician (emergency) |
| 64 | COVID-19 | কোভিড-১৯ | Fever, cough, breathlessness, loss of taste/smell | General Physician / Pulmonologist |
| 65 | Scabies | খোস-পাঁচড়া | Intense itching (worse at night), rash, thin burrow tracks | Dermatologist / General Physician |

---

### Category 14 — Mental Health (মানসিক স্বাস্থ্য)

| # | Disease (English) | Disease (Bengali) | Common Symptoms | Primary Specialist |
|---|---|---|---|---|
| 66 | Depression | বিষণ্নতা | Persistent sadness, loss of interest, fatigue, hopelessness | Psychiatrist |
| 67 | Anxiety Disorder | উদ্বেগ ব্যাধি | Excessive worry, restlessness, rapid heartbeat, sweating | Psychiatrist |
| 68 | Panic Disorder | প্যানিক ডিসঅর্ডার | Sudden intense fear, racing heart, shortness of breath, trembling | Psychiatrist |
| 69 | Sleep Disorders (Insomnia) | ঘুমের সমস্যা | Difficulty falling/staying asleep, daytime fatigue | Psychiatrist / General Physician |
| 70 | Substance Use Disorder | মাদকাসক্তি | Dependency on alcohol/drugs, withdrawal symptoms | Psychiatrist |

---

### Category 15 — Cancer (ক্যান্সার)

*Common cancers in the Bangladesh population.*

| # | Disease (English) | Disease (Bengali) | Warning Signs | Primary Specialist |
|---|---|---|---|---|
| 71 | Oral Cancer | মুখের ক্যান্সার | White/red patches in mouth, sores that don't heal, difficulty swallowing | Oncologist / ENT |
| 72 | Stomach Cancer | পাকস্থলীর ক্যান্সার | Persistent stomach pain, unexplained weight loss, vomiting blood | Gastroenterologist / Oncologist |
| 73 | Lung Cancer | ফুসফুসের ক্যান্সার | Chronic cough, blood in sputum, chest pain, weight loss | Pulmonologist / Oncologist |
| 74 | Colorectal Cancer | কোলন ক্যান্সার | Blood in stool, change in bowel habits, unexplained weight loss | Gastroenterologist / Oncologist |
| 75 | Liver Cancer | যকৃতের ক্যান্সার | Right upper abdominal pain, jaundice, weight loss, swelling | Gastroenterologist / Oncologist |

---

## 5. Doctor Specialty Directory

20 specialties covered in DoctorBD. 12 are available at launch; 8 are planned for v1.1.

### Launch Specialties (12)

| Specialty | Bengali | Treats |
|---|---|---|
| Cardiologist | হৃদরোগ বিশেষজ্ঞ | Heart disease, hypertension, arrhythmia, heart failure |
| Dermatologist | চর্মরোগ বিশেষজ্ঞ | Eczema, psoriasis, acne, fungal infections, skin allergy, hair loss |
| Neurologist | স্নায়ুরোগ বিশেষজ্ঞ | Migraine, epilepsy, stroke, Parkinson's, vertigo, back pain |
| Pediatrician | শিশু বিশেষজ্ঞ | All childhood diseases, vaccinations, growth, malnutrition |
| Gynecologist | স্ত্রীরোগ বিশেষজ্ঞ | Pregnancy, PCOS, menstrual disorders, infertility, cervical/breast cancer |
| Orthopedic | অস্থি বিশেষজ্ঞ | Fractures, arthritis, back pain, knee/hip problems, sports injuries |
| Gastroenterologist | পরিপাক বিশেষজ্ঞ | Gastric ulcer, hepatitis, liver disease, IBS, jaundice, colon cancer |
| ENT Specialist | নাক-কান-গলা বিশেষজ্ঞ | Sinusitis, tonsillitis, hearing loss, ear infections, vertigo |
| Ophthalmologist | চক্ষু বিশেষজ্ঞ | Cataract, glaucoma, diabetic retinopathy, conjunctivitis, vision |
| Psychiatrist | মনোরোগ বিশেষজ্ঞ | Depression, anxiety, panic, insomnia, addiction |
| Nephrologist | কিডনি বিশেষজ্ঞ | CKD, nephrotic syndrome, dialysis, high creatinine, kidney stones |
| General Physician | সাধারণ চিকিৎসক | Fever, dengue, typhoid, diabetes management, routine care, first contact |

### Planned Specialties (v1.1)

| Specialty | Bengali | Priority |
|---|---|---|
| Endocrinologist | এন্ডোক্রিনোলজিস্ট | Diabetes, thyroid, PCOS, hormonal disorders |
| Pulmonologist | ফুসফুস বিশেষজ্ঞ | Asthma, COPD, TB, pneumonia, lung cancer |
| Oncologist | ক্যান্সার বিশেষজ্ঞ | All cancers |
| Urologist | মূত্রতন্ত্র বিশেষজ্ঞ | Kidney stones, UTI, prostate issues |
| Rheumatologist | রিউম্যাটোলজিস্ট | Rheumatoid arthritis, gout, lupus |
| Hepatologist | যকৃত বিশেষজ্ঞ | Hepatitis B/C, liver cirrhosis, liver cancer |
| Hematologist | রক্ত বিশেষজ্ঞ | Anemia, blood disorders, clotting issues |
| Nutritionist | পুষ্টিবিদ | Malnutrition, obesity, dietary management |

---

## 6. Disease → Doctor → Test Mapping

The critical reference table. This drives the Disease Explorer flow: Disease → Specialist → Tests needed.

| Disease | See This Doctor | Tests Required | Urgency |
|---|---|---|---|
| Hypertension | Cardiologist / GP | BP monitoring, ECG, Lipid Profile, Kidney Function, Blood Sugar | Routine |
| Heart Disease | Cardiologist | ECG, Echocardiogram, Troponin, Lipid Profile, Chest X-Ray | Urgent |
| Type 2 Diabetes | Endocrinologist / GP | Fasting Blood Sugar, HbA1c, Lipid Profile, Kidney Function, Urine R/E | Routine |
| Thyroid Disorder | Endocrinologist | TSH, T3, T4, Thyroid Ultrasound | Routine |
| Dengue Fever | GP | Dengue NS1 Ag, CBC, Platelet Count | Urgent |
| Typhoid Fever | GP | Widal Test, Blood Culture, CBC | Urgent |
| Malaria | GP | Malaria RDT / Blood Film, CBC | Urgent |
| Hepatitis B | Gastroenterologist | HBsAg, Liver Function Test, HBV DNA, Ultrasound Abdomen | Routine |
| Hepatitis C | Gastroenterologist | Anti-HCV, Liver Function Test, Ultrasound Abdomen | Routine |
| Liver Cirrhosis | Gastroenterologist | Liver Function Test, CBC, PT/INR, AFP, Ultrasound Abdomen | Urgent |
| Gastric Ulcer | Gastroenterologist / GP | H. pylori Test, Endoscopy, CBC | Routine |
| IBS | Gastroenterologist | Stool R/E, Blood Test, Colonoscopy (if severe) | Routine |
| Kidney Disease | Nephrologist | Creatinine, Urea, Urine R/E, Ultrasound Kidney, eGFR | Urgent |
| Kidney Stones | Urologist / Nephrologist | Ultrasound Kidney, Urine R/E, Serum Calcium, Uric Acid, CT KUB | Urgent |
| UTI | GP / Urologist | Urine R/E, Urine Culture | Routine |
| Asthma | Pulmonologist | Spirometry, Chest X-Ray, Allergy Test (IgE) | Routine |
| COPD | Pulmonologist | Spirometry, Chest X-Ray, ABG (arterial blood gas) | Routine |
| Pneumonia | GP / Pulmonologist | Chest X-Ray, CBC, Sputum Culture, CRP | Urgent |
| Tuberculosis | Pulmonologist | Sputum AFB, Chest X-Ray, Mantoux Test, GeneXpert | Urgent |
| Migraine | Neurologist | MRI Brain (if new/severe), CBC, Blood Sugar | Routine |
| Epilepsy | Neurologist | EEG, MRI Brain, Blood Tests | Routine |
| Stroke | Neurologist | CT Scan Brain, MRI Brain, ECG, Lipid Profile | Emergency |
| Osteoarthritis | Orthopedic | X-Ray Joints, ESR, CRP, Uric Acid | Routine |
| Rheumatoid Arthritis | Rheumatologist | Rheumatoid Factor, Anti-CCP, ESR, CRP, CBC | Routine |
| Gout | Rheumatologist / GP | Serum Uric Acid, Joint Fluid Analysis, Kidney Function | Routine |
| Eczema | Dermatologist | Allergy Test (IgE), Skin Patch Test, CBC | Routine |
| Psoriasis | Dermatologist | Clinical diagnosis (usually), ESR, CBC | Routine |
| Fungal Infection | Dermatologist / GP | KOH Examination, Culture (if uncertain) | Routine |
| PCOS | Gynecologist | Pelvic Ultrasound, FSH, LH, Testosterone, Fasting Insulin | Routine |
| Pregnancy Care | Gynecologist | Pregnancy Test, Blood Group, CBC, Blood Sugar, Ultrasound | Routine |
| Cervical Cancer | Gynecologist | Pap Smear, HPV Test, Colposcopy | Routine |
| Breast Cancer | Gynecologist | Mammogram, Ultrasound Breast, Biopsy | Routine |
| Depression | Psychiatrist | Clinical assessment (no blood test required); thyroid check to rule out | Routine |
| Cataract | Ophthalmologist | Visual Acuity, Slit Lamp Exam, IOL Master | Routine |
| Glaucoma | Ophthalmologist | IOP (Tonometry), Visual Field Test, OCT | Routine |
| Diabetic Retinopathy | Ophthalmologist | Dilated Eye Exam, Fundus Photography, OCT | Routine |
| Sinusitis | ENT | Clinical exam, Nasal Endoscopy, CT Sinus (if chronic) | Routine |
| Anemia | GP / Hematologist | CBC, Peripheral Blood Film, Serum Ferritin, Vitamin B12, Folate | Routine |
| Dengue (Severe) | GP → Hospital | Dengue NS1, CBC x2/day, Platelet Count x2/day | Emergency |

---

## 7. Diagnostic Tests & Costs

### Cost Tiers

| Tier | Description | Examples |
|---|---|---|
| **Budget lab** | Smaller diagnostic centers, upazila-level | Popular (non-flagship), local diagnostic shops |
| **Mid-range lab** | Established chains, district-level | Ibn Sina, Delta Medical, Lab Aid (Dhaka outside Dhanmondi) |
| **Premium lab** | Hospital-grade, Dhaka flagship | Square Hospital, Lab Aid Dhanmondi, Praava Health |

---

### Test Directory with Cost Ranges

| Test | Bengali Name | What It Checks | Budget (৳) | Mid-range (৳) | Premium (৳) | Diseases Linked |
|---|---|---|---|---|---|---|
| CBC (Complete Blood Count) | রক্তের সম্পূর্ণ পরীক্ষা | Red cells, white cells, platelets, hemoglobin | 200–300 | 300–450 | 450–600 | Anemia, Dengue, Infections, Leukemia |
| Fasting Blood Sugar (FBS) | ফাস্টিং ব্লাড সুগার | Blood glucose after 8h fast | 80–120 | 120–180 | 180–250 | Diabetes |
| HbA1c | হিমোগ্লোবিন এ১সি | 3-month average blood sugar | 450–550 | 550–700 | 700–900 | Diabetes monitoring |
| OGTT (2-hour glucose) | গ্লুকোজ টলারেন্স টেস্ট | Diabetes confirmation | 200–300 | 300–450 | 450–600 | Diabetes, Gestational diabetes |
| Lipid Profile | লিপিড প্রোফাইল | Cholesterol, triglycerides, HDL, LDL | 400–550 | 550–750 | 750–1,000 | Heart disease, Hypertension |
| TSH (Thyroid) | থাইরয়েড টেস্ট | Thyroid stimulating hormone | 450–600 | 600–800 | 800–1,100 | Hypothyroidism, Hyperthyroidism |
| T3, T4 + TSH (Full Thyroid) | পূর্ণ থাইরয়েড প্যানেল | All thyroid hormones | 700–900 | 900–1,200 | 1,200–1,600 | Thyroid disorders |
| Liver Function Test (LFT) | যকৃত কার্যকারিতা পরীক্ষা | Liver enzymes, bilirubin, albumin | 500–700 | 700–900 | 900–1,300 | Hepatitis, Jaundice, Liver Cirrhosis |
| Kidney Function Test (KFT) | কিডনি কার্যকারিতা পরীক্ষা | Creatinine, urea, electrolytes | 450–650 | 650–850 | 850–1,200 | CKD, Kidney Stones, Hypertension |
| Creatinine | ক্রিয়েটিনিন | Kidney filtration marker | 150–200 | 200–300 | 300–450 | CKD, Dialysis monitoring |
| Uric Acid | ইউরিক এসিড | Gout marker | 150–200 | 200–300 | 300–400 | Gout, Kidney Stones |
| Urine R/E (Routine Exam) | প্রস্রাব পরীক্ষা | Protein, glucose, cells in urine | 100–150 | 150–220 | 220–350 | UTI, CKD, Diabetes |
| Urine Culture | প্রস্রাবের কালচার | Identifies bacteria causing UTI | 300–500 | 500–700 | 700–900 | UTI |
| ECG (Electrocardiogram) | ইসিজি | Heart electrical activity | 200–350 | 350–500 | 500–800 | Arrhythmia, Heart Disease |
| Echocardiogram | ইকোকার্ডিওগ্রাম | Heart ultrasound — structure, function | 2,000–3,000 | 3,000–4,500 | 4,500–7,000 | Heart Failure, Valvular disease |
| Chest X-Ray | বুকের এক্স-রে | Lungs, heart size, rib cage | 300–450 | 450–650 | 650–1,000 | Pneumonia, TB, Heart failure |
| Ultrasound Abdomen | পেটের আলট্রাসাউন্ড | Liver, gallbladder, kidneys, spleen | 800–1,200 | 1,200–1,800 | 1,800–2,800 | Liver disease, Kidney stones, IBS |
| Ultrasound Pelvis | পেলভিসের আলট্রাসাউন্ড | Uterus, ovaries (women) | 900–1,300 | 1,300–2,000 | 2,000–3,000 | PCOS, Pregnancy, Gynecological conditions |
| Pelvic Ultrasound (Transvaginal) | ট্রান্সভ্যাজাইনাল আলট্রাসাউন্ড | Detailed uterus/ovary imaging | 1,200–1,800 | 1,800–2,500 | 2,500–4,000 | PCOS, Infertility |
| MRI Brain | মাথার এমআরআই | Detailed brain imaging | 5,000–7,000 | 7,000–10,000 | 10,000–15,000 | Stroke, Epilepsy, Migraine, Tumor |
| CT Scan Brain | সিটি স্ক্যান মাথা | Cross-section brain imaging | 3,500–5,000 | 5,000–7,000 | 7,000–11,000 | Stroke (emergency), Head injury |
| CT KUB | সিটি কেইউবি | Kidney/ureter/bladder scan | 4,000–6,000 | 6,000–8,500 | 8,500–13,000 | Kidney Stones |
| EEG | ইইজি | Brain electrical activity | 1,500–2,500 | 2,500–4,000 | 4,000–6,000 | Epilepsy |
| Spirometry | স্পাইরোমেট্রি | Lung capacity and function | 500–800 | 800–1,200 | 1,200–2,000 | Asthma, COPD |
| Dengue NS1 Antigen | ডেঙ্গু এনএস১ | Dengue virus early detection (Day 1–5) | 500–700 | 700–900 | 900–1,200 | Dengue Fever |
| Dengue IgM / IgG | ডেঙ্গু অ্যান্টিবডি | Dengue antibody (Day 5+) | 400–600 | 600–800 | 800–1,100 | Dengue recovery phase |
| Platelet Count | প্লেটলেট গণনা | Blood clotting cells | 100–150 | 150–200 | 200–350 | Dengue, Bone marrow issues |
| Widal Test | উইডাল টেস্ট | Typhoid antibody | 150–250 | 250–350 | 350–500 | Typhoid Fever |
| Blood Culture | ব্লাড কালচার | Identifies blood-borne bacteria | 600–900 | 900–1,300 | 1,300–2,000 | Typhoid, Sepsis |
| Malaria RDT | ম্যালেরিয়া দ্রুত পরীক্ষা | Malaria antigen detection | 200–350 | 350–500 | 500–700 | Malaria |
| HBsAg (Hepatitis B) | হেপাটাইটিস বি পরীক্ষা | Hepatitis B surface antigen | 200–350 | 350–500 | 500–700 | Hepatitis B |
| Anti-HCV (Hepatitis C) | হেপাটাইটিস সি পরীক্ষা | Hepatitis C antibody | 500–700 | 700–900 | 900–1,300 | Hepatitis C |
| HBV DNA | এইচবিভি ডিএনএ | Hepatitis B viral load | 2,500–3,500 | 3,500–5,000 | 5,000–7,500 | Hepatitis B monitoring |
| Sputum AFB | কফ পরীক্ষা | TB bacteria in sputum | 200–350 | 350–500 | 500–750 | Tuberculosis |
| GeneXpert (TB) | জিনএক্সপার্ট | Rapid TB + drug resistance | 800–1,200 | 1,200–1,800 | 1,800–2,800 | Tuberculosis |
| ESR | ইএসআর | Inflammation marker | 100–150 | 150–200 | 200–300 | Arthritis, Infections |
| CRP | সিআরপি | Acute inflammation marker | 300–450 | 450–650 | 650–900 | Infections, Arthritis |
| Rheumatoid Factor | রিউমাটয়েড ফ্যাক্টর | Autoimmune marker | 300–450 | 450–650 | 650–900 | Rheumatoid Arthritis |
| Anti-CCP | এন্টি-সিসিপি | Specific RA marker | 1,000–1,500 | 1,500–2,200 | 2,200–3,200 | Rheumatoid Arthritis |
| Serum Ferritin | সিরাম ফেরিটিন | Iron stores | 500–700 | 700–900 | 900–1,300 | Iron-deficiency Anemia |
| Vitamin B12 | ভিটামিন বি১২ | B12 deficiency | 600–900 | 900–1,300 | 1,300–1,800 | Anemia, Neurological symptoms |
| Vitamin D | ভিটামিন ডি | Bone health marker | 700–1,000 | 1,000–1,400 | 1,400–2,000 | Bone pain, Osteoporosis |
| Allergy Test (Total IgE) | অ্যালার্জি টেস্ট | Total allergic response | 600–900 | 900–1,300 | 1,300–1,800 | Asthma, Eczema, Urticaria |
| Pap Smear | প্যাপ স্মিয়ার | Cervical cell abnormalities | 500–800 | 800–1,200 | 1,200–1,800 | Cervical Cancer screening |
| Mammogram | ম্যামোগ্রাম | Breast tissue imaging | 1,500–2,500 | 2,500–4,000 | 4,000–6,000 | Breast Cancer screening |
| Pregnancy Test (urine) | গর্ভাবস্থা পরীক্ষা | hCG detection | 50–80 | 80–120 | 120–200 | Pregnancy |
| Blood Group & Cross-match | রক্তের গ্রুপ | ABO and Rh type | 100–150 | 150–200 | 200–350 | Pre-surgery, Pregnancy |
| D-Dimer | ডি-ডাইমার | Blood clot marker | 1,000–1,500 | 1,500–2,200 | 2,200–3,500 | DVT, Pulmonary Embolism |
| Troponin I / T | ট্রোপোনিন | Heart muscle damage | 1,000–1,800 | 1,800–2,500 | 2,500–3,500 | Heart Attack |
| Colonoscopy | কোলনোস্কোপি | Large intestine camera exam | 3,000–5,000 | 5,000–8,000 | 8,000–15,000 | Colorectal Cancer, IBS |
| Endoscopy (OGD) | এন্ডোস্কোপি | Stomach/esophagus camera | 2,500–4,000 | 4,000–6,000 | 6,000–10,000 | Gastric Ulcer, GERD |

### Where to Get Tests — Major Lab Chains in Bangladesh

| Lab Chain | Cities Available | Notes |
|---|---|---|
| Popular Diagnostic Centre | Dhaka (12+ branches), Chattogram, Sylhet, Rajshahi, Khulna | Largest chain; most accessible |
| Lab Aid Diagnostic | Dhaka (Dhanmondi, Uttara, Mirpur, Gulshan), Chattogram | Premium quality; higher cost |
| Ibn Sina Diagnostic | Dhaka (multiple), Chattogram, Rajshahi, Sylhet | Mid-range; reliable |
| Delta Medical | Dhaka (Mirpur), Chattogram | Hospital + diagnostic |
| Praava Health | Dhaka (Bashundhara, Dhanmondi) | Premium; accredited |
| Square Hospital Diagnostics | Dhaka (Panthapath) | Hospital-grade premium |
| BIRDEM Diagnostic | Dhaka (Shahbag) | Excellent for diabetes tests; lower cost |
| National Heart Foundation Lab | Dhaka (Mirpur) | Specialized cardiac tests |
| Government Hospital Labs | All districts | Very low cost (৳20–200); long wait times |
| Upazila Health Complex Labs | All upazilas | Basic tests only; free or near-free |

---

## 8. Doctor Fee Guide by City

### Fee Tiers

| Tier | City | GP Consultation | Specialist Consultation | Senior Specialist |
|---|---|---|---|---|
| **Tier 1 — Dhaka** | Dhaka city | ৳400–700 | ৳800–1,500 | ৳1,500–2,500 |
| **Tier 2 — Major Cities** | Chattogram, Sylhet | ৳300–500 | ৳500–1,000 | ৳1,000–1,800 |
| **Tier 3 — Division Cities** | Rajshahi, Khulna, Mymensingh, Rangpur, Barishal | ৳200–400 | ৳400–700 | ৳700–1,200 |
| **Tier 4 — District Towns** | All other district sadar towns | ৳100–300 | ৳300–500 | ৳500–900 |
| **Tier 5 — Upazila / Rural** | Upazila health complexes | ৳30–100 | Referral to district/city | — |

### Dhaka Sub-Area Fee Guide

| Area | Character | Typical Specialist Fee |
|---|---|---|
| Dhanmondi | Private clinics, senior specialists | ৳1,000–2,500 |
| Gulshan / Banani | Premium hospitals, corporate clients | ৳1,200–2,500 |
| Bashundhara | Modern hospitals, upper-middle class | ৳1,000–2,000 |
| Mirpur | Mid-range, accessible | ৳600–1,200 |
| Uttara | Mid-to-high range, growing area | ৳700–1,500 |
| Shahbag / Panthapath | Teaching hospitals, government + private | ৳500–1,500 |
| Mohammadpur | Mid-range | ৳500–1,000 |
| Motijheel | Business district, mid-range | ৳500–1,000 |

### Fee Note for Users
> Fees listed are chamber consultation fees only and may change. Always confirm the current fee by phone before visiting. Some doctors charge different fees at their hospital vs. private chamber.

---

## 9. City & Area Coverage

### All 8 Divisions + Major Cities + Dhaka Sub-Areas

---

#### Division 1 — Dhaka (ঢাকা)

**Major districts:** Dhaka, Gazipur, Narayanganj, Manikganj, Munshiganj, Narsingdi, Tangail, Faridpur, Kishoreganj, Madaripur, Gopalganj, Rajbari, Shariatpur

**Dhaka City — Key Medical Areas (Thana/Upazila):**

| Area | Bengali | Medical Character |
|---|---|---|
| Dhanmondi | ধানমন্ডি | Highest concentration of private specialists; Lab Aid Dhanmondi, Green Life Hospital, popular chamber area |
| Shahbag / Panthapath | শাহবাগ / পান্থপথ | BSMMU, BIRDEM, Square Hospital, National Institute of Cancer Research |
| Mirpur | মিরপুর | National Heart Foundation, Delta Medical, large mid-range market |
| Gulshan | গুলশান | United Hospital, premium private sector |
| Uttara | উত্তরা | Kuwait Bangladesh Friendship Hospital, growing medical hub |
| Bashundhara | বসুন্ধরা | Evercare Hospital (formerly Apollo), Praava Health, premium |
| Mohammadpur | মোহাম্মদপুর | Ibn Sina Hospital, mid-range specialists |
| Motijheel | মতিঝিল | Dhaka Medical (nearby), government hospitals |
| Agargaon | আগারগাঁও | National Institute of Neurosciences, Shishu Hospital (BICH) |
| Sher-e-Bangla Nagar | শেরে বাংলা নগর | NICRH (Cancer), National Kidney Foundation |

**Other key Dhaka division cities:**
- Gazipur Sadar — mid-range specialists, rapid growth
- Narayanganj Sadar — local specialists, textile industry population
- Narsingdi — district-level care

---

#### Division 2 — Chattogram (চট্টগ্রাম)

**Major districts:** Chattogram, Cox's Bazar, Comilla, Feni, Brahmanbaria, Chandpur, Noakhali, Lakshmipur, Rangamati, Khagrachhari, Bandarban

**Chattogram City — Key Medical Areas:**

| Area | Medical Character |
|---|---|
| Nasirabad / GEC | Highest specialist concentration; Chattogram Medical College Hospital nearby |
| Panchlaish | Private hospitals, Parkview Hospital, mid-to-premium |
| Agrabad | Business district specialists, Ibn Sina Chattogram |
| Halishahar | Mid-range, port area |
| Khulshi | Premium residential, private specialists |
| Pahartali | Government hospital zone |

**Other key cities:** Cox's Bazar (Sadar), Comilla (Sadar), Feni (Sadar), Noakhali (Maijdee Court)

---

#### Division 3 — Rajshahi (রাজশাহী)

**Major districts:** Rajshahi, Bogura, Pabna, Sirajganj, Chapainawabganj, Naogaon, Natore, Joypurhat

**Rajshahi City:** Rajshahi Medical College Hospital (major referral center), Boalia and Shah Makhdum areas — private specialists  
**Bogura:** Shaheed Ziaur Rahman Medical College Hospital — main referral for northern Bangladesh

---

#### Division 4 — Khulna (খুলনা)

**Major districts:** Khulna, Jessore (Jashore), Satkhira, Bagerhat, Narail, Magura, Jhenaidah, Kushtia, Meherpur, Chuadanga

**Khulna City:** Khulna Medical College Hospital, Sadar Hospital — mid-range specialist care  
**Jessore:** Jessore Medical College Hospital — key hub for southwest region

---

#### Division 5 — Sylhet (সিলেট)

**Major districts:** Sylhet, Habiganj, Moulvibazar, Sunamganj

**Sylhet City:** Osmani Medical College Hospital, Jalalabad Ragib-Rabeya Medical College — UK/US NRB remittance population drives demand for higher-quality care; Sylhet has disproportionately good private hospitals for its size  
**Key areas:** Sylhet Sadar, Zindabazar, Ambarkhana

---

#### Division 6 — Mymensingh (ময়মনসিংহ)

**Major districts:** Mymensingh, Netrokona, Sherpur, Jamalpur

**Mymensingh City:** Mymensingh Medical College Hospital — major referral center for north-central Bangladesh; serves Tangail, Kishoreganj corridor

---

#### Division 7 — Rangpur (রংপুর)

**Major districts:** Rangpur, Dinajpur, Gaibandha, Kurigram, Lalmonirhat, Nilphamari, Panchagarh, Thakurgaon

**Rangpur City:** Rangpur Medical College Hospital — main referral for northwest  
**Dinajpur:** M Abdur Rahim Medical College Hospital — secondary hub

---

#### Division 8 — Barishal (বরিশাল)

**Major districts:** Barishal, Bhola, Patuakhali, Barguna, Jhalokati, Pirojpur

**Barishal City:** Sher-e-Bangla Medical College Hospital — main referral for coastal south  
Note: River-dependent connectivity means Barishal city serves a very large catchment area

---

### Geographic Data Coverage Plan

| Phase | Coverage | Timeline |
|---|---|---|
| Launch | Dhaka (all sub-areas), Chattogram city — 50+ doctors each | Week 1–2 |
| Phase 2 | Sylhet, Rajshahi, Khulna city — 20+ doctors each | Month 2 |
| Phase 3 | Mymensingh, Rangpur, Barishal city — 10+ doctors each | Month 3 |
| Phase 4 | All district sadar towns — minimum 5 doctors per specialty | Month 4–6 |

---

## 10. Full Feature Set

### 10.1 Doctor Search & Discovery (`main`)

- Full-text search: doctor name, specialty, hospital name, district, condition
- Works in Bengali and English simultaneously
- Quick-tag chips: Heart Doctor, Child Specialist, Skin Doctor, Eye Doctor, General Physician
- Results page filters: specialty (multi-select), division, district, sort by rating/experience
- Doctor card: initials avatar, name EN+BN, specialty, hospital, location, rating, experience, availability

---

### 10.2 Doctor Profile (`main`)

Fields: name EN+BN, degrees, specialty, hospital, chamber address, tap-to-call phone, visiting hours, when to see this doctor (bilingual), experience years, rating, availability flag, about/bio, Google Maps deep-link

> Fee information excluded from v1 — fees change frequently and stale data damages trust.

**Profile states:** pending → approved → published | rejected | flagged (v2)

---

### 10.3 Specialty Taxonomy (`main`)

12 launch specialties + 8 planned for v1.1 (see Section 5)  
Routes: `/specialties` (grid), `/category/[slug]` (filtered doctor list)

---

### 10.4 Disease Explorer (`doctor-site`)

- Entry: homepage disease chips + `/diseases` full list
- `/diseases` page: body-system tabs (10 categories), live search (EN + BN)
- `/disease/[slug]`: description, symptoms, causes, when to see doctor, linked specialties, linked tests, disclaimer
- 75 diseases in full taxonomy (Section 4); 10 diseases at launch
- Disease → Specialist → Doctor flow (the core differentiating journey)

---

### 10.5 Diagnostic Tests Directory (`doctor-site`)

- `/tests` page: full list of all tests
- `/test/[slug]`: what it measures, why done, how to prepare, where to get it, cost range, linked diseases
- 50+ tests in full taxonomy (Section 7); 14 tests at launch
- Cost ranges shown by tier (budget / mid-range / premium)
- Where to get it: major lab chains listed

---

### 10.6 AI Chat Assistant (`doctor-site`)

- Floating button, available on all pages
- Claude Haiku powered, bilingual (EN + BN)
- Responds in user's language; under 120 words per response
- Triages symptom → disease page link + specialist link
- Emergency: chest pain / breathing → "Call 16457 now"
- Never diagnoses; always ends with doctor consultation reminder
- Graceful fallback if API key unavailable

---

### 10.7 User Profile (`rajibraju/profile`)

`/profile` — localStorage-based, no auth required in v1

- Profile header: avatar initials, name, location, blood group, age, phone, conditions tags
- Edit Profile modal: all fields editable, persisted to localStorage
- Stats: total appointments, saved doctors, cancelled count
- Appointment history: 7 entries, status badges, fees, expandable
- Saved doctors: 3 saved, availability badges, links to profiles
- Recently visited: populated from localStorage `recently_visited`
- Spend summary sidebar: total ৳, avg per visit
- Preferred specialties: pill chips to category pages

---

### 10.8 Mobile Bottom Navigation (`rajibraju/profile`)

4-tab bar on mobile: Home / Doctors / Diseases / Profile

---

### 10.9 Fee & Cost Information

- Doctor fee ranges shown by city tier (Section 8)
- Diagnostic test cost ranges shown on test pages (Section 7)
- Clear labeling: "Approximate range — confirm by phone before visiting"

---

### 10.10 Bilingual UI — EN / BN

- `EN | বাং` toggle in navbar; saved in localStorage
- 100% of UI strings have Bengali and English versions
- Search works in both scripts simultaneously

---

### 10.11 Emergency Banner

- Red banner on homepage and `/diseases`: "Medical Emergency? Call 16457"
- Tap-to-call on mobile, non-dismissible

---

## 11. UX Flows

### Flow 1 — I Know What Doctor I Need
```
Homepage → Search bar (type specialty or name) → Doctor list → Filter by division/district → Doctor profile → Tap-to-call
```

### Flow 2 — I Know My Disease
```
Homepage disease chip → Disease detail page → "See doctors for this condition" → Specialty category → Doctor list → Doctor profile → Tap-to-call
```

### Flow 3 — I Know My Symptom (AI-assisted)
```
Homepage → AI Chat button → Describe symptom in Bengali or English → AI suggests disease + specialist → Click suggested link → Disease page or Specialty category → Doctor profile → Tap-to-call
```

### Flow 4 — I Need a Test
```
Disease page → "Tests required for this condition" → Test detail page → Cost range + where to get it → Nearest lab chain
```

### Flow 5 — I Want to Save a Doctor
```
Doctor profile → Save button → Stored in localStorage → View later at /profile → Saved Doctors section
```

### Flow 6 — I Want to Browse by Body System
```
Homepage → "Browse Diseases" section → /diseases → Click body system tab → See all diseases in that category → Disease page → Doctor
```

---

## 12. Design System

| Role | Value | Usage |
|---|---|---|
| Primary | `#059669` Emerald | CTAs, links, active states, nav underline |
| Primary dark | `#047857` | Hover on primary buttons |
| Background | `#FFFFFF` | All page backgrounds |
| Border | `#E5E7EB` | Cards, dividers |
| Text primary | `#111827` | Headings, body |
| Text secondary | `#6B7280` | Subtitles, metadata |
| Text muted | `#9CA3AF` | Placeholders |
| Icon container | `#F3F4F6` | All icon backgrounds — unified gray |
| Icon foreground | `#1F2937` | All icons |
| Emergency red | `#DC2626` | Emergency banner only |

**Font:** Hind Siliguri (Bengali + Latin)  
**Icons:** Lucide React — unified black on gray background  
**Principle:** One primary color (emerald). No per-specialty accent colors.

---

## 13. Technology Stack

| Layer | v1 | v2 |
|---|---|---|
| Framework | Next.js 16, App Router, Turbopack | — |
| Styling | Tailwind CSS v4 | — |
| Language | TypeScript | — |
| Icons | Lucide React | — |
| Font | Hind Siliguri | — |
| AI | Claude Haiku (`claude-haiku-4-5-20251001`) | Claude Sonnet for complex queries |
| Data | Static TypeScript files | PostgreSQL + Prisma |
| Auth | None (localStorage) | NextAuth.js + SMS OTP (SSL Wireless BD) |
| Search | Client-side filter | PostgreSQL FTS → Meilisearch |
| File storage | — | Cloudflare R2 (photos, BMDC docs) |
| Hosting | Vercel | Vercel |
| Analytics | — | Vercel Analytics / PostHog |

---

## 14. Page Map

| Page | Route | Access | Status |
|---|---|---|---|
| Homepage | `/` | All | Launch |
| Find Doctors | `/doctors` | All | Launch |
| Doctor Profile | `/doctors/[id]` | All | Launch |
| Specialties browse | `/specialties` | All | Launch |
| Specialty category | `/category/[slug]` | All | Launch |
| Diseases browse | `/diseases` | All | Launch |
| Disease detail | `/disease/[slug]` | All | Launch |
| Diagnostic Tests list | `/tests` | All | Launch |
| Test detail | `/test/[slug]` | All | Launch |
| User Profile | `/profile` | All (localStorage) | Launch |
| About | `/about` | All | Launch |
| 404 | — | All | Launch |
| Login / Register | `/auth` | Visitors | v2 |
| My Account (full) | `/account` | Logged-in | v2 |
| Submit Doctor | `/submit` | Logged-in | v2 |
| Suggest Edit | `/doctors/[id]/edit` | Logged-in | v2 |
| Doctor Verification | `/account/verify` | Doctor role | v2 |
| Admin Dashboard | `/admin` | Admin only | v2 |
| Admin — Submissions | `/admin/submissions` | Admin | v2 |
| Admin — Verifications | `/admin/verifications` | Admin | v2 |
| Admin — Content | `/admin/content` | Admin | v2 |
| Admin — Users | `/admin/users` | Admin | v2 |

---

## 15. Definition of Done

### Feature-Level DoD

A feature is done when:
- [ ] Renders correctly in English AND Bengali — no missing translation strings
- [ ] Works on mobile viewport 375px without horizontal scroll
- [ ] Works on Chrome Android 80+ (primary Bangladesh market device)
- [ ] All internal links navigate to correct routes
- [ ] No TypeScript errors (`npx tsc --noEmit` passes)
- [ ] No console errors on page load

### Project-Level DoD — Launch Checklist

The project is **ready to launch** when all 12 criteria pass:

| # | Criterion | How to Verify |
|---|---|---|
| 1 | 60-second doctor discovery | User on mobile, mobile data: search → disease or specialty → doctor profile → tap-to-call in ≤ 60 seconds |
| 2 | Disease → Doctor flow works | Start on `/diseases`, pick Dengue, reach General Physician category, open a doctor profile — zero dead links |
| 3 | AI chat triages correctly | 10 EN + 10 BN test queries all return correct specialty/disease links; no hallucinated doctor names |
| 4 | Fee guide visible | City-tier fee table visible on `/about` or dedicated `/fees` page; test cost ranges on every test page |
| 5 | Profile persists | Edit profile, close browser, reopen → data intact from localStorage |
| 6 | 100% bilingual | Switch to BN → zero English strings remain anywhere on site |
| 7 | No fee data on doctor profiles | `grep -r "৳" src/components/DoctorCard.tsx src/app/doctors/` returns no results |
| 8 | Emergency banner above fold | On 375px iPhone, `16457` visible on homepage and `/diseases` without scrolling |
| 9 | All routes 200 | Automated curl script hits every route in page map; all return HTTP 200 |
| 10 | Lighthouse mobile ≥ 80 | Run on homepage; Performance ≥ 80, transfer < 200 KB |
| 11 | TypeScript + ESLint clean | `npx tsc --noEmit` + `npm run lint` both pass with 0 errors |
| 12 | Live on Vercel with AI key | Production URL accessible; chat responds; custom domain resolves (if applicable) |

---

## 16. 2-Week Sprint Plan

> **Team:** 2–3 developers. Each task is 1 dev-day unless marked. Tasks within a day can be parallelized.

---

### WEEK 1 — Build

#### Day 1 — Branch Merge & Design Unification

| Task | DoD |
|---|---|
| Create `develop` branch off `main` | Branch exists, CI green |
| Merge `doctor-site` into `develop` | No conflicts, `npm run build` passes |
| Merge `rajibraju/profile` into `develop` | No conflicts, build passes |
| Switch all primary color from `#0066CC` to `#059669` emerald across all pages | `grep -r "0066CC" src/` returns 0 results |
| Remove all `৳` / fee display from doctor cards and profile pages | DoD criterion #7 passes |
| Port `BottomNav.tsx` mobile tab bar | 4 tabs render on 375px, all route correctly |

#### Day 2 — Doctor Search & Profile

| Task | DoD |
|---|---|
| Bengali search: verify typing "হৃদরোগ", "শিশু", "ডায়াবেটিস" returns correct doctors | 5 Bengali queries pass |
| Tap-to-call: phone renders as `<a href="tel:+880...">` | Opens dialer on Android |
| Google Maps deep-link from chamber address | Opens Maps on tap |
| "When to see this doctor" bilingual bullet list on all profiles | QA on 3 specialty profiles |
| Recently visited: write doctor ID to `localStorage.recently_visited` on profile view | Visiting 3 profiles → `/profile` shows all 3 in Recently Visited |
| 404 page — bilingual | Custom `not-found.tsx` renders in EN + BN |

#### Day 3 — Disease Explorer

| Task | DoD |
|---|---|
| `/diseases` page with 10 body-system tabs and live search | Typing "ডেঙ্গু" returns Dengue; tab filters work |
| Disease detail pages for all 10 launch diseases | All 10 at `/disease/[slug]` render in EN + BN with all required fields |
| Disease → Specialist link: "See doctors for this condition" button | Dengue page → General Physician category works |
| Disease → Test chips: tests linked from each disease page | Clicking "CBC" chip → `/test/cbc` |
| Homepage disease chip row (8 chips) | All 8 route correctly |
| Medical disclaimer visible on every disease page | Static disclaimer block present |

#### Day 4 — Diagnostic Tests + Fee Guide

| Task | DoD |
|---|---|
| `/tests` page — full list of 14 launch tests | All 14 render with name EN+BN and linked disease count |
| Test detail pages for all 14 tests | All 14 at `/test/[slug]` render with all required fields including cost range by tier |
| Cost range by tier (budget / mid-range / premium) on each test page | 3 cost bands clearly labeled |
| Test → Disease back-links | Clicking disease chip on test page navigates to `/disease/[slug]` |
| Fee guide page or section | City-tier fee table visible (see Section 8) |
| Bilingual sweep — all new disease + test pages | Zero missing BN strings |

#### Day 5 — AI Chat

| Task | DoD |
|---|---|
| `ChatAssistant.tsx` renders floating button on all pages | Visible on homepage, `/doctors`, `/diseases` |
| `POST /api/chat` streams response from Claude Haiku | Response appears within 3 seconds |
| Test 10 EN queries (see Section 10.6 for list) | Correct specialty/disease link in every response |
| Test 10 BN queries (same queries in Bengali) | Same pass criteria |
| Emergency: "আমার বুকে ব্যথা" → "Call 16457 now" | Tested and confirmed |
| Fallback if API key missing | Friendly error shown; page does not crash |
| `.env.local.example` documents `ANTHROPIC_API_KEY` | Present in repo root |

---

### WEEK 2 — Polish, Data, QA, Launch

#### Day 6 — User Profile Page

| Task | DoD |
|---|---|
| `/profile` page renders: header, stats, appointment history | Renders on 375px and 1280px |
| Edit Profile modal: all fields editable + save to localStorage | Edit name → close → name updated |
| Appointment history: 7 entries, completed/cancelled badges, expandable | "View more" expands to full list |
| Saved doctors section: 3 cards, availability badges | Each links to correct doctor profile |
| Recently visited section: from localStorage | Populated after visiting doctor profiles |
| Spend summary sidebar: correct total ৳ and average | Math verified against appointment data |
| Profile — bilingual | Language toggle switches all profile strings |

#### Day 7 — Doctor Data Seeding

| Task | DoD |
|---|---|
| Audit all `doctors.ts` entries — identify missing fields | Checklist complete |
| Ensure 50+ Dhaka doctors, all fields populated | Name EN+BN, hospital, phone, specialty, address, visiting hours, `whenToSee` EN+BN |
| Ensure 20+ Chattogram doctors | Same field requirements |
| All 12 specialties have ≥ 5 doctors in Dhaka | Count verified by specialty |
| All doctor phone numbers formatted as `01X-XXXXXXX` | Format check passes |
| No placeholder data in production build | No "Dr. Test", "01700-000000", "TBD" values |
| `available` flag set on all records | No undefined availability |

#### Day 8 — Full QA Pass

| Task | DoD |
|---|---|
| Smoke test: curl all routes → all 200 | Script output confirms all routes |
| Mobile QA at 375px: homepage, `/doctors`, `/disease/diabetes`, `/profile`, AI chat | No overflow; all tap targets ≥ 44px |
| BN language mode: walk through 8 pages | Zero English strings in BN mode |
| Language toggle persists across 5-page navigation + browser close | Confirmed via localStorage |
| Search edge cases: empty, symbols, long query, mixed BN+EN | No crashes; empty state shown |
| AI chat API error | Friendly error shown; chat stays usable |
| Emergency banner: `/` and `/diseases` on 375px | 16457 visible above fold |
| Launch checklist DoD #1–12 | All 12 pass |
| Lighthouse mobile on homepage | Performance ≥ 80, transfer < 200 KB |
| `npx tsc --noEmit` | 0 errors |
| `npm run lint` | 0 errors |

#### Day 9 — Pre-Launch Setup

| Task | DoD |
|---|---|
| Vercel project connected to `develop` branch | Auto-deploys on push |
| `ANTHROPIC_API_KEY` added to Vercel environment variables | AI chat works on preview URL |
| Production smoke test on Vercel URL | All major routes 200; AI chat responds |
| Domain configured (if applicable) | DNS resolves; HTTPS active |
| Merge `develop` → `main` | Clean merge; `main` is now launch state |
| Update README: what the app is, how to run locally, env vars | Accurate for new developer onboarding |

#### Day 10 — Launch

| Task | DoD |
|---|---|
| Final production deploy from `main` | Production URL shows latest build |
| End-to-end journey on production | Search → Disease → Doctor → Tap-to-call → AI chat — complete without error |
| Test with 3–5 real users in Dhaka on Android + mobile data | At least 1 completes full disease → doctor flow |
| Stakeholder demo | Walk through all 6 UX flows; recorded |
| Triage feedback — fix P0 bugs | No user-reported crashes in production |

---

### Sprint Summary

| Day | Focus | Key Output |
|---|---|---|
| 1 | Merge + design | Single `develop`, emerald everywhere, bottom nav |
| 2 | Doctor discovery | Tap-to-call, Maps, Bengali search, recently visited |
| 3 | Disease Explorer | 10 disease pages, body-system tabs, disease → doctor flow |
| 4 | Tests + Fee Guide | 14 test pages with cost ranges, fee guide by city |
| 5 | AI Chat | Claude Haiku live, 20 bilingual queries passing |
| 6 | User Profile | Full `/profile` page, edit modal, history, saved doctors |
| 7 | Data | 70+ complete doctors (Dhaka + Chattogram), all 12 specialties |
| 8 | QA | All 12 DoD criteria pass, Lighthouse pass, TypeScript clean |
| 9 | Pre-launch | Vercel live, domain, main merged, README updated |
| 10 | Launch | Production smoke test, real users, stakeholder demo |

---

## 17. Post-Launch Roadmap (v2)

| Feature | Priority | Why |
|---|---|---|
| Auth — SMS OTP login (SSL Wireless BD) | P0 | Required for persistent saved doctors, real appointment history |
| PostgreSQL + Prisma migration | P0 | Replace static TS data files; enables community contributions |
| Doctor self-registration + BMDC verification | P1 | Platform-verified profiles; trust building |
| Community doctor submissions + admin approval queue | P1 | Scalable data growth |
| Admin panel (`/admin`) | P1 | Approve/reject submissions, moderation |
| Expand disease database — all 75 diseases | P1 | Full taxonomy from Section 4 |
| Expand specialty list — all 20 specialties | P1 | Endocrinologist, Pulmonologist, Oncologist etc. |
| Expand test directory — all 50+ tests | P1 | Full cost guide |
| User reviews & ratings | P2 | One verified review per visit |
| WhatsApp deep-link on doctor profiles | P2 | BD market primary communication channel |
| Real-time test cost comparison across labs | P2 | Core value prop for cost transparency |
| Android app (React Native) | P3 | Android-first BD market |
| Meilisearch — multilingual full-text search | P3 | Faster, more accurate EN+BN search |
| BMDC registry API integration | P3 | Automated badge verification |

---

## 18. Changelog

| Version | Date | Summary |
|---|---|---|
| 1.0 | 2026-05-17 | Initial PRD |
| 2.0 | 2026-05-20 | Full feature spec |
| 3.0 | 2026-05-20 | Disease Explorer added |
| 4.0 | 2026-05-20 | Design system, page map, tech stack consolidated |
| 5.0 | 2026-06-07 | Unified all three branches; 2-week sprint plan; DoD |
| 6.0 | 2026-06-07 | Full scope edition — 75 disease taxonomy, 20 specialties, 50+ test directory with BD cost ranges, city-wise fee guide, all 8 divisions with sub-areas, 6 UX flows, full launch checklist |
