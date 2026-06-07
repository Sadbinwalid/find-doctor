# Definition of Done — DoctorBD

> **The project is done when a person in Bangladesh — on a cheap Android phone, on mobile data, in Bengali — can go from "I feel unwell" to calling the right doctor in under 60 seconds.**

That is the north star. Everything else supports that moment.

---

## Level 1 — Feature Done

A feature is complete when **all 5** of these are true:

| # | Criterion |
|---|---|
| 1 | Works in both **English and Bengali** — no missing translation strings |
| 2 | Works on **mobile (375px)** without horizontal scroll or broken layout |
| 3 | Works on **Chrome Android 80+** — Bangladesh's primary browser |
| 4 | All internal links go to the correct pages — no dead links |
| 5 | No TypeScript errors, no console errors on page load |

A feature that passes 4 out of 5 is **not done**.

---

## Level 2 — Project Done (Launch Ready)

The full project is ready to ship when **all 12** of these pass:

| # | Criterion | How to Verify |
|---|---|---|
| 1 | **60-second doctor discovery** | Real user on Android + mobile data: search → disease or specialty → doctor profile → tap-to-call in ≤ 60 seconds |
| 2 | **Disease → Doctor flow works end-to-end** | Start on `/diseases` → pick a disease → reach correct specialist category → open a doctor profile — zero broken steps |
| 3 | **AI chat triages correctly** | 10 English + 10 Bengali test queries all return the correct specialty or disease link — no hallucinated doctor names |
| 4 | **Fee & cost guide visible** | City-wise doctor fee table and diagnostic test cost ranges are visible on the site |
| 5 | **User profile persists** | User edits their profile, closes browser, reopens — all data is still there via localStorage |
| 6 | **100% bilingual** | Switch to Bengali — zero English strings remain visible anywhere on the site |
| 7 | **No fee data on doctor profiles** | No ৳ symbol on any doctor card or profile page (`grep` confirms) |
| 8 | **Emergency number above fold** | 16457 tap-to-call is visible without scrolling on mobile homepage and `/diseases` |
| 9 | **All pages load** | Every route in the page map returns HTTP 200 — nothing is broken |
| 10 | **Performance** | Lighthouse mobile score ≥ 80; homepage transfer size < 200 KB |
| 11 | **Code is clean** | `npx tsc --noEmit` and `npm run lint` both pass with zero errors |
| 12 | **Live on Vercel** | Production URL is accessible, `ANTHROPIC_API_KEY` is set, custom domain resolves |

---

## Who Signs Off

| Role | Signs off on |
|---|---|
| **Developer** | Level 1 (feature done) for every feature they build |
| **@rajibraju02** | Profile page, mobile bottom nav, appointment history |
| **@shojolislam** | Disease Explorer, Diagnostic Tests, AI Chat |
| **@Sadbinwalid** | Level 2 — final launch sign-off (all 12 criteria) |

---

## What "Done" Is NOT

- ❌ "It works on my machine" — must work on Chrome Android 80+
- ❌ "The English version works" — both languages must pass
- ❌ "It builds without errors" — it must also pass QA on real device
- ❌ "Most of the features work" — all 12 Level 2 criteria must pass, not most
- ❌ "We can fix it after launch" — P0 bugs block launch; no exceptions

---

## Reference

Full details in [PRD.md §15](./PRD.md#15-definition-of-done) and the 10-day sprint plan in [PRD.md §16](./PRD.md#16-2-week-sprint-plan).
