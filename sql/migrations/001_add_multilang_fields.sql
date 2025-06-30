-- Add multilingual fields to existing tables
-- Run this script in Supabase SQL Editor

-- Add multilang fields to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS title_ht TEXT,
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_ht TEXT,
ADD COLUMN IF NOT EXISTS excerpt_fr TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS content_ht TEXT,
ADD COLUMN IF NOT EXISTS content_fr TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS category_ht TEXT,
ADD COLUMN IF NOT EXISTS category_fr TEXT,
ADD COLUMN IF NOT EXISTS category_en TEXT,
ADD COLUMN IF NOT EXISTS author_ht TEXT,
ADD COLUMN IF NOT EXISTS author_fr TEXT,
ADD COLUMN IF NOT EXISTS author_en TEXT;

-- Add multilang fields to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS title_ht TEXT,
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_ht TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS category_ht TEXT,
ADD COLUMN IF NOT EXISTS category_fr TEXT,
ADD COLUMN IF NOT EXISTS category_en TEXT,
ADD COLUMN IF NOT EXISTS location_ht TEXT,
ADD COLUMN IF NOT EXISTS location_fr TEXT,
ADD COLUMN IF NOT EXISTS location_en TEXT;

-- Add multilang fields to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS title_ht TEXT,
ADD COLUMN IF NOT EXISTS title_fr TEXT,
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS description_ht TEXT,
ADD COLUMN IF NOT EXISTS description_fr TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS price_range_ht TEXT,
ADD COLUMN IF NOT EXISTS price_range_fr TEXT,
ADD COLUMN IF NOT EXISTS price_range_en TEXT,
ADD COLUMN IF NOT EXISTS duration_ht TEXT,
ADD COLUMN IF NOT EXISTS duration_fr TEXT,
ADD COLUMN IF NOT EXISTS duration_en TEXT,
ADD COLUMN IF NOT EXISTS features_ht TEXT[],
ADD COLUMN IF NOT EXISTS features_fr TEXT[],
ADD COLUMN IF NOT EXISTS features_en TEXT[];

-- Add multilang fields to static_content table
ALTER TABLE static_content 
ADD COLUMN IF NOT EXISTS content_ht TEXT,
ADD COLUMN IF NOT EXISTS content_fr TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT;

-- Comments for documentation
COMMENT ON COLUMN blogs.title_ht IS 'Blog title in Haitian Creole';
COMMENT ON COLUMN blogs.title_fr IS 'Blog title in French';
COMMENT ON COLUMN blogs.title_en IS 'Blog title in English';
COMMENT ON COLUMN blogs.excerpt_ht IS 'Blog excerpt in Haitian Creole';
COMMENT ON COLUMN blogs.excerpt_fr IS 'Blog excerpt in French';
COMMENT ON COLUMN blogs.excerpt_en IS 'Blog excerpt in English';
COMMENT ON COLUMN blogs.content_ht IS 'Blog content in Haitian Creole';
COMMENT ON COLUMN blogs.content_fr IS 'Blog content in French';
COMMENT ON COLUMN blogs.content_en IS 'Blog content in English';

COMMENT ON COLUMN projects.title_ht IS 'Project title in Haitian Creole';
COMMENT ON COLUMN projects.title_fr IS 'Project title in French';
COMMENT ON COLUMN projects.title_en IS 'Project title in English';
COMMENT ON COLUMN projects.description_ht IS 'Project description in Haitian Creole';
COMMENT ON COLUMN projects.description_fr IS 'Project description in French';
COMMENT ON COLUMN projects.description_en IS 'Project description in English';

COMMENT ON COLUMN services.title_ht IS 'Service title in Haitian Creole';
COMMENT ON COLUMN services.title_fr IS 'Service title in French';
COMMENT ON COLUMN services.title_en IS 'Service title in English';
COMMENT ON COLUMN services.description_ht IS 'Service description in Haitian Creole';
COMMENT ON COLUMN services.description_fr IS 'Service description in French';
COMMENT ON COLUMN services.description_en IS 'Service description in English';
COMMENT ON COLUMN services.features_ht IS 'Service features array in Haitian Creole';
COMMENT ON COLUMN services.features_fr IS 'Service features array in French';
COMMENT ON COLUMN services.features_en IS 'Service features array in English';

COMMENT ON COLUMN static_content.content_ht IS 'Static content in Haitian Creole';
COMMENT ON COLUMN static_content.content_fr IS 'Static content in French';
COMMENT ON COLUMN static_content.content_en IS 'Static content in English';