# PRD 03 — Find Doctors (/doctors)

---

## Features Currently Built

| Feature | Status |
|---|---|
| Text search (name, specialty, hospital, district) | ✅ Built |
| Filter by specialty (checkboxes, all categories) | ✅ Built |
| Filter by division | ✅ Built |
| Filter by district (dependent on division) | ✅ Built |
| Max fee slider (৳200 – ৳2000) | ✅ Built |
| Sort by: Rating / Fee Low–High / Fee High–Low / Experience | ✅ Built |
| Active filter count badge on filter button | ✅ Built |
| Clear all filters button | ✅ Built |
| Mobile filter panel (collapsible) | ✅ Built |
| Symptom banner when arriving from homepage symptom search | ✅ Built |
| Doctor count ("X doctors found") | ✅ Built |
| Doctor cards grid | ✅ Built |
| Breadcrumb (Home / Find Doctors) | ✅ Built |
| Bilingual throughout | ✅ Built |

---

## What's Missing / Needs Checking

### Search
- [ ] **Search is client-side only** — searches across 20 static doctors. When real data is added, this needs server-side search.
- [ ] **No "no results" state** — if all filters together return 0 doctors, the page shows an empty grid with no message or suggestion.
- [ ] **Search doesn't include doctor conditions treated** — user searching "diabetes" gets no results even though General Physicians treat it.
- [ ] **Specialty filter and text search can conflict** — if user types "cardiologist" AND selects Dermatologist checkbox, results are unexpectedly empty.

### Filters
- [ ] **Max fee slider minimum is ৳200** — any doctor under ৳200 would be excluded. Should start at ৳0.
- [ ] **Fee slider max is hardcoded at ৳2000** — some doctors may charge more. Should dynamically set to the highest fee in the dataset.
- [ ] **Division filter on desktop sidebar doesn't reset district** — already fixed in mobile panel but check desktop sidebar too.
- [ ] **Filters are not reflected in the URL** — if user shares the URL after applying filters, the filters are lost. Specialty from symptom flow works (via URL params) but manual filters don't persist in URL.
- [ ] **No "Available only" toggle** — users can't filter to only doctors who are currently available.
- [ ] **Desktop sidebar filter panel has no scroll** — if there are many specialties, the sidebar could overflow.

### Doctor Cards
- [ ] **Verified badge not shown on cards** — only visible on the detail page. Should show on listing cards too.
- [ ] **Availability shown as "Available / Unavailable"** — no indication of next available slot or schedule.
- [ ] **No "Save doctor" button on listing** — user has to go to detail page to save.

### Sort
- [ ] **Default sort is by rating** — all 20 demo doctors have ratings between 4.6–4.9 so sort order appears random to users.
- [ ] **No "Relevance" sort** — when user has typed a search query, results should default to relevance not rating.

### Symptom Banner
- [ ] **Banner dismissal clears specialties** — correct, but there's no way to re-apply the symptom filter after clearing without going back to homepage.
- [ ] **Banner says "matching your symptoms"** but doesn't list which symptoms were selected.

### General
- [ ] **No pagination or infinite scroll** — fine for 20 doctors but needed before scaling.
- [ ] **No loading state** — page renders instantly since data is static, but needs skeleton loaders for when real API is added.
- [ ] **Back button from doctor detail page** doesn't restore scroll position or filter state.

---

## Task List (Priority Order)

### Must Do
- [ ] Add empty/no-results state with a helpful message and "Clear filters" CTA
- [ ] Show verified badge on doctor cards in the listing
- [ ] Fix max fee slider to start at ৳0 and cap dynamically at dataset max
- [ ] Check and fix district reset on desktop sidebar division change

### Should Do
- [ ] Persist active filters in URL params so links are shareable
- [ ] Add "Available only" toggle filter
- [ ] Add relevance sort when search query is active
- [ ] Expand search to include conditions treated by each specialty
- [ ] Show which symptoms triggered the banner in the symptom flow

### Nice to Have
- [ ] Add "Save doctor" button directly on listing cards
- [ ] Skeleton loading states for when real API is connected
- [ ] Pagination or infinite scroll
- [ ] Restore scroll position on back navigation
