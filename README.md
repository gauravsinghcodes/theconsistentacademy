# The Consistent Academy — Website Prototype & Restructuring

> **ThinkBuild Intern Website Development Assignment**  
> **Client Source of Truth:** `https://www.theconsistentacademy.in/`  
> **Framework & Tech Stack:** React.js (v18) + Tailwind CSS + Vite + React Router DOM + React Icons  
> **Branding & Development Credit:** Preserves The Consistent Academy's authentic brand identity with ThinkBuild developer attribution.

---

## 1. Executive Summary & Objectives
This project is an authentic, professional restructuring of **The Consistent Academy** website. Built as a high-performance prototype adhering to strict senior engineering standards:
- **Zero AI Hallucinations:** Contains 100% authentic, audited client information—no fabricated courses, inflated testimonials, fake accreditations, or stock fluff.
- **Editorial, Minimalist Aesthetics:** Designed to feel grounded, credible, and education-focused rather than like a generic AI template. Uses generous whitespace, clean typography (Inter & Plus Jakarta Sans), and restrained micro-transitions (150–250ms).
- **Logo Color Harmony:** Palette built from the official logo's deep royal violet (`#7E22CE` / `#6B21A8` / `#581C87`), neutral slate tones (`#0F172A` / `#475569`), and clean backgrounds (`#F8FAFC` / `#FFFFFF`).
- **Complete Iconography:** Clean, accessible icons powered by `react-icons`.
- **Integrated Contact & Google Maps:** Verified Pune, Maharashtra location embedded with an interactive Google Map and a direct **"Get Directions"** link.

---

## 2. Technical Stack & Architecture

| Component | Technology | Rationale |
|---|---|---|
| **Framework** | React 18.3 | Component-driven, declarative UI |
| **Bundler & Tooling** | Vite 5.4 | Ultra-fast HMR and optimized production bundling |
| **Styling** | Tailwind CSS 3.4 | Reusable design tokens, mobile-first breakpoints |
| **Routing** | React Router DOM 6.26 | Clean multi-page client-side navigation (`/`, `/about`, `/courses`, `/contact`, `404`) |
| **Icon Library** | React Icons (`react-icons/fi`, `react-icons/fa6`) | Accessible, scalable SVG iconography |
| **Map Integration** | Google Maps Iframe + Deep Link | Native responsive embed with directions CTA |
| **SEO & Head Management**| Document Title & OpenGraph Meta | Accurate metadata on all routes, `robots.txt`, and `sitemap.xml` |

---

## 3. Project Structure

```text
theconsistentacademy/
├── public/
│   ├── assets/
│   │   ├── books/
│   │   │   ├── cakewalk-ielts.jpg
│   │   │   ├── the-reading-detective.jpg
│   │   │   └── 101-management.jpg
│   │   ├── courses/
│   │   │   ├── img1.png through img12.png
│   │   │   └── img14.png
│   │   ├── gallery/
│   │   │   └── vidya.png
│   │   ├── logo.png
│   │   └── logo2.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Button.jsx           # Reusable accessible button with link & action variants
│   │   ├── ContactForm.jsx      # Validated form with inline errors & demo-mode badge
│   │   ├── CourseCard.jsx       # Course card with curriculum toggles & direct CTAs
│   │   ├── Footer.jsx           # Verified contact, social links & ThinkBuild credit
│   │   ├── MapEmbed.jsx         # Google Maps embed with directions link
│   │   ├── Navbar.jsx           # Sticky responsive navigation with mobile drawer
│   │   ├── SectionHeading.jsx   # Consistent editorial typography headers
│   │   └── SEO.jsx              # Dynamic page title & description updater
│   ├── data/
│   │   └── academyData.js       # Complete audited data layer (single source of truth)
│   ├── pages/
│   │   ├── About.jsx            # 19-year pedagogy timeline, credentials, books
│   │   ├── Contact.jsx          # Form prototype, verified phone/email, map
│   │   ├── Courses.jsx          # Filterable & searchable curriculum catalog
│   │   ├── Home.jsx             # Sequence: Hero, courses, why us, author, proof, FAQ, CTA
│   │   └── NotFound.jsx         # 404 recovery page
│   ├── App.jsx                  # Main routed application wrapper
│   ├── index.css                # Tailwind imports & base design tokens
│   └── main.jsx                 # Vite React DOM entry
├── index.html                   # HTML5 root with Google Fonts & OpenGraph tags
├── package.json                 # Project dependencies & scripts
├── tailwind.config.js           # Extended brand colors & typography tokens
└── vite.config.js               # Vite bundler configuration
```

---

## 4. Installation & Local Run Procedure

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v22.18.0)
- npm (v9.0.0 or higher)

### Run Locally
```bash
# 1. Clone repository & navigate into workspace
cd theconsistentacademy

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### Production Build & Test
```bash
# Run production bundle compilation
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Content & Asset Migration Inventory

All content was audited from the live bundle (`https://www.theconsistentacademy.in/assets/index-7MsN_9H0.js`) and migrated without modifications to factual accuracy:

### A. Courses & Offerings Migrated
1. **Adults & Professionals:**
   - *IELTS | TOEFL | PTE | CELPIP Preparation Course* (20 Hours; ₹12,000 Full / ₹4,000 Single Skill; 4 Modules: Listening, Reading, Writing, Speaking)
   - *Corporate Survival & Success Program* (12 Hours; ₹6,000; 6 Modules for Freshers 0–2 yrs)
   - *Crack Your Interview* (6 Modules: Mindset, Pitch, STAR method, Body Language, Mock Interviews)
   - *Corporate Dining & Social Etiquette Masterclass* (6 Modules: Dining protocols, Toasting, Grooming, EQ)
   - *Advanced English & Leadership Presence for Managers* (Executive communication, Memos, Crisis comms)
   - *Communication Skill Training* (8 Modules: Articulation, Fluency, Vocabulary, Eliminating Fillers)
   - *Personality Development Training* (8 Modules: Non-verbal, Grooming, Negotiation, Etiquette)
   - *EELTA - Experiential English Language Teaching Approach* (5 Modules for Educators)
2. **Kids & Young Learners:**
   - *Elocution Course* (4 Weeks; ₹3,000; Speech & Pronunciation)
   - *TedX & Toastmaster Training* (4 Weeks; ₹3,000; Stage Confidence & Oratory)
   - *Grammar Foundations* (4 Weeks; ₹3,000; Core Grammar Basics)
   - *Creative Writing* (4 Weeks; ₹3,000; Storytelling & Imagination)
   - *Reading Club* (Online; ₹500/month; Vocabulary & Empathy)

### B. Founder Credentials & Literature
- **Vidya Wankhade:** B.Sc, B.Ed, MPM, UGC NET qualified, British Council Certified IELTS Master Trainer, TOEFL & PET Trainer, TESOL/TEFL certified. 19+ years experience.
- **Published Books:**
  1. *Cakewalk IELTS* (2022, Evincepub / Amazon / Flipkart / Bspkart)
  2. *The Reading Detective* (2024, Evincepub / Amazon / Flipkart / Instamojo)
  3. *101 Management Books You'll Never Read But Should* (2025, Evincepub / Amazon / Flipkart)

### C. Image Asset Organization
All images downloaded to `public/assets/` to eliminate hotlinking to the old server:
- `public/assets/logo2.png` & `public/assets/logo.png`
- `public/assets/gallery/vidya.png`
- `public/assets/books/cakewalk-ielts.jpg`, `the-reading-detective.jpg`, `101-management.jpg`
- `public/assets/courses/img1.png` through `img12.png`, `img14.png`

---

## 6. Contact Us & Google Maps Implementation

- **Academy Location:** Pune, Maharashtra, India.
- **Embedded Map:** Standard responsive Google Maps iframe targeting Pune with sandboxed referrer policy.
- **Directions Link:** Direct external link to `https://maps.google.com/?q=The+Consistent+Academy+Pune+Maharashtra`.
- **Verified Contacts:**
  - Phone: `+91 77091 09830` (`tel:+917709109830`)
  - Email: `theconsistentacademy@gmail.com` (`mailto:theconsistentacademy@gmail.com`)
  - WhatsApp: `https://chat.whatsapp.com/Kw2YbntkWMqG66MVI9xSJq?mode=ac_t`
  - Instagram: `https://www.instagram.com/the_consistent_academy/`
  - LinkedIn: `https://www.linkedin.com/company/the-consistent-academy/`
- **Prototype Form:**
  - Client-side validation for required fields (Name, Email/Phone, Message, Consent).
  - Explicit inline error messages and red border highlights.
  - Transparent **"Prototype Demo Acknowledged"** state displaying entered data without pretending false backend delivery.

---

## 7. QA Acceptance Checklist

- [x] **Content Preservation:** All verified client copy, curricula, prices, and qualifications preserved verbatim.
- [x] **Asset Localisation:** All images organized in `public/assets/`; zero remote hotlinking.
- [x] **No AI Hallucinations:** No invented reviews, fictional faculty, or unverified claims.
- [x] **Navigation & Links:** All internal routes, phone `tel:`, email `mailto:`, and external links work correctly.
- [x] **Google Maps Integration:** Map embed and visible "Get Directions" link tested on mobile and desktop viewports.
- [x] **Form Usability:** Interactive validation, error indicators, and transparent prototype status banner.
- [x] **Responsive Layout:** Tested seamlessly across mobile (<640px), tablet (768px), and desktop (1280px+) without horizontal overflow.
- [x] **Accessibility:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`), skip-to-content anchor, visible focus rings.
- [x] **SEO Foundation:** Page-specific titles, descriptive meta tags, OpenGraph previews, `robots.txt`, and `sitemap.xml`.
- [x] **Branding & Footer Credit:**
  - Copyright: `© 2026 The Consistent Academy. All rights reserved.`
  - Credit: `Website developed by ThinkBuild` linking to `https://www.thinkbuild.in/`.

---

## 8. Development Credit
Developed for **ThinkBuild** as part of the Website Restructuring Assignment for **The Consistent Academy**.
- **ThinkBuild Website:** [https://www.thinkbuild.in/](https://www.thinkbuild.in/)
