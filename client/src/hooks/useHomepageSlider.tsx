
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SliderItem {
  id: string;
  title: string;
  subtitle: string | null;
  main_image_url: string | null;
  video_url: string | null;
  thumbnail_url: string;
  description: string | null;
  category: string | null;
  tags: string[];
  link_url: string | null;
  button_text: string | null;
  order_position: number;
  is_active: boolean;
}

export const useHomepageSlider = () => {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const { data, error } = await supabase
          .from('homepage_slider')
          .select('*')
          .eq('is_active', true)
          .order('order_position', { ascending: true });

        if (error) throw error;
        
        // Transform data to match SliderItem interface
        const transformedData: SliderItem[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          main_image_url: item.main_image_url,
          video_url: item.video_url,
          thumbnail_url: item.thumbnail_url,
          description: item.description,
          category: item.category,
          tags: item.tags || [],
          link_url: item.link_url,
          button_text: item.button_text,
          order_position: item.order_position || 0,
          is_active: item.is_active || false
        }));
        
        setSliderItems(transformedData);
      } catch (error) {
        console.error('Error fetching homepage slider:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderItems();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('slider-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'homepage_slider'
        },
        () => {
          fetchSliderItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { sliderItems, isLoading };
};
