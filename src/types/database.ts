// Auto-typed from your Supabase schema (db.sql)
// Tables: projects, certificates, portfolio_comments

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number;
          created_at: string;
          Title: string | null;
          Description: string | null;
          Img: string | null;
          Link: string | null;
          Github: string | null;
          Features: string[] | null;    // jsonb array of strings
          TechStack: string[] | null;   // jsonb array of strings
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      certificates: {
        Row: {
          id: number;
          created_at: string;
          Img: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["certificates"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["certificates"]["Insert"]>;
      };
      portfolio_comments: {
        Row: {
          id: string;
          content: string;
          user_name: string;
          profile_image: string | null;
          is_pinned: boolean;
          created_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["portfolio_comments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["portfolio_comments"]["Insert"]>;
      };
    };
  };
}

// Convenience row types
export type ProjectRow      = Database["public"]["Tables"]["projects"]["Row"];
export type CertificateRow  = Database["public"]["Tables"]["certificates"]["Row"];
export type CommentRow      = Database["public"]["Tables"]["portfolio_comments"]["Row"];
