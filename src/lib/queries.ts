import { supabase } from "@/lib/supabase";
import type { ProjectRow, CertificateRow, CommentRow } from "@/types/database";

// ─── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectRow[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Supabase] getProjects error:", error.message);
    return [];
  }

  return data ?? [];
}

// ─── Certificates ──────────────────────────────────────────────────────────────

export async function getCertificates(): Promise<CertificateRow[]> {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("[Supabase] getCertificates error:", error.message);
    return [];
  }

  return data ?? [];
}

// ─── Helper: resolve image URL ─────────────────────────────────────────────────
// Handles both:
//   1. Old URLs pointing to zndkwkrpygehazqcpxyo.supabase.co (previous project)
//   2. New URLs pointing to qpwjijggfbsryqomftls.supabase.co (current project)
//   3. Relative paths like "images-projects/foo.jpg" (Storage path only)

const OLD_PROJECT_ID = "zndkwkrpygehazqcpxyo";
const NEW_PROJECT_ID = "qpwjijggfbsryqomftls";
const BUCKET = "profile-images";

// ─── Comments / Guestbook ──────────────────────────────────────────────────────

export async function getComments(): Promise<CommentRow[]> {
  const { data, error } = await supabase
    .from("portfolio_comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Supabase] getComments error:", error.message);
    return [];
  }

  return data ?? [];
}

export async function postComment(
  content: string,
  user_name: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("portfolio_comments")
    .insert({ content, user_name, is_pinned: false });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ─── Helper: resolve image URL ─────────────────────────────────────────────────

export function resolveImageUrl(img: string | null): string {
  if (!img) return "/placeholder.jpg";

  // Already a full URL pointing to new project → use as-is
  if (img.includes(NEW_PROJECT_ID)) return img;

  // Full URL pointing to old project → rewrite to new project
  if (img.includes(OLD_PROJECT_ID)) {
    return img.replace(OLD_PROJECT_ID, NEW_PROJECT_ID);
  }

  // Relative storage path → build full URL
  const path = img.startsWith("/") ? img.slice(1) : img;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
