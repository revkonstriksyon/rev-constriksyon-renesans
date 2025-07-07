-- Add new fields to blogs table for enhanced functionality
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS cta_text TEXT,
ADD COLUMN IF NOT EXISTS cta_url TEXT,
ADD COLUMN IF NOT EXISTS author_en TEXT,
ADD COLUMN IF NOT EXISTS author_fr TEXT,
ADD COLUMN IF NOT EXISTS author_ht TEXT;

-- Create index for better performance on homepage filtering
CREATE INDEX IF NOT EXISTS idx_blogs_homepage ON public.blogs(show_on_homepage);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON public.blogs USING GIN(tags);

-- Update existing blogs to show on homepage by default
UPDATE public.blogs SET show_on_homepage = true WHERE show_on_homepage IS NULL;