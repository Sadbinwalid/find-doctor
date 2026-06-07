# DoctorBD — Product Requirements Document & Execution Plan

**Version:** 5.0 — Unified Launch Edition  
**Date:** 2026-06-07  
**Status:** Approved for Sprint  
**Timeline:** 2 weeks (10 working days) — Zero to Launch  
**Branches consolidated:** `main` · `rajibraju/profile` · `doctor-site`

---

## 1. Product Overview

DoctorBD is a bilingual (Bengali + English) doctor discovery platform built for Bangladesh. It solves one critical problem: when someone is unwell, they need to reach the right doctor fast — their specialty, their phone number, their chamber address.

### Core Job-to-Be-Done

> A person in Bangladesh is unwell. In under 30 seconds they know: which type of doctor do I see, where are they, and how do I reach them?

### What It Is Not (v1)

- Not an appointment booking engine
- Not a payment processor
- Not a telemedicine platform
- Not a prescription or medical record system

---

## 2. User Types

| Role | Capabilities |
|---|---|
| **Visitor** | Browse, search, view doctor profiles, use AI chat |
| **Registered User** | Everything above + profile, saved doctors, appointment history |
| **Doctor** | Claim and edit own profile (v2) |
| **Admin** | Full content moderation and management (v2) |

> v1 ships with Visitor + Registered User flows only. Auth, admin panel, and doctor self-serve are v2.

---

## 3. Full Feature Set (All Branches Consolidated)

### 3.1 Doctor Search & Discovery (`main`)

**Search bar — homepage + persistent in header:**
- Full-text search across doctor name, specialty, hospital, district
- Works in Bengali and English input simultaneously
- `Enter` key or Search button routes to `/doctors?q=…`
- Quick-tag chips on homepage: Heart Doctor, Child Specialist, Skin Doctor, Eye Doctor, General Physician

**Filters on `/doctors` results page:**
- Specialty (multi-select)
- Division (dropdown — all 8 BD divisions)
- District (updates based on selected division)
- Sort: rating, experience years

**Doctor list card (row format):**
- Avatar initials · Name (EN + BN) · Specialty + Hospital · Location · Rating · Experience · Availability badge

---

### 3.2 Doctor Profile (`main`)

The core unit of the platform. Every profile must contain enough to let the user pick up the phone.

| Field | Required |
|---|---|
| Full name — English & Bengali | Yes |
| Degrees / qualifications | Yes |
| Specialty | Yes |
| Hospital (primary) | Yes |
| Chamber address | Yes |
| Contact phone (tap-to-call) | Yes |
| Division + District | Yes |
| Visiting hours | Yes |
| When to see this doctor | Yes |
| Experience years | No |
| Rating + review count | No |
| Availability flag | No |
| About / bio (max 300 chars) | No |
| BMDC registration no. | No |
| Google Maps deep-link | No |

> **Fee information is excluded from v1.** Fees change frequently; stale data damages user trust.

**Profile page sections:**
1. Header — name, degrees, specialty badge, availability
2. About
3. Qualifications
4. Hospital & chamber with visiting hours
5. Tap-to-call phone number(s)
6. When to see this doctor
7. Google Maps link

---

### 3.3 Specialty Taxonomy (`main`)

**12 launch specialties:**
Cardiologist · Dermatologist · Neurologist · Pediatrician · Gynecologist · Orthopedic · Gastroenterologist · ENT Specialist · Ophthalmologist · Psychiatrist · Nephrologist · General Physician

- `/specialties` — full grid of all specialty cards
- `/category/[slug]` — all doctors in that specialty with division/district filters
- Each specialty: name in EN + BN, icon, color (emerald system)

---

### 3.4 Disease Explorer (`doctor-site`)

The differentiating feature. Users who know their symptom but not their specialty can still find the right doctor.

**Entry points:**
- Homepage chip row: 8 most-searched conditions
- `/diseases` — full list with live search + body-system filter tabs

**Body system tabs (10):**
Heart & Blood · Digestive · Endocrine & Hormones · Respiratory · Kidney & Urinary · Skin · Brain & Nerves · Child Health · Infectious Disease · Eyes

