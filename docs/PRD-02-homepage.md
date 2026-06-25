# PRD 02 — Homepage

---

## Sections Currently Built

| Section | What it does |
|---|---|
| **Hero** | Headline + search box (name/specialty/condition text + division + district selects) + quick-tag pills | 
| **Stats Bar** | 1,200+ Doctors / 40+ Specialties / 8 Divisions / 64 Districts |
| **Doctor CTA Banner** | Blue banner for doctors to register / see how it works |
| **Symptom Search** | Multi-select symptom chips → navigates to /doctors?specialties=X,Y |
| **Browse by Specialty** | Grid of all specialty category cards |
| **Featured Doctors** | 6 available doctors shown as cards |
| **How It Works** | 3-step guide (Choose specialty → Filter location → View & contact) |
| **Emergency Banner** | Red banner with 16457 hotline |

---

## What's Missing / Needs Checking

### Hero Search
- [ ] **Search submits with empty query** — clicking Search with no input navigates to /doctors with no params (shows all doctors, which is fine but could be confusing).
- [ ] **No search suggestions / autocomplete** — user has no hints while typing.
- [ ] **District dropdown only shows after division is selected** — if user clears division, district stays selected in state (visual mismatch, already partially fixed in auth but not hero).
- [ ] **Enter key works on text input but not on selects** — inconsistent keyboard behaviour.
- [ ] **Quick-tag pills only cover 5 specialties** — no "View more" for the rest.
- [ ] **Mobile: search box stacks vertically** — division/district selects take full width, which is fine but test that layout doesn't break at 320px width.

### Stats Bar
- [ ] **Numbers are hardcoded (1,200+, 40+)** — not pulled from actual data. Real doctor count is 20, real specialty count is 12. Either update to real numbers or add a disclaimer like "Growing network".
- [ ] **No link on stats** — "8 Divisions" could link to /doctors filtered by each.

### Doctor CTA Banner
- [ ] **Shown to all users including logged-in patients** — a patient who is logged in doesn't need to see "Are you a doctor? Register now." Should be hidden or replaced with a personalised message for authenticated users.
- [ ] **"1,200+ verified doctors" claim** is inconsistent with the 20 doctors in the actual data.

### Symptom Search
- [ ] **No empty state** — if user selects symptoms that map to no specialty (shouldn't happen but edge case), the "Find Doctors" button stays disabled with no explanation.
- [ ] **"Find Doctors" button is disabled when nothing selected** but there's no tooltip or message explaining why.
- [ ] **Symptom labels are medical-ish** (e.g. "Nausea / Vomiting") — should be plainer language per product vision.
- [ ] **Query input in symptom search doesn't clear selected chips**.
- [ ] **Mobile: chip grid wraps well but gets very long** — consider showing top 12 and a "Show more" toggle.

### Browse by Specialty
- [ ] **"View all" link is hidden on mobile** — users on mobile can't navigate to /specialties easily from this section (BottomNav has no Specialties tab either).
- [ ] **All 12 categories shown** — no limit/pagination. Fine now but will need limiting as categories grow.

### Featured Doctors
- [ ] **Selection logic is "first 6 available"** — no curation, rating, or recency. Should be top-rated or manually curated.
- [ ] **"View all" link hidden on mobile** — same issue as above, handled by an inline button instead.
- [ ] **Doctor cards don't show verified badge** on homepage — only on detail page.

### How It Works
- [ ] **Step 3 says "contact the doctor directly"** — there's no contact/booking button anywhere. This copy sets a wrong expectation.
- [ ] **No visual icons** on the 3 steps — just numbered circles. Could be more scannable.

### Emergency Banner
- [ ] **Phone link (`tel:16457`) works on mobile** but on desktop it may open a dialler app or do nothing — acceptable but worth noting.
- [ ] **No second action** (e.g. link to about page or emergency info page).

### General
- [ ] **No personalisation for logged-in users** — homepage is identical whether you're signed in or not. Logged-in users should see their name, recent doctors, or a shortcut to their profile.
- [ ] **Footer hidden on mobile** (moved to BottomNav) — make sure no important links (Terms, Privacy) are inaccessible on mobile.
- [ ] **Page has no meta description or OG tags** — important for SEO and sharing.

---

## Task List (Priority Order)

### Must Do
- [ ] Fix stats to show real numbers or add "growing network" label
- [ ] Hide Doctor CTA Banner for logged-in patients
- [ ] Fix Step 3 copy in "How It Works" — remove "contact directly" since no booking exists
- [ ] Ensure Terms & Privacy are accessible on mobile (not buried in footer that's hidden)

### Should Do
- [ ] Add personalised hero section for logged-in users (show name + shortcut to profile)
- [ ] Show verified badge on doctor cards in Featured Doctors section
- [ ] Add "Show more symptoms" toggle in Symptom Search (show 12, expand to all)
- [ ] Change featured doctor selection to top-rated instead of first 6 available
- [ ] Add disability/empty state message on Symptom Search "Find Doctors" button

### Nice to Have
- [ ] Search autocomplete / suggestions while typing
- [ ] Add icons to "How It Works" steps
- [ ] Add OG tags and meta description for SEO
- [ ] Animate symptom chip selection
