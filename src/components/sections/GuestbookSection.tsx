"use client";

import { useEffect, useState, useRef } from "react";
import { getComments, postComment } from "@/lib/queries";
import type { CommentRow } from "@/types/database";
import { SectionHeading } from "@/components/ui/SectionHeading";

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return "just now";
  if (mins < 60)  return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30)  return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function initials(name: string): string {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

// Deterministic pastel color from name
const AVATAR_COLORS = [
  { bg: "#eef1fb", text: "#2d3393" },
  { bg: "#ecfdf5", text: "#065f46" },
  { bg: "#fef3c7", text: "#92400e" },
  { bg: "#fce7f3", text: "#9d174d" },
  { bg: "#e0f2fe", text: "#075985" },
  { bg: "#f3e8ff", text: "#6b21a8" },
];
function avatarColor(name: string) {
  const idx = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

export function GuestbookSection() {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const fetchComments = () => {
    getComments().then((data) => {
      setComments(data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchComments(); }, []);

  const handleSubmit = async () => {
    setError("");
    if (!name.trim()) { setError("Name is required."); return; }
    if (!message.trim()) { setError("Message is required."); return; }
    if (message.length > 300) { setError("Max 300 characters."); return; }

    setSubmitting(true);
    const result = await postComment(message.trim(), name.trim());
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong. Try again.");
      return;
    }

    setSuccess(true);
    setName("");
    setMessage("");
    setTimeout(() => setSuccess(false), 3000);
    fetchComments(); // re-fetch to show new comment
  };

  // Pinned comments first, then rest
  const pinned = comments.filter((c) => c.is_pinned);
  const rest   = comments.filter((c) => !c.is_pinned);
  const sorted = [...pinned, ...rest];

  return (
    <section id="testimonials" className="py-20 px-6"
      style={{ background: "linear-gradient(180deg, #eef4fb 0%, #e8f0f8 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          pre="Say hello"
          title="Guestbook"
          subtitle="Leave a message — I read every single one. 👋"
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: form ────────────────────────────────────────────── */}
          <div ref={formRef} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <p className="text-sm font-bold text-[#0d1040] mb-5">Write a message</p>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Fadhil Firdaus Adha</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Fadhil Firdaus"
                  maxLength={50}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#2d3393]/50 focus:ring-2 focus:ring-[#2d3393]/10 transition-all"
                />
              </div>

              {/* Message */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Message
                  <span className={`ml-auto float-right font-normal ${message.length > 270 ? "text-red-400" : "text-gray-300"}`}>
                    {message.length}/300
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your portfolio looks amazing! 🔥"
                  maxLength={300}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#2d3393]/50 focus:ring-2 focus:ring-[#2d3393]/10 transition-all resize-none"
                />
              </div>

              {/* Error / success */}
              {error && (
                <p className="text-xs text-red-500 mb-3 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
              )}
              {success && (
                <p className="text-xs text-emerald-600 mb-3 bg-emerald-50 px-3 py-2 rounded-lg font-medium">
                  Message sent! Thanks 🎉
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-[#1a2060] text-white text-sm font-semibold hover:bg-[#141852] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message ✉"
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center mt-3">
                No account needed · Publicly visible
              </p>
            </div>
          </div>

          {/* ── Right: comments feed ──────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-3">
            {loading ? (
              <CommentsSkeleton />
            ) : sorted.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <p className="text-4xl mb-3">👋</p>
                <p className="text-sm text-gray-500">No messages yet — be the first!</p>
              </div>
            ) : (
              sorted.map((c) => (
                <CommentCard key={c.id} comment={c} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Single comment card ───────────────────────────────────────────────────────
function CommentCard({ comment }: { comment: CommentRow }) {
  const color = avatarColor(comment.user_name);
  return (
    <div className={`bg-white rounded-2xl border p-5 transition-all duration-200 hover:shadow-sm ${
      comment.is_pinned ? "border-[#2d3393]/20 shadow-sm" : "border-gray-100"
    }`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: color.bg, color: color.text }}
        >
          {initials(comment.user_name)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-sm font-semibold text-[#0d1040]">{comment.user_name}</span>
            {comment.is_pinned && (
              <span className="text-[9px] font-bold bg-[#eef1fb] text-[#2d3393] px-2 py-0.5 rounded-full">
                📌 Pinned
              </span>
            )}
            <span className="text-xs text-gray-400 ml-auto">{timeAgo(comment.created_at)}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed break-words">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function CommentsSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-gray-200 rounded-lg w-28" />
              <div className="h-3 bg-gray-100 rounded-lg w-full" />
              <div className="h-3 bg-gray-100 rounded-lg w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
