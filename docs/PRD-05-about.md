# PRD 05 — About (/about)

> Last updated: July 2026

---

## Features Currently Built

| Feature | Status |
|---|---|
| Blue gradient hero section with headline and subtitle | ✅ Built |
| Stats bar (1,200+ Doctors / 40+ Specialties / 8 Divisions / 64 Districts) | ✅ Built |
| Mission card (ShieldCheck icon) | ✅ Built |
| What We Offer card (MapPin icon) | ✅ Built |
| For Doctors card (Users icon) | ✅ Built |
| Emergency Help card (Phone icon) | ✅ Built |
| Dual CTA buttons — "Find a Doctor" → `/doctors` and "Register as Doctor" → `/register/doctor` | ✅ Built |
| Emergency helpline banner (16457, red) | ✅ Built |
| Breadcrumb inside hero (Home / About) | ✅ Built |
| Bilingual throughout | ✅ Built |

---

## Design Notes

The About page mirrors the visual quality of the rest of the app:
- Hero uses the same `from-[#0066CC] to-[#0052a3]` gradient as the home page hero
- Info cards use coloured icon backgrounds (blue, green, purple, red) matching the app's icon system
- Emergency banner reuses the same red-600 component from the home page

---

## What's Missing / Still To Do

### Content
- [ ] **No team / founder section** — health platforms need a human face for trust; even a 2-line "built by" attribution helps
- [ ] **No FAQ section** — common questions ("Is this free?", "How do doctors get verified?", "Can I book appointments?") need a home
- [ ] **"1,200+ verified doctors" is a demo number** — inconsistent with 20 real doctors; update when real data is present
- [ ] **No contact email on the page itself** — privacy@doctorbd.com and legal@doctorbd.com exist on Terms/Privacy pages but are not shown here

### Trust / Legal
- [ ] **No medical disclaimer** — health platforms should clearly state "DoctorBD is a directory, not a medical provider. We do not diagnose or prescribe."
- [ ] **No "last updated" date**

### UX
- [ ] **Not linked from mobile BottomNav** — About is only reachable via the desktop Navbar; mobile users may not find it

---

## Task List

### Must Do
- [ ] Add medical disclaimer ("We are not a medical provider, we do not diagnose or prescribe")
- [ ] Add contact email / support channel
- [ ] Update "1,200+" stat once real doctor data is in

### Should Do
- [ ] Add team/founder section (even 2–3 lines)
- [ ] Add FAQ section (5–6 common questions)
- [ ] Link to `/verify` explaining how the trust badge works

### Nice to Have
- [ ] Social proof section ("Join [N]+ patients already using DoctorBD")
- [ ] Press/media mention area
- [ ] Link to social accounts
