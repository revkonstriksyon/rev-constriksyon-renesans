
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedContent } from '@/utils/translationHelpers';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  location: string | null;
  date: string;
  category: string | null;
  published: boolean;
  project_type: 'reyalize' | 'an-kour' | 'planifye' | 'konsèp';
  slug: string | null;
  images: string[] | null;
  video_url: string | null;
  tags: string[] | null;
  featured: boolean | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  // Multilang fields
  title_ht?: string;
  title_fr?: string;
  title_en?: string;
  description_ht?: string;
  description_fr?: string;
  description_en?: string;
  category_ht?: string;
  category_fr?: string;
  category_en?: string;
  location_ht?: string;
  location_fr?: string;
  location_en?: string;
}

export interface TranslatedProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  location: string | null;
  date: string;
  category: string | null;
  published: boolean;
  project_type: 'reyalize' | 'an-kour' | 'planifye' | 'konsèp';
  slug: string | null;
  images: string[];
  video_url: string | null;
  tags: string[];
  featured: boolean;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export const useProjects = (projectType?: 'reyalize' | 'an-kour' | 'planifye' | 'konsèp' | 'all') => {
  const [projects, setProjects] = useState<TranslatedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage } = useLanguage();

  // Function to translate project data based on current language
  const translateProject = (project: Project): TranslatedProject => ({
    id: project.id,
    title: getTranslatedContent(project, 'title', currentLanguage, project.title),
    description: getTranslatedContent(project, 'description', currentLanguage, project.description),
    image_url: project.image_url,
    before_image_url: project.before_image_url,
    after_image_url: project.after_image_url,
    location: getTranslatedContent(project, 'location', currentLanguage, project.location || ''),
    date: project.date,
    category: getTranslatedContent(project, 'category', currentLanguage, project.category || ''),
    published: project.published,
    project_type: project.project_type as 'reyalize' | 'an-kour' | 'planifye' | 'konsèp',
    slug: project.slug,
    images: project.images || [],
    video_url: project.video_url,
    tags: project.tags || [],
    featured: project.featured || false,
    content: project.content,
    meta_title: project.meta_title,
    meta_description: project.meta_description,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .eq('published', true);

        if (projectType && projectType !== 'all') {
          query = query.eq('project_type', projectType);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;
        const translatedProjects = (data || []).map(translateProject);
        setProjects(translatedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentLanguage, projectType]);

  return { projects, isLoading };
};

// Hook for getting featured projects (for homepage)
export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<TranslatedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage } = useLanguage();

  const translateProject = (project: Project): TranslatedProject => ({
    id: project.id,
    title: getTranslatedContent(project, 'title', currentLanguage, project.title),
    description: getTranslatedContent(project, 'description', currentLanguage, project.description),
    image_url: project.image_url,
    before_image_url: project.before_image_url,
    after_image_url: project.after_image_url,
    location: getTranslatedContent(project, 'location', currentLanguage, project.location || ''),
    date: project.date,
    category: getTranslatedContent(project, 'category', currentLanguage, project.category || ''),
    published: project.published,
    project_type: project.project_type as 'reyalize' | 'an-kour' | 'planifye' | 'konsèp',
    slug: project.slug,
    images: project.images || [],
    video_url: project.video_url,
    tags: project.tags || [],
    featured: project.featured || false,
    content: project.content,
    meta_title: project.meta_title,
    meta_description: project.meta_description,
  });

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        const translatedProjects = (data || []).map(translateProject);
        setProjects(translatedProjects);
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        // Fallback to latest projects if no featured projects
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (data) {
          const translatedProjects = data.map(translateProject);
          setProjects(translatedProjects);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, [currentLanguage]);

  return { projects, isLoading };
};
