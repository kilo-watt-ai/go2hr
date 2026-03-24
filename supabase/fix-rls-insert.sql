-- Run this in Supabase Dashboard → SQL Editor → New Query
-- Fixes: profile insert blocked by RLS when creating users from admin panel

-- Allow profile inserts (the trigger creates profiles, and the admin API also inserts directly)
CREATE POLICY "Allow insert for new profiles"
  ON public.profiles FOR INSERT
  WITH CHECK (true);
