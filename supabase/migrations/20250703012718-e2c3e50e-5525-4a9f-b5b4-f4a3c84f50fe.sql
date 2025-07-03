
-- Create a table for homepage slider content
CREATE TABLE public.homepage_slider (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  main_image_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT NOT NULL,
  description TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  link_url TEXT,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for homepage slider
ALTER TABLE public.homepage_slider ENABLE ROW LEVEL SECURITY;

-- Public can view active slider items
CREATE POLICY "Public can view active slider items" 
  ON public.homepage_slider 
  FOR SELECT 
  USING (is_active = true);

-- Authenticated users can manage slider items
CREATE POLICY "Authenticated users can manage slider items" 
  ON public.homepage_slider 
  FOR ALL 
  USING (auth.role() = 'authenticated'::text);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_homepage_slider_order ON public.homepage_slider(order_position);
CREATE INDEX IF NOT EXISTS idx_homepage_slider_active ON public.homepage_slider(is_active);
