import { PERSONAL } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: "linear-gradient(135deg, #1a2060 0%, #2d3393 50%, #3d44b0 100%)" }}>

          {/* Glow blob */}
          <div className="pointer-events-none absolute top-[-40px] left-[-40px] w-72 h-72 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(48px)" }} />
          <div className="pointer-events-none absolute bottom-[-60px] right-[20%] w-56 h-56 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(36px)" }} />

          {/* Text */}
          <div className="relative z-10 max-w-sm">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Let&apos;s build together</p>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Got a Project<br />in Mind?
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              I&apos;m currently available for freelance work and full-time opportunities. Let&apos;s talk about what we can build.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href={`mailto:${PERSONAL.email}`}
                className="inline-flex items-center gap-2 bg-white text-[#1a2060] text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg">
                ✉ Send Email
              </a>
              <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 border border-white/20">
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Code terminal */}
          <div className="relative z-10 flex-shrink-0">
            <div className="w-52 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ background: "rgba(13,15,31,0.85)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="px-4 py-4 font-mono text-[11px] space-y-1">
                <p className="text-green-400">$ whoami</p>
                <p className="text-white/70">{PERSONAL.name}</p>
                <p className="text-green-400 mt-2">$ status</p>
                <p className="text-emerald-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  available
                </p>
                <p className="text-green-400 mt-2">$ location</p>
                <p className="text-white/70">{PERSONAL.location}</p>
                <p className="mt-2 flex items-center gap-1 text-white/40">
                  <span className="inline-block w-1.5 h-3.5 bg-indigo-400 animate-pulse" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
