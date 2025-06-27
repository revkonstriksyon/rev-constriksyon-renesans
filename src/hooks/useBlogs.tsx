
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: string;
  date: string;
  read_time: string;
  category: string;
  image_url: string | null;
  published: boolean;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('blogs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blogs'
        },
        () => {
          fetchBlogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { blogs, isLoading };
};
