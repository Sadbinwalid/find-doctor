# DoctorBD — Execution Plan (0 → 1)

> Last updated: June 2026
> Stack: Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript
> Target: A live, usable product with real doctors, real users, real data

---

## Does This Plan Make Sense?

Before the tasks — an honest answer.

**Yes, with one important condition.**

The frontend is 70% production-ready. The UI looks good, the flows exist, the bilingual system works.
The gap is not design or code — it's **data and backend**.

Right now the entire platform runs on:
- 20 hardcoded fake doctors
- localStorage for all user data (no server, no database)
- Mock auth (any OTP, any password works)

Going 0→1 means replacing all three of those with real systems.
The risk is not technical complexity — it's **getting real doctors listed**.
Without real doctors, no amount of polish makes this a real product.

So the plan below is structured to solve the hardest thing first (data + backend),
not the easiest thing first (UI polish).

---

## Overview

| Phase | Focus | Estimated Effort |
|---|---|---|
| 0 | Documentation & Planning | 3–5 days |
| 1 | Design | 5–7 days |
| 2 | Database & Backend | 7–10 days |
| 3 | Frontend Execution | 10–14 days |
| 4 | Content & Data | Ongoing (parallel) |
| 5 | QA & Testing | 3–5 days |
| 6 | Deployment | 2–3 days |

Total: ~6–8 weeks with one developer working full-time

---

## Phase 0 — Documentation & Planning

> Goal: Align on what you're building before writing a line of code.

### 0.1 Product
- [x] PRD-01: Login & Sign Up
- [x] PRD-02: Homepage
- [x] PRD-03: Find Doctors
- [x] PRD-04: Specialties
- [x] PRD-05: About
- [x] PRD-06: Verification
- [ ] Write user stories for each PRD (As a patient, I want to… so that…)
- [ ] Define MVP scope — what is NOT in v1 (no booking, no payments, no reviews yet)
- [ ] Define success metrics for launch (e.g. 100 real doctors, 500 users in month 1)

### 0.2 Technical
- [ ] Decide on database: **Supabase** (recommended — free tier, built-in auth, works perfectly with Next.js)
- [ ] Decide on hosting: **Vercel** (recommended — zero config with Next.js, free tier)
- [ ] Map all localStorage keys to real database tables (see Phase 2)
- [ ] Set up GitHub branch strategy (main = production, dev = staging, feature branches for tasks)

### 0.3 Business
- [ ] Register domain (doctorbd.com or finddoctorbd.com)
- [ ] Set up basic email (contact@doctorbd.com, privacy@doctorbd.com)
- [ ] Decide legal entity / ownership before launch

---

## Phase 1 — Design

> Goal: Finalize what every screen looks like before building it. Figma first.

### 1.1 Missing Screens (not yet designed or built)
- [ ] Sign In screen (separate from Sign Up — currently missing)
- [ ] Forgot Password / Reset Password screen
- [ ] Doctor profile page: contact/reach section (call, WhatsApp, directions)
- [ ] Empty states for: no search results, no appointments, no saved doctors, new user profile
- [ ] Error states: page not found (404), server error (500)
- [ ] Loading skeletons for doctor cards and profile sections
- [ ] "Saved doctors" functionality — save button on cards + saved list in profile

### 1.2 Existing Screens to Refine
- [ ] Homepage: personalised version for logged-in users (show name, recent doctors)
- [ ] Profile page: replace fake Rajib Raju data with real user data structure
- [ ] Doctor listing cards: add verified badge, add save button
- [ ] Specialty category page: add safety warning section, fee range, conditions list
- [ ] About page: add team section, FAQ, disclaimer, CTA
- [ ] Mobile BottomNav: add Specialties tab (currently missing)

### 1.3 Design System Check
- [ ] Confirm colour tokens are consistent (blue #0066CC, green #00A86B used across all files)
- [ ] Confirm typography scale is consistent (text-xs through text-2xl usage)
- [ ] Confirm spacing and border-radius are consistent across cards
- [ ] Test all screens at 320px (smallest common mobile), 375px, 768px, 1280px

---

## Phase 2 — Database & Backend

> Goal: Replace localStorage with a real database. This is the most critical phase.

### 2.1 Set Up Supabase Project
- [ ] Create Supabase project
- [ ] Configure environment variables in Next.js (.env.local)
- [ ] Install Supabase client: `npm install @supabase/supabase-js`
- [ ] Set up Supabase auth (email/password + phone OTP)

### 2.2 Database Schema

**Table: `doctors`**
```sql
id              uuid primary key
name_en         text not null
name_bn         text
specialty       text not null         -- references categories.slug
qualifications  text[]
experience_years int
hospital_en     text
hospital_bn     text
division        text
district        text
upazila         text
address_en      text
address_bn      text
phone           text
whatsapp        text
fee             int
rating          numeric(3,1)
review_count    int default 0
available       boolean default true
verified        boolean default false
about_en        text
about_bn        text
when_to_see_en  text[]
when_to_see_bn  text[]
created_at      timestamptz default now()
```

- [ ] Create `doctors` table
- [ ] Migrate all 20 existing demo doctors from doctors.ts into Supabase
- [ ] Add Row Level Security (RLS): public can read, only admin can write

**Table: `users`** (extends Supabase auth.users)
```sql
id              uuid references auth.users primary key
name_en         text
blood_group     text
age             int
division_en     text
district_en     text
phone           text
conditions      text[]
member_since    text
created_at      timestamptz default now()
```

- [ ] Create `users` table
- [ ] RLS: user can only read/write their own row

**Table: `doctor_applications`**
```sql
id              uuid primary key default gen_random_uuid()
app_id          text unique not null
name_en         text not null
name_bn         text
phone           text not null
email           text
gender          text
specialty       text
bmdc            text
qualifications  text[]
experience_years text
hospital_en     text
division        text
district        text
upazila         text
fee             text
address         text
agreed          boolean
status          text default 'pending'   -- pending | approved | rejected
submitted_at    timestamptz default now()
reviewed_at     timestamptz
```

- [ ] Create `doctor_applications` table
- [ ] RLS: public can insert, only admin can update status

**Table: `saved_doctors`**
```sql
id          uuid primary key default gen_random_uuid()
user_id     uuid references users(id)
doctor_id   uuid references doctors(id)
saved_at    timestamptz default now()
unique(user_id, doctor_id)
```

- [ ] Create `saved_doctors` table
- [ ] RLS: user can only read/write their own saved doctors

**Table: `recently_visited`**
```sql
id          uuid primary key default gen_random_uuid()
user_id     uuid references users(id)
doctor_id   uuid references doctors(id)
visited_at  timestamptz default now()
unique(user_id, doctor_id)
```

- [ ] Create `recently_visited` table (replaces localStorage key)

### 2.3 API Layer (Next.js Route Handlers)

- [ ] `GET /api/doctors` — list with filters (specialty, division, district, fee, sort)
- [ ] `GET /api/doctors/[id]` — single doctor
- [ ] `GET /api/categories` — list all specialties
- [ ] `POST /api/applications` — submit doctor registration
- [ ] `GET /api/admin/applications` — list pending (admin only)
- [ ] `PATCH /api/admin/applications/[id]` — approve/reject (admin only)
- [ ] `GET /api/user/profile` — get current user profile
- [ ] `PATCH /api/user/profile` — update profile
- [ ] `GET /api/user/saved` — saved doctors
- [ ] `POST /api/user/saved` — save a doctor
- [ ] `DELETE /api/user/saved/[id]` — unsave
- [ ] `GET /api/user/visited` — recently visited
- [ ] `POST /api/user/visited` — record a visit

### 2.4 Auth Migration
- [ ] Replace mock AuthContext with Supabase Auth
- [ ] Implement real email/password sign up and sign in
- [ ] Implement phone OTP sign up via Supabase (or Twilio fallback)
- [ ] Implement Google OAuth via Supabase
- [ ] Implement "Forgot Password" email flow
- [ ] Protect /profile route server-side (middleware)
- [ ] Protect /admin/doctors route server-side (check admin role)

---

## Phase 3 — Frontend Execution

> Goal: Wire every page to real data. Fix all gaps from the PRDs.

### 3.1 Auth Pages (/auth)
- [ ] Build real Sign In flow (separate from Sign Up — detects existing account)
- [ ] Add "Resend OTP" with 60-second countdown
- [ ] Add "Forgot Password" step
- [ ] Add loading states on all buttons (prevent double-tap)
- [ ] Add proper phone validation (Bangladesh: 01X + 8 digits)
- [ ] Add proper email format validation
- [ ] Make Terms & Privacy links clickable (/terms, /privacy)
- [ ] Add `autocomplete="one-time-code"` to OTP field
- [ ] Add "Go to Profile" fallback on done screen

### 3.2 Homepage (/)
- [ ] Wire search to real /api/doctors endpoint
- [ ] Show personalised hero for logged-in users (name, shortcut to profile)
- [ ] Hide Doctor CTA banner for logged-in patients
- [ ] Fix "How it Works" Step 3 copy (remove "contact directly")
- [ ] Fix stats to show real doctor/specialty counts from database
- [ ] Change Featured Doctors to pull top-rated from real data
- [ ] Add "Show more" toggle on symptom chips (show 12, expand to all 25)

### 3.3 Find Doctors (/doctors)
- [ ] Wire all filters to real /api/doctors endpoint
- [ ] Persist active filters in URL params (shareable links)
- [ ] Add empty/no-results state with "Clear filters" CTA
- [ ] Add verified badge on doctor cards
- [ ] Add "Save" button on doctor cards (calls /api/user/saved)
- [ ] Add "Available only" toggle filter
- [ ] Add fee slider dynamic max (from actual dataset max)
- [ ] Add loading skeleton while fetching

### 3.4 Doctor Detail (/doctors/[id])
- [ ] Pull doctor data from /api/doctors/[id]
- [ ] Add contact section: phone call button + WhatsApp button
- [ ] Add save/unsave button (syncs with database)
- [ ] Track visit via /api/user/visited (replace localStorage)
- [ ] Add "Share profile" button (copy link to clipboard)

### 3.5 Specialties (/specialties + /category/[slug])
- [ ] Replace first-letter icons with real Lucide icons per specialty
- [ ] Add notFound() for invalid /category/[slug]
- [ ] Add empty state when no doctors in a specialty
- [ ] Break "When to see" into bullet points
- [ ] Add safety/emergency note per specialty
- [ ] Add fee range (min–max from real data)
- [ ] Add "See all [specialty] doctors →" link to /doctors?specialties=slug
- [ ] Add Specialties to mobile BottomNav

### 3.6 Profile (/profile)
- [ ] Pull real user data from /api/user/profile (replace DEFAULT_PROFILE constant)
- [ ] Pull real saved doctors from /api/user/saved
- [ ] Pull real recently visited from /api/user/visited
- [ ] Remove hardcoded APPOINTMENTS constant (or connect to real appointment data)
- [ ] Add empty states for all sections (no appointments, no saved, no visited)
- [ ] Fix spend summary to show ৳0 / "No completed visits yet" for new users

### 3.7 About (/about)
- [ ] Add medical disclaimer section
- [ ] Add contact email
- [ ] Add FAQ (5–6 questions)
- [ ] Add CTA at bottom
- [ ] Fix doctor count to match real data

### 3.8 Verification (/verify)
- [ ] Remove/soften "BMDC cross-reference" claim
- [ ] Add patient-facing explanation of what the badge means
- [ ] Show actual badge visual on the page
- [ ] Add "Already applied? Check your status →" link to /profile
- [ ] Add FAQ for doctors

### 3.9 Admin Panel (/admin/doctors)
- [ ] Replace PIN with real Supabase admin role check
- [ ] Wire to /api/admin/applications (real database)
- [ ] Approve action should update doctors table (add doctor to live directory)

---

## Phase 4 — Content & Data (Parallel with Phase 3)

> Goal: Real doctors, real content. This is the hardest phase — not technical.

### 4.1 Doctor Data
- [ ] Target: 50 real verified doctors in Dhaka for launch
- [ ] Create doctor outreach template (WhatsApp / email)
- [ ] Manually verify BMDC registration for each
- [ ] Collect: name, specialty, hospital, fee, phone, photo (optional)
- [ ] Enter into Supabase doctors table via admin panel

### 4.2 Content
- [ ] Write real About page content (team, mission)
- [ ] Write proper Terms & Conditions (replace placeholder)
- [ ] Write proper Privacy Policy (replace placeholder)
- [ ] Write FAQ content for /about and /verify

### 4.3 SEO
- [ ] Add meta title + description to every page
- [ ] Add Open Graph tags (og:title, og:description, og:image)
- [ ] Add robots.txt and sitemap.xml
- [ ] Add structured data (JSON-LD) for doctor profiles

---

## Phase 5 — QA & Testing

> Goal: Find everything that breaks before real users do.

### 5.1 Functional Testing
- [ ] Complete sign up flow on mobile (Android Chrome, iOS Safari)
- [ ] Complete sign in flow on mobile
- [ ] Search and filter doctors — test all combinations
- [ ] Save a doctor → check it appears in profile
- [ ] Submit doctor registration → check it appears in admin panel
- [ ] Approve doctor in admin → check verified badge appears on profile
- [ ] Edit profile → check data persists after page reload
- [ ] Log out → check all user data is cleared → log back in → check data restored

### 5.2 Edge Case Testing
- [ ] Sign up with already-registered email
- [ ] Navigate to /profile while logged out → should redirect to /auth
- [ ] Navigate to /admin while not admin → should block
- [ ] Search with special characters (e.g. ড, @, <script>)
- [ ] Very long doctor name / hospital name — check truncation
- [ ] Division changed in registration step 3 — check district resets
- [ ] No internet connection — check error states

### 5.3 Responsiveness
- [ ] Test every page at 320px, 375px, 390px (iPhone 14), 768px, 1280px
- [ ] Test BottomNav on iOS Safari (check safe area / notch padding)
- [ ] Test modals (Edit Profile, Admin PIN) on small screens

### 5.4 Performance
- [ ] Run Lighthouse on homepage — target 90+ Performance score
- [ ] Check largest contentful paint on doctor listing page
- [ ] Ensure no layout shift on font load (Hind Siliguri)

---

## Phase 6 — Deployment

> Goal: Live on a real domain with CI/CD.

### 6.1 Infrastructure Setup
- [ ] Create Vercel project → connect GitHub repo
- [ ] Set environment variables in Vercel (Supabase URL, anon key, service role key)
- [ ] Set up separate Supabase projects for staging and production
- [ ] Configure custom domain on Vercel
- [ ] Enable HTTPS (automatic on Vercel)

### 6.2 CI/CD
- [ ] Configure Vercel to auto-deploy `main` branch to production
- [ ] Configure Vercel preview deployments for all PRs
- [ ] Add build check to GitHub (fail PR if `npm run build` fails)

### 6.3 Monitoring
- [ ] Set up Vercel Analytics (free, built-in)
- [ ] Set up error tracking: Sentry (free tier) or Vercel's built-in logging
- [ ] Set up uptime monitor (UptimeRobot — free)

### 6.4 Pre-Launch Checklist
- [ ] All environment variables set in production
- [ ] Database RLS policies tested in production
- [ ] Admin account created in Supabase (not PIN-based)
- [ ] Test full signup → find doctor → contact flow on production URL
- [ ] Privacy Policy and Terms pages have accurate content (not placeholder)
- [ ] Emergency helpline number (16457) is correct
- [ ] Remove all "Demo PIN: 0000" references
- [ ] Remove "Enter any 6 digits for demo" OTP hint
- [ ] Doctor count in stats bar reflects real data

---

## Summary: What Needs to Happen in What Order

```
Week 1    → Finalise decisions (database, hosting, domain)
           → Write user stories for PRDs
           → Design missing screens in Figma

Week 2    → Set up Supabase (auth + all tables)
           → Build API layer (route handlers)
           → Migrate mock auth to real Supabase auth

Week 3    → Wire auth pages to real auth
           → Wire doctor listing to real database
           → Wire profile to real user data

Week 4    → Wire remaining pages (specialties, admin, doctor detail)
           → Add contact actions (call, WhatsApp) on doctor profile
           → Add save/unsave functionality end-to-end

Week 5    → Content: collect 50 real doctors
           → SEO tags on all pages
           → Remove all demo/placeholder copy

Week 6    → Full QA pass
           → Deploy to Vercel + custom domain
           → Soft launch
```

---

## The One Thing That Will Make or Break This

> Getting real doctors listed before launch.

Everything else is solvable by writing code.
Real doctor data requires outreach, trust-building, and manual effort.
Start this in Week 1, in parallel with everything else.
Without 50+ real doctors at launch, the platform will feel empty regardless of how good the code is.
