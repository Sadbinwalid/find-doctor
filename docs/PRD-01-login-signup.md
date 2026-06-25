# PRD 01 — Login & Sign Up (User Side)

## Scope
User-facing auth only. Doctor registration is out of scope here.

---

## What's Currently Built

| Feature | Status |
|---|---|
| Sign up via Phone + OTP (6-digit, any digits accepted for demo) | ✅ Built |
| Sign up via Email + Password (any email + 4+ char password) | ✅ Built |
| Sign up via Google (mock — skips to profile setup after 1.2s) | ✅ Built |
| Multi-step onboarding: Name → Blood Group → Age → Division → District | ✅ Built |
| Skip location option | ✅ Built |
| Success screen with user's first name ("Welcome, Rajib!") | ✅ Built |
| Auto-redirect to /profile after sign up | ✅ Built |
| Already-authenticated redirect away from /auth | ✅ Built |
| Sign In toggle (same page, flips copy) | ✅ Built |
| Progress bar across onboarding steps | ✅ Built |
| Bilingual (EN/BN) throughout | ✅ Built |

---

## What's Missing

### Auth Logic
- [ ] **Sign In flow has no actual logic** — tapping "Sign in" toggle changes the label but clicking Phone/Google/Email does the same signup flow. There's no separate sign-in path that recognises an existing user.
- [ ] **No "wrong password" or "user not found" error states** — email/password sign-in always proceeds regardless.
- [ ] **No OTP resend** — if the user waits too long or didn't receive it, there's no "Resend OTP" button or countdown timer.
- [ ] **No OTP expiry** — any 6 digits accepted at any time, no timeout.
- [ ] **Google auth is a mock** — no real OAuth. Needs real implementation or clearly labelled as "coming soon".

### Validation & Edge Cases
- [ ] **Phone field accepts any 10+ digit number** — no Bangladesh format validation (+880, starts with 01X).
- [ ] **Email field only checks for "@"** — no proper format check (e.g. "a@b" passes).
- [ ] **Name field accepts single characters** — no minimum length check.
- [ ] **Age field accepts 0 and 120** — no reasonable bounds enforcement (e.g. 1–110).
- [ ] **No duplicate account handling** — signing up twice with the same phone/email creates no conflict since it's localStorage.
- [ ] **Back button from OTP step loses phone number state** — going back and forward resets nothing but could confuse users.

### UX / Flow
- [ ] **No "Forgot Password" link** on email step.
- [ ] **No account deletion option** in auth flow (exists in profile but not surfaced during auth).
- [ ] **Terms & Privacy Policy links are plain text** — not actual clickable links to /terms and /privacy.
- [ ] **Sign In toggle doesn't change the onboarding steps** — a returning user shouldn't need to re-enter name/blood group/age.
- [ ] **Done screen spins forever if redirect fails** — no timeout fallback or manual "Go to Profile" button.
- [ ] **No loading state on the "Verify" OTP button** — user can tap multiple times.

### Accessibility
- [ ] **No keyboard trap in modal-style steps** — pressing Escape doesn't go back.
- [ ] **OTP input doesn't auto-focus** when step changes.
- [ ] **No autofill support** on OTP field for SMS autofill (missing `autocomplete="one-time-code"`).

---

## Task List (Priority Order)

### Must Do
- [ ] Build separate Sign In flow that bypasses the onboarding steps for returning users
- [ ] Add "Resend OTP" button with 60-second countdown
- [ ] Make Terms & Privacy Policy text into actual links (/terms, /privacy)
- [ ] Add `autocomplete="one-time-code"` to OTP input for SMS autofill
- [ ] Add loading/disabled state on Verify and Continue buttons to prevent double-tap
- [ ] Add "Go to Profile" fallback button on the done screen

### Should Do
- [ ] Validate phone: must start with 01, be 11 digits total
- [ ] Validate email: proper format (regex or browser validation)
- [ ] Add "Forgot Password" link on email step
- [ ] Enforce name minimum 2 characters
- [ ] Enforce age range 1–110
- [ ] Auto-focus OTP input when step = "otp"

### Nice to Have
- [ ] Real Google OAuth integration or "Coming Soon" label
- [ ] OTP expiry timer (e.g. 5 minutes)
- [ ] Animate step transitions (slide left/right)
- [ ] Show password toggle (eye icon) on password field
