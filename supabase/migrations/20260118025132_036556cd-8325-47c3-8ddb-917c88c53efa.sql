-- Add badge columns to waitlist table
ALTER TABLE public.waitlist 
ADD COLUMN IF NOT EXISTS badge_minted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS badge_minted_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS badge_image_url text;

-- Create index for badge queries
CREATE INDEX IF NOT EXISTS idx_waitlist_badge_minted ON public.waitlist(badge_minted);

-- Update RLS policy to allow users to update their own badge status
CREATE POLICY "Users can update their own badge status" 
ON public.waitlist 
FOR UPDATE 
USING (wallet_address = wallet_address)
WITH CHECK (wallet_address = wallet_address);