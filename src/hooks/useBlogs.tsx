
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedContent } from '@/utils/translationHelpers';

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
  // Multilang fields
  title_ht?: string;
  title_fr?: string;
  title_en?: string;
  excerpt_ht?: string;
  excerpt_fr?: string;
  excerpt_en?: string;
  content_ht?: string;
  content_fr?: string;
  content_en?: string;
  category_ht?: string;
  category_fr?: string;
  category_en?: string;
  author_ht?: string;
  author_fr?: string;
  author_en?: string;
}

export interface TranslatedBlog {
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
  const [blogs, setBlogs] = useState<TranslatedBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage } = useLanguage();

  // Function to translate blog data based on current language
  const translateBlog = (blog: Blog): TranslatedBlog => ({
    id: blog.id,
    title: getTranslatedContent(blog, 'title', currentLanguage, blog.title),
    excerpt: getTranslatedContent(blog, 'excerpt', currentLanguage, blog.excerpt),
    content: getTranslatedContent(blog, 'content', currentLanguage, blog.content),
    slug: blog.slug,
    author: getTranslatedContent(blog, 'author', currentLanguage, blog.author),
    date: blog.date,
    read_time: blog.read_time,
    category: getTranslatedContent(blog, 'category', currentLanguage, blog.category),
    image_url: blog.image_url,
    published: blog.published,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        const translatedBlogs = (data || []).map(translateBlog);
        setBlogs(translatedBlogs);
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
  }, [currentLanguage]);

  return { blogs, isLoading };
};
