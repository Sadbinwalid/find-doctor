# DoctorBD — Documentation Index

> Last updated: July 2026 · Branch: main · Stack: Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript

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
| Bilingual (EN/BN) | Fully implemented via `LanguageContext` |
| Design | Complete — optimised for low-end Android + 3G users in Bangladesh |
