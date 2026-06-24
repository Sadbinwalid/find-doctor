# PRD 04 — Specialties (/specialties + /category/[slug])

---

## Features Currently Built

### /specialties (listing page)
| Feature | Status |
|---|---|
| Grid of all specialty cards | ✅ Built |
| Each card shows name, description, doctor count | ✅ Built |
| Colour-coded icons per specialty | ✅ Built |
| Breadcrumb (Home / Specialties) | ✅ Built |
| Links to individual category page | ✅ Built |
| Bilingual | ✅ Built |

### /category/[slug] (individual specialty page)
| Feature | Status |
|---|---|
| Specialty header with colour, name, description | ✅ Built |
| "When to see this doctor" section | ✅ Built |
| Doctor list filtered by that specialty | ✅ Built |
| Link back to all specialties | ✅ Built |
| Bilingual | ✅ Built |

---

## What's Missing / Needs Checking

### /specialties listing
- [ ] **No search on the specialties page** — with 12 categories it's fine, but at 40+ it becomes hard to scan.
- [ ] **Doctor count is live from data** — currently accurate (e.g. "3 doctors") but the count will look low since only 20 demo doctors exist. Consider hiding count or framing as "3 verified doctors" until real data grows.
- [ ] **No sorting** — alphabetical would help users find what they need faster.
- [ ] **Icons are just the first letter of the specialty name** (e.g. "C" for Cardiologist) — not meaningful. Should use actual icons (already have Lucide available).
- [ ] **BottomNav has no direct link to Specialties** on mobile — users on mobile can only reach this page from the homepage "View all" link (which is hidden on mobile) or from category cards.
- [ ] **No empty state** — if a specialty slug doesn't exist, the page crashes or 404s without a friendly message.

### /category/[slug]
- [ ] **Invalid slug shows blank page** — no notFound() call, no fallback UI. Navigating to /category/fake crashes silently.
- [ ] **"When to see" text is a single long sentence** — could be broken into bullet points for scannability.
- [ ] **No safety warning** — missing "go to hospital immediately if…" guidance (per product vision).
- [ ] **No estimated fee range** for the specialty — user has to scroll through doctor cards to guess the cost.
- [ ] **No conditions treated list** — just "when to see" copy. A list of common conditions this doctor treats would help users confirm they're in the right place.
- [ ] **Doctor cards on category page don't show verified badge**.
- [ ] **If no doctors exist for a specialty** (e.g. a future specialty with 0 doctors added), the page shows an empty list with no message.
- [ ] **No link to /doctors with this specialty pre-filtered** — the page only shows doctors from the static dataset. There's no "See all doctors in this specialty" CTA that goes to /doctors?specialty=X.

---

## Task List (Priority Order)

### Must Do
- [ ] Add notFound() for invalid /category/[slug] routes
- [ ] Add empty state on category page when no doctors match that specialty
- [ ] Add real icons to specialty cards (replace first-letter placeholders)
- [ ] Add "See all [specialty] doctors" link on category page that goes to /doctors?specialties=slug

### Should Do
- [ ] Break "When to see" text into bullet points
- [ ] Add estimated fee range to category page (min–max from doctor data)
- [ ] Add conditions treated list per specialty
- [ ] Add safety/emergency note ("Go to hospital immediately if…") on category pages
- [ ] Add Specialties tab to mobile BottomNav or make homepage "View all" visible on mobile
- [ ] Show verified badge on doctor cards within category pages

### Nice to Have
- [ ] Search box on /specialties listing page
- [ ] Alphabetical sort option on /specialties
- [ ] Condition-to-specialty mapping (clicking a condition shows which specialists treat it)
