"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getCertificates, resolveImageUrl } from "@/lib/queries";
import type { CertificateRow } from "@/types/database";
import { EDUCATION } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DESKTOP_LIMIT = 6;
const MOBILE_LIMIT  = 4;

function nameFromUrl(url: string): string {
  try {
    const parts = url.split("/");
    const filename = decodeURIComponent(parts[parts.length - 1]);
    return filename
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
  } catch {
    return "Certificate";
  }
}

function buildColumns(items: CertificateRow[], count: number): CertificateRow[][] {
  const cols: CertificateRow[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => cols[i % count].push(item));
  return cols;
}

export function CertificatesSection() {
  const [certs, setCerts]           = useState<CertificateRow[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [showAllDesktop, setShowAllDesktop] = useState(false);
  const [selected, setSelected]     = useState<CertificateRow | null>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    getCertificates().then((data) => {
      setCerts(data);
      setLoading(false);
    });
  }, []);

  const openLightbox = useCallback((cert: CertificateRow, idx: number) => {
    setSelected(cert);
    setSelectedIdx(idx);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    const next = (selectedIdx + dir + certs.length) % certs.length;
    setSelected(certs[next]);
    setSelectedIdx(next);
  }, [selectedIdx, certs]);

  useEffect(() => {
    if (!selected) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      setSelected(null);
      if (e.key === "ArrowRight")  navigate(1);
      if (e.key === "ArrowLeft")   navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, navigate]);

  // Sliced lists
  const desktopCerts = showAllDesktop ? certs : certs.slice(0, DESKTOP_LIMIT);
  const mobileCerts  = showAllMobile  ? certs : certs.slice(0, MOBILE_LIMIT);

  const desktopCols = buildColumns(desktopCerts, 3);

  return (
    <section id="certificates" className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #e8f0f8 0%, #eef4fb 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading pre="Credentials" title="Certificates &" highlight="Education" className="mb-12" />

        {loading ? (
          <MasonrySkeleton />
        ) : (
          <>
            {/* ── DESKTOP: 3-col masonry, show 6 first ──────────────── */}
            <div className="hidden md:block mb-10">
              <div className="flex gap-4 items-start">
                {desktopCols.map((col, ci) => (
                  <div key={ci} className="flex-1 flex flex-col gap-4">
                    {col.map((cert) => {
                      const globalIdx = certs.findIndex((c) => c.id === cert.id);
                      return (
                        <CertCard
                          key={cert.id}
                          cert={cert}
                          onClick={() => openLightbox(cert, globalIdx)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* See more / less button — desktop */}
              {certs.length > DESKTOP_LIMIT && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAllDesktop((v) => !v)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#1a2060]/25 text-[#1a2060] text-sm font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    {showAllDesktop
                      ? "Show less ↑"
                      : `See all ${certs.length} certificates ↓`}
                  </button>
                </div>
              )}
            </div>

            {/* ── MOBILE: single column, show 4 first ───────────────── */}
            <div className="flex md:hidden flex-col gap-3 mb-10">
              {mobileCerts.map((cert) => {
                const globalIdx = certs.findIndex((c) => c.id === cert.id);
                return (
                  <CertCard
                    key={cert.id}
                    cert={cert}
                    onClick={() => openLightbox(cert, globalIdx)}
                  />
                );
              })}

              {/* See more / less button — mobile */}
              {certs.length > MOBILE_LIMIT && (
                <button
                  onClick={() => setShowAllMobile((v) => !v)}
                  className="w-full py-3 rounded-2xl border border-[#1a2060]/25 text-[#1a2060] text-sm font-semibold hover:bg-indigo-50 transition-colors mt-1"
                >
                  {showAllMobile
                    ? "Show less ↑"
                    : `See all ${certs.length} certificates ↓`}
                </button>
              )}
            </div>
          </>
        )}

        {/* ── Education ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Education</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATION.map((edu) => (
              <div key={edu.institution}
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#2d3393]/20 hover:bg-[#eef1fb]/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-[#eef1fb] flex items-center justify-center text-xl flex-shrink-0">
                  {edu.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0d1040]">{edu.institution}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{edu.degree}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-gray-400">{edu.year}</span>
                    {edu.gpa && (
                      <span className="text-[10px] font-semibold text-[#2d3393] bg-[#eef1fb] px-2 py-0.5 rounded-md">
                        GPA {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div className="flex justify-center">
          <a href="/CV-Fadhil-Firdaus-Adha.pdf" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1a2060]/30 text-[#1a2060] font-semibold text-sm hover:bg-indigo-50 transition-colors">
            Download Full Resume
            <span className="w-7 h-7 rounded-full border border-[#1a2060]/30 flex items-center justify-center text-xs">↓</span>
          </a>
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      {selected && (
        <Lightbox
          cert={selected}
          idx={selectedIdx}
          total={certs.length}
          onClose={() => setSelected(null)}
          onPrev={() => navigate(-1)}
          onNext={() => navigate(1)}
        />
      )}
    </section>
  );
}

// ── Single card ───────────────────────────────────────────────────────────────
function CertCard({ cert, onClick }: { cert: CertificateRow; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const src  = resolveImageUrl(cert.Img);
  const name = nameFromUrl(cert.Img ?? "");

  return (
    <button onClick={onClick}
      className="group relative w-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left block"
      title={name}>
      <div className="relative w-full bg-gray-100">
        {!error ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#eef1fb] to-[#dde4f8] animate-pulse" style={{ minHeight: 120 }} />
            )}
            <Image
              src={src}
              alt={name}
              width={400}
              height={300}
              className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-[1.02] ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ display: "block" }}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#eef1fb] to-[#dde4f8] py-10 px-4">
            <span className="text-4xl mb-3">🏆</span>
            <span className="text-xs text-[#2d3393] font-medium text-center leading-tight">{name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[#1a2060]/0 group-hover:bg-[#1a2060]/30 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-[#1a2060] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            View ↗
          </span>
        </div>
      </div>
      <div className="px-3 py-2.5 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-600 leading-snug line-clamp-2">{name}</p>
      </div>
    </button>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ cert, idx, total, onClose, onPrev, onNext }: {
  cert: CertificateRow; idx: number; total: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const src  = resolveImageUrl(cert.Img);
  const name = nameFromUrl(cert.Img ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-bold text-gray-400 flex-shrink-0">{idx + 1} / {total}</span>
            <p className="text-sm font-bold text-[#0d1040] truncate">{name}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors flex-shrink-0 ml-3">
            ✕
          </button>
        </div>
        <div className="relative flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4 min-h-[320px]">
          <Image src={src} alt={name} width={800} height={600}
            className="object-contain max-h-[60vh] w-auto rounded-xl"
            sizes="(max-width: 768px) 100vw, 672px" />
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onPrev}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2d3393] hover:text-[#2d3393] transition-colors text-sm">←</button>
            <button onClick={onNext}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-[#2d3393] hover:text-[#2d3393] transition-colors text-sm">→</button>
          </div>
          <a href={src} target="_blank" rel="noreferrer"
            className="text-xs font-semibold text-[#2d3393] hover:underline">Open full size ↗</a>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function MasonrySkeleton() {
  const heights = [180, 240, 160, 200, 220, 170];
  const cols = [heights.slice(0, 2), heights.slice(2, 4), heights.slice(4, 6)];
  return (
    <div className="flex gap-4 mb-10 items-start animate-pulse">
      {cols.map((col, ci) => (
        <div key={ci} className="flex-1 flex flex-col gap-4">
          {col.map((h, i) => <div key={i} className="rounded-2xl bg-gray-200" style={{ height: h }} />)}
        </div>
      ))}
    </div>
  );
}
