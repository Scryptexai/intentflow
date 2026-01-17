-- Create waitlist table for storing wallet addresses
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  twitter_followed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (anyone can join waitlist)
CREATE POLICY "Anyone can join waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading (optional - for admin or analytics)
CREATE POLICY "Anyone can read waitlist count" 
ON public.waitlist 
FOR SELECT 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_wallet ON public.waitlist(wallet_address);
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at DESC);