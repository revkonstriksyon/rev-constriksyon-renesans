
import { useQuery } from '@tanstack/react-query';

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
}

export const useProjects = () => {
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json() as Promise<Project[]>;
    },
  });

  return { projects, isLoading, error };
};
