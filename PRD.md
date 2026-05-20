# DoctorBD — Product Requirements Document

**Version:** 4.0 (Definitive)
**Date:** 2026-05-20
**Branch:** `doctor-site`
**Status:** Active Development

---

## 1. Product Overview

DoctorBD is a bilingual (Bengali/English), community-driven doctor discovery platform for Bangladesh. The platform solves a simple but critical problem: when someone is unwell, they need to reach the right doctor fast — their phone number, their chamber address, their visiting hours.

No appointment booking engine. No payment. No telemedicine. Just fast, reliable, trusted information so the user can pick up the phone and call.

### Core Job-to-Be-Done

> A person in Bangladesh feels unwell. They need to know: which type of doctor do I see, where are they, and how do I call them?

The platform answers all three in under 30 seconds.

---

## 2. Goals & Non-Goals

### Goals
- Build a searchable, open database of doctors in Bangladesh organised by specialty
- Let users discover doctors by disease or symptom — not just specialty
- Surface actionable contact info (phone, chamber address, visiting hours) immediately
- Allow anyone to contribute and suggest doctor information; admin approves before it goes live
- Support all 64 districts of Bangladesh from day one; initial focus on Dhaka
- Provide bilingual (Bengali + English) experience throughout

### Non-Goals (v1)
- In-app appointment booking
- Payment processing
- Telemedicine / video consultations
- Automated BMDC registry integration
- Prescription or medical record management

---

## 3. User Types & Permissions

| Role | Browse & Search | Submit / Edit Info | Verified Badge | Moderation |
|---|---|---|---|---|
| **Visitor** | ✓ | — | — | — |
| **Contributor** | ✓ | ✓ (pending approval) | — | — |
| **Doctor** | ✓ | ✓ own profile only (pending approval) | ✓ after doc review | — |
| **Admin** | ✓ | ✓ all profiles | — | Full |

---

## 4. Features

### 4.1 Doctor Search & Discovery

The primary entry point for users who already know what kind of doctor they need.

**Search bar (homepage + persistent in header):**
- Full-text search across doctor name, specialty, hospital name, chamber area, district
- Bilingual — works in Bengali or English input
- Search results routed to `/doctors?q=…`

**Filters on results page:**
- Specialty (multi-select checkboxes)
- Division (dropdown — all 8 divisions)
- District (dropdown — updates based on selected division)
- Sort by: rating, experience

**Results list:**
- Each result is a list-row card: initials avatar · doctor name · specialty + hospital · location, rating, experience · chevron
- Clicking a row opens the doctor profile page

**Specialty browse:**
- Grid of specialty cards on homepage and `/specialties` — icon · name · description
- Clicking opens the specialty's category page (`/category/[slug]`)
- Category page shows all approved doctors in that specialty with same filter options

---

### 4.2 Doctor Profile

The core unit of the platform. Every profile must have enough information to let the user make a call.

| Field | Required | Notes |
|---|---|---|
| Full name — English | Yes | |
| Full name — Bengali | Yes | Unicode Bengali |
| Title / degrees | Yes | MBBS, FCPS, MD, etc. |
| Profile photo | No | Circular avatar; initials shown as fallback |
| Specialty | Yes | Linked to taxonomy category |
| Qualifications list | Yes | Array of degree strings |
| Affiliated hospital(s) | No | Primary display hospital shown on card |
| Chamber address(es) | No | Multiple; each with visiting hours |
| Contact phone number(s) | Yes | Tap-to-call on mobile; primary reason users visit |
| Division | Yes | One of 8 |
| District | Yes | One of 64 |
| BMDC registration no. | No | Shown if provided; not auto-validated in v1 |
| Experience (years) | No | |
| Rating / review count | No | Seeded initially; user reviews in v2 |
| Availability flag | No | Available / Unavailable |
| About / bio | No | Max 300 characters |
| When to see this doctor | No | Bullet list — conditions this specialty treats |

> **Fee information is excluded** — fees change frequently and outdated data damages trust.

**Profile states:** `pending → approved → published` | `rejected` | `flagged`

**Profile page sections:**
1. Header — name, degrees, specialty badge, verified badge (if applicable), availability
2. About
3. Qualifications
4. Hospital & chamber details with visiting hours
5. Contact — phone number(s) with tap-to-call
6. When to see this doctor (condition list)
7. Location map link (Google Maps deep-link)

---

### 4.3 Specialty Taxonomy

