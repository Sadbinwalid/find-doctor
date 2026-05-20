# Product Requirements Document: Doctor Finder Bangladesh

**Version:** 1.0
**Date:** 2026-05-17
**Branch:** `doctor-site`

---

## 1. Overview

A community-driven, bilingual (Bengali/English) doctor discovery platform for Bangladesh. The core job-to-be-done: a person needs to reach a doctor — the app surfaces the phone number and chamber details so they can call and arrange an appointment themselves.

---

## 2. Goals

- Build a searchable, open database of doctors in Bangladesh organized by specialty
- Allow anyone to contribute doctor information; submissions go live only after admin approval
- Surface actionable contact info (phone, chamber address, visiting hours) quickly
- Start with Dhaka; schema and structure supports all of Bangladesh from day one

**Non-goals (v1):**
- In-app appointment booking
- Payment processing
- Telemedicine

---

## 3. User Types

| Type | Can View | Can Submit Info | Verified Badge | Content Moderation |
|---|---|---|---|---|
| **Visitor** | Yes | No | — | — |
| **Contributor** | Yes | Yes (pending approval) | — | — |
| **Doctor** | Yes | Yes (own profile, pending approval) | Yes (after doc review) | — |
| **Admin** | Yes | Yes | — | Approve / reject / edit all |

---

## 4. Core Features

### 4.1 Doctor Categories

- Hierarchical specialty taxonomy — e.g. *Medicine > Cardiology*, *Surgery > Orthopedics*
- Each category has a name in both Bengali and English
- Category pages list all approved doctors within that specialty
- Admin manages the category tree

### 4.2 Doctor Profile

| Field | Required | Notes |
|---|---|---|
| Full name | Yes | Bengali + English |
| Title / degrees | Yes | MBBS, FCPS, MD, etc. |
| Photo | No | |
| Specialty | Yes | Linked to category |
| Affiliated hospital(s) | No | Multiple supported |
| Chamber address(es) | No | Multiple supported, each with visiting hours |
| Contact phone number(s) | Yes | Primary reason users come to the app |
| District / city | Yes | Starts with Dhaka |
| BMDC registration no. | No | Optional, aids credibility |

> Fee information is excluded to avoid disputes and outdated data.

### 4.3 Search & Discovery

- Full-text search by doctor name, hospital, or specialty
- Filter by: specialty category, district/city
- Browse by category (primary entry point on homepage)
- Results show name, specialty, primary contact, and chamber location at a glance

### 4.4 Submitting & Editing Doctor Info

- Account required to submit
- Any logged-in user can: add a new doctor, or suggest edits to an existing profile
- All submissions enter a **pending queue** — nothing goes live until an admin approves
- Full edit history stored (who submitted what change, when)
- Any user can flag a profile as having incorrect information

### 4.5 Doctor Self-Submission & Verification

- A doctor registers an account and either claims an existing profile or creates a new one
- To get a **Verified Doctor** badge, they upload supporting documents (medical certificate, BMDC card, visiting card, etc.)
- Admin reviews uploaded documents and grants verified status manually
- Verified doctors can update their own profile details (still goes through approval queue)

### 4.6 Admin Panel

- Dashboard: pending submissions queue, flagged profiles, verification requests
- Approve / reject / edit any submission with a note
- Manage category taxonomy
- Manage user accounts

---

## 5. Platform & Language

- **V1:** Responsive web app
- **V2:** Hybrid mobile app (Android-first given Bangladesh market)
- **Language:** Fully bilingual — Bengali and English throughout UI and data entry; user can switch language

---

## 6. Geographic Rollout

- Data model supports all 64 districts of Bangladesh from day one
- Initial data seeding and outreach focused on **Dhaka**
- Other divisions / districts unlock as data is contributed

---

## 7. Non-Functional Requirements

- **Uptime:** 99.5% availability
- **Search response:** < 1 second for typical queries
- **Mobile-friendly:** web app must work well on low-end Android browsers (primary Bangladesh use case)
- **Low-bandwidth tolerance:** pages should be lightweight; avoid heavy assets

---

## 8. Open Questions for Later Phases

- Should contributors earn reputation/trust scores over time (reducing need for admin approval per edit)?
- Do we want a doctor-facing dashboard showing how many people viewed their profile?
- Will we eventually integrate with BMDC's registry for automated verification?
