"use client";
import { useEffect, useState } from "react";
import { PERSONAL, TECH_STACKS } from "@/lib/constants";
import Image from "next/image";

const ROLES = [
  "Fullstack Developer",
  "Software Engineer",
  "Web Developer",
  "Backend Enthusiast"
];

export function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const allTech = TECH_STACKS.flatMap((s) => s.items).slice(0, 6);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-16 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, #c8d8f8 0%, #ddeef6 30%, #eaf4f0 55%, #f0f7ee 70%, #f8fbff 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute top-16 left-[-8%] w-72 h-48 rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, rgba(200,216,248,0.9) 0%, transparent 70%)", filter: "blur(32px)" }} />
        <div className="absolute top-8 right-[-6%] w-80 h-56 rounded-full opacity-50"
          style={{ background: "radial-gradient(ellipse, rgba(180,220,245,0.8) 0%, transparent 70%)", filter: "blur(36px)" }} />
        <div className="absolute bottom-32 left-[5%] w-60 h-40 rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(190,230,210,0.8) 0%, transparent 70%)", filter: "blur(28px)" }} />
        <div className="absolute top-24 right-[8%] w-96 h-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)", filter: "blur(48px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">

        {/* ════════════════════════════════════════════════════════════
            DESKTOP (md+): kiri teks penuh, kanan foto
            ════════════════════════════════════════════════════════════ */}
        <div className="hidden md:flex items-center justify-between gap-8">
          <div className="flex-1 text-left space-y-0">
            <AvailableBadge />
            <Headline roleIdx={roleIdx} visible={visible} />
            <Tagline className="mb-8" />
            <CTAButtons className="mb-10" />
            <Stats />
          </div>
          <div className="flex-shrink-0">
            <PhotoCard tech={allTech} />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            MOBILE (<md): badge → headline → tagline → FOTO → CTA → stats
            ════════════════════════════════════════════════════════════ */}
        <div className="flex md:hidden flex-col items-center text-center">
          <AvailableBadge />
          <Headline roleIdx={roleIdx} visible={visible} />
          <Tagline className="mb-0" />

          {/* ← foto disini, setelah deskripsi */}
          <div className="my-10 w-full flex justify-center">
            <PhotoCard tech={allTech} />
          </div>

          <CTAButtons className="mb-8" />
          <Stats />
        </div>

        {/* Code editor — desktop only */}
        <div className="hidden md:block mt-14 w-full max-w-md mx-auto"
          style={{ transform: "perspective(1000px) rotateX(3deg)" }}>
          <div className="rounded-2xl bg-[#0d0f1f] border border-white/10 shadow-2xl shadow-indigo-900/30 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-white/30 text-xs font-mono">portfolio.tsx</span>
            </div>
            <div className="px-5 py-4 font-mono text-xs leading-6 space-y-0.5">
              <p>
                <span className="text-purple-400">const </span>
                <span className="text-blue-300">developer</span>
                <span className="text-white/50"> = </span>
                <span className="text-yellow-300">{"{"}</span>
              </p>
              <p className="pl-4">
                <span className="text-green-300">name</span>
                <span className="text-white/50">: </span>
                <span className="text-orange-300">&quot;{PERSONAL.name}&quot;</span>
                <span className="text-white/50">,</span>
              </p>
              <p className="pl-4">
                <span className="text-green-300">stack</span>
                <span className="text-white/50">: [</span>
                {allTech.map((t, i) => (
                  <span key={t.name}>
                    <span className="text-orange-300">&quot;{t.name}&quot;</span>
                    {i < allTech.length - 1 && <span className="text-white/50">, </span>}
                  </span>
                ))}
                <span className="text-white/50">],</span>
              </p>
              <p className="pl-4">
                <span className="text-green-300">available</span>
                <span className="text-white/50">: </span>
                <span className="text-blue-300">{PERSONAL.available ? "true" : "false"}</span>
                <span className="text-white/50">,</span>
              </p>
              <p><span className="text-yellow-300">{"}"}</span></p>
              <p className="mt-1">
                <span className="inline-block w-2 h-4 bg-indigo-400 animate-pulse" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function AvailableBadge() {
  if (!PERSONAL.available) return null;
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border"
      style={{ background: "rgba(45,51,147,0.08)", color: "#2d3393", borderColor: "rgba(45,51,147,0.2)" }}>
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      Available for hire · {PERSONAL.location}
    </div>
  );
}

