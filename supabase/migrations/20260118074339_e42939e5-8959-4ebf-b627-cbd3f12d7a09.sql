-- Add share_count column to waitlist table
ALTER TABLE public.waitlist 
ADD COLUMN IF NOT EXISTS share_count integer NOT NULL DEFAULT 0;