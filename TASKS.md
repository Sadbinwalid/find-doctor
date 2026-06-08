# DoctorBD — Project Task List
**Branch:** `doctor-site`  
**Last updated:** 2026-06-09  
**Status:** Pre-sprint — tasks identified from full branch audit

---

## Current State (Audit Summary)

### What Is Built
| Feature | Status | Notes |
|---|---|---|
| Homepage with search bar | ✅ Built | Emerald design applied |
| Doctor list + filters | ✅ Built | Has a fee filter bug (see Phase 1) |
| Doctor profile + tap-to-call | ✅ Built | Maps link missing |
| Specialty browse (`/specialties`, `/category/[slug]`) | ✅ Built | |
| Disease Explorer — 10 diseases | ✅ Built | `/diseases`, `/disease/[slug]` |
| Diagnostic Tests — 14 tests | ✅ Built | `/tests`, `/test/[slug]` |
| AI Chat (`ChatAssistant.tsx`) | ✅ Built | Needs API key + cost ranges on test pages |
| Bilingual EN/BN toggle | ✅ Built | |
| Emergency banner (16457) | ✅ Built | Homepage + footer |
| About page | ✅ Built | Very thin — needs real content |

### What Is Missing (Gap vs PRD)
| Feature | Status | Priority |
|---|---|---|
| Fee filter showing ৳ on `/doctors` — violates PRD | ❌ Bug | P0 |
| Google Maps deep-link from chamber address | ❌ Missing | P0 |
| Recently visited tracking (localStorage) | ❌ Missing | P1 |
| Mobile bottom navigation (4 tabs) | ❌ Missing | P1 |
| User profile page (`/profile`) | ❌ Missing | P1 |
| Test cost ranges on test detail pages | ❌ Missing | P1 |
| Doctor fee guide by city (page or section) | ❌ Missing | P1 |
| 404 page (bilingual) | ❌ Missing | P1 |
| `.env.local.example` for API key | ❌ Missing | P1 |
| Doctor data — only 21 doctors (need 70+) | ❌ Insufficient | P0 |
| Only 1–2 doctors per specialty (need ≥ 5 in Dhaka) | ❌ Insufficient | P0 |
| Only 10 Dhaka doctors, 3 Chattogram (need 50+ / 20+) | ❌ Insufficient | P0 |
| About page content is placeholder | ❌ Incomplete | P2 |

---

## Phase 1 — UX & Design Polish
*Goal: Fix all visual and interaction issues before any new feature work.*

### 1.1 Fix Fee Violations (P0)
- [ ] Remove **Sort by fee** options (`fee_asc`, `fee_desc`) from `/doctors` sort dropdown
- [ ] Remove **fee range slider / ৳200 filter** from `/doctors` filter panel
- [ ] Confirm no `৳` symbol appears on any doctor card or profile page
- [ ] **DoD:** `grep -r "৳\|fee_asc\|fee_desc\|maxFee" src/app/doctors/` returns 0 UI results

### 1.2 Google Maps Deep-Link on Doctor Profile (P0)
- [ ] Add "Get Directions" link on every doctor profile → opens `https://maps.google.com/?q=<address>`
- [ ] Format address string cleanly for the Maps query (hospital + area + district)
- [ ] Test on Android: tapping the link opens Google Maps app
- [ ] **DoD:** All doctor profiles have a working Maps tap-target on mobile

### 1.3 Mobile Bottom Navigation (P1)
- [ ] Port `BottomNav.tsx` from `rajibraju/profile` branch into `doctor-site`
- [ ] 4 tabs: **Home** (`/`) · **Doctors** (`/doctors`) · **Diseases** (`/diseases`) · **Profile** (`/profile`)
- [ ] Show only on `md` breakpoint and below
- [ ] Active tab highlighted with emerald
- [ ] Add bottom padding to all pages so content is not hidden behind the nav bar
- [ ] **DoD:** All 4 tabs render and route correctly at 375px viewport

### 1.4 Tap-to-Call Polish (P1)
- [ ] Phone number on doctor profile must render as `<a href="tel:+880XXXXXXXXXX">`
- [ ] Add a phone icon next to the number with a clear "Call" label
- [ ] Make the entire phone row a large tap target (min 44px height) on mobile
- [ ] **DoD:** Tapping phone number on Android opens the dialer

### 1.5 Recently Visited Tracking (P1)
- [ ] On every `/doctors/[id]` page load, append doctor ID to `localStorage.recently_visited` array
- [ ] Cap the array at 10 entries (drop oldest)
- [ ] This feeds the profile page's "Recently Visited" section
- [ ] **DoD:** Visiting 3 doctor profiles → `/profile` shows all 3 in Recently Visited

