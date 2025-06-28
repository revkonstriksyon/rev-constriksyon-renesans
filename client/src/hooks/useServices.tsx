
import { useQuery } from '@tanstack/react-query';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  features: string[] | null;
  price_range: string | null;
  duration: string | null;
  order_position: number | null;
  published: boolean;
}

export const useServices = () => {
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await fetch('/api/services');
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      return response.json() as Promise<Service[]>;
    },
  });

  return { services, isLoading, error };
};
