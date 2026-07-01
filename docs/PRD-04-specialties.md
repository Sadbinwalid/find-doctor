# PRD 04 — Specialties (/specialties + /category/[slug])

> Last updated: July 2026

---

## Features Currently Built

### /specialties (listing page)
| Feature | Status |
|---|---|
| Grid of all 12 specialty cards (1-col mobile, 2-col tablet, 3-col desktop) | ✅ Built |
| Each card shows Lucide icon, name, description, doctor count | ✅ Built |
| Icons match the iconMap used on the home page CategoryCard grid | ✅ Built |
| Colour-coded icon backgrounds per specialty | ✅ Built |
| Breadcrumb (Home / Specialties) | ✅ Built |
| Links to individual `/category/[slug]` page | ✅ Built |
| Bilingual throughout | ✅ Built |

### /category/[slug] (individual specialty page)
| Feature | Status |
|---|---|
| Specialty header with colour, Lucide icon, name, description | ✅ Built |
| "When to see this doctor" info box | ✅ Built |
| Doctor list filtered by specialty | ✅ Built |
| Empty state when no doctors match the specialty | ✅ Built |
| `notFound()` for invalid slug (404 page) | ✅ Built |
| Back link → `/specialties` | ✅ Built |
| Breadcrumb (Home / Specialties / [Specialty]) | ✅ Built |
| Bilingual throughout | ✅ Built |

---

## What's Missing / Still To Do

### /specialties listing
- [ ] **Doctor count looks low** — showing "2 doctors" or "1 doctor" because only 20 demo doctors exist; consider hiding count until real data is in
- [ ] **No search on the page** — fine at 12 specialties, needed if count grows to 40+
- [ ] **No alphabetical sort option**

### /category/[slug]
- [ ] **"When to see" is a single paragraph** — would be more scannable as bullet points
- [ ] **No safety / emergency note** — missing "go to hospital immediately if…" guidance
- [ ] **No estimated fee range** — user has to scroll through all doctor cards to gauge cost
- [ ] **No "See all [specialty] doctors" CTA** linking to `/doctors?specialties=[slug]` for broader search
- [ ] **Verified badge not shown** on doctor cards within category pages (only on detail page)
- [ ] **No conditions-treated list** per specialty — helps users confirm they're in the right place

---

## Task List

### Must Do
- [ ] Add "See all [specialty] doctors →" CTA on category pages → `/doctors?specialties=[slug]`
- [ ] Break "When to see" text into bullet points

### Should Do
- [ ] Add estimated fee range (min–max from doctor data in that specialty)
- [ ] Add conditions-treated list per specialty
- [ ] Add safety/emergency note ("Go to hospital immediately if…")
- [ ] Show verified badge on doctor cards

### Nice to Have
- [ ] Search box on `/specialties` listing
- [ ] Alphabetical sort
- [ ] Condition-to-specialty mapping (click a condition → see specialists)
