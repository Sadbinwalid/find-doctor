# PRD 02 — Homepage (/)

> Last updated: July 2026

---

## Sections Currently Built

| Section | Status | Notes |
|---|---|---|
| **Hero** | ✅ Built | Blue gradient, headline, search box (text + division select), quick-tag specialty pills |
| **Stats Bar** | ✅ Built | 1,200+ Doctors / 40+ Specialties / 8 Divisions / 64 Districts (hardcoded) |
| **Symptom Search** | ✅ Built | Multi-select chips (25 symptoms), search-within-chips input, recommended specialties, "Find Doctors" CTA |
| **Browse by Specialty** | ✅ Built | 3-col (mobile) / 6-col (desktop) grid of CategoryCards with Lucide icons |
| **Doctor CTA Banner** | ✅ Built | Blue banner → "How it works" (`/verify`) + "Register Now" (`/register/doctor`) |
| **Featured Doctors** | ✅ Built | First 6 available doctors as cards; "See all doctors" CTA |
| **How It Works** | ✅ Built | 3-step grid; step numbers are now language-aware (`t("1","১")` etc.) |
| **Emergency Banner** | ✅ Built | Red, full-width, `tel:16457` link |

---

## Design Decisions (July 2026 redesign)

- **Target audience**: Low-end Android phones, 3G connections, rural Bangladesh users
- **Minimum tap target**: 44px on all interactive elements (Fitts's Law)
- **Font baseline**: 16px body text, `font-size: 16px` on all inputs (prevents iOS zoom)
- **Specialty grid**: 3 columns on mobile (easier to tap than 4), 6 on desktop
- **CategoryCards**: Icon-only + name (removed description to reduce cognitive load)
- **Hero gradient**: `from-[#0066CC] to-[#0052a3]` with floating white search card

---

## What's Missing / Still To Do

### Hero Search
- [ ] **District dropdown** — only shown after division is selected; if user clears division, district state stays selected (minor visual mismatch)
- [ ] **Quick-tag pills** link to `/category/[slug]`, not to `/doctors?specialties=X` — inconsistent with symptom flow behaviour
- [ ] **No search autocomplete / suggestions** while typing
- [ ] **Mobile layout at 320px** — needs testing at minimum viewport

### Stats Bar
- [ ] **Numbers are hardcoded** (1,200+, 40+) — inconsistent with the 20 real doctors and 12 specialties in the app. Update to real numbers or add "growing network" qualifier

### Doctor CTA Banner
- [ ] **Shown to all users** including logged-in patients — a patient doesn't need to see "Are you a doctor?" — should be hidden or swapped for a personalised message

### Featured Doctors
- [ ] **Selection is first 6 available** — no curation or rating-based sort
- [ ] **Verified badge not shown** on homepage doctor cards (only on detail page)

### Personalisation
- [ ] **No personalised experience for logged-in users** — homepage is identical whether signed in or not; should show the user's name and shortcuts to recent doctors / profile

### General
- [ ] **No OG tags or meta description** — needed for social sharing and SEO
- [ ] **"See all" link hidden on mobile** in both specialty and featured doctor sections — mobile users rely on the BottomNav to navigate

---

## Task List

### Must Do
- [ ] Fix stats to show real numbers or add "growing" qualifier
- [ ] Hide Doctor CTA banner for authenticated patients

### Should Do
- [ ] Add personalised hero section for logged-in users (name, recent doctors shortcut)
- [ ] Show verified badge on Featured Doctor cards
- [ ] Change featured doctor selection to top-rated

### Nice to Have
- [ ] Search autocomplete / suggestions
- [ ] "Show more symptoms" toggle in Symptom Search (show 12, expand to all 25)
- [ ] OG tags + meta description for SEO
- [ ] Animate specialty chip selection
