// ─── Types ───
export interface Book {
  title: string;
  genre: string;
  asin: string;
  royalties: number;
  units: number;
  ku: number;
  bsr: number;
  reviews: number;
  bsr_change: number;
  rev_change: number;
}

export interface Contact {
  name: string;
  type: string;
  blog: string;
  status: string;
  tags: string[];
  last: string;
  avatar: string;
}

export interface Automation {
  id: string;
  icon: string;
  name: string;
  desc: string;
  freq: string;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}

// ─── Navigation ───
export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", icon: "📊", label: "Dashboard", href: "/dashboard" },
  { id: "metadata", icon: "✏️", label: "Metadata Helper", href: "/metadata" },
  { id: "crm", icon: "👥", label: "Reviewer CRM", href: "/crm" },
  { id: "automations", icon: "⚡", label: "Automations", href: "/automations" },
];

// ─── Books ───
export const MOCK_BOOKS: Book[] = [
  { title: "The Hollow King", genre: "Fantasy", asin: "B0CX1234", royalties: 847.32, units: 312, ku: 18400, bsr: 4821, reviews: 47, bsr_change: -312, rev_change: 3 },
  { title: "Salt & Silence", genre: "Literary Fiction", asin: "B0CX5678", royalties: 234.10, units: 89, ku: 4200, bsr: 28450, reviews: 12, bsr_change: 1200, rev_change: 0 },
  { title: "Investor Zero", genre: "Nonfiction", asin: "B0CX9012", royalties: 1204.55, units: 521, ku: 0, bsr: 1823, reviews: 98, bsr_change: -890, rev_change: 7 },
];

// ─── Sparkline data ───
export const SPARKLINE_DATA = {
  royalties: [320, 410, 390, 520, 610, 580, 720, 847],
  units: [200, 250, 230, 280, 310, 290, 350, 410],
  reviews: [120, 125, 130, 138, 142, 148, 152, 157],
};

// ─── CRM Contacts ───
export const MOCK_CONTACTS: Contact[] = [
  { name: "Jessica Park", type: "Book Blogger", blog: "ParksAndPages.com", status: "Awaiting reply", tags: ["fantasy", "ARC"], last: "3 days ago", avatar: "JP" },
  { name: "Marcus Webb", type: "Librarian", blog: "Tampa Public Library", status: "Follow up needed", tags: ["nonfiction"], last: "12 days ago", avatar: "MW" },
  { name: "Rina Castillo", type: "Reviewer", blog: "GoodReads #TopReviewer", status: "Responded ✓", tags: ["fantasy", "romance"], last: "1 day ago", avatar: "RC" },
  { name: "Dave Thornton", type: "Podcaster", blog: "The Indie Shelf", status: "New contact", tags: ["all genres"], last: "—", avatar: "DT" },
  { name: "Sarah Kim", type: "Book Blogger", blog: "WellReadSarah.com", status: "Awaiting reply", tags: ["thriller", "mystery"], last: "7 days ago", avatar: "SK" },
];

export const STATUS_COLORS: Record<string, string> = {
  "Awaiting reply": "#F59E0B",
  "Follow up needed": "#EF4444",
  "Responded ✓": "#10B981",
  "New contact": "#6366F1",
};

// ─── Automations ───
export const MOCK_AUTOMATIONS: Automation[] = [
  { id: "digest", icon: "📬", name: "Daily Sales Digest", desc: "Morning email with royalties, units, KU reads, and top keyword ideas. Never log in just to check numbers again.", freq: "Daily 8am" },
  { id: "bsr", icon: "📈", name: "BSR Movement Alert", desc: "Instant notification when any title's BSR improves or drops by more than 20%. Catch momentum before it passes.", freq: "Real-time" },
  { id: "review", icon: "⭐", name: "New Review Alert", desc: "Alert the moment a new review lands on any of your titles, with a direct link to respond or share.", freq: "Real-time" },
  { id: "followup", icon: "✉️", name: "Reviewer Follow-Up Nudge", desc: "Reminder to follow up with contacts who haven't replied after 7 days. Keeps your outreach pipeline moving.", freq: "Weekly" },
  { id: "promo", icon: "🚀", name: "Promo Scheduling Reminder", desc: "Reminder to schedule a BookBub or Freebooksy promo 3 weeks before your planned sale. Never miss a window.", freq: "Custom" },
];

// ─── Quick Prompts (per section) ───
export const QUICK_PROMPTS: Record<string, string[]> = {
  dashboard: ["Why is my BSR going up?", "Which book is performing best?", "How do I improve royalties?"],
  metadata: ["Write a blurb for a fantasy novel", "Suggest keywords for my thriller", "Give me 3 Amazon ad angles"],
  crm: ["How do I find book reviewers?", "Write a cold outreach email", "How many follow-ups should I send?"],
  automations: ["What automations should I set up first?", "Set up a launch sequence for me", "How does the daily digest work?"],
};

// ─── Genres ───
export const GENRES = ["Fantasy", "Romance", "Thriller", "Sci-Fi", "Nonfiction", "Mystery", "Literary Fiction"];

// ─── Ad Copy Angles ───
export const AD_COPY_ANGLES = [
  { angle: "The Hook", copy: "A king without a throne. A prophecy without a hero. Everything depends on the boy no one expected." },
  { angle: "The Stakes", copy: "One wrong choice and five kingdoms fall. No pressure." },
  { angle: "The Comp", copy: "If you loved Brandon Sanderson's Stormlight Archive, The Hollow King is your next obsession." },
  { angle: "The Promise", copy: "An epic magic system, shocking betrayals, and a finale that readers are calling 'unforgettable.'" },
  { angle: "The Social", copy: "98% 4-5 star reviews. 'I read it in one sitting.' Start the series free today." },
];
