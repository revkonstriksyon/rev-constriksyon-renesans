
-- Add inspiration gallery table
CREATE TABLE public.inspiration_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  source_url TEXT,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for inspiration gallery
ALTER TABLE public.inspiration_gallery ENABLE ROW LEVEL SECURITY;

-- Public can view active gallery items
CREATE POLICY "Public can view active gallery items" 
  ON public.inspiration_gallery 
  FOR SELECT 
  USING (is_active = true);

-- Authenticated users can manage gallery items
CREATE POLICY "Authenticated users can manage gallery items" 
  ON public.inspiration_gallery 
  FOR ALL 
  USING (auth.role() = 'authenticated'::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inspiration_gallery_order ON public.inspiration_gallery(order_position);
CREATE INDEX IF NOT EXISTS idx_inspiration_gallery_active ON public.inspiration_gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_inspiration_gallery_category ON public.inspiration_gallery(category);

-- Add individual project detail pages support
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS content TEXT;

-- Update project types to include new categories
ALTER TABLE public.projects 
DROP CONSTRAINT IF EXISTS projects_project_type_check;

ALTER TABLE public.projects 
ADD CONSTRAINT projects_project_type_check 
CHECK (project_type IN ('reyalize', 'an-kour', 'planifye', 'konsèp'));

-- Insert sample project data for Delmas 55
INSERT INTO public.projects (
  title, 
  description, 
  image_url, 
  location, 
  date, 
  category, 
  project_type, 
  slug,
  images,
  tags,
  featured,
  published,
  content,
  meta_title,
  meta_description
) VALUES (
  'Rezidans Delmas 55',
  'Yon espas modèn ki reponn ak tout estanda konfor ak fonksyonalite.',
  'https://raw.githubusercontent.com/revkonstriksyon/revkonstriksyon/refs/heads/main/foto/kay.jpeg',
  'Delmas 55',
  '2024',
  'Pwojè Reyalize',
  'reyalize',
  'delmas-55',
  ARRAY[
    'https://raw.githubusercontent.com/revkonstriksyon/revkonstriksyon/refs/heads/main/foto/kay11.jpeg',
    'https://raw.githubusercontent.com/revkonstriksyon/revkonstriksyon/refs/heads/main/foto/kay12.jpeg',
    'https://raw.githubusercontent.com/revkonstriksyon/revkonstriksyon/refs/heads/main/foto/kay13.jpeg',
    'https://raw.githubusercontent.com/revkonstriksyon/revkonstriksyon/refs/heads/main/foto/deyekay.jpeg',
    'https://raw.githubusercontent.com/revkonstriksyon/revkonstriksyon/refs/heads/main/foto/deyekay2.jpeg'
  ],
  ARRAY['Delmas', 'rezidans prive', 'kay modèn', 'pisin', 'renovasyon', 'endepandans', 'jaden', 'parking'],
  true,
  true,
  'Rezidans sa a se yon kay modèn ki bati pa Rev Konstriksyon pou yon kliyan espesyal — Mr. Guy Cadely — nan Delmas 55. Li se yon espas ki konbine style, konfò, ak pratik.

Kay la gen:
• Yon gwo salon ki konekte ak yon sal manje klere ak ouvè.
• Yon kizin modèn ak plan granit.
• 1 chanm envite ak douch prive nan nivo rez-de-chausée.
• Yon etaj ak yon sal detant, 2 chanm ak douch prive, epi yon master suite ki gen walk-in closet ak bèl douch.
• Yon terras ak pisin dèyè, espas kawotaj ak seramik, ak gazon atifisyèl.
• Yon endepandans ki gen 2 chanm, yon kizin endepandan, ak yon biwo.

Lakou a ka kenbe plis pase 7 machin, epi li gen jaden ki byen ame.

Pwojè sa a se yon egzanp klè sou kapasite Rev Konstriksyon pou bay kliyan li yo bon jan travay, style, ak presizyon teknik.',
  'Rezidans Delmas 55 – Kay Modèn ak Pisin',
  'Dekouvri yon rezidans modèn ki bati pa Rev Konstriksyon pou Guy Cadely nan Delmas 55. Gwo lakou, pisin, teras, endepandans, ak tout konfor modèn.'
);

-- Insert some sample inspiration gallery items
INSERT INTO public.inspiration_gallery (title, description, image_url, category, tags, order_position) VALUES
('Dekorasyon Enteryè Modèn', 'Enspirasyon pou salon ak sal manje modèn', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Dekorasyon Enteryè', ARRAY['salon', 'modèn', 'dekorasyon'], 1),
('Pisin ak Jaden', 'Ide pou amenajman pisin ak espas ekstè', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Pisin', ARRAY['pisin', 'jaden', 'ekstè'], 2),
('Kizin Modèn', 'Konsèp kizin ak teknoloji modèn', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Kizin', ARRAY['kizin', 'modèn', 'teknoloji'], 3),
('Chanm Prensipal', 'Ide pou yon chanm prensipal ak konfor', 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Chanm', ARRAY['chanm', 'konfor', 'detant'], 4),
('Terras ak Amenajman', 'Enspirasyon pou terras ak espas relaks', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Terras', ARRAY['terras', 'relaks', 'amenajman'], 5);
