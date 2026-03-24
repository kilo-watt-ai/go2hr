-- ============================================================================
-- Go2HR Database Schema
-- Run this in Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================================

-- ============================================================================
-- 1. PROFILES
-- Extends Supabase Auth users with app-specific data.
-- Auto-created when a user signs up via a trigger.
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'client' check (role in ('client', 'consultant', 'admin')),
  first_name text not null default '',
  last_name text not null default '',
  email text not null,
  phone text,
  avatar_url text,
  company text,
  industry text,
  company_size text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read any profile (needed for consultant directory)
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Admins can update any profile
create policy "Admins can update any profile"
  on public.profiles for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 2. CONSULTANT PROFILES
-- Additional data for users with role = 'consultant'
-- ============================================================================
create table public.consultant_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  slug text unique not null,
  headline text,
  bio text,
  credentials text[] not null default '{}',
  specialties text[] not null default '{}',
  industries text[] not null default '{}',
  states text[] not null default '{}',
  company_sizes text[] not null default '{}',
  years_experience integer not null default 0,
  hourly_rate numeric(10,2) not null default 150.00,
  linkedin_url text,
  verified boolean not null default false,
  approved boolean not null default false,
  next_available text,
  rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.consultant_profiles enable row level security;

-- Public can view approved consultants
create policy "Approved consultants are viewable by everyone"
  on public.consultant_profiles for select using (approved = true);

-- Consultants can view and update their own profile
create policy "Consultants can view own profile"
  on public.consultant_profiles for select using (auth.uid() = id);

create policy "Consultants can update own profile"
  on public.consultant_profiles for update using (auth.uid() = id);

-- Admins can do everything
create policy "Admins can manage consultant profiles"
  on public.consultant_profiles for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 3. CONSULTANT APPLICATIONS
-- Submitted when a consultant signs up, reviewed by admin
-- ============================================================================
create table public.consultant_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  credential text not null,
  years_experience integer not null default 0,
  specialties text[] not null default '{}',
  industries text[] not null default '{}',
  states text[] not null default '{}',
  linkedin_url text,
  references_text text,
  certificate_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  submitted_at timestamptz not null default now()
);

alter table public.consultant_applications enable row level security;

-- Applicants can view their own application
create policy "Applicants can view own application"
  on public.consultant_applications for select using (auth.uid() = user_id);

-- Anyone can insert (signup form)
create policy "Anyone can submit application"
  on public.consultant_applications for insert with check (true);

-- Admins can view and update all
create policy "Admins can manage applications"
  on public.consultant_applications for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 4. BOOKINGS / SESSIONS
-- A session booked between a client and consultant
-- ============================================================================
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id),
  consultant_id uuid not null references auth.users(id),
  session_type text not null default 'session' check (session_type in ('session', 'audit', 'package')),
  duration_minutes integer not null default 60,
  scheduled_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'completed', 'cancelled', 'no_show')),
  amount numeric(10,2) not null,
  platform_fee numeric(10,2) not null,
  consultant_payout numeric(10,2) not null,
  notes text,
  meeting_url text,
  cancelled_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

-- Clients can view their own bookings
create policy "Clients can view own bookings"
  on public.bookings for select using (auth.uid() = client_id);

-- Consultants can view bookings assigned to them
create policy "Consultants can view assigned bookings"
  on public.bookings for select using (auth.uid() = consultant_id);

-- Admins can manage all bookings
create policy "Admins can manage bookings"
  on public.bookings for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 5. TRANSACTIONS
-- Financial ledger for all money movement
-- ============================================================================
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id),
  type text not null check (type in ('charge', 'payout', 'refund', 'subscription')),
  amount numeric(10,2) not null,
  platform_fee numeric(10,2) not null default 0,
  client_id uuid references auth.users(id),
  consultant_id uuid references auth.users(id),
  stripe_payment_id text,
  stripe_payout_id text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'released')),
  description text,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

-- Clients see their charges
create policy "Clients can view own transactions"
  on public.transactions for select using (auth.uid() = client_id);

-- Consultants see their payouts
create policy "Consultants can view own transactions"
  on public.transactions for select using (auth.uid() = consultant_id);

-- Admins can manage all
create policy "Admins can manage transactions"
  on public.transactions for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 6. MESSAGES
-- Direct messages between clients and consultants
-- ============================================================================
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id text not null,  -- e.g., "user1_user2" (sorted UUIDs)
  sender_id uuid not null references auth.users(id),
  recipient_id uuid not null references auth.users(id),
  text text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_messages_recipient on public.messages(recipient_id, read);

