-- Create storage bucket for badge images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('badges', 'badges', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to badges
CREATE POLICY "Public can view badges"
ON storage.objects FOR SELECT
USING (bucket_id = 'badges');

-- Allow service role to upload badges
CREATE POLICY "Service role can upload badges"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'badges');