function Headline({ roleIdx, visible }: { roleIdx: number; visible: boolean }) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0d1040] leading-tight tracking-tight mb-4">
      Hi, I&apos;m{" "}
      <span className="text-[#2d3393]">{PERSONAL.name}</span>
      <br />
      <span className={`inline-block transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        {ROLES[roleIdx]}
      </span>
    </h1>
  );
}

function Tagline({ className = "" }: { className?: string }) {
  return (
    <p className={`text-gray-500 text-base md:text-lg leading-relaxed max-w-lg mx-auto md:mx-0 ${className}`}>
      {PERSONAL.tagline}
    </p>
  );
}

function CTAButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center md:justify-start gap-3 ${className}`}>
      <a href="#projects"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a2060] text-white font-semibold text-sm hover:bg-[#141852] transition-colors shadow-md shadow-indigo-200">
        Lihat Portofolio
        <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs">→</span>
      </a>
      
      {/* 🚀 TOMBOL CV BARU YANG LEBIH MENTERENG 🚀 */}
      <a href={PERSONAL.ctaResume} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-200/50">
        📄 Download CV
      </a>

      <a href={`mailto:${PERSONAL.email}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a2060]/30 text-[#1a2060] font-semibold text-sm hover:bg-indigo-50 transition-colors">
        Hubungi Saya
      </a>
    </div>
  );
}

function Stats() {
  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
      {[
        { value: PERSONAL.yearsExp,           label: "Years Exp."   },
        { value: PERSONAL.projectsDone,        label: "Projects"     },
        // { value: PERSONAL.githubStars,         label: "GitHub Stars" },
        { value: PERSONAL.clientSatisfaction,  label: "Client Sat."  },
      ].map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="text-2xl font-black text-[#2d3393]">{value}</div>
          <div className="text-xs text-gray-400 mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Photo card ────────────────────────────────────────────────────────────────
function PhotoCard({ tech }: { tech: { name: string; color: string; bg: string }[] }) {
  return (
    <div className="relative w-64 h-72 md:w-80 md:h-96">

      {/* Shadow glow layer 1 — deepest */}
      <div className="absolute inset-0 rounded-[2rem] translate-x-6 translate-y-7"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #2d3393 100%)", filter: "blur(28px)", opacity: 0.4 }} />

      {/* Shadow layer 2 — mid */}
      <div className="absolute inset-0 rounded-[2rem] translate-x-3 translate-y-3.5"
        style={{ background: "linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)", filter: "blur(10px)", opacity: 0.22 }} />

      {/* Main photo frame */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/70 bg-white"
        style={{ boxShadow: "0 24px 64px rgba(45,51,147,0.15), 0 4px 16px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.9)" }}>

        {/*
        ╔══════════════════════════════════════════════════════╗
        ║  HOW TO ADD YOUR PHOTO                               ║
        ║  1. Taruh foto di /public/photo.jpg                  ║
        ║  2. Ganti src di bawah kalau nama file berbeda       ║
        ║     e.g. src="/photo.jpg"  atau  src="/me.png"       ║
        ║  3. Rekomendasi: square crop, min 640×640px          ║
        ╚══════════════════════════════════════════════════════╝
        */}
        <Image
          src="/udilprofile.jpg"
          alt={`${PERSONAL.name} — ${PERSONAL.title}`}
          fill
          sizes="(max-width: 768px) 256px, 320px"
          className="object-cover object-top"
          priority
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(26,32,96,0.18) 0%, transparent 100%)" }} />
      </div>

      {/* Floating badge: Open to work */}
      <div className="absolute -top-3 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-gray-100/80 flex items-center gap-2 z-10"
        style={{ boxShadow: "0 8px 24px rgba(45,51,147,0.13)" }}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <span className="text-xs font-bold text-[#0d1040]">Open to work</span>
      </div>

      {/* Floating tech chips */}
      <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl px-3 py-2.5 shadow-lg border border-gray-100/80 flex items-center gap-1.5 flex-wrap max-w-[168px] z-10"
        style={{ boxShadow: "0 8px 24px rgba(45,51,147,0.10)" }}>
        {tech.slice(0, 3).map((t) => (
          <span key={t.name} className="text-[10px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: t.bg, color: t.color }}>
            {t.name}
          </span>
        ))}
        <span className="text-[10px] text-gray-400 font-semibold">+more</span>
      </div>

      {/* Years exp badge */}
      <div className="absolute -bottom-4 -right-4 bg-[#1a2060] rounded-2xl px-3.5 py-2.5 shadow-lg flex flex-col items-center z-10"
        style={{ boxShadow: "0 8px 24px rgba(26,32,96,0.28)" }}>
        <span className="text-xl font-black text-white leading-none">{PERSONAL.yearsExp}</span>
        <span className="text-[9px] text-white/60 leading-tight text-center mt-0.5">Years<br />Exp.</span>
      </div>
    </div>
  );
}