**Each disease page at `/disease/[slug]`:**

| Field | Required |
|---|---|
| Name — EN + BN (with local aliases) | Yes |
| Short description (1–2 sentences) | Yes |
| Overview (prevalence in Bangladesh) | Yes |
| Symptoms (bilingual bullet list) | Yes |
| Causes & risk factors (bilingual) | Yes |
| When to see a doctor — specific triggers | Yes |
| Linked specialties → `/category/[slug]` | Yes |
| Linked diagnostic tests → `/test/[slug]` | Yes |
| Related diseases | No |
| Medical disclaimer on every page | Required |

**10 launch diseases:**
Diabetes · High Blood Pressure · Dengue Fever · Typhoid · Gastric/Peptic Ulcer · Asthma · Kidney Disease · Skin Allergy & Eczema · Heart Disease · Fever in Children

---

### 3.5 Diagnostic Tests Directory (`doctor-site`)

Each test at `/test/[slug]`:

| Field | Required |
|---|---|
| Name — EN + BN | Yes |
| Common aliases ("sugar test" for FBS) | No |
| What it measures (plain language) | Yes |
| Why it's done / clinical indication | Yes |
| How to prepare (fasting, medication holds) | Yes |
| Where to get it (facility type) | Yes |
| Linked diseases | Yes |

**14 launch tests:**
CBC · Fasting Blood Sugar · HbA1c · Dengue NS1 · Platelet Count · Widal Test · Blood Culture · Kidney Function Test · Urine Routine · ECG · Lipid Profile · Chest X-Ray · H. pylori Test · Allergy Test (IgE)

**Disease → Doctor discovery flow:**
Disease page → "See Doctors for This Condition" → `/category/[specialty]` → Doctor profile → Tap-to-call

---

### 3.6 AI Chat Assistant (`doctor-site`)

Floating chat button (bottom-right) — available on all pages.

- Powered by Claude Haiku (Anthropic)
- Bilingual: responds in the language the user writes in
- Triages symptom/condition → suggests disease pages + specialty links
- Responses under 120 words; always actionable
- Never diagnoses — only guides to correct specialist
- Emergency trigger: chest pain / breathing difficulty → "Call 16457 immediately"
- Graceful fallback if API key is missing

**Suggested starter prompts visible before first message:**
- "I have chest pain"
- "আমার মাথা ঘুরছে" (I feel dizzy)
- "Which doctor for diabetes?"
- "শিশুর জ্বর হলে কী করব?" (What to do for child fever?)

---

### 3.7 User Profile (`rajibraju/profile`)

Accessible at `/profile`. Works client-side with localStorage for v1 (no backend auth required for MVP).

**Profile header card:**
- Avatar initials (auto-generated from name)
- Name, location (division/district), blood group, age, phone
- Medical conditions tags (editable)
- Stats: total appointments · saved doctors · cancelled count
- Member since
- Edit Profile button

**Edit Profile modal:**
- Full name, age, blood group, division, district, phone
- Add/remove medical conditions
- Saved to localStorage on submit

**Appointment History section:**
- List of past appointments with doctor name, specialty, date, status (Completed / Cancelled)
- Each row links to that doctor's profile
- Fee shown for completed appointments
- "View more" expand/collapse (shows 3 by default)

**Saved Doctors section:**
- Saved doctor cards with availability badge, rating, specialty
- Links to doctor profiles

**Recently Visited section:**
- Populated from localStorage `recently_visited` key (set when user views a doctor profile)
- Links back to those profiles

**Spend Summary sidebar:**
- Total ৳ spent across completed appointments
- Average per visit
- Count of completed visits

**Preferred Specialties sidebar:**
- Pill chips linking to specialty category pages

**Quick Actions sidebar:**
- Find a Doctor → `/doctors`
- Browse Specialties → `/specialties`

---

### 3.8 Mobile Bottom Navigation (`rajibraju/profile`)

Persistent bottom tab bar on mobile viewports:

| Tab | Route | Icon |
|---|---|---|
| Home | `/` | Home |
| Doctors | `/doctors` | Stethoscope |
| Diseases | `/diseases` | Activity |
| Profile | `/profile` | User |