alter table public.messages enable row level security;

-- Users can view messages they sent or received
create policy "Users can view own messages"
  on public.messages for select using (
    auth.uid() = sender_id or auth.uid() = recipient_id
  );

-- Users can send messages
create policy "Users can send messages"
  on public.messages for insert with check (auth.uid() = sender_id);

-- Users can mark their received messages as read
create policy "Users can mark messages read"
  on public.messages for update using (auth.uid() = recipient_id);

-- Admins can view all
create policy "Admins can view all messages"
  on public.messages for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 7. REVIEWS
-- Client reviews of consultants, with optional consultant response
-- ============================================================================
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id),
  client_id uuid not null references auth.users(id),
  consultant_id uuid not null references auth.users(id),
  rating integer not null check (rating >= 1 and rating <= 5),
  text text not null check (char_length(text) <= 300),
  response text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  moderated_by uuid references auth.users(id),
  moderated_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_reviews_consultant on public.reviews(consultant_id, status);

alter table public.reviews enable row level security;

-- Public can view approved reviews
create policy "Approved reviews are public"
  on public.reviews for select using (status = 'approved');

-- Clients can view own reviews regardless of status
create policy "Clients can view own reviews"
  on public.reviews for select using (auth.uid() = client_id);

-- Clients can create reviews
create policy "Clients can create reviews"
  on public.reviews for insert with check (auth.uid() = client_id);

-- Consultants can add responses to their reviews
create policy "Consultants can respond to reviews"
  on public.reviews for update using (auth.uid() = consultant_id);

-- Admins can manage all reviews
create policy "Admins can manage reviews"
  on public.reviews for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 8. DOCUMENTS
-- Files shared between clients and consultants per session
-- ============================================================================
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id),
  uploaded_by uuid not null references auth.users(id),
  file_name text not null,
  file_url text not null,
  file_type text,  -- 'pdf', 'docx', 'xlsx'
  file_size integer,  -- bytes
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;

-- Users involved in the booking can view documents
create policy "Booking participants can view documents"
  on public.documents for select using (
    exists (
      select 1 from public.bookings
      where bookings.id = documents.booking_id
        and (bookings.client_id = auth.uid() or bookings.consultant_id = auth.uid())
    )
  );

-- Users can upload documents to their bookings
create policy "Users can upload documents"
  on public.documents for insert with check (auth.uid() = uploaded_by);

-- Admins can manage all
create policy "Admins can manage documents"
  on public.documents for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 9. BLOG POSTS
-- Admin-managed content for SEO
-- ============================================================================
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  category text,
  read_time integer not null default 5,
  author_name text not null,
  author_consultant_id uuid references public.consultant_profiles(id),
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

-- Public can view published posts
create policy "Published posts are public"
  on public.blog_posts for select using (published = true);

-- Admins can manage all posts
create policy "Admins can manage blog posts"
  on public.blog_posts for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- 10. SITE SETTINGS
-- Key-value store for admin-configurable settings
-- ============================================================================
create table public.site_settings (
  key text primary key,
  value text not null,
  label text not null,
  category text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.site_settings enable row level security;

-- Public can read settings (needed for pricing display etc.)
create policy "Settings are readable by everyone"
  on public.site_settings for select using (true);

-- Only admins can update
create policy "Admins can update settings"
  on public.site_settings for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Seed default settings
insert into public.site_settings (key, value, label, category) values
  ('site_name', 'Go2HR', 'Site Name', 'site'),
  ('default_hourly_rate', '150', 'Default Hourly Rate ($)', 'site'),
  ('platform_fee_percent', '20', 'Platform Fee (%)', 'site'),
  ('session_types', '30,60', 'Session Durations (minutes)', 'site'),
  ('admin_email', 'hello@go2hr.com', 'Admin Notification Email', 'email'),
  ('payout_delay_hours', '24', 'Payout Delay (hours)', 'payments'),
  ('consultant_split_percent', '80', 'Consultant Split (%)', 'payments'),
  ('tax_threshold', '600', '1099-K Threshold ($)', 'payments'),
  ('review_moderation', 'true', 'Manual Review Moderation', 'moderation'),
  ('min_reviews_for_rating', '3', 'Min Reviews for Rating Display', 'moderation'),
  ('review_char_limit', '300', 'Review Character Limit', 'moderation'),
  ('document_retention_months', '24', 'Document Retention (months)', 'moderation');

-- ============================================================================
-- 11. AVAILABILITY
-- Consultant weekly schedule
-- ============================================================================
create table public.availability (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references auth.users(id) on delete cascade,
  day_of_week integer not null check (day_of_week >= 0 and day_of_week <= 6),  -- 0=Sunday
  start_time time not null,
  end_time time not null,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  unique(consultant_id, day_of_week)
);

alter table public.availability enable row level security;

-- Public can view availability (needed for booking)
create policy "Availability is public"
  on public.availability for select using (true);

-- Consultants can manage their own availability
create policy "Consultants can manage own availability"
  on public.availability for all using (auth.uid() = consultant_id);

-- ============================================================================
-- 12. SUBSCRIPTIONS
-- Monthly package subscriptions
-- ============================================================================
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references auth.users(id),
  consultant_id uuid not null references auth.users(id),
  plan_name text not null,  -- '5-Hour Package', '10-Hour Package'
  monthly_amount numeric(10,2) not null,
  hours_per_month integer not null,
  hours_used numeric(5,2) not null default 0,
  stripe_subscription_id text,
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  cancelled_at timestamptz
);

