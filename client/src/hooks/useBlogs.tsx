
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
  show_on_homepage: boolean | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  created_at: string;
  updated_at: string;
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
  show_on_homepage: boolean | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<TranslatedBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();

  // Function to translate blog data based on current language
  const translateBlog = (blog: Blog): TranslatedBlog => {
    // Format date properly from created_at or use the date field
    const formattedDate = blog.date || new Date(blog.created_at).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return {
      id: blog.id,
      title: getTranslatedContent(blog, 'title', currentLanguage, blog.title),
      excerpt: getTranslatedContent(blog, 'excerpt', currentLanguage, blog.excerpt),
      content: getTranslatedContent(blog, 'content', currentLanguage, blog.content),
      slug: blog.slug,
      author: getTranslatedContent(blog, 'author', currentLanguage, blog.author),
      date: formattedDate,
      read_time: blog.read_time,
      category: getTranslatedContent(blog, 'category', currentLanguage, blog.category),
      image_url: blog.image_url,
      published: blog.published,
      show_on_homepage: blog.show_on_homepage,
      tags: blog.tags,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      cta_text: blog.cta_text,
      cta_url: blog.cta_url,
      created_at: blog.created_at,
      updated_at: blog.updated_at,
    };
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching blogs:', error);
          setError('Erè nan chaje blog yo');
          setBlogs([]);
          return;
        }

        const translatedBlogs = (data || []).map(blog => translateBlog({
          ...blog,
          title_ht: blog.title_ht || undefined,
          title_fr: blog.title_fr || undefined,
          title_en: blog.title_en || undefined,
          excerpt_ht: blog.excerpt_ht || undefined,
          excerpt_fr: blog.excerpt_fr || undefined,
          excerpt_en: blog.excerpt_en || undefined,
          content_ht: blog.content_ht || undefined,
          content_fr: blog.content_fr || undefined,
          content_en: blog.content_en || undefined,
          category_ht: blog.category_ht || undefined,
          category_fr: blog.category_fr || undefined,
          category_en: blog.category_en || undefined,
          author_ht: blog.author_ht || undefined,
          author_fr: blog.author_fr || undefined,
          author_en: blog.author_en || undefined,
        }));
        setBlogs(translatedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Erè nan chaje blog yo');
        setBlogs([]);
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
        (payload) => {
          console.log('Blog change detected:', payload);
          fetchBlogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentLanguage]);

  return { blogs, isLoading, error };
};

// Hook for fetching a single blog by slug
export const useBlog = (slug: string) => {
  const [blog, setBlog] = useState<TranslatedBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();

  const translateBlog = (blog: Blog): TranslatedBlog => {
    const formattedDate = blog.date || new Date(blog.created_at).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return {
      id: blog.id,
      title: getTranslatedContent(blog, 'title', currentLanguage, blog.title),
      excerpt: getTranslatedContent(blog, 'excerpt', currentLanguage, blog.excerpt),
      content: getTranslatedContent(blog, 'content', currentLanguage, blog.content),
      slug: blog.slug,
      author: getTranslatedContent(blog, 'author', currentLanguage, blog.author),
      date: formattedDate,
      read_time: blog.read_time,
      category: getTranslatedContent(blog, 'category', currentLanguage, blog.category),
      image_url: blog.image_url,
      published: blog.published,
      show_on_homepage: blog.show_on_homepage,
      tags: blog.tags,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      cta_text: blog.cta_text,
      cta_url: blog.cta_url,
      created_at: blog.created_at,
      updated_at: blog.updated_at,
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) {
          console.error('Error fetching blog:', error);
          setError('Atik la pa jwenn');
          setBlog(null);
          return;
        }

        const translatedBlog = translateBlog({
          ...data,
          title_ht: data.title_ht || undefined,
          title_fr: data.title_fr || undefined,
          title_en: data.title_en || undefined,
          excerpt_ht: data.excerpt_ht || undefined,
          excerpt_fr: data.excerpt_fr || undefined,
          excerpt_en: data.excerpt_en || undefined,
          content_ht: data.content_ht || undefined,
          content_fr: data.content_fr || undefined,
          content_en: data.content_en || undefined,
          category_ht: data.category_ht || undefined,
          category_fr: data.category_fr || undefined,
          category_en: data.category_en || undefined,
          author_ht: data.author_ht || undefined,
          author_fr: data.author_fr || undefined,
          author_en: data.author_en || undefined,
        });
        setBlog(translatedBlog);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Erè nan chaje atik la');
        setBlog(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel(`blog-${slug}-changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blogs'
        },
        (payload) => {
          // Type the payload properly to access blog properties
          const newBlog = payload.new as Blog | null;
          const oldBlog = payload.old as Blog | null;
          
          // Refetch if this specific blog was updated
          if (newBlog?.slug === slug || oldBlog?.slug === slug) {
            console.log('Current blog updated:', payload);
            fetchBlog();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug, currentLanguage]);

  return { blog, isLoading, error };
};
