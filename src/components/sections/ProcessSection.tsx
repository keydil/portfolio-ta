"use client";

import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollAnimation, staggerStyle } from "@/hooks/useScrollAnimation";

export function ProcessSection() {
  const heading  = useScrollAnimation({ threshold: 0.1 });
  const steps    = useScrollAnimation({ threshold: 0.1, delay: 100 });
  const cards    = useScrollAnimation({ threshold: 0.05, delay: 120 });

  return (
    <section id="process" className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #edf5f2 0%, #eef4fb 100%)" }}>
      <div className="max-w-5xl mx-auto">

        <div ref={heading.ref} className={`anim-fade-up ${heading.visible ? "in-view" : ""}`}>
          <SectionHeading pre="How I work" title="My Development Process" highlight="Step by Step" className="mb-16" />
        </div>

        {/* Step indicators */}
        <div ref={steps.ref} className={`anim-fade ${steps.visible ? "in-view" : ""} flex items-center justify-center mb-10`}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <div style={staggerStyle(i, 120)}
                className={`anim-scale ${steps.visible ? "in-view" : ""} w-10 h-10 rounded-full bg-[#1a2060] text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                {step.number}
              </div>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="w-32 md:w-48 h-px border-t-2 border-dashed border-[#2d3393]/30" />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.number}
              style={staggerStyle(i, 100)}
              className={`anim-fade-up ${steps.visible ? "in-view" : ""}`}>
              <h3 className="font-semibold text-[#0d1040] text-base mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Step mockup cards */}
        <div ref={cards.ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Card 1 */}
          <div style={staggerStyle(0, 110)}
            className={`anim-scale ${cards.visible ? "in-view" : ""} bg-white rounded-2xl border border-gray-100 p-5 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#0d1040]">Project Brief</span>
              <span className="text-gray-300 text-xs">≡</span>
            </div>
            <div className="space-y-2.5 mb-4">
              {["Goals & KPIs", "Target Users", "Tech Constraints", "Timeline"].map((item, i) => (
                <div key={item} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] flex-shrink-0 ${i < 2 ? "bg-[#2d3393] text-white" : "border border-gray-200 text-gray-300"}`}>
                    {i < 2 ? "✓" : "○"}
                  </div>
                  <span className="text-xs text-gray-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#eef1fb] rounded-xl px-4 py-2 text-[11px] text-[#2d3393] font-medium text-center">
              Requirements locked ✓
            </div>
          </div>

          {/* Card 2 */}
          <div style={staggerStyle(1, 110)}
            className={`anim-scale ${cards.visible ? "in-view" : ""} bg-white rounded-2xl border border-gray-100 p-5 shadow-sm`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sprint 3</span>
              <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">Active</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Auth system",  pct: 100, done: true  },
                { label: "Dashboard UI", pct: 80,  done: false },
                { label: "API layer",    pct: 60,  done: false },
                { label: "Tests",        pct: 30,  done: false },
              ].map(({ label, pct, done }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">{label}</span>
                    <span className={`text-[10px] font-semibold ${done ? "text-green-500" : "text-gray-400"}`}>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${done ? "bg-green-400" : "bg-[#2d3393]"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div style={staggerStyle(2, 110)}
            className={`anim-scale ${cards.visible ? "in-view" : ""} bg-white rounded-2xl border border-gray-100 p-5 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-[#0d1040]">Deployment</span>
              <span className="text-[10px] font-bold bg-green-500 text-white px-2.5 py-1 rounded-full">Live</span>
            </div>
            <div className="space-y-2 mb-4">
              {["CI/CD Pipeline", "Unit Tests", "Lighthouse 99", "Zero downtime"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold flex-shrink-0 bg-green-100 text-green-600">✓</span>
                  <span className="text-xs text-gray-600">{label}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#1a2060] text-white text-[11px] font-semibold text-center py-2 rounded-xl">
              Production ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