---

### 3.9 Bilingual UI — EN / BN

- Language toggle `EN | বাং` in top navbar
- All static UI copy has both English and Bengali versions
- Doctor names, disease names, test names stored in both scripts
- Preference saved in localStorage
- Search works in both scripts simultaneously
- No URL prefix — language is client-side state only

---

### 3.10 Emergency Banner

- Displayed on homepage and `/diseases` page
- "Medical Emergency? Call 16457" — red banner, tap-to-call on mobile
- Non-dismissible

---

## 4. Design System

| Role | Value | Usage |
|---|---|---|
| Primary | `#059669` Emerald | CTAs, links, active states, nav underline, logo |
| Primary dark | `#047857` | Hover state on primary buttons |
| Background | `#FFFFFF` | All page backgrounds |
| Border | `#E5E7EB` | Cards, dividers |
| Text primary | `#111827` | Headings, body |
| Text secondary | `#6B7280` | Subtitles, metadata |
| Text muted | `#9CA3AF` | Placeholders |
| Icon container | `#F3F4F6` | All icon backgrounds — unified gray |
| Icon foreground | `#1F2937` | All icons — unified dark |

**Font:** Hind Siliguri — covers Bengali + Latin  
**Scale:** 13px body · 14px sm · 16px base · 18–32px headings  
**Principle:** 70% emerald for interactive elements; white/gray/black for structure

---

## 5. Technology Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Icons | Lucide React |
| Font | Hind Siliguri (Google Fonts) |
| AI | Anthropic Claude Haiku (`claude-haiku-4-5-20251001`) |
| Data (v1) | Static TypeScript files (`doctors.ts`, `diseases.ts`, `tests.ts`) |
| Auth (v1) | None — localStorage only |
| Hosting | Vercel |
| Database (v2) | PostgreSQL + Prisma |
| Auth (v2) | NextAuth.js + SMS OTP (SSL Wireless BD) |
| File storage (v2) | Cloudflare R2 |

---

## 6. Page Map

| Page | Route | Access |
|---|---|---|
| Homepage | `/` | All |
| Find Doctors | `/doctors` | All |
| Doctor Profile | `/doctors/[id]` | All |
| Specialties browse | `/specialties` | All |
| Specialty category | `/category/[slug]` | All |
| Diseases browse | `/diseases` | All |
| Disease detail | `/disease/[slug]` | All |
| Diagnostic Tests list | `/tests` | All |
| Test detail | `/test/[slug]` | All |
| User Profile | `/profile` | All (localStorage, no login) |
| About | `/about` | All |
| 404 | — | All |

---

## 7. Definition of Done

### Feature-Level DoD

A feature is **done** when:
- [ ] Renders correctly in English and Bengali (full bilingual coverage, no missing strings)
- [ ] Works on mobile viewport (375px) without horizontal scroll
- [ ] Works on Chrome Android 80+ (primary BD market)
- [ ] All internal links are functional (no broken routes)
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No console errors in browser on page load

### Project-Level DoD

The project is **ready to launch** when all of the following are true:

1. **30-second doctor discovery** — A user can search for a doctor by name, specialty, or condition and see a profile with a working tap-to-call number in under 30 seconds on mobile.
2. **Disease → Doctor flow works end-to-end** — User starts on `/diseases`, picks a condition, reaches the correct specialist category page, and taps through to a doctor profile.
3. **AI chat triages correctly** — 10 test queries in EN + BN all return correct specialty/disease links without hallucinating doctor names.
4. **Profile persists** — User edits their profile, closes the browser, returns, and sees their data intact.
5. **100% bilingual** — Zero untranslated UI strings in production. Language toggle works on every page.
6. **No fee data shown** — `৳` symbol appears nowhere in doctor cards or profiles.
7. **Emergency banner visible** — 16457 tap-to-call is visible above the fold on mobile on homepage and `/diseases`.
8. **Homepage < 200 KB** — Lighthouse confirms transfer size under 200 KB on mobile.
9. **All routes return 200** — Automated smoke test confirms every page in the page map loads without error.
10. **Live on Vercel** — Production URL is accessible, `ANTHROPIC_API_KEY` is set, custom domain (if applicable) resolves.

