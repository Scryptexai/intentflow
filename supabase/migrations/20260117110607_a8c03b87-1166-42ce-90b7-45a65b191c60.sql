-- Fix waitlist_stats view by recreating it with SECURITY INVOKER (views use INVOKER by default)
-- For views, we apply security through the underlying tables rather than the view itself
-- The waitlist table already has RLS, so the view inherits that protection

-- Drop and recreate the view with explicit security settings
DROP VIEW IF EXISTS public.waitlist_stats;
CREATE VIEW public.waitlist_stats WITH (security_invoker = true) AS
SELECT COUNT(*) as total_count FROM public.waitlist;