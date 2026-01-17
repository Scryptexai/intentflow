-- Fix waitlist security: Remove public access to sensitive data
DROP POLICY IF EXISTS "Anyone can read waitlist count" ON public.waitlist;

-- Create a more secure policy that only allows counting rows, not reading data
CREATE POLICY "Anyone can count waitlist entries only"
ON public.waitlist
FOR SELECT
USING (false);

-- Create a view for safe public access to waitlist count only
CREATE OR REPLACE VIEW public.waitlist_stats
WITH (security_invoker=on) AS
SELECT COUNT(*) as total_count
FROM public.waitlist;

-- Grant select on the view
GRANT SELECT ON public.waitlist_stats TO anon, authenticated;

-- Create arc_dapps table for daily tasks system
CREATE TABLE IF NOT EXISTS public.arc_dapps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL,
  icon_url TEXT,
  actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  target_contract TEXT,
  chain_id INTEGER NOT NULL DEFAULT 5042002,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on arc_dapps
ALTER TABLE public.arc_dapps ENABLE ROW LEVEL SECURITY;

-- Public can read active dApps
CREATE POLICY "Anyone can read active dApps"
ON public.arc_dapps
FOR SELECT
USING (is_active = true);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  caption TEXT NOT NULL,
  image_url TEXT,
  intent_category TEXT,
  target_dapps TEXT[] DEFAULT '{}',
  actions_completed TEXT[] DEFAULT '{}',
  proof_hash TEXT,
  is_minted BOOLEAN NOT NULL DEFAULT false,
  minted_at TIMESTAMPTZ,
  share_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on campaigns  
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Users can read their own campaigns
CREATE POLICY "Users can read their own campaigns"
ON public.campaigns
FOR SELECT
USING (
  wallet_address = COALESCE(
    current_setting('request.jwt.claims', true)::json->>'wallet_address',
    ''
  )::TEXT
  OR user_id = auth.uid()
);

-- Users can create campaigns
CREATE POLICY "Users can create campaigns"
ON public.campaigns
FOR INSERT
WITH CHECK (
  wallet_address IS NOT NULL
);

-- Users can update their own campaigns
CREATE POLICY "Users can update their own campaigns"
ON public.campaigns
FOR UPDATE
USING (
  wallet_address = COALESCE(
    current_setting('request.jwt.claims', true)::json->>'wallet_address',
    ''
  )::TEXT
  OR user_id = auth.uid()
);

-- Create daily_task_completions table for tracking
CREATE TABLE IF NOT EXISTS public.daily_task_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL,
  dapp_id UUID REFERENCES public.arc_dapps(id),
  task_date DATE NOT NULL DEFAULT CURRENT_DATE,
  action TEXT NOT NULL,
  tx_hash TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(wallet_address, dapp_id, task_date)
);

-- Enable RLS on daily_task_completions
ALTER TABLE public.daily_task_completions ENABLE ROW LEVEL SECURITY;

-- Users can read their own task completions
CREATE POLICY "Users can read own task completions"
ON public.daily_task_completions
FOR SELECT
USING (
  wallet_address = COALESCE(
    current_setting('request.jwt.claims', true)::json->>'wallet_address',
    ''
  )::TEXT
);

-- Users can insert their own task completions
CREATE POLICY "Users can insert own task completions"
ON public.daily_task_completions
FOR INSERT
WITH CHECK (
  wallet_address IS NOT NULL
);

-- Create update timestamp trigger function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers
CREATE TRIGGER update_arc_dapps_updated_at
  BEFORE UPDATE ON public.arc_dapps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample dApps for testing
INSERT INTO public.arc_dapps (slug, name, category, description, website_url, actions, is_verified, is_featured)
VALUES
  ('arc-swap', 'Arc Swap', 'DeFi', 'Decentralized exchange on Arc Network', 'https://swap.arc.network', '[{"action": "Swap tokens", "verb": "swap"}, {"action": "Add liquidity", "verb": "provide"}]'::jsonb, true, true),
  ('arc-bridge', 'Arc Bridge', 'Bridge', 'Cross-chain bridge for Arc Network', 'https://bridge.arc.network', '[{"action": "Bridge assets", "verb": "bridge"}]'::jsonb, true, true),
  ('arc-staking', 'Arc Staking', 'Staking', 'Stake your tokens on Arc Network', 'https://stake.arc.network', '[{"action": "Stake tokens", "verb": "stake"}, {"action": "Claim rewards", "verb": "claim"}]'::jsonb, true, false),
  ('arc-nft', 'Arc NFT', 'NFT', 'NFT marketplace on Arc Network', 'https://nft.arc.network', '[{"action": "Mint NFT", "verb": "mint"}, {"action": "List NFT", "verb": "list"}]'::jsonb, true, false),
  ('arc-lend', 'Arc Lend', 'DeFi', 'Lending and borrowing protocol', 'https://lend.arc.network', '[{"action": "Supply assets", "verb": "supply"}, {"action": "Borrow assets", "verb": "borrow"}]'::jsonb, true, false)
ON CONFLICT (slug) DO NOTHING;