---

## 8. Sprint Plan — 2 Weeks, 10 Working Days

> **Team assumptions:** 2–3 developers. Each task is sized for 1 dev-day unless marked otherwise. Tasks within a day can be parallelised across devs.

---

### Sprint 1 — Foundation & Core Features (Days 1–5)

**Goal:** All pages exist, design system is unified, Disease Explorer and AI Chat are functional.

---

#### Day 1 — Branch Merge + Design Unification

| Task | Detail | DoD |
|---|---|---|
| Create `develop` branch off `main` | Single integration branch | Branch exists, CI green |
| Merge `doctor-site` into `develop` | Bring in Disease Explorer, Tests, AI Chat, emerald design | No merge conflicts, `npm run build` passes |
| Merge `rajibraju/profile` into `develop` | Bring in Profile page, Bottom Nav, fee breakdown | No merge conflicts |
| Apply emerald design system to all pre-existing pages | Homepage, `/doctors`, `/category`, `/specialties`, `/about` — switch from `#0066CC` blue to `#059669` emerald | Visual QA: no blue primary color remains |
| Remove all fee display | Delete `৳` from doctor cards, profiles, and any data-driven fee fields in UI | `grep -r "fee" src/` returns no UI references |

---

#### Day 2 — Doctor Search & Profile Polish

| Task | Detail | DoD |
|---|---|---|
| Verify search works in Bengali input | Test typing "হৃদরোগ", "শিশু", "চর্মরোগ" — correct doctors returned | Manual QA pass for 5 Bengali queries |
| Tap-to-call on doctor profile | Phone field renders as `<a href="tel:...">` | Opens dialer on Android |
| Google Maps deep-link from chamber address | Each address links to `https://maps.google.com/?q=...` | Opens Maps app on tap |
| "When to see this doctor" section on all profiles | Bilingual bullet list visible on doctor detail page | QA on 3 different specialty profiles |
| Recently visited tracking | On `/doctors/[id]` load, write doctor ID to `localStorage.recently_visited` | Visiting 3 profiles then checking `/profile` shows all 3 in Recently Visited |
| Mobile bottom nav | Port `BottomNav.tsx` from `rajibraju/profile`; show on all pages below `md` breakpoint | 4 tabs render and route correctly on 375px |

---

#### Day 3 — Disease Explorer

| Task | Detail | DoD |
|---|---|---|
| `/diseases` page — full list with body-system tabs | 10 body-system filter tabs; search filters disease list live as user types | Search for "ডায়াবেটিস" returns Diabetes; tab filter works |
| Disease detail pages — all 10 launch diseases | `/disease/[slug]` for each: description, symptoms, causes, when to see doctor, linked specialties, linked tests, disclaimer | All 10 pages render without error in EN + BN |
| Disease → Specialty link | "See doctors for this condition" button on each disease page → `/category/[slug]` | Clicking from Dengue page reaches General Physician category |
| Disease → Test link | Test chips on disease page → `/test/[slug]` | Clicking "CBC" chip from a disease page opens CBC test detail |
| Homepage disease chip row | 8 disease chips below the search bar | All 8 route correctly |

---

#### Day 4 — Diagnostic Tests Directory

| Task | Detail | DoD |
|---|---|---|
| `/tests` page — full test list | List of all 14 tests with name EN+BN, linked disease count | Page renders, all 14 entries visible |
| Test detail pages — all 14 launch tests | `/test/[slug]` for each: what it measures, why done, how to prepare, where to get it, linked diseases | All 14 pages render without error in EN + BN |
| Test → Disease back-link | "Used for diagnosing:" disease chips on test page | Clicking disease chip navigates to `/disease/[slug]` |
| Bilingual completeness sweep — Diseases + Tests | Scan all `t("...", "...")` calls in new pages | Zero empty BN strings |

---

#### Day 5 — AI Chat Assistant

