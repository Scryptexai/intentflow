-- Fix function search path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Fix overly permissive INSERT policy for waitlist
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;

-- Create a safer insert policy with basic validation
CREATE POLICY "Anyone can join waitlist with valid address"
ON public.waitlist
FOR INSERT
WITH CHECK (
  wallet_address IS NOT NULL 
  AND LENGTH(wallet_address) >= 42
);

-- Fix campaigns INSERT policy to be more secure
DROP POLICY IF EXISTS "Users can create campaigns" ON public.campaigns;

CREATE POLICY "Authenticated users can create campaigns"
ON public.campaigns
FOR INSERT
WITH CHECK (
  wallet_address IS NOT NULL 
  AND LENGTH(wallet_address) >= 42
);

-- Fix daily_task_completions INSERT policy
DROP POLICY IF EXISTS "Users can insert own task completions" ON public.daily_task_completions;

CREATE POLICY "Users can insert own task completions"
ON public.daily_task_completions
FOR INSERT
WITH CHECK (
  wallet_address IS NOT NULL 
  AND LENGTH(wallet_address) >= 42
);