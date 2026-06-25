# PRD 06 — Verification (/verify)

> Note: This page explains the doctor verification process to visitors (both doctors and patients). It is NOT the doctor registration form (/register/doctor) — that's a separate flow.

---

## Features Currently Built

| Feature | Status |
|---|---|
| Hero section with verification badge explanation | ✅ Built |
| "What the badge means" info card | ✅ Built |
| 4-step verification process (Submit → Review → Background Check → Badge) | ✅ Built |
| Timeline estimate (3–5 business days) | ✅ Built |
| Required documents list (4 documents, numbered) | ✅ Built |
| CTA at bottom → links to /register/doctor | ✅ Built |
| Bilingual | ✅ Built |

---

## What's Missing / Needs Checking

### Content
- [ ] **Patient-facing explanation is missing** — the page is entirely written for doctors ("submit your registration", "get your verified badge"). Patients landing here have no context on what verification means for them as a patient (i.e. why they should trust verified doctors).
- [ ] **No FAQs** — common doctor questions like "What if my BMDC is being renewed?", "Can I submit documents digitally?" are unanswered.
- [ ] **Document collection is vague** — "Our team contacts you after registration to collect documents" but no detail on how (email? phone call? upload portal?). This creates confusion and drop-off.
- [ ] **No appeal process** — what happens if a doctor is rejected? The admin panel has a reject button but the verify page doesn't explain what the doctor should do.
- [ ] **No status check** — a doctor who has submitted cannot check their application status from this page. They'd have to log in to their profile. This page should acknowledge that and link to the profile.
- [ ] **"BMDC cross-reference" claim** — the page says "We cross-reference with BMDC's official registry" but this is not actually implemented (it's a mock admin approve/reject). This is a misleading claim that should be softened or removed until real verification exists.

### UX
- [ ] **CTA only targets new applicants** — "Register as a Doctor" CTA at the bottom has no alternative for doctors who have already submitted ("Check your application status instead").
- [ ] **2×2 step grid looks good on desktop** but on very small phones (320px) the grid may be too tight — test at minimum viewport.
- [ ] **No anchor links** — the page is long enough that linking directly to "Required Documents" section from external pages would be useful.
- [ ] **Page not linked from doctor profile page** — when a doctor sees the "Verified" badge on a profile, there's no link explaining what that means.
- [ ] **Verified badge shown as text description only** — the actual badge visual (blue ShieldCheck) is not shown on this page so patients/doctors don't know what to look for.

### Trust
- [ ] **No real legal / compliance references** — for a health platform in Bangladesh, referencing BMDC (Bangladesh Medical & Dental Council) officially and linking to it would strongly increase trust.
- [ ] **No timeline for renewal** — are verifications permanent? Do they expire? Not addressed.

---

## Task List (Priority Order)

### Must Do
- [ ] Add patient-facing section: "What this means for you as a patient" (1–2 sentences explaining why verified badge = trustworthy)
- [ ] Soften or remove "We cross-reference with BMDC registry" claim until it's actually implemented
- [ ] Add "Already applied? Check your status →" link that points to /profile
- [ ] Show the actual verified badge visual on the page so users know what to look for

### Should Do
- [ ] Add FAQ section (5 questions minimum — one for doctors, one for patients)
- [ ] Clarify document submission method ("our team will email you within 24 hours of registration")
- [ ] Add rejection/appeal guidance
- [ ] Link verified badge on /doctors/[id] page back to this /verify page

### Nice to Have
- [ ] Add BMDC official link for reference/trust
- [ ] Add anchor link to #required-documents for external linking
- [ ] Add renewal/expiry information
- [ ] Add a "What happens at each step" expandable accordion
