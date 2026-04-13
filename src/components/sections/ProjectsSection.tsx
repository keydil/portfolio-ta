"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getProjects, resolveImageUrl } from "@/lib/queries";
import type { ProjectRow } from "@/types/database";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ProjectsSection() {
  const [projects, setProjects]   = useState<ProjectRow[]>([]);
  const [active, setActive]       = useState(0);
  const [loading, setLoading]     = useState(true);
  const [animKey, setAnimKey]     = useState(0); // bump to re-trigger CSS anim
  const [direction, setDirection] = useState<"left" | "right">("right");
  const cardRef = useRef<HTMLDivElement>(null);
  const section = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleTabClick = (i: number) => {
    if (i === active) return;
    setDirection(i > active ? "right" : "left");
    setActive(i);
    setAnimKey((k) => k + 1); // re-trigger animation

    // Mobile: scroll to card
    if (window.innerWidth < 768 && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const project = projects[active] ?? null;

  return (
    <section id="projects" className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #eef4fb 0%, #e8f0fa 100%)" }}>
      <div className="max-w-6xl mx-auto">

        <div ref={section.ref} className={`anim-fade-up ${section.visible ? "in-view" : ""}`}>
          <SectionHeading pre="Selected work" title="Projects I'm" highlight="Proud Of" className="mb-12" />
        </div>

        {loading ? (
          <ProjectsSkeleton />
        ) : !projects.length ? null : (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {projects.map((p, i) => (
                <button key={p.id}
                  onClick={() => handleTabClick(i)}
                  style={{ animation: "fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both", animationDelay: `${i * 70}ms` }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    active === i
                      ? "bg-[#eef1fb] border-[#2d3393]/30 text-[#2d3393]"
                      : "bg-white border-gray-200 text-gray-500 hover:border-[#2d3393]/30 hover:text-[#2d3393]"
                  }`}>
                  {p.Title}
                </button>
              ))}
            </div>

            {/* Project card */}
            {project && (
              <div ref={cardRef}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-28">
                <div className="grid grid-cols-1 md:grid-cols-2">

                  {/* Left: info — slides in from opposite direction */}
                  <div
                    key={`info-${animKey}`}
                    style={{
                      animation: `${direction === "right" ? "slideInLeft" : "slideInRight"} 0.45s cubic-bezier(0.22,1,0.36,1) both`,
                    }}
                    className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#0d1040] mb-3">{project.Title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.Description}</p>

                    {Array.isArray(project.TechStack) && project.TechStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {(project.TechStack as string[]).map((tag, ti) => (
                          <span key={tag}
                            style={{ animation: "fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both", animationDelay: `${ti * 40 + 80}ms` }}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {Array.isArray(project.Features) && project.Features.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {(project.Features as string[]).slice(0, 3).map((f, fi) => (
                          <li key={fi}
                            style={{ animation: "fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both", animationDelay: `${fi * 60 + 120}ms` }}
                            className="flex items-start gap-2.5 text-xs text-gray-500">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#eef1fb] text-[#2d3393] flex items-center justify-center text-[9px] font-bold flex-shrink-0">{fi + 1}</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex gap-3 flex-wrap"
                      style={{ animation: "fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "280ms" }}>
                      {project.Link && project.Link !== "#" && (
                        <a href={project.Link} target="_blank" rel="noreferrer">
                          <Button pill size="md" className="gap-2">
                            Live Demo
                            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs">→</span>
                          </Button>
                        </a>
                      )}
                      {project.Github && project.Github !== "#" && project.Github !== "" && (
                        <a href={project.Github} target="_blank" rel="noreferrer">
                          <Button variant="outline" pill size="md">GitHub ↗</Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: image — scales up + fades in */}
                  <div
                    key={`img-${animKey}`}
                    style={{ animation: "scaleIn 0.45s cubic-bezier(0.22,1,0.36,1) both", animationDelay: "60ms" }}
                    className="bg-gradient-to-br from-[#eef4fb] to-[#e8f0f8] p-8 flex items-center justify-center min-h-[300px]">
                    <ProjectImage project={project} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

function ProjectImage({ project }: { project: ProjectRow }) {
  const [imgError, setImgError] = useState(false);
  const src = resolveImageUrl(project.Img);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
        <div className="ml-3 flex-1 bg-gray-200 rounded-md h-4 flex items-center px-2">
          <span className="text-[9px] text-gray-400 truncate">
            {project.Link && project.Link !== "#"
              ? project.Link
              : `${(project.Title ?? "").toLowerCase().replace(/\s/g, "-")}.app`}
          </span>
        </div>
      </div>
      <div className="relative w-full aspect-video bg-gray-100">
        {!imgError && src !== "/placeholder.jpg" ? (
          <Image src={src} alt={project.Title ?? "Project image"} fill
            className="object-cover" onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 480px" 
            priority
            />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#eef1fb] to-[#dde4f8]">
            <span className="text-4xl mb-2">💻</span>
            <span className="text-xs text-[#2d3393] font-medium">{project.Title}</span>
          </div>
        )}
      </div>
      {Array.isArray(project.TechStack) && (
        <div className="px-4 py-3 flex flex-wrap gap-1.5">
          {(project.TechStack as string[]).slice(0, 4).map((tag) => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#eef1fb] text-[#2d3393]">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-3 justify-center mb-10">
        {[1, 2, 3].map((i) => <div key={i} className="h-9 w-28 bg-gray-200 rounded-full" />)}
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 h-80" />
    </div>
  );
}