Two-level hierarchy. Every doctor belongs to one leaf-level specialty.

```
Parent (e.g. Medicine)
  └── Sub-specialty (e.g. Cardiology, Neurology)
```

**Launch specialties (12):**
Cardiologist, Dermatologist, Neurologist, Pediatrician, Gynecologist, Orthopedic, Gastroenterologist, ENT Specialist, Ophthalmologist, Psychiatrist, Nephrologist, General Physician

**Rules:**
- Every specialty has a name in Bengali and English
- Category pages list all approved doctors with district/division filters
- Admin manages the category tree via the admin panel
- Deleting a category requires reassigning its doctors first

---

### 4.4 Disease Explorer

The secondary entry point — for users who know their symptom or disease but not the specialty. This is the differentiating feature of DoctorBD versus a simple doctor directory.

#### 4.4.1 Disease Pages

Each disease has a standalone, bilingual page at `/disease/[slug]`.

| Field | Required | Notes |
|---|---|---|
| Name — English & Bengali | Yes | Including common/local aliases |
| Body system | Yes | Used for browse grouping |
| Short description | Yes | 1–2 sentences, plain language |
| Overview | Yes | What it is, prevalence in Bangladesh |
| Symptoms | Yes | Bilingual bullet list |
| Causes & risk factors | Yes | Bilingual bullet list |
| When to see a doctor | Yes | Specific, actionable triggers |
| Linked specialties | Yes | Which specialty types treat this disease |
| Linked diagnostic tests | Yes | Which tests are typically ordered |
| Related diseases | No | Cross-links to similar conditions |
| Disclaimer | Required on every page | "General information only — consult a doctor" |

**Content is admin-managed.** Contributors can suggest edits; same pending queue as doctor profiles.

**Launch diseases (10):**
Diabetes, High Blood Pressure, Dengue Fever, Typhoid, Gastric / Peptic Ulcer, Asthma, Kidney Disease, Skin Allergy & Eczema, Heart Disease, Fever in Children

#### 4.4.2 Browse Diseases

**Entry points:**
- Homepage chip section — "Browse by Disease" with the 8 most-searched conditions as pill chips
- `/diseases` page — full list with search and body-system filter tabs

**Body systems (10 categories):**
Heart & Blood, Digestive, Endocrine & Hormones, Respiratory, Kidney & Urinary, Skin, Brain & Nerves, Child Health, Infectious Disease, Eyes

**Search on `/diseases`:**
- Matches disease name (EN + BN), common/alias names, and symptoms
- Results update live as user types

#### 4.4.3 Diagnostic Tests Directory

Each test has a page at `/test/[slug]`.

| Field | Required | Notes |
|---|---|---|
| Name — English & Bengali | Yes | |
| Common aliases | No | e.g. "Sugar test" for FBS |
| What it measures | Yes | Plain language |
| Why it's done | Yes | Clinical indication |
| How to prepare | Yes | Fasting instructions, medication holds |
| Where to get it | Yes | Facility type required |
| Linked diseases | Yes | Which conditions use this test |

**Launch tests (14):**
CBC, Fasting Blood Sugar, HbA1c, Dengue NS1, Platelet Count, Widal Test, Blood Culture, Kidney Function Test, Urine Routine, ECG, Lipid Profile, Chest X-Ray, H. pylori Test, Allergy Test (IgE)

#### 4.4.4 Disease → Doctor Discovery Flow

The end-to-end user journey:

```
Homepage
  → "Browse by Disease" section  OR  search bar
  → Disease page
      · Read: overview, symptoms, when to see a doctor
      · See: "Tests You May Need" → tap any test for prep info
      · See: "Find a Doctor for this Condition"
          · Lists linked specialties with doctor count
          · Tap specialty → doctor list (pre-filtered)
  → Doctor profile
      · Tap phone number → call
```

---

### 4.5 Submitting & Editing Doctor Information

**Adding a new doctor:**
1. Logged-in user clicks "Add Doctor"
2. Fills profile form and submits
3. Profile enters `pending` queue
4. Admin approves, rejects (with note), or requests more info
5. On approval the profile is published

**Suggesting an edit:**
1. Any logged-in user clicks "Suggest Edit" on a published profile
2. Pre-filled form — user changes one or more fields
3. Submitted as a diff (old value → proposed value)
4. Admin reviews side-by-side and approves or rejects

