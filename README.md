# Portfolio — Fullstack Developer

A pixel-faithful port of the NeuralEdge design system, re-skinned as a Fullstack Developer portfolio.  
Built with **Next.js 15 · TypeScript · Tailwind CSS**.

---

## Quick Start

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

## Personalize (1 file only)

All your personal data lives in **`src/lib/constants.ts`**.  
Edit the `PERSONAL` block at the top:

```ts
export const PERSONAL = {
  name:               "Fadhil Firdaus Adha",
  title:              "Fullstack Developer",
  tagline:            "...",
  email:              "you@email.com",
  github:             "https://github.com/yourhandle",
  linkedin:           "https://linkedin.com/in/yourhandle",
  location:           "Bandung, Indonesia",
  timezone:           "UTC+7",
  available:          true,   // toggles the green badge
  yearsExp:           "5+",
  projectsDone:       "40+",
  githubStars:        "8k+",
  clientSatisfaction: "100%",
  ctaResume:          "/resume.pdf",
};
```

Then update the arrays below it:

| Export            | Section              |
|-------------------|----------------------|
| `NAV_ITEMS`       | Navbar links         |
| `SKILLS`          | Skills section       |
| `TECH_STACKS`     | Tech stack chips     |
| `PROCESS_STEPS`   | Process section      |
| `PROJECTS`        | Projects showcase    |
| `TESTIMONIALS`    | Testimonials         |
| `CERTIFICATES`    | Certificates         |
| `EDUCATION`       | Education            |
| `FOOTER_COLUMNS`  | Footer links         |

---

## Folder Structure

```
src/
├── app/
│   ├── page.tsx              ← assembles all sections
│   ├── layout.tsx            ← root layout + Sora font
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        ← floating pill navbar
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx       ← animated role text + code editor mockup
│   │   ├── SkillsSection.tsx     ← skill cards + full tech stack
│   │   ├── ProcessSection.tsx    ← 3-step with UI mockups
│   │   ├── ProjectsSection.tsx   ← interactive project tabs
│   │   ├── CertificatesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx    ← CTA banner + terminal mockup
│   └── ui/
│       ├── Button.tsx
│       └── SectionHeading.tsx
├── hooks/
│   └── useScrolled.ts
├── lib/
│   ├── constants.ts          ← ✏️  EDIT THIS FILE
│   └── utils.ts
└── types/
    └── index.ts
```

---

## Deploy to Vercel

```bash
npx vercel
```

Add your resume PDF at `public/resume.pdf` before deploying.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Font**: Sora (Google Fonts)
- **Utilities**: clsx + tailwind-merge
