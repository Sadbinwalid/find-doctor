# Product Requirements Document: DoctorBD — Doctor Finder Bangladesh

**Version:** 2.0
**Date:** 2026-05-20
**Branch:** `doctor-site`
**Status:** Active Development

---

## 1. Overview

DoctorBD is a community-driven, bilingual (Bengali/English) doctor discovery platform for Bangladesh. The core job-to-be-done: a person needs to reach a doctor — the app surfaces the phone number and chamber details so they can call and arrange an appointment themselves.

No booking engine. No payment. Just fast, reliable contact info.

---

## 2. Goals

- Build a searchable, open database of doctors in Bangladesh organized by specialty
- Allow anyone to contribute doctor information; submissions go live only after admin approval
- Surface actionable contact info (phone, chamber address, visiting hours) quickly
- Start with Dhaka; schema and structure supports all 64 districts from day one

**Non-goals (v1):**
- In-app appointment booking
- Payment processing
- Telemedicine / video consultations

---

## 3. User Types & Permissions

| Type | Browse | Search | Submit / Edit | Verified Badge | Moderate |
|---|---|---|---|---|---|
| **Visitor** | Yes | Yes | No | — | — |
| **Contributor** | Yes | Yes | Yes (pending approval) | — | — |
| **Doctor** | Yes | Yes | Yes — own profile only (pending approval) | Yes (after doc review) | — |
| **Admin** | Yes | Yes | Yes — all profiles | — | Full |

---

## 4. Feature Specifications

### 4.1 Specialty Taxonomy

**Description:** A two-level hierarchy organising all medical specialties. Users browse from the homepage by clicking a specialty card rather than searching blind.

**Structure:**
```
Parent Category (e.g. Medicine)
  └── Sub-specialty (e.g. Cardiology, Neurology)

Parent Category (e.g. Surgery)
  └── Sub-specialty (e.g. Orthopedics, Neurosurgery)
```

**Rules:**
- Every category has a name in both Bengali and English
- A doctor belongs to exactly one sub-specialty
- Category pages list all approved doctors in that specialty, paginated (20 per page)
- Admin creates, edits, or removes categories via the admin panel
- Deleting a category requires reassigning or removing its doctors first

**Initial Specialties (launch set):**
Cardiology, Dermatology, Neurology, Pediatrics, Gynecology & Obstetrics, Orthopedics, Gastroenterology, ENT, Ophthalmology, Psychiatry, Nephrology, General Medicine, Oncology, Urology, Endocrinology, Pulmonology, Rheumatology, Dentistry, Radiology, Pathology

---

### 4.2 Doctor Profile

**Description:** The core unit of the app. Every piece of info on a profile is either required for the profile to be approved or optional but structured.

| Field | Required | Format / Notes |
|---|---|---|
| Full name (English) | Yes | Plain text |
| Full name (Bengali) | Yes | Unicode Bengali |
| Title / degrees | Yes | e.g. MBBS, FCPS, MD — comma-separated |
| Profile photo | No | JPEG/PNG, max 2 MB, displayed as circular avatar |
| Specialty | Yes | Linked to taxonomy category |
| Affiliated hospital(s) | No | Multiple entries; name + address each |
| Chamber address(es) | No | Multiple entries; each has: address, days open, visiting hours |
| Phone number(s) | Yes | At least one; labelled (chamber / personal / appointment) |
| Division | Yes | One of 8 divisions |
| District | Yes | One of 64 districts |
| BMDC registration no. | No | Displayed on profile if provided; not validated automatically in v1 |
| Languages spoken | No | e.g. Bengali, English, Arabic |
| About / bio | No | Short free-text, max 300 characters |

> **Fee information is intentionally excluded** — fees change frequently and disputes over outdated data damage trust.

**Profile states:** `pending` → `approved` → `published` | `rejected` | `flagged`

---

### 4.3 Search & Discovery