alter table public.subscriptions enable row level security;

-- Clients can view their subscriptions
create policy "Clients can view own subscriptions"
  on public.subscriptions for select using (auth.uid() = client_id);

-- Consultants can view subscriptions assigned to them
create policy "Consultants can view assigned subscriptions"
  on public.subscriptions for select using (auth.uid() = consultant_id);

-- Admins can manage all
create policy "Admins can manage subscriptions"
  on public.subscriptions for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, first_name, last_name, company)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    coalesce(new.raw_user_meta_data->>'firstName', ''),
    coalesce(new.raw_user_meta_data->>'lastName', ''),
    coalesce(new.raw_user_meta_data->>'company', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update the updated_at timestamp
create or replace function public.update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_timestamp
  before update on public.profiles
  for each row execute function public.update_timestamp();

create trigger update_consultant_profiles_timestamp
  before update on public.consultant_profiles
  for each row execute function public.update_timestamp();

create trigger update_bookings_timestamp
  before update on public.bookings
  for each row execute function public.update_timestamp();

create trigger update_blog_posts_timestamp
  before update on public.blog_posts
  for each row execute function public.update_timestamp();

-- Update consultant rating when a review is approved
create or replace function public.update_consultant_rating()
returns trigger as $$
begin
  update public.consultant_profiles
  set
    rating = (
      select coalesce(avg(rating), 0)
      from public.reviews
      where consultant_id = new.consultant_id and status = 'approved'
    ),
    review_count = (
      select count(*)
      from public.reviews
      where consultant_id = new.consultant_id and status = 'approved'
    )
  where id = new.consultant_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_status_change
  after insert or update of status on public.reviews
  for each row
  when (new.status = 'approved')
  execute function public.update_consultant_rating();

-- ============================================================================
-- VIEWS (useful for admin dashboard)
-- ============================================================================

-- Consultant earnings summary
create or replace view public.consultant_earnings as
select
  cp.id,
  p.first_name || ' ' || p.last_name as name,
  count(b.id) as total_sessions,
  coalesce(sum(b.consultant_payout), 0) as total_earned,
  coalesce(sum(case when b.status = 'completed' and t.status = 'released' then 0 else b.consultant_payout end), 0) as pending_payout,
  coalesce(sum(case when t.status = 'released' then b.consultant_payout else 0 end), 0) as paid_out,
  max(b.scheduled_at) as last_session
from public.consultant_profiles cp
join public.profiles p on p.id = cp.id
left join public.bookings b on b.consultant_id = cp.id and b.status = 'completed'
left join public.transactions t on t.booking_id = b.id and t.type = 'payout'
group by cp.id, p.first_name, p.last_name;

-- Business spending summary
create or replace view public.business_spending as
select
  p.id,
  p.first_name || ' ' || p.last_name as contact_name,
  p.company,
  count(b.id) as total_sessions,
  coalesce(sum(b.amount), 0) as total_paid,
  max(b.created_at) as last_payment,
  s.plan_name as active_plan
from public.profiles p
left join public.bookings b on b.client_id = p.id and b.status in ('completed', 'confirmed')
left join public.subscriptions s on s.client_id = p.id and s.status = 'active'
where p.role = 'client'
group by p.id, p.first_name, p.last_name, p.company, s.plan_name;