| Task | Detail | DoD |
|---|---|---|
| AI Chat component integration | `ChatAssistant.tsx` floating button visible on all pages | Renders on homepage, `/doctors`, `/diseases` |
| API route setup | `POST /api/chat` calls Claude Haiku with system prompt; streams response | Response appears within 3 seconds on local dev |
| Test 10 EN queries | "I have chest pain", "Which doctor for diabetes?", "I feel dizzy", "My child has fever", "I have gastric problem", "High blood pressure doctor", "Skin rash doctor", "Kidney pain", "Eye problem", "Anxiety and depression" | Each returns correct specialty/disease link; no hallucinated data |
| Test 10 BN queries | Bengali equivalents of above | Same pass criteria |
| Emergency trigger | Send "আমার বুকে ব্যথা" | Response includes "Call 16457 now" |
| Fallback when API key missing | Remove key, reload | Error message shown in chat UI; page does not crash |
| `ANTHROPIC_API_KEY` documented | Add to `.env.local.example` | Developer can onboard without asking |

---

### Sprint 2 — Profile, Content, QA, Launch (Days 6–10)

**Goal:** User profile is functional, all content is real and complete, full QA pass, live on Vercel.

---

#### Day 6 — User Profile Page

| Task | Detail | DoD |
|---|---|---|
| `/profile` page renders | Profile header with avatar initials, name, blood group, age, phone, conditions | Renders on mobile and desktop |
| Edit Profile modal | Opens on button click; all fields editable; saves to localStorage | Edit name → close modal → name updated in header |
| Appointment History | 7 sample appointments render with status badges and fees | Completed = green badge; Cancelled = red badge; "View more" expands |
| Saved Doctors section | 3 hardcoded saved doctors render with rating and availability | Each links to correct doctor profile |
| Recently Visited section | Shows doctors visited in current session (from localStorage) | Visiting 2 profiles then going to `/profile` shows both |
| Spend Summary sidebar | Total ৳ calculated from completed appointments | Correct sum and average displayed |
| Profile page — bilingual | All strings in EN + BN | Language toggle switches profile UI correctly |

---

#### Day 7 — Doctor Data Seeding

| Task | Detail | DoD |
|---|---|---|
| Audit current doctor records | Review all entries in `doctors.ts` for completeness | Spreadsheet/checklist of missing fields |
| Ensure 50+ Dhaka doctor records are complete | Name EN+BN, hospital, phone, specialty, address, visiting hours, `whenToSee` EN+BN | 50 records pass completeness check |
| Ensure all 12 specialties have ≥ 4 doctors | Check distribution across specialties | No specialty has < 4 doctors |
| Ensure all records have `available: true/false` set | Data quality | No `undefined` availability |
| Remove any test/placeholder data | No "Dr. Test", "01700-000000" entries in production build | Manual review pass |

---

#### Day 8 — Full QA Pass

| Task | Detail | DoD |
|---|---|---|
| Smoke test all routes | `curl` every route in the page map; check for 200 | All routes return 200 |
| Mobile QA — 375px viewport | Test homepage, `/doctors`, `/disease/diabetes`, `/profile`, AI chat on 375px | No horizontal overflow; all tappable elements ≥ 44px |
| Bilingual completeness — entire app | Run through every page in BN mode | Zero English strings visible when BN is selected |
| Language toggle persistence | Set to BN, navigate across 5 pages, close tab, reopen | BN preference persists via localStorage |
| Search edge cases | Empty search, special characters, very long query, Bengali + English mixed | No crashes; empty state shown gracefully |
| AI chat rate limit graceful failure | Simulate API error | User sees friendly error; chat remains usable |
| 404 page | Navigate to `/this-does-not-exist` | Custom 404 renders in EN + BN |
| Emergency banner check | Homepage and `/diseases` on mobile | 16457 visible above the fold without scrolling |
| Lighthouse mobile audit | Run on homepage | Performance ≥ 80, transfer size < 200 KB |
| TypeScript check | `npx tsc --noEmit` | Zero errors |
| ESLint check | `npm run lint` | Zero errors |

---

#### Day 9 — Pre-Launch Setup