**Edit history:**
- Every approved change logged: who submitted, what changed, when, which admin approved
- Public: "last updated on…"
- Admin: full field-level diff history

**Flagging:**
- Any visitor can flag a profile (no login required)
- Flag reasons: wrong phone / wrong address / doctor no longer at chamber / other
- 3+ unresolved flags auto-surface the profile at top of admin queue

---

### 4.6 Doctor Self-Registration & Verified Badge

1. Doctor creates account (email or phone + OTP)
2. Searches for existing profile → clicks "Claim this profile" OR creates new
3. Uploads verification documents (at least one):
   - BMDC registration certificate
   - Medical degree certificate
   - Hospital ID card or visiting card
4. Submission enters "Verification Request" queue in admin panel
5. Admin reviews documents, grants or denies badge
6. Verified doctors can edit their own profile (edits still go through approval queue)

**Verified badge** appears prominently on profile and in search result rows.

---

### 4.7 User Accounts & Authentication

**Registration options:**
- Phone number + OTP (SMS) — preferred; Bangladesh market is mobile-first
- Email + password — secondary option

**Account fields:** name, phone/email, role

**Role assignment:**
- Default: Contributor
- Doctor: self-selected at registration; triggers verification flow

**Session:** JWT, 30-day expiry with refresh token

**Password / PIN reset:** via SMS OTP or email link

---

### 4.8 Admin Panel

Protected at `/admin`. Accessible only to Admin-role accounts.

**Dashboard:**
- Count cards: pending submissions, pending verifications, flagged profiles, total published doctors
- Recent activity feed

**Pending Submissions Queue:**
- List: submitter, doctor name, type (new profile / edit), date submitted
- Review view: diff for edits (old → proposed), full form for new profiles
- Actions: Approve / Reject (with required note) / Request more info

**Verification Requests:**
- View uploaded documents inline
- Actions: Grant verified badge / Deny (with note)

**Flagged Profiles:**
- Sorted by flag count
- Actions: resolve flags, edit profile, dismiss flags as unfounded

**Category Management:**
- Add / edit / reorder / delete specialty categories
- Reassign doctors before deleting a category

**Disease & Test Management:**
- Create, edit, publish, archive disease pages
- Create, edit, publish diagnostic test entries

**User Management:**
- List all accounts: name, role, status, submission count
- Promote to Admin, suspend, delete

---

### 4.9 Bilingual UI (Bengali + English)

- All static UI copy has Bengali and English versions
- Doctor names, disease names, and test names stored in both scripts
- Language toggle: `EN | বাং` — persistent in top navigation
- Preference stored in `localStorage`; remembered on return visits
- Search works in both scripts simultaneously
- No URL prefix (`/en/` or `/bn/`) in v1 — language is client-side state

---

## 5. Design System

### Color Palette
| Role | Value | Usage |
|---|---|---|
| Primary | `#059669` Emerald | Links, active states, nav underline, logo, CTAs, hover accents |
| Primary dark | `#047857` | Hover state on primary buttons |
| Background | `#FFFFFF` | All page backgrounds |
| Surface | `#FFFFFF` | Cards, panels |
| Border | `#E5E7EB` | Card borders, dividers |
| Text primary | `#111827` | Headings, body, labels |
| Text secondary | `#6B7280` | Subtitles, metadata, descriptions |
| Text muted | `#9CA3AF` | Placeholders, timestamps |
| Icon background | `#F3F4F6` | All icon containers — unified, no per-specialty colors |
| Icon foreground | `#1F2937` | All icons — unified black |

> **Principle:** 70% emerald touches for interactive elements; white/black/gray for all structure and content. No secondary accent colors.

### Typography
- Font: Hind Siliguri — works for both Bengali and English
- Scale: 13px body, 14px (sm), 16px (base), 18–32px headings
- Weight: 400 regular, 500 medium, 600 semibold, 700 bold

### Component Patterns

**List row (primary pattern — doctors, categories, diseases, tests):**
```
[Icon 9×9 gray bg]  Title (semibold, gray-900)          [Chevron]
                    Subtitle (xs, gray-500)
                    Meta (xs, gray-400) — district · rating · yrs
```

**Pill filter chip:**
```
border border-gray-200 rounded-full px-3 py-1.5 text-sm
hover: border-emerald, text-emerald
active: border-emerald bg-emerald text-white
```

**Tab navigation (Navbar):**
- Horizontal links with `h-0.5 bg-emerald` underline on active route
- `EN | বাং` language toggle — plain text, bold for active language

