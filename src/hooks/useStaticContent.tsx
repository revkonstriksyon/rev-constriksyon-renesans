
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StaticContent {
  key: string;
  content: string;
}

export const useStaticContent = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('static_content')
          .select('key, content');

        if (error) throw error;

        const contentMap: Record<string, string> = {};
        data?.forEach(item => {
          contentMap[item.key] = item.content;
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
  }, []);

  return { content, isLoading };
};
