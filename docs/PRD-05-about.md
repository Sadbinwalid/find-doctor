# PRD 05 — About (/about)

---

## Features Currently Built

| Feature | Status |
|---|---|
| Our Mission section | ✅ Built |
| What We Offer section | ✅ Built |
| Emergency Help section (16457 hotline) | ✅ Built |
| Breadcrumb (Home / About) | ✅ Built |
| Bilingual | ✅ Built |

---

## What's Missing / Needs Checking

### Content Gaps
- [ ] **No team / founder section** — who built this? Trust is critical for a health platform. Even a brief "built by [team/org]" line helps.
- [ ] **No contact information** — no email, address, or support channel listed. The privacy page references privacy@doctorbd.com but the About page has nothing.
- [ ] **No "How it works" summary** — About page doesn't link to or explain the verification process. Users who land here don't know how doctor trust is established.
- [ ] **No social proof** — no testimonials, no press mentions, nothing to build credibility.
- [ ] **"1,200+ verified doctors" is repeated** here too — inconsistent with the 20 real doctors in the dataset.
- [ ] **No FAQ section** — common questions like "Is this free?", "How do I book?", "Are doctors verified?" have no home.

### UX
- [ ] **Page is very short** — 3 cards, minimal content. Looks unfinished compared to the rest of the app.
- [ ] **No CTA at the bottom** — user reads the about page and then has nowhere to go. Should link to /doctors or /register/doctor.
- [ ] **Emergency section is buried** at the bottom — emergency info should arguably be at the top or in a sticky component.
- [ ] **Not linked from BottomNav on mobile** — About is only reachable via the desktop Navbar. Mobile users may never find it.

### Trust & Legal
- [ ] **No disclaimer** — health platform needs a clear "We are not a medical provider, we do not offer diagnosis or treatment" legal disclaimer.
- [ ] **No date** — no "last updated" on the about page.

---

## Task List (Priority Order)

### Must Do
- [ ] Add medical disclaimer ("DoctorBD is a directory, not a medical provider. We do not diagnose or prescribe.")
- [ ] Add contact email / support channel
- [ ] Add CTA at bottom of page (links to /doctors and /verify)
- [ ] Fix "1,200+ doctors" claim to match real data or add "growing" qualifier

### Should Do
- [ ] Add team/founder section (even 2–3 lines builds trust)
- [ ] Add FAQ section (5–6 common questions)
- [ ] Add link to /verify page explaining how doctor trust works
- [ ] Make About page accessible from mobile BottomNav or Footer

### Nice to Have
- [ ] Social proof section (even placeholder "Join 500+ users" style)
- [ ] Link to social media accounts
- [ ] Press/media mention section
