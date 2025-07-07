
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  contact_phone_1: string;
  contact_phone_2?: string;
  contact_email_1: string;
  contact_email_2?: string;
  contact_address: string;
  contact_hours: string;
  social_facebook: string;
  social_instagram: string;
  social_twitter: string;
  social_tiktok: string;
  social_youtube: string;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    contact_phone_1: '+509 3456-7890',
    contact_phone_2: '+509 2812-3456',
    contact_email_1: 'info@revkonstriksyon.com',
    contact_email_2: 'devis@revkonstriksyon.com',
    contact_address: '123 Rue Lamarre, Péguy-Ville, Port-au-Prince, Haïti',
    contact_hours: 'Lendi - Vandredi: 7:00 AM - 5:00 PM, Samdi: 8:00 AM - 2:00 PM',
    social_facebook: '#',
    social_instagram: '#',
    social_twitter: '#',
    social_tiktok: '#',
    social_youtube: '#'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('static_content')
          .select('key, content')
          .in('key', [
            'contact_phone_1',
            'contact_phone_2', 
            'contact_email_1',
            'contact_email_2',
            'contact_address',
            'contact_hours',
            'social_facebook',
            'social_instagram',
            'social_twitter',
            'social_tiktok',
            'social_youtube'
          ]);

        if (error) throw error;

        const info: any = {};
        data?.forEach(item => {
          info[item.key] = item.content;
        });

        setContactInfo(prev => ({ ...prev, ...info }));
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('contact-info-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'static_content'
        },
        () => {
          fetchContactInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { contactInfo, isLoading };
};