### 1.6 404 Page — Bilingual (P1)
- [ ] Create `src/app/not-found.tsx`
- [ ] Shows "Page not found" in EN + BN
- [ ] Links back to homepage
- [ ] Matches site design (emerald, Hind Siliguri font)
- [ ] **DoD:** Navigating to `/this-does-not-exist` renders the custom 404

### 1.7 About Page — Real Content (P2)
- [ ] Replace placeholder content with:
  - What DoctorBD is and why it exists (Bangladesh context)
  - Team section: @Sadbinwalid, @rajibraju02, @shojolislam
  - Contact / feedback link
  - Medical disclaimer
- [ ] Bilingual (EN + BN)
- [ ] **DoD:** About page accurately represents the product and team

---

## Phase 2 — Feature Development
*Goal: Build everything in the PRD that isn't built yet.*

### 2.1 User Profile Page — `/profile` (P1)
*Port from `rajibraju/profile` branch and adapt to doctor-site design (emerald, unified icons)*

- [ ] Profile header card: avatar initials, name, location, blood group, age, phone, conditions tags
- [ ] Edit Profile modal: all fields editable, saved to `localStorage`
- [ ] Stats row: total appointments · saved doctors · cancelled count
- [ ] Appointment History: list with completed/cancelled badges, collapsible "view more"
- [ ] Saved Doctors section: links to doctor profiles with availability badge
- [ ] Recently Visited section: populated from `localStorage.recently_visited`
- [ ] Spend Summary sidebar: total ৳ spent across completed appointments + average per visit
- [ ] Preferred Specialties: pill chips linking to `/category/[slug]`
- [ ] Quick Actions: Find a Doctor + Browse Specialties
- [ ] Full bilingual support (EN + BN)
- [ ] **DoD:** All sections render correctly at 375px and 1280px; edit modal saves and persists

### 2.2 Diagnostic Test Cost Ranges on Test Pages (P1)
- [ ] Add cost data to `tests.ts` — 3 tiers per test: budget / mid-range / premium (in ৳)
- [ ] Render a cost range table on every `/test/[slug]` page
- [ ] Add "Where to get it" section listing relevant lab chains (Popular, Lab Aid, Ibn Sina, Square, BIRDEM etc.)
- [ ] Label clearly: "Approximate range — confirm before visiting"
- [ ] **DoD:** Every test page shows 3-tier cost range and lab chain list

### 2.3 Doctor Fee Guide (P1)
- [ ] Create a fee guide section on the `/about` page OR a dedicated `/fees` page
- [ ] Show city-tier fee table:
  - Dhaka (GP: ৳400–700 · Specialist: ৳800–1,500 · Senior: ৳1,500–2,500)
  - Chattogram / Sylhet (GP: ৳300–500 · Specialist: ৳500–1,000 · Senior: ৳1,000–1,800)
  - Rajshahi / Khulna / Mymensingh (GP: ৳200–400 · Specialist: ৳400–700 · Senior: ৳700–1,200)
  - District towns (GP: ৳100–300 · Specialist: ৳300–500 · Senior: ৳500–900)
  - Upazila / Rural (৳30–100)
- [ ] Dhaka sub-area breakdown (Dhanmondi, Gulshan, Mirpur, Uttara etc.)
- [ ] Bilingual (EN + BN)
- [ ] **DoD:** Fee guide is visible and accurate; labeled "approximate — confirm by phone"

### 2.4 Bengali Search Accuracy (P1)
- [ ] Test searching in Bengali: "হৃদরোগ", "শিশু", "ডায়াবেটিস", "চর্মরোগ", "কিডনি"
- [ ] If results are empty or wrong — implement case-insensitive + Unicode normalization on search
- [ ] Also test disease search in Bengali on `/diseases` page
- [ ] **DoD:** 5 Bengali search queries all return correct results

### 2.5 `.env.local.example` (P1)
- [ ] Create `.env.local.example` in project root with:
  ```
  ANTHROPIC_API_KEY=your_api_key_here
  ```
- [ ] Reference it in README
- [ ] **DoD:** New developer can onboard without asking for env var names

---

## Phase 3 — Data Seeding
*Goal: Enough real data to be genuinely useful at launch. Currently 21 doctors — need 70+.*

