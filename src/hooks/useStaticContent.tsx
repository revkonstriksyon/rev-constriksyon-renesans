
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedContent } from '@/utils/translationHelpers';

interface StaticContent {
  key: string;
  content: string;
  content_ht?: string;
  content_fr?: string;
  content_en?: string;
}

export const useStaticContent = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('static_content')
          .select('*');

        if (error) throw error;

        const contentMap: Record<string, string> = {};
        data?.forEach(item => {
          const translatedContent = getTranslatedContent(item, 'content', currentLanguage, item.content);
          contentMap[item.key] = translatedContent;
        });

        setContent(contentMap);
      } catch (error) {
        console.error('Error fetching static content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('static-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'static_content'
        },
        () => {
          fetchContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentLanguage]);

  return { content, isLoading };
};
