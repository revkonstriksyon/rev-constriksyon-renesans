
import { useQuery } from '@tanstack/react-query';

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
  const { data: blogs = [], isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      return response.json() as Promise<Blog[]>;
    },
  });

  return { blogs, isLoading, error };
};