### 3.1 Dhaka Doctor Records — 50 minimum (P0)
- [ ] **Cardiologist** — minimum 5 Dhaka doctors (currently 2)
- [ ] **Dermatologist** — minimum 5 Dhaka doctors (currently 2)
- [ ] **Neurologist** — minimum 5 Dhaka doctors (currently 2)
- [ ] **Pediatrician** — minimum 5 Dhaka doctors (currently 2)
- [ ] **Gynecologist** — minimum 5 Dhaka doctors (currently 2)
- [ ] **Orthopedic** — minimum 5 Dhaka doctors (currently 1)
- [ ] **Gastroenterologist** — minimum 5 Dhaka doctors (currently 2)
- [ ] **ENT Specialist** — minimum 5 Dhaka doctors (currently 1)
- [ ] **Ophthalmologist** — minimum 5 Dhaka doctors (currently 2)
- [ ] **Psychiatrist** — minimum 5 Dhaka doctors (currently 1)
- [ ] **Nephrologist** — minimum 5 Dhaka doctors (currently 1)
- [ ] **General Physician** — minimum 5 Dhaka doctors (currently 2)

Each record must have: name EN+BN · degrees · hospital EN+BN · address EN+BN · phone · district · upazila · visiting hours · `whenToSee` EN+BN · experience years · rating · `available` flag

### 3.2 Chattogram Doctor Records — 20 minimum (P0)
- [ ] At least 2 doctors per specialty in Chattogram (currently 3 total)
- [ ] Focus areas: Nasirabad/GEC, Panchlaish, Agrabad
- [ ] Same field requirements as Dhaka records

### 3.3 Other Divisions — 5 minimum each (P1)
- [ ] Rajshahi — 5 doctors across key specialties
- [ ] Sylhet — 5 doctors across key specialties
- [ ] Khulna — 5 doctors across key specialties
- [ ] Mymensingh, Rangpur, Barishal — 3 doctors each (GP + 2 specialists)

### 3.4 Data Quality Pass (P0)
- [ ] All phone numbers formatted as `01X-XXXXXXX`
- [ ] All `available` flags set (no undefined)
- [ ] No placeholder data ("Dr. Test", "01700-000000", "TBD", empty strings)
- [ ] All `whenToSeeEn` and `whenToSeeBn` arrays populated (min 4 bullet points each)
- [ ] All `hospitalBn` fields filled in Bengali script
- [ ] All `addressBn` fields filled in Bengali script
- [ ] **DoD:** Zero placeholder records; all required fields populated on every doctor

### 3.5 Expand Disease Data — 40 more diseases (P1)
Currently 10 diseases. PRD defines 75 across 15 categories. Priority additions:

- [ ] **Heart & Blood:** Anemia, Heart Failure, Arrhythmia, DVT
- [ ] **Digestive:** Hepatitis B, Hepatitis C, Liver Cirrhosis, IBS, Jaundice, Appendicitis
- [ ] **Endocrine:** Hypothyroidism, Hyperthyroidism, PCOS, Obesity
- [ ] **Respiratory:** COPD, Pneumonia, Tuberculosis, Bronchitis
- [ ] **Kidney:** Kidney Stones, UTI, Nephrotic Syndrome
- [ ] **Skin:** Eczema, Psoriasis, Fungal Infection, Acne
- [ ] **Brain:** Migraine, Epilepsy, Stroke, Vertigo, Parkinson's
- [ ] **Bone:** Arthritis, Gout, Osteoporosis, Back Pain
- [ ] **Women's:** Pregnancy complications, Cervical Cancer, Menstrual Disorders, Infertility
- [ ] **Eyes:** Cataract, Glaucoma, Diabetic Retinopathy, Conjunctivitis
- [ ] **ENT:** Sinusitis, Tonsillitis, Hearing Loss
- [ ] **Infectious:** Malaria, Chickenpox, Cholera, COVID-19, Scabies
- [ ] **Mental Health:** Depression, Anxiety, Panic, Insomnia
- [ ] **Cancer:** Oral, Stomach, Lung, Colorectal, Liver

Each disease needs: nameEn · nameBn · bodySystem · descriptionEn/Bn · symptomsEn/Bn · causesEn/Bn · whenToSeeEn/Bn · linkedSpecialties · linkedTests · disclaimer

### 3.6 Expand Test Data — 36 more tests (P1)
Currently 14 tests. PRD defines 50+. Priority additions:

- [ ] Echocardiogram, Ultrasound Abdomen, Ultrasound Pelvis, MRI Brain, CT Scan, EEG, Spirometry
- [ ] TSH (Thyroid), T3/T4, Liver Function Test, Creatinine, Uric Acid
- [ ] HBsAg (Hepatitis B), Anti-HCV, HBV DNA, Malaria RDT, Sputum AFB, GeneXpert (TB)
- [ ] ESR, CRP, Rheumatoid Factor, Anti-CCP, Ferritin, Vitamin B12, Vitamin D
- [ ] Pap Smear, Mammogram, Pregnancy Test, Blood Group, D-Dimer, Troponin
- [ ] Colonoscopy, Endoscopy (OGD), OGTT, Dengue IgM/IgG, Urine Culture, Blood Culture

