
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
}

export const useProjects = () => {
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
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

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
  }, [currentLanguage]);

  return { projects, isLoading };
};
