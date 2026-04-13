import type {
  NavItem,
  SkillCard,
  ProcessStep,
  Project,
  Testimonial,
  Certificate,
  Education,
  FooterColumn,
  TechStack,
} from "@/types";

// ─── PERSONAL INFO ─────────────────────────────────────────────────────────────
// 👇 Edit everything in this block to personalize your portfolio
export const PERSONAL = {
  name: "Fadhil Firdaus Adha",           // e.g. "Rizal Pratama"
  title: "Fullstack Developer",
  tagline: "Membangun web app yang cepat dan fungsional — mulai dari tampilan UI yang rapi sampai sistem backend yang siap pakai di lapangan.",
  subTagline: "Mengubah alur kerja yang ribet menjadi aplikasi digital yang simpel, praktis, dan efisien.",
  email: "fadhil.firadha@email.com",
  github: "https://github.com/keydil",
  linkedin: "https://id.linkedin.com/in/fadhil-firdaus-adha-13a3a5350",
  location: "Bandung, Indonesia",
  timezone: "UTC+7",
  available: true,             // toggle the green "Available for hire" badge
  yearsExp: "2+",
  projectsDone: "8+",
  // githubStars: "8k+",
  clientSatisfaction: "100%",
  ctaResume: "/CV-Fadhil-Firdaus-Adha.pdf",    // put your resume PDF in /public/
};

// ─── NAV ───────────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Home",         href: "#home" },
  { label: "Skills",       href: "#skills" },
  { label: "Process",      href: "#process" },
  { label: "Projects",     href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Guestbook",    href: "#testimonials" },
];

// ─── SKILLS ────────────────────────────────────────────────────────────────────
export const SKILLS: SkillCard[] = [
  {
    icon: "🖥",
    title: "Frontend Development",
    description:
      "Membangun antarmuka web yang responsif, dinamis, dan optimal menggunakan framework modern.",
    tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description:
      "Merancang arsitektur server, API, dan sistem penomoran otomatis yang solid dan siap diimplementasikan di lapangan.",
    tags: ["NestJS", "Laravel 12", "Node.js", "PHP"],
  },
  {
    icon: "🗄️",
    title: "Database & Infra",
    description:
      "Mengelola basis data relasional dan platform BaaS untuk sinkronisasi data yang aman dan real-time.",
    tags: ["Supabase", "MySQL", "Docker", "Postman"],
  },
  {
    icon: "🎮",
    title: "Interactive Digital",
    description:
      "Mengembangkan pengalaman interaktif 3D dan simulasi lingkungan virtual untuk berbagai kebutuhan digital.",
    tags: ["Unity", "C#", "3D Animation", "WebGL"],
  },
];

// ─── TECH STACK ────────────────────────────────────────────────────────────────
export const TECH_STACKS: TechStack[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js",     color: "#ffffff", bg: "#111111" },
      { name: "React",       color: "#61DAFB", bg: "#0a1628" },
      { name: "TypeScript",  color: "#3178C6", bg: "#e8f0fc" },
      { name: "Tailwind",    color: "#06B6D4", bg: "#ecfeff" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "NestJS",      color: "#E0234E", bg: "#fce8ec" },
      { name: "Laravel",     color: "#FF2D20", bg: "#ffeae8" },
      { name: "Node.js",     color: "#339933", bg: "#e8f5e9" },
      { name: "PHP",         color: "#777BB4", bg: "#eff0f7" },
    ],
  },
  {
    category: "Database & Infra",
    items: [
      { name: "Supabase",    color: "#3ECF8E", bg: "#eaf9f1" },
      { name: "MySQL",       color: "#4479A1", bg: "#ecf2f6" },
      { name: "Docker",      color: "#2496ED", bg: "#e8f4fd" },
      { name: "Git",         color: "#F05032", bg: "#fdedea" },
    ],
  },
  {
    category: "Game & Interactive",
    items: [
      { name: "Unity",       color: "#000000", bg: "#f3f4f6" },
      { name: "C#",          color: "#239120", bg: "#e8f4e8" },
    ],
  },
];

// ─── PROCESS STEPS ─────────────────────────────────────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Analisis & Perencanaan",
    description:
      "Memahami kebutuhan operasional klien (seperti alur antrean atau penomoran surat), menentukan fitur inti, dan memilih tech stack yang paling efisien.",
  },
  {
    number: 2,
    title: "Pengembangan Terintegrasi",
    description:
      "Menulis kode yang bersih dengan iterasi cepat, membangun UI yang fungsional, dan menghubungkan backend API dengan performa optimal.",
  },
  {
    number: 3,
    title: "Deployment & Evaluasi",
    description:
      "Memastikan aplikasi berjalan lancar di production, siap digunakan oleh pengguna nyata, dan melakukan penyesuaian berdasarkan feedback lapangan.",
  },
];

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
// (Kosongkan saja array ini jika lu nge-fetch data project langsung dari Supabase)
export const PROJECTS: Project[] = [];

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
// (Kosongkan atau hapus jika lu pakai fitur Guestbook dari Supabase)
export const TESTIMONIALS: Testimonial[] = [];

// ─── CERTIFICATES & EDUCATION ──────────────────────────────────────────────────
export const CERTIFICATES: Certificate[] = [
  {
    icon: "☁️",
    issuer: "Amazon Web Services",
    name: "AWS Certified Solutions Architect – Associate",
    year: "2024",
    credential: "Verify →",
    highlighted: true,
  },
  {
    icon: "🔷",
    issuer: "Meta",
    name: "Meta Frontend Developer Professional Certificate",
    year: "2023",
    credential: "Verify →",
    highlighted: false,
  },
  {
    icon: "🟢",
    issuer: "MongoDB University",
    name: "MongoDB Certified Developer Associate",
    year: "2023",
    credential: "Verify →",
    highlighted: false,
  },
];

export const EDUCATION: Education[] = [
  {
    icon: "🎓",
    institution: "Universitas Sangga Buana YPKP",
    degree: "D3 Teknik Informatika",
    year: "2023 - Sekarang",
    gpa: "3.82 / 4.00",
  },
];

// ─── FOOTER ────────────────────────────────────────────────────────────────────
export const FOOTER_COLUMNS: FooterColumn[] = [
  // {
  //   title: "Work",
  //   links: [
  //     { label: "Projects",   href: "#projects" },
  //     { label: "Open Source", href: "#" },
  //     { label: "Case Studies", href: "#" },
  //   ],
  // },
  {
    title: "Skills",
    links: [
      { label: "Frontend",   href: "#skills" },
      { label: "Backend",    href: "#skills" },
      { label: "DevOps",     href: "#skills" },
    ],
  },
  {
    title: "Tentang",
    links: [
      { label: "Process",    href: "#process" },
      { label: "Certificates", href: "#certificates" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Kontak",
    links: [
      { label: "Email Saya", href: "mailto:fadhil.firadha@email.com" },
      { label: "LinkedIn",   href: "#" },
      { label: "GitHub",     href: "https://github.com/keydil" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resume",     href: "/CV-Fadhil-Firdaus-Adha.pdf", badge: "PDF" },
      { label: "Blog",       href: "#",           badge: "Soon" },
    ],
  },
];