---

## Phase 4 — API Integration
*Goal: Wire up all external integrations required for launch.*

### 4.1 AI Chat — Anthropic API (P0)
- [ ] Confirm `POST /api/chat` route is working (`src/app/api/chat/route.ts`)
- [ ] Set `ANTHROPIC_API_KEY` in Vercel environment variables
- [ ] Test streaming response — reply must appear within 3 seconds
- [ ] **10 English test queries:**
  - "I have chest pain" → Cardiologist
  - "My child has fever" → Pediatrician
  - "I feel dizzy and my head hurts" → Neurologist
  - "I have diabetes, which doctor?" → Endocrinologist / GP
  - "Skin rash and itching" → Dermatologist
  - "Stomach pain and acidity" → Gastroenterologist
  - "Blood in urine" → Nephrologist / Urologist
  - "Blurry vision" → Ophthalmologist
  - "Feeling very sad and hopeless" → Psychiatrist
  - "Which doctor for high blood pressure?" → Cardiologist / GP
- [ ] **10 Bengali test queries** — same questions in Bengali script
- [ ] Emergency test: "আমার বুকে ব্যথা" → response must include "Call 16457 now"
- [ ] Fallback when API key missing → friendly error, page does not crash
- [ ] **DoD:** All 20 queries return correct specialty/disease link; no hallucinated doctor names