**Search bar:**
- `border border-gray-200 rounded-xl` with search icon + `/` shortcut hint
- No filled background — white, minimal

---

## 6. Page Map

| Page | Route | Access |
|---|---|---|
| Homepage | `/` | All |
| Find Doctors (list + filters) | `/doctors` | All |
| Doctor Profile | `/doctors/[id]` | All |
| Specialties browse | `/specialties` | All |
| Specialty category | `/category/[slug]` | All |
| Diseases browse | `/diseases` | All |
| Disease detail | `/disease/[slug]` | All |
| Diagnostic Tests list | `/tests` | All |
| Test detail | `/test/[slug]` | All |
| About | `/about` | All |
| Login / Register | `/auth` | Visitors only |
| My Account | `/account` | Logged-in |
| Doctor Verification upload | `/account/verify` | Doctor role |
| Add Doctor | `/submit` | Logged-in |
| Suggest Edit | `/doctors/[id]/edit` | Logged-in |
| Admin Dashboard | `/admin` | Admin only |
| Admin — Submissions queue | `/admin/submissions` | Admin only |
| Admin — Verifications | `/admin/verifications` | Admin only |
| Admin — Flagged profiles | `/admin/flagged` | Admin only |
| Admin — Categories | `/admin/categories` | Admin only |
| Admin — Diseases & Tests | `/admin/content` | Admin only |
| Admin — Users | `/admin/users` | Admin only |

---

## 7. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Current; Turbopack for dev |
| Styling | Tailwind CSS v4 | |
| Language | TypeScript | |
| Icons | Lucide React | |
| Font | Hind Siliguri (Google Fonts) | Bengali + Latin |
| Database | PostgreSQL | Relational; suits taxonomy + edit-history |
| ORM | Prisma | |
| Auth | NextAuth.js or Supabase Auth | Phone OTP + email |
| Search | PostgreSQL FTS (v1) → Meilisearch (v2) | |
| File storage | Cloudflare R2 | Doctor photos, verification docs |
| SMS / OTP | SSL Wireless (BD) | Local provider |
| Hosting | Vercel | Current deployment target |

> **v1 data layer:** Static TypeScript data files (`doctors.ts`, `categories.ts`, `diseases.ts`, `tests.ts`). Migration to PostgreSQL is the first backend milestone.

---

## 8. Geographic Rollout

- Data model: all 8 divisions, all 64 districts pre-populated from day one
- Division/district dropdowns fully available at launch
- **Phase 1 focus:** Dhaka — data seeding, admin effort, outreach
- **Phase 2:** Chattogram, Sylhet
- **Phase 3:** Remaining 5 divisions
- Profiles from any district can be submitted by contributors at any time

---

## 9. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Uptime | 99.5% |
| Search response | < 1 second for typical query |
| Homepage initial load | < 200 KB transferred |
| Mobile compatibility | Chrome Android 80+, low-end devices (primary BD market) |
| Accessibility | WCAG 2.1 AA for core user flows |
| Bilingual completeness | 100% of UI copy has both EN and BN versions |
| Low-bandwidth tolerance | No heavy images on list pages; lazy load on profiles |

---

## 10. Future Phases (Not in v1)

| Feature | Phase | Notes |
|---|---|---|
| User reviews & ratings | v2 | One review per verified visit |
| WhatsApp deep-link | v2 | Alongside tap-to-call for chambers that use WhatsApp |
| Android app | v2 | React Native or hybrid; Android-first for BD market |
| Contributor reputation | v3 | Trust score to reduce manual review burden |
| Doctor analytics dashboard | v3 | Profile views, contact tap count |
| BMDC registry integration | v3 | Automate badge verification if API becomes available |
| Symptom checker (full) | v3 | Multi-step guided flow; disease shortlisting |
| Telemedicine referrals | v4 | Out of scope for v1; link to partner platforms |

---

## 11. Changelog

| Version | Date | Summary |
|---|---|---|
| 1.0 | 2026-05-17 | Initial PRD — overview, user types, core features |
| 2.0 | 2026-05-20 | Expanded to full feature spec — flows, page map, tech stack, admin panel |
| 3.0 | 2026-05-20 | Added Disease Explorer — disease pages, test directory, disease → doctor flow |
| 4.0 | 2026-05-20 | Definitive version — consolidated all features, added design system, data model notes, geographic rollout, full page map, v1 vs future phase split |
