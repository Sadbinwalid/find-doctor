# DoctorBD — Documentation Index

> Last updated: July 2026 · Branch: `rajibraju/profile` (pending review → main) · Stack: Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript

## Execution Plan
| Document | Description |
|---|---|
| [EXECUTION-PLAN.md](./EXECUTION-PLAN.md) | Full 0→1 plan: documentation, design, database, frontend, QA, deployment |

## Product Requirements (PRDs)
| # | Document | Page | Status |
|---|---|---|---|
| 01 | [Login & Sign Up](./PRD-01-login-signup.md) | /auth | Built (demo mode) |
| 02 | [Homepage](./PRD-02-homepage.md) | / | Built |
| 03 | [Find Doctors](./PRD-03-find-doctors.md) | /doctors | Built |
| 04 | [Specialties](./PRD-04-specialties.md) | /specialties + /category/[slug] | Built |
| 05 | [About](./PRD-05-about.md) | /about | Built |
| 06 | [Verification](./PRD-06-verification.md) | /verify | Built (accessible via Doctor CTA banner) |

## Additional Pages (no dedicated PRD yet)
| Page | Route | Status |
|---|---|---|
| User Profile | /profile | Built |
| Doctor Registration | /register/doctor | Built |
| Admin Panel | /admin/doctors | Built (PIN: 0000, demo only) |
| Terms & Conditions | /terms | Built |
| Privacy Policy | /privacy | Built |

## What's Built vs What's Still Mock

| Area | Current State |
|---|---|
| Auth | Mock — any OTP/password accepted, no real backend |
| Doctor data | 20 hardcoded demo doctors in `src/data/doctors.ts` |
| User data | Stored in `localStorage`, cleared on sign-out |
| Doctor applications | Stored in `localStorage`, reviewed via admin panel |
| Admin access | PIN `0000` — no real role-based access control |
| Bilingual (EN/BN) | Fully implemented via `LanguageContext` — no Bengali leakage in EN mode |
| Design | Complete — gradient hero system across all pages, consistent `rounded-2xl` card language, optimised for low-end Android + 3G |

## What's New in `rajibraju/profile` (pending review)

| Change | Details |
|---|---|
| Gradient hero system | Every page now opens with a `#0066CC → #0052a3` hero strip and a pull-up card, matching the home page |
| Doctor Detail redesign | Gradient hero with doctor identity; pull-up stats bar (rating · experience · fee); icon-led contact items; gradient fee card |
| Profile redesign | Gradient hero with avatar, inline edit/sign-out, conditions chips; pull-up stats bar; gradient spend summary |
| Category page redesign | Gradient hero with specialty icon, doctor/available/verified chips; pull-up when-to-see card |
| Specialties page redesign | Gradient hero with badge chip; pull-up card grid |
| Register as Doctor | Gradient hero header replacing plain text heading |
| Mobile "More" tab | 5th bottom nav tab → sheet with sign-in (patient/doctor), doctor registration, and 🇺🇸 EN / 🇧🇩 BN language toggle |
| Navbar logo | Stethoscope icon + gradient square · `Doctor` (medium gray) + `BD` (bold blue) wordmark — Bengali subtitle removed |
| Language toggle | Flag pill buttons: 🇺🇸 EN and 🇧🇩 BN — shown in navbar, desktop dropdown, and More sheet |
| Language consistency | Fixed Bengali text leaking into English mode (CategoryCard label, Doctor detail subtitle, "How it Works" step numbers) |
