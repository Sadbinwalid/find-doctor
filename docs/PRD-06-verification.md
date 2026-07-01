# PRD 06 — Verification (/verify)

> Last updated: July 2026

> **Navigation note**: The Verification page is no longer in the top navbar. It is accessible via the "How it works" button on the Doctor CTA banner on the home page, and via direct link `/verify`. The nav link was removed in the July 2026 UX audit — the page is doctor-facing content and was redundant in the main navigation for general users.

---

## Features Currently Built

| Feature | Status |
|---|---|
| Hero section with shield icon and headline | ✅ Built |
| "What the badge means" info card | ✅ Built |
| 4-step verification process grid (2×2): Submit → Review → Background Check → Badge | ✅ Built |
| Timeline estimate (3–5 business days) | ✅ Built |
| Required documents list (BMDC certificate, degree, hospital letter, NID) | ✅ Built |
| CTA → `/register/doctor` | ✅ Built |
| Bilingual | ✅ Built |

---

## Discovery Path

The page is reachable via:
1. Home page → Doctor CTA banner → "How it works" button
2. Direct URL `/verify`
3. Profile page → verification status card (for doctors who have submitted)

---

## What's Missing / Still To Do

### Content
- [ ] **Patient-facing section missing** — the page is written entirely for doctors. Patients who see a "Verified" badge and click through to learn more have no explanation of what it means for them.
- [ ] **BMDC cross-reference claim should be softened** — the page states "We cross-reference with BMDC's official registry" but this is not yet implemented (admin approves/rejects manually). Should say "We review BMDC registration details" until real cross-referencing is in place.
- [ ] **No FAQ** — common doctor questions like "What if my BMDC is being renewed?", "How do you collect documents?", "What happens if I'm rejected?" are unanswered
- [ ] **No rejection/appeal process explained** — admin panel has a reject button but the doctor has no path described for what to do next
- [ ] **No status check link** — a doctor who has already submitted cannot find their application status from this page; should link to `/profile`

### UX
- [ ] **CTA only targets new applicants** — add "Already applied? Check your status →" link to `/profile` alongside the "Register Now" button
- [ ] **The actual verified badge visual is not shown** — the page describes the badge but doesn't show the blue ShieldCheck icon, so users don't know what to look for in the directory
- [ ] **No anchor links** — long enough page that `#required-documents` anchor would be useful for external linking

---

## Task List

### Must Do
- [ ] Add "Already applied? Check your status →" link to `/profile`
- [ ] Soften BMDC cross-reference claim to "We review BMDC registration details"
- [ ] Show the actual verified badge visual (blue ShieldCheck + "Verified by DoctorBD")
- [ ] Add a 1–2 sentence patient-facing explanation of what the badge means for them

### Should Do
- [ ] Add FAQ section (at least 3 questions for doctors, 1 for patients)
- [ ] Clarify document collection method ("our team will email you within 24 hours")
- [ ] Add rejection / next-steps guidance

### Nice to Have
- [ ] Official BMDC website link for reference
- [ ] `#required-documents` anchor link
- [ ] Expandable accordion for each verification step