### 4.2 AI Chat — Update System Prompt (P1)
- [ ] Add all 10 launch diseases to system prompt (currently only 10 — verify they're all listed)
- [ ] Add all 12 specialties to system prompt
- [ ] Add instruction to link to `/test/[slug]` for relevant tests
- [ ] Add instruction to mention test cost ranges when asked "how much does X test cost?"
- [ ] **DoD:** Chat correctly references test cost ranges and test pages in responses

### 4.3 Google Maps Integration (P0)
- [ ] On each doctor profile, construct Maps URL: `https://maps.google.com/?q=<hospital>+<area>+<district>+Bangladesh`
- [ ] Render as "Get Directions →" link (opens in new tab on desktop, Maps app on mobile)
- [ ] Test on Android Chrome — confirms Maps app opens
- [ ] **DoD:** Every doctor profile has a working Maps link

---

## Phase 5 — QA
*Goal: Every page works perfectly in both languages on mobile before launch.*

### 5.1 Route Smoke Test (P0)
- [ ] Run curl against all routes — all must return HTTP 200:
  - `/` · `/doctors` · `/doctors/[id]` · `/specialties` · `/category/[slug]`
  - `/diseases` · `/disease/[slug]` · `/tests` · `/test/[slug]`
  - `/profile` · `/about` · `/not-found` (404)
- [ ] **DoD:** Script confirms all routes 200

### 5.2 Mobile QA — 375px Viewport (P0)
- [ ] Homepage: search bar, disease chips, specialty list, emergency banner — all visible, no overflow
- [ ] `/doctors`: filter panel usable on mobile, doctor cards readable
- [ ] `/disease/diabetes`: all sections render, disclaimer visible
- [ ] `/test/cbc`: cost ranges visible, lab chain list readable
- [ ] `/profile`: all sections visible, edit modal doesn't overflow screen
- [ ] AI chat: opens, sends message, response renders correctly
- [ ] Bottom nav: 4 tabs visible and tappable (min 44px target)
- [ ] **DoD:** Zero horizontal scroll on any page at 375px

### 5.3 Bilingual QA — Full Site in Bengali (P0)
- [ ] Switch to Bengali → walk through all 12 pages in the page map
- [ ] Zero English strings visible in BN mode
- [ ] Language preference persists after browser close (localStorage check)
- [ ] Bengali search: 5 queries return correct results
- [ ] **DoD:** 100% of UI strings translated; language toggle works on every page

### 5.4 Edge Cases (P1)
- [ ] Empty search → `/doctors` shows all results (no crash)
- [ ] Very long search query (100+ chars) → no layout break
- [ ] Mixed Bengali + English search → returns relevant results
- [ ] AI chat: send empty message → no crash, prompt to type something
- [ ] AI chat: API timeout → friendly error, retry option shown
- [ ] `/disease/invalid-slug` → 404 page renders (not a blank crash)
- [ ] `/doctors/invalid-id` → 404 page renders

### 5.5 Definition of Done Final Checklist (P0)
- [ ] DoD #1 — 60-second doctor discovery on mobile ✓
- [ ] DoD #2 — Disease → Doctor flow end-to-end ✓
- [ ] DoD #3 — AI chat 20 bilingual queries pass ✓
- [ ] DoD #4 — Fee & cost guide visible ✓
- [ ] DoD #5 — User profile persists ✓
- [ ] DoD #6 — 100% bilingual ✓
- [ ] DoD #7 — No fee data on doctor profiles ✓
- [ ] DoD #8 — Emergency 16457 above fold on mobile ✓
- [ ] DoD #9 — All routes return 200 ✓
- [ ] DoD #10 — Lighthouse mobile ≥ 80, < 200 KB ✓
- [ ] DoD #11 — `tsc --noEmit` + `npm run lint` zero errors ✓
- [ ] DoD #12 — Live on Vercel with AI key ✓

---

## Phase 6 — Launch
*Goal: Ship to production. Real users. Stakeholder demo.*

### 6.1 Vercel Setup (P0)
- [ ] Connect GitHub repo to Vercel project
- [ ] Set `doctor-site` (or merged `main`) as production branch
- [ ] Add `ANTHROPIC_API_KEY` to Vercel environment variables
- [ ] Confirm auto-deploy on push works

### 6.2 Domain (P1)
- [ ] Register domain (e.g. `doctorbd.com` or `findadoctor.com.bd`)
- [ ] Configure DNS → Vercel
- [ ] HTTPS active (Vercel handles this automatically)
- [ ] **DoD:** Production URL accessible over HTTPS

### 6.3 Production Smoke Test (P0)
- [ ] Hit all major routes on production URL — all 200
- [ ] AI chat responds on production (confirms API key is set)
- [ ] Language toggle works on production
- [ ] Test tap-to-call on a real Android device on production URL

### 6.4 Real User Testing — Dhaka (P0)
- [ ] 3–5 test users in Dhaka, on Android, on mobile data
- [ ] Each user completes: search for a condition → find a doctor → tap-to-call
- [ ] Record any confusion or drop-off points
- [ ] Fix any P0 issues before public announcement
- [ ] **DoD:** At least 1 user completes the full disease → doctor → call flow without help

### 6.5 Stakeholder Demo (P0)
- [ ] Walk through all 6 UX flows live:
  1. Know the doctor → search → profile → call
  2. Know the disease → disease page → specialty → doctor → call
  3. Know the symptom → AI chat → specialty → doctor → call
  4. Need a test → disease page → test page → cost + lab
  5. Save a doctor → saved doctors on profile
  6. Browse by body system → `/diseases` tabs → disease → doctor
- [ ] Demo in both English and Bengali
- [ ] Record the session

---

## Task Summary by Priority

### P0 — Must be done before launch (blockers)
- Fix fee violations on `/doctors` page
- Google Maps deep-link on doctor profiles
- Doctor data: 50+ Dhaka, 20+ Chattogram, all 12 specialties with ≥ 5 each
- Data quality pass (no placeholders, all fields filled)
- AI Chat API working end-to-end (20 queries pass)
- All routes return 200
- Mobile QA at 375px pass
- Bilingual QA — 100% translated
- DoD final checklist — all 12 pass
- Vercel setup + AI key in production
- Real user testing in Dhaka

### P1 — Should be done before launch (important)
- Mobile bottom navigation (4 tabs)
- User profile page (`/profile`)
- Recently visited tracking
- Test cost ranges on test pages
- Doctor fee guide by city
- Bengali search accuracy verified
- 404 page (bilingual)
- `.env.local.example`
- Expand to 40+ more diseases
- Expand to 36+ more tests
- Other division doctor data (Rajshahi, Sylhet, Khulna)
- AI chat system prompt updated
- Edge case QA
- Domain configured

### P2 — Nice to have (post-launch or v1.1)
- About page real content and team section
- Expand to all 75 diseases in taxonomy
- Expand to all 50+ tests
- All 8 divisions fully seeded
- Analytics (Vercel Analytics / PostHog)

---

## Sprint Assignment

| Phase | Owner | Days |
|---|---|---|
| Phase 1 — UX & Design Polish | @shojolislam | Day 1–2 |
| Phase 2 — Feature Development | @rajibraju02 | Day 2–4 |
| Phase 3 — Data Seeding | @Sadbinwalid + @rajibraju02 | Day 3–5 |
| Phase 4 — API Integration | @shojolislam | Day 3–4 |
| Phase 5 — QA | All three | Day 6–7 |
| Phase 6 — Launch | @Sadbinwalid | Day 8 |

---

## Reference Documents
- [PRD.md](./PRD.md) — Full product requirements
- [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) — Launch checklist
