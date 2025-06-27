
-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table  
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  location TEXT,
  date TEXT NOT NULL,
  category TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create static_content table for editable content
CREATE TABLE public.static_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.static_content ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs (public read, authenticated write)
CREATE POLICY "Public can view published blogs" 
  ON public.blogs 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Authenticated users can manage blogs" 
  ON public.blogs 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create policies for projects (public read, authenticated write)
CREATE POLICY "Public can view published projects" 
  ON public.projects 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Authenticated users can manage projects" 
  ON public.projects 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create policies for static_content (public read, authenticated write)
CREATE POLICY "Public can view static content" 
  ON public.static_content 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage static content" 
  ON public.static_content 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert some default static content
INSERT INTO public.static_content (key, title, content) VALUES
('hero_title', 'Hero Title', 'Rev Konstriksyon - Konstriksyon ak Renovasyon'),
('hero_subtitle', 'Hero Subtitle', 'Ekspètiz ak Kalite nan Chak Pwojè'),
('about_section', 'About Section', 'Nou se yon kominya ekspè nan konstriksyon ak renovasyon...');