**Description:** The primary way users find a doctor. Must return results in under 1 second on a 3G connection.

**Search bar (homepage + persistent header):**
- Full-text search across: doctor name, specialty name, hospital name, chamber area
- Bilingual — typing in Bengali or English both work
- Autocomplete suggestions appear after 2 characters (debounced 300 ms)
- Search results page shows matched doctors with: name, specialty, primary phone, district

**Filters (search results page):**
- Specialty (dropdown — full taxonomy list)
- Division (dropdown)
- District (dropdown — updates based on selected division)
- Verified only (toggle)

**Browse by Specialty (homepage):**
- Grid of specialty cards — icon, Bengali name, English name, doctor count
- Clicking a card goes to the specialty's category page
- Category page supports the same division/district filters

**Result card (what's shown per doctor in a list):**
- Name (English + Bengali)
- Specialty
- Primary contact phone (tap-to-call on mobile)
- Chamber area / district
- Verified badge (if applicable)
- Rating (if reviews are enabled — v2)

---

### 4.4 Submitting & Editing Doctor Information

**Description:** Any logged-in user can add a doctor or suggest edits. Nothing is visible to visitors until an admin approves.

**Adding a new doctor:**
1. User clicks "Add Doctor" (visible when logged in)
2. Fills out the profile form (see 4.2 field list)
3. Submits — profile enters `pending` queue
4. Admin reviews and approves, rejects (with a note), or requests more info
5. On approval the profile goes live

**Suggesting an edit to an existing profile:**
1. User clicks "Suggest Edit" on any published profile
2. A pre-filled form opens with current data
3. User changes one or more fields and submits
4. The edit enters the `pending` queue as a diff (old value → new value)
5. Admin sees both versions side-by-side and approves or rejects

**Edit history:**
- Every approved change is logged: who submitted, what changed, when, admin who approved
- History is visible to admins; a simplified version ("last updated on…") is visible to the public

**Flagging incorrect info:**
- Any visitor can click "Flag" on a profile without logging in
- Flag form: select reason (wrong phone / wrong address / doctor no longer at this chamber / other) + optional note
- Flagged profiles appear in the admin dashboard for review
- A profile with 3+ unresolved flags is automatically surfaced at the top of the admin queue

---

### 4.5 Doctor Self-Registration & Verified Badge

**Description:** Doctors can claim their own profile and earn a visible "Verified Doctor" badge, which boosts trust with visitors.

**Flow:**
1. Doctor creates an account (email or phone number)
2. Searches for their existing profile — if found, clicks "Claim this profile"
3. If no profile exists, creates one from scratch
4. Uploads verification documents (at least one required):
   - BMDC registration certificate
   - Medical degree certificate
   - Hospital ID card or visiting card
5. Submission enters admin review queue tagged as "Verification Request"
6. Admin reviews documents and either grants or denies verified status with a note
7. Verified doctors receive an email/SMS confirmation and a badge appears on their profile

**After verification:**
- Doctor can edit their own profile at any time (edits still go through the approval queue)
- Doctor cannot edit other profiles

---

### 4.6 User Accounts & Authentication

**Registration options:**
- Email + password
- Phone number + OTP (SMS) — preferred for Bangladesh market

**Account fields:**
- Name
- Email or phone (at least one required)
- Role (auto-assigned: Contributor; self-identified: Doctor triggers verification flow)

**Session:** JWT-based, 30-day expiry with refresh token

**Password reset:** via email link or SMS OTP

---

### 4.7 Admin Panel

**Description:** A separate, protected interface for admins to manage all content and users. Accessible only to accounts with the Admin role.

**Dashboard (landing page):**
- Count cards: pending submissions, pending verifications, flagged profiles, total published doctors
- Activity feed: recent approvals/rejections by any admin

**Pending Submissions Queue:**
- List of all pending new profiles and edits, oldest first
- Each row: submitter name, doctor name, submission type (new / edit), date
- Click to open review view — shows diff for edits, full form for new profiles
- Actions: Approve / Reject (with required note) / Request more info

**Verification Requests:**
- List of doctors awaiting badge approval
- Admin can view uploaded documents inline
- Actions: Grant badge / Deny (with note)

**Flagged Profiles:**
- Sorted by flag count (highest first)
- Admin can resolve flags, edit the profile, or reject as unfounded

**Category Management:**
- Add / edit / delete specialty categories
- Reorder display order on homepage grid

**User Management:**
- List all accounts with role and status
- Promote to Admin, suspend, or delete accounts
- View all submissions by a specific user

---

### 4.8 Bilingual UI & Language Switching

**Description:** The entire interface must work in both Bengali and English. The language toggle is persistent and visible on every page.

**Requirements:**
- All static UI copy has Bengali and English versions
- Doctor names stored and displayed in both scripts
- Language preference stored in browser (localStorage); remembered on return visits
- URLs are language-agnostic (no `/en/` or `/bn/` prefix in v1)
- Input fields accept both scripts; search works in either

---

## 5. Page Map

| Page | Route | Who can access |
|---|---|---|
| Homepage | `/` | All |
| Search results | `/search?q=…` | All |
| Specialty category | `/specialty/[slug]` | All |
| Doctor profile | `/doctor/[slug]` | All |
| Add doctor form | `/submit` | Logged-in |
| Edit suggestion form | `/doctor/[slug]/edit` | Logged-in |
| Login / Register | `/auth` | Visitors |
| My account | `/account` | Logged-in |
| Verification upload | `/account/verify` | Doctor role |
| Admin dashboard | `/admin` | Admin only |
| Admin review | `/admin/review/[id]` | Admin only |
| Admin categories | `/admin/categories` | Admin only |
| Admin users | `/admin/users` | Admin only |

---

## 6. Platform & Technology

- **V1:** Responsive web app (Next.js + Tailwind CSS — current stack)
- **V2:** Android-first hybrid mobile app
- **Database:** PostgreSQL — relational model suits the taxonomy + profile + edit-history structure
- **Search:** PostgreSQL full-text search (v1); Meilisearch or Typesense (v2 if needed)
- **Auth:** NextAuth.js or Supabase Auth
- **File storage:** Cloudflare R2 or AWS S3 (doctor photos, verification documents)
- **SMS (OTP):** SSL Wireless or Twilio Bangladesh

---

## 7. Geographic Rollout

- Data model includes all 8 divisions and 64 districts of Bangladesh from day one
- Division and district dropdowns are fully populated at launch
- Initial data seeding and admin/outreach effort focused on **Dhaka**
- Profiles from other districts can be submitted by contributors at any time

---

## 8. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Uptime | 99.5% |
| Search response time | < 1 second (typical query) |
| Page weight (homepage) | < 200 KB initial load |
| Mobile compatibility | Works on Chrome Android 80+, low-end devices |
| Accessibility | WCAG 2.1 AA for core user flows |
| Data privacy | No personal user data sold; phone numbers shown only for doctors |

---

## 9. Open Questions for Later Phases

- **Contributor reputation:** Should frequent, accurate contributors earn a trust score that reduces manual review overhead?
- **Doctor analytics:** Should verified doctors see a dashboard with profile view counts?
- **BMDC integration:** Automate verification by querying BMDC's public registry (if API becomes available)?
- **Review system:** Should visitors be able to leave a rating or comment on a doctor profile (v2)?
- **WhatsApp deep-link:** Tap-to-WhatsApp alongside tap-to-call for chambers that use WhatsApp for appointments?

---

## 10. Changelog

| Version | Date | Summary |
|---|---|---|
| 1.0 | 2026-05-17 | Initial PRD — overview, user types, core features |
| 2.0 | 2026-05-20 | Expanded to full feature spec — detailed flows, page map, tech stack, admin panel |
