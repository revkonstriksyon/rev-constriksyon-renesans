
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FooterService {
  id: string;
  title: string;
  url: string;
  order_position: number;
}

export const useFooterServices = () => {
  const [services, setServices] = useState<FooterService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, order_position')
          .eq('published', true)
          .order('order_position', { ascending: true });

        if (error) throw error;
        
        const formattedServices = (data || []).map(service => ({
          id: service.id,
          title: service.title,
          url: '/services',
          order_position: service.order_position || 0
        }));
        
        setServices(formattedServices);
      } catch (error) {
        console.error('Error fetching footer services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, isLoading };
};
