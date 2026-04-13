"use client";

import { SKILLS, TECH_STACKS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollAnimation, staggerStyle } from "@/hooks/useScrollAnimation";

export function SkillsSection() {
  const heading = useScrollAnimation({ threshold: 0.1 });
  const cards   = useScrollAnimation({ threshold: 0.05, delay: 80 });
  const stack   = useScrollAnimation({ threshold: 0.1, delay: 60 });

  return (
    <section id="skills" className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #eef4fb 0%, #f0f7ff 50%, #edf5f2 100%)" }}>
      <div className="max-w-6xl mx-auto">

        <div ref={heading.ref} className={`anim-fade-up ${heading.visible ? "in-view" : ""} mb-10`}>
          <SectionHeading pre="What I bring" title="I Build Things That" highlight="Actually Work" center={false} />
        </div>

        {/* Skill cards — stagger on entry */}
        <div ref={cards.ref}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0 mb-12">
          {SKILLS.map((skill, i) => (
            <div key={skill.title}
              style={staggerStyle(i, 90)}
              className={`anim-scale ${cards.visible ? "in-view" : ""} min-w-[240px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-[box-shadow,transform] duration-300 group flex flex-col justify-between`}>
              <div>
                <div className="w-12 h-12 rounded-full bg-[#eef1fb] flex items-center justify-center text-xl mb-5">{skill.icon}</div>
                <h3 className="font-semibold text-[#0d1040] text-base mb-2">{skill.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#eef1fb] text-[#2d3393]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${i === 1 ? "bg-[#2d3393] text-white" : "border border-gray-200 text-gray-400 group-hover:border-[#2d3393] group-hover:text-[#2d3393]"}`}>↗</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div ref={stack.ref} className={`anim-fade-up ${stack.visible ? "in-view" : ""} bg-white rounded-2xl border border-gray-100 p-6`}>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Full Tech Stack</p>
          <div className="space-y-4">
            {TECH_STACKS.map((group, gi) => (
              <div key={group.category} className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-gray-400 w-24 flex-shrink-0">{group.category}</span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech, ti) => (
                    <span key={tech.name}
                      style={{ background: tech.bg, color: tech.color, ...staggerStyle(gi * 5 + ti, 30) }}
                      className={`anim-fade ${stack.visible ? "in-view" : ""} px-3 py-1.5 rounded-lg text-xs font-bold hover:scale-105 transition-transform duration-150 cursor-default`}>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
