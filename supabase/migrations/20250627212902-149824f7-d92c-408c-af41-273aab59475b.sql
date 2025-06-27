
-- Add contact information to static_content
INSERT INTO public.static_content (key, title, content) VALUES
('contact_phone_1', 'Telefòn 1', '+509 3456-7890'),
('contact_phone_2', 'Telefòn 2', '+509 2812-3456'),
('contact_email_1', 'Email Prensipal', 'info@revkonstriksyon.com'),
('contact_email_2', 'Email Devis', 'devis@revkonstriksyon.com'),
('contact_address', 'Adrès', '123 Rue Lamarre, Péguy-Ville, Port-au-Prince, Haïti'),
('contact_hours', 'Otè Travay', 'Lendi - Vandredi: 7:00 AM - 5:00 PM, Samdi: 8:00 AM - 2:00 PM'),
('social_facebook', 'Facebook', '#'),
('social_instagram', 'Instagram', '#'),
('social_twitter', 'Twitter', '#'),
('services_section_title', 'Tit Sèvis', 'Sèvis Nou Yo'),
('services_section_subtitle', 'Sou-tit Sèvis', 'Nou ofri yon pakèt sèvis konstriksyon ak renovasyon'),
('about_title', 'Tit Sou Nou', 'Sou Rev Konstriksyon'),
('cta_primary_text', 'CTA Prensipal', 'Jwenn Konsiltasyon Gratis'),
('cta_secondary_text', 'CTA Segondè', 'Gade Pwojè Nou Yo');

-- Create services table for dynamic services management
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  features TEXT[], -- Array of features
  price_range TEXT,
  duration TEXT,
  order_position INTEGER DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published services" 
  ON public.services 
  FOR SELECT 
  USING (published = true);

CREATE POLICY "Authenticated users can manage services" 
  ON public.services 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert default services
INSERT INTO public.services (title, description, features, price_range, duration, order_position) VALUES
('Renovasyon Konplè', 'Renovasyon konplè kay ak apartman yo ak materyèl kalite segondè men', 
  ARRAY['Plan ak konsèy', 'Travay elektrik ak plonbri', 'Fini ak dekorasyon', 'Garanti 2 an'], 
  '15,000 - 50,000 USD', '2-4 mwa', 1),
('Extansyon Kay', 'Agrandi espas ou ak extansyon ki konsèy ak règleman yo', 
  ARRAY['Etid fezabilite', 'Plan achitekti', 'Permè ak otorizasyon', 'Konstriksyon ak fini'], 
  '20,000 - 80,000 USD', '3-6 mwa', 2),
('Konstriksyon Nouvo', 'Konstriksyon nouvo kay ak materyèl ak teknoloji modèn yo', 
  ARRAY['Design ak plan', 'Fondasyon ak estrikti', 'Tout fini', 'Garanté ak swivi'], 
  '40,000 - 150,000 USD', '6-12 mwa', 3);
