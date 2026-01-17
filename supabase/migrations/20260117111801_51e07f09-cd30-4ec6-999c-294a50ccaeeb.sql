-- Fix: Update campaigns INSERT policy to verify wallet ownership from JWT claims
-- This prevents users from creating campaigns with other people's wallet addresses

-- Drop the existing weak INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create campaigns" ON public.campaigns;

-- Create a new INSERT policy that verifies the wallet_address matches the JWT claim
-- Users can only insert campaigns where the wallet_address matches their authenticated wallet
CREATE POLICY "Users can only create campaigns for their own wallet"
ON public.campaigns
FOR INSERT
TO authenticated
WITH CHECK (
  wallet_address IS NOT NULL 
  AND length(wallet_address) >= 42
  AND (
    -- Wallet address must match the authenticated user's wallet from JWT claims
    wallet_address = COALESCE(
      (current_setting('request.jwt.claims', true)::json ->> 'wallet_address'),
      ''
    )
    -- OR user_id must match auth.uid() if using traditional auth
    OR user_id = auth.uid()
  )
);

-- Also fix daily_task_completions INSERT policy for consistency
DROP POLICY IF EXISTS "Users can insert own task completions" ON public.daily_task_completions;

CREATE POLICY "Users can only insert own task completions"
ON public.daily_task_completions
FOR INSERT
TO authenticated
WITH CHECK (
  wallet_address IS NOT NULL 
  AND length(wallet_address) >= 42
  AND wallet_address = COALESCE(
    (current_setting('request.jwt.claims', true)::json ->> 'wallet_address'),
    ''
  )
);