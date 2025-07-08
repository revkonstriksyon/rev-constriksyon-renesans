
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface InspirationItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  tags: string[];
  source_url: string | null;
  order_position: number;
  is_active: boolean;
}

export const useInspirationGallery = () => {
  const [items, setItems] = useState<InspirationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from('inspiration_gallery')
          .select('*')
          .eq('is_active', true)
          .order('order_position', { ascending: true });

        if (error) throw error;
        setItems(data.map(item => ({
          ...item,
          tags: item.tags || [],
          order_position: item.order_position || 0,
          is_active: item.is_active || false
        })) || []);
      } catch (error) {
        console.error('Error fetching inspiration gallery:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();

    // Set up realtime subscription
    const channel = supabase
      .channel('inspiration-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inspiration_gallery'
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { items, isLoading };
};