| Task | Detail | DoD |
|---|---|---|
| Vercel project created | Connected to repo `develop` or `main` branch | Auto-deploys on push |
| `ANTHROPIC_API_KEY` set in Vercel env | Added to Vercel environment variables | AI chat works on Vercel preview URL |
| Domain configured (if applicable) | DNS records pointed to Vercel | Site reachable at production domain |
| Production smoke test | Hit all major routes on Vercel preview URL | All return 200; AI chat responds |
| Merge `develop` → `main` | Clean merge after all QA passes | `main` reflects final state |
| Update README | Replace Next.js boilerplate with: what the app is, how to run locally, env vars needed | README accurate for new developer onboarding |

---

#### Day 10 — Launch Day

| Task | Detail | DoD |
|---|---|---|
| Final production deploy | Push to `main` triggers Vercel deploy | Production URL shows latest build |
| End-to-end user journey test | On production: search → disease page → doctor profile → tap-to-call → AI chat | Full flow completes without error |
| Share with 3–5 test users in Dhaka | Real users on Android mobile, mobile data | At least one completes disease → doctor flow |
| Stakeholder demo | Walk through: homepage → disease explorer → doctor profile → profile page → AI chat | Demo recorded or attended |
| Bug triage | Collect feedback from test users; fix P0 issues | No user-reported crashes in production |

---

## 9. Sprint Summary Table

| Day | Focus | Key Output |
|---|---|---|
| 1 | Branch merge + design unification | Single `develop` branch, emerald everywhere |
| 2 | Doctor search + profile polish | Tap-to-call, Maps link, bottom nav, recently visited |
| 3 | Disease Explorer | 10 disease pages, `/diseases` list, disease → doctor flow |
| 4 | Diagnostic Tests | 14 test pages, `/tests` list, test → disease links |
| 5 | AI Chat | Claude Haiku integrated, 20 bilingual queries passing |
| 6 | User Profile | `/profile` page, edit modal, history, saved doctors |
| 7 | Doctor data | 50+ complete Dhaka doctor records, all 12 specialties covered |
| 8 | QA | All routes 200, mobile QA pass, Lighthouse pass, tsc clean |
| 9 | Pre-launch | Vercel live, domain set, `main` merged, README updated |
| 10 | Launch | Production verified, test users onboarded, stakeholder demo |

---

## 10. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Doctor data incomplete (missing phone, address) | High | High | Begin data audit on Day 1 in parallel with dev work |
| Merge conflicts between branches | Medium | Medium | Merge `doctor-site` first (larger diff), then `rajibraju/profile` |
| AI chat API key not available | Low | Medium | `.env.local.example` documents the key; fallback UI ships on Day 5 |
| Bengali search returns no results | Medium | High | Test on Day 2; implement `toLowerCase` + Unicode normalization if needed |
| Vercel cold start makes AI chat slow | Low | Low | Haiku is fast; acceptable on first request |
| Fee field resurfaces in a merge | Low | Medium | `grep -r "fee"` in pre-launch checklist on Day 8 |

---

## 11. Post-Launch Roadmap (v2)

| Feature | Priority | Notes |
|---|---|---|
| Auth — SMS OTP login (SSL Wireless BD) | P0 | Required before persistent saved doctors, real appointments |
| PostgreSQL + Prisma migration | P0 | Replace static TS data files |
| Doctor self-registration + verification | P1 | BMDC badge flow |
| Community doctor submissions + admin queue | P1 | Contributor role |
| Admin panel | P1 | Approve/reject submissions, manage categories, moderation |
| User reviews & ratings | P2 | One review per verified visit |
| WhatsApp deep-link on doctor profiles | P2 | BD users prefer WhatsApp for chamber bookings |
| Android app (React Native) | P3 | Android-first for BD market |
| Meilisearch integration | P3 | Replace PostgreSQL FTS for faster multilingual search |

---

## 12. Changelog

| Version | Date | Summary |
|---|---|---|
| 1.0 | 2026-05-17 | Initial PRD |
| 2.0 | 2026-05-20 | Full feature spec |
| 3.0 | 2026-05-20 | Disease Explorer added |
| 4.0 | 2026-05-20 | Design system, page map, tech stack consolidated |
| 5.0 | 2026-06-07 | Unified all three branches; added User Profile, Bottom Nav, AI Chat; 2-week sprint plan; full Definition of Done |
