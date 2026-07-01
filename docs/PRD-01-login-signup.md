# PRD 01 — Login & Sign Up

> Last updated: July 2026

## Scope
Full auth flow for both patients and doctors. Includes role selection, onboarding, and sign-in.

---

## What's Currently Built

### Role Selection
| Feature | Status |
|---|---|
| Role selection screen (Patient / Doctor) on first step | ✅ Built |
| `?role=patient` / `?role=doctor` URL param skips to method step | ✅ Built |
| Role badge displayed on method selection step | ✅ Built |
| Sign In toggle flips copy between "Sign Up" and "Sign In" | ✅ Built |
| Sign In bypasses all onboarding steps (goes straight to done) | ✅ Built |

### Auth Methods (all three available to both roles)
| Feature | Status |
|---|---|
| Google (mock — 1.2s delay, then proceeds) | ✅ Built |
| Phone + OTP (6-digit, any digits accepted for demo) | ✅ Built |
| Email + Password (any email + 4+ char password) | ✅ Built |
| `autocomplete="one-time-code"` on OTP field | ✅ Built |
| Terms & Privacy shown as clickable links (`/terms`, `/privacy`) | ✅ Built |
| Progress bar across all steps | ✅ Built |

### Patient Onboarding (after auth, patient role)
| Feature | Status |
|---|---|
| Name (required), Date of Birth, Blood Group (grid), Phone (optional) | ✅ Built |
| Division + District (dependent selects) | ✅ Built |
| Skip location ("Skip for now") | ✅ Built |
| Saves to `localStorage` key `profile_data` with `role: "patient"` | ✅ Built |

### Doctor Onboarding (after auth, doctor role)
| Feature | Status |
|---|---|
| Step 1 — Personal: Name, Phone, Gender | ✅ Built |
| Step 2 — Professional: Specialty (dropdown), BMDC No., Qualifications (add tags), Years of experience | ✅ Built |
| Step 3 — Hospital: Hospital name, Division, District, Fee | ✅ Built |
| Application saved to `localStorage` key `pending_doctor_registrations` | ✅ Built |
| Profile data saved with `role: "doctor"`, `verificationStatus: "pending"`, `doctorAppId` | ✅ Built |
| Review notice shown before submit ("3–5 business days") | ✅ Built |

### Done Screen
| Feature | Status |
|---|---|
| Personalised welcome ("Welcome, [Name]!" / "Application submitted!") | ✅ Built |
| Auto-redirects to `/profile` after 2 seconds | ✅ Built |
| Spinning loader during redirect | ✅ Built |

### Guards
| Feature | Status |
|---|---|
| Already-authenticated users redirected away from `/auth` to `/profile` | ✅ Built |
| Waits for `isLoading` to resolve before redirecting (prevents flash) | ✅ Built |

---

## What's Still Missing

### Auth Logic
- [ ] **OTP resend** — no "Resend OTP" button or 60-second countdown timer
- [ ] **OTP expiry** — any 6 digits accepted at any time, no timeout
- [ ] **Google auth is mock** — no real OAuth; currently skips to onboarding after delay
- [ ] **Forgot Password** — no recovery flow on email step
- [ ] **No loading state on Verify/Continue buttons** — user can tap multiple times (double-submit risk)
- [ ] **Done screen has no "Go to Profile" manual fallback** — if redirect fails, user is stuck on the spinner

### Validation
- [ ] Phone: no Bangladesh-format check (should start with `01`, be 11 digits total)
- [ ] Email: only checks for `@` — `a@b` passes; needs proper regex
- [ ] Name: accepts single characters — needs minimum 2 chars
- [ ] Age/DOB: no bounds enforcement (unrealistic dates accepted)

### Sign In UX
- [ ] Sign In toggle changes labels but submitting takes user through the same role-selection flow — a returning user should ideally skip straight to the auth method without choosing a role again

### Accessibility
- [ ] OTP input does not auto-focus when step changes to "otp"
- [ ] No keyboard trap on steps — pressing Escape does nothing

---

## Task List

### Must Do (before real users)
- [ ] Add OTP resend with 60-second countdown
- [ ] Add loading/disabled state on all CTA buttons
- [ ] Add "Go to Profile" manual button on done screen
- [ ] Validate Bangladesh phone format (01X + 8 digits)

### Should Do
- [ ] Proper email regex validation
- [ ] Name minimum 2 characters
- [ ] Forgot Password step on email flow
- [ ] Auto-focus OTP input on step entry

### Nice to Have
- [ ] Real Google OAuth (or label "Coming soon")
- [ ] OTP 5-minute expiry with visible countdown
- [ ] Animate step transitions (slide)
- [ ] Show/hide password toggle on password field
