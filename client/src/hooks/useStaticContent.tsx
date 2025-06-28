
import { useQuery } from '@tanstack/react-query';

interface StaticContent {
  key: string;
  content: string;
}

export const useStaticContent = () => {
  const { data: staticContent = [], isLoading, error } = useQuery({
    queryKey: ['static-content'],
    queryFn: async () => {
      const response = await fetch('/api/static-content');
      if (!response.ok) {
        throw new Error('Failed to fetch static content');
      }
      return response.json() as Promise<StaticContent[]>;
    },
  });

  const content: Record<string, string> = {};
  staticContent.forEach(item => {
    content[item.key] = item.content;
  });

  return { content, isLoading, error };
};
