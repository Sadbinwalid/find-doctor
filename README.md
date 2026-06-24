# DoctorBD — Find the Right Doctor in Bangladesh

A bilingual (English / Bengali) web app for finding qualified doctors across all divisions and districts of Bangladesh.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx               # Home / landing page
│   ├── doctors/
│   │   ├── page.tsx           # Doctor listing with filters
│   │   └── [id]/page.tsx      # Doctor detail / profile page
│   ├── specialties/page.tsx   # Browse specialties
│   ├── category/[slug]/page.tsx
│   ├── about/page.tsx
│   └── profile/page.tsx       # User profile page (new)
├── components/
│   ├── Navbar.tsx             # Top navigation bar
│   ├── BottomNav.tsx          # Mobile bottom app bar (new)
│   ├── DoctorCard.tsx
│   ├── CategoryCard.tsx
│   └── Footer.tsx
├── context/
│   └── LanguageContext.tsx    # EN / BN language toggle
└── data/
    ├── doctors.ts             # 20 doctors with full bilingual data
    ├── categories.ts          # Medical specialties
    └── locations.ts           # Divisions, districts, upazilas
```

---

## Features

### Existing
- Browse and filter doctors by specialty, division, district, fee range, and availability
- Doctor detail page with qualifications, ratings, about, when-to-see, contact & fee
- 12 medical specialties with category pages
- Full English / Bengali toggle across all content

### Added in `rajibraju/profile`

#### Mobile Bottom Navigation
- Replaced the hamburger menu with a fixed bottom app bar (Home, Doctors, Specialties, Profile)
- Active tab highlighted with bold icon and blue color
- Footer hidden on mobile — bottom nav handles all navigation
- Desktop navbar unchanged

#### User Profile Page (`/profile`)
- **Profile card** — avatar with initials, name, location, basic info tags (blood group, age, phone), conditions row with a `Conditions:` label to separate them visually, appointment stats (total, saved doctors, cancelled), member since + Edit Profile button at the bottom
- **Edit Profile modal** — editable fields: name, age, blood group, division, district, phone, conditions (add with Enter / remove with ×). Changes saved to `localStorage` and reflected immediately
- **Appointment History** — compact card list (same style as Saved Doctors / Recently Visited), shows 3 entries by default with a "View more / Show less" toggle. Each row links to the doctor profile
- **Recently Visited** — tracks which doctor detail pages the user visits (stored in `localStorage`, up to 6). Section only appears after the first visit
- **Saved Doctors** — static list of bookmarked doctors with specialty, availability, and rating
- **Preferred Specialties** — pill tags linking to category pages
- **Spend Summary** (sidebar) — total spend across completed appointments, visit count, average per visit

#### Doctor Detail Page
- Automatically saves each visited doctor to `localStorage` (`recently_visited`) on page load, which feeds the Recently Visited section in the profile

---

## Data & Persistence

All user data (profile edits, recently visited doctors) is stored in `localStorage` under these keys:

| Key | Contents |
|---|---|
| `profile_data` | Serialised profile object (name, age, blood group, location, phone, conditions) |
| `recently_visited` | Array of doctor IDs in visit order, max 6 |

No backend or auth — this is a client-side only app.

---

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Lucide React** icons
- **Hind Siliguri** font (Bengali + Latin)
