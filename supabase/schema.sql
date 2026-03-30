-- ╔══════════════════════════════════════════════════════════╗
-- ║  Authr Associates — Database Schema                     ║
-- ║  Run this in Supabase SQL Editor                        ║
-- ╚══════════════════════════════════════════════════════════╝

-- ─── Profiles ───
-- Extended user profile linked to Supabase Auth
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  email text,
  avatar_url text,
  plan_status text default 'trial' check (plan_status in ('trial', 'active', 'cancelled', 'expired', 'waitlist')),
  trial_ends_at timestamptz default (now() + interval '14 days'),
  stripe_customer_id text unique,
  stripe_subscription_id text,
  onboarding_done boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Books ───
create table if not exists public.books (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  genre text,
  asin text,
  isbn text,
  description text,
  cover_url text,
  tags text[] default '{}',
  seo_keywords text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Sales Snapshots ───
create table if not exists public.sales_snapshots (
  id uuid default gen_random_uuid() primary key,
  book_id uuid references public.books(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  snapshot_date date not null,
  royalties numeric(10,2) default 0,
  units integer default 0,
  ku_reads integer default 0,
  bsr integer,
  review_count integer default 0,
  created_at timestamptz default now(),
  unique(book_id, snapshot_date)
);

-- ─── Contacts (CRM) ───
create table if not exists public.contacts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  email text,
  type text default 'Other' check (type in ('Reviewer', 'Blogger', 'Librarian', 'Media', 'Podcaster', 'Other')),
  blog text,
  status text default 'New' check (status in ('New', 'Awaiting reply', 'Responded', 'Declined', 'Follow up needed')),
  tags text[] default '{}',
  notes text,
  last_contacted timestamptz,
  follow_up_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Chat History ───
create table if not exists public.chat_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text default 'New Chat',
  messages jsonb default '[]'::jsonb,
  section text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Imports ───
create table if not exists public.imports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  source_type text not null check (source_type in ('kdp_csv', 'manual', 'api', 'scan', 'website')),
  file_url text,
  file_name text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  row_count integer default 0,
  error_message text,
  created_at timestamptz default now()
);

-- ─── Waitlist ───
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

-- ─── Row Level Security ───
alter table public.profiles enable row level security;
alter table public.books enable row level security;
alter table public.sales_snapshots enable row level security;
alter table public.contacts enable row level security;
alter table public.chat_history enable row level security;
alter table public.imports enable row level security;
alter table public.waitlist enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Books: users can CRUD their own books
create policy "Users can view own books" on public.books
  for select using (auth.uid() = user_id);
create policy "Users can insert own books" on public.books
  for insert with check (auth.uid() = user_id);
create policy "Users can update own books" on public.books
  for update using (auth.uid() = user_id);
create policy "Users can delete own books" on public.books
  for delete using (auth.uid() = user_id);

-- Sales Snapshots: users can CRUD their own
create policy "Users can view own snapshots" on public.sales_snapshots
  for select using (auth.uid() = user_id);
create policy "Users can insert own snapshots" on public.sales_snapshots
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own snapshots" on public.sales_snapshots
  for delete using (auth.uid() = user_id);

-- Contacts: users can CRUD their own
create policy "Users can view own contacts" on public.contacts
  for select using (auth.uid() = user_id);
create policy "Users can insert own contacts" on public.contacts
  for insert with check (auth.uid() = user_id);
create policy "Users can update own contacts" on public.contacts
  for update using (auth.uid() = user_id);
create policy "Users can delete own contacts" on public.contacts
  for delete using (auth.uid() = user_id);

-- Chat History: users can CRUD their own
create policy "Users can view own chats" on public.chat_history
  for select using (auth.uid() = user_id);
create policy "Users can insert own chats" on public.chat_history
  for insert with check (auth.uid() = user_id);
create policy "Users can update own chats" on public.chat_history
  for update using (auth.uid() = user_id);
create policy "Users can delete own chats" on public.chat_history
  for delete using (auth.uid() = user_id);

-- Imports: users can CRUD their own
create policy "Users can view own imports" on public.imports
  for select using (auth.uid() = user_id);
create policy "Users can insert own imports" on public.imports
  for insert with check (auth.uid() = user_id);

-- Waitlist: anyone can insert (public signup), only service role can read
create policy "Anyone can join waitlist" on public.waitlist
  for insert with check (true);

-- ─── Indexes ───
create index if not exists idx_books_user_id on public.books(user_id);
create index if not exists idx_snapshots_book_id on public.sales_snapshots(book_id);
create index if not exists idx_snapshots_user_id on public.sales_snapshots(user_id);
create index if not exists idx_snapshots_date on public.sales_snapshots(snapshot_date);
create index if not exists idx_contacts_user_id on public.contacts(user_id);
create index if not exists idx_chat_user_id on public.chat_history(user_id);
create index if not exists idx_imports_user_id on public.imports(user_id);
