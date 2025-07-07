
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedContent } from '@/utils/translationHelpers';

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
  // Multilang fields
  title_ht?: string;
  title_fr?: string;
  title_en?: string;
  description_ht?: string;
  description_fr?: string;
  description_en?: string;
  price_range_ht?: string;
  price_range_fr?: string;
  price_range_en?: string;
  duration_ht?: string;
  duration_fr?: string;
  duration_en?: string;
  features_ht?: string[] | null;
  features_fr?: string[] | null;
  features_en?: string[] | null;
}

export interface TranslatedService {
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
  const [services, setServices] = useState<TranslatedService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage } = useLanguage();

  // Helper to get translated features array
  const getTranslatedFeatures = (service: Service): string[] | null => {
    const langKey = `features_${currentLanguage}` as keyof Service;
    const translatedFeatures = service[langKey] as string[] | null;
    
    if (translatedFeatures && translatedFeatures.length > 0) {
      return translatedFeatures;
    }
    
    // Fallback to default features
    return service.features;
  };

  // Function to translate service data based on current language
  const translateService = (service: Service): TranslatedService => ({
    id: service.id,
    title: getTranslatedContent(service, 'title', currentLanguage, service.title),
    description: getTranslatedContent(service, 'description', currentLanguage, service.description),
    icon: service.icon,
    features: getTranslatedFeatures(service),
    price_range: getTranslatedContent(service, 'price_range', currentLanguage, service.price_range || ''),
    duration: getTranslatedContent(service, 'duration', currentLanguage, service.duration || ''),
    order_position: service.order_position,
    published: service.published,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('published', true)
          .order('order_position', { ascending: true });

        if (error) throw error;
        const translatedServices = (data || []).map(translateService);
        setServices(translatedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentLanguage]);

  return { services, isLoading };
};
