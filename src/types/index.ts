// ─── Database Types ───
// These map to Supabase tables

export interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  plan_status: "trial" | "active" | "cancelled" | "expired" | "waitlist";
  trial_ends_at: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  onboarding_done: boolean;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  genre: string | null;
  asin: string | null;
  isbn: string | null;
  description: string | null;
  cover_url: string | null;
  tags: string[];
  seo_keywords: string[];
  created_at: string;
  updated_at: string;
}

export interface SalesSnapshot {
  id: string;
  book_id: string;
  user_id: string;
  snapshot_date: string;
  royalties: number;
  units: number;
  ku_reads: number;
  bsr: number | null;
  review_count: number;
  created_at: string;
}

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  type: "Reviewer" | "Blogger" | "Librarian" | "Media" | "Podcaster" | "Other";
  blog: string | null;
  status: "New" | "Awaiting reply" | "Responded" | "Declined" | "Follow up needed";
  tags: string[];
  notes: string | null;
  last_contacted: string | null;
  follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  messages: ChatMessage[];
  section: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface Import {
  id: string;
  user_id: string;
  source_type: "kdp_csv" | "manual" | "api" | "scan" | "website";
  file_url: string | null;
  file_name: string | null;
  status: "pending" | "processing" | "completed" | "failed";
  row_count: number;
  error_message: string | null;
  created_at: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

// ─── UI Types ───

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}
