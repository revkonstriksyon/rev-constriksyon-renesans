
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  phone_1: string;
  phone_2?: string;
  email_1: string;
  email_2?: string;
  address: string;
  hours: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone_1: '+509 3456-7890',
    phone_2: '+509 2812-3456',
    email_1: 'info@revkonstriksyon.com',
    email_2: 'devis@revkonstriksyon.com',
    address: '123 Rue Lamarre, Péguy-Ville, Port-au-Prince, Haïti',
    hours: 'Lendi - Vandredi: 7:00 AM - 5:00 PM, Samdi: 8:00 AM - 2:00 PM',
    facebook: '#',
    instagram: '#',
    twitter: '#'
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
            'social_twitter'
          ]);

        if (error) throw error;

        const info: any = {};
        data?.forEach(item => {
          switch(item.key) {
            case 'contact_phone_1':
              info.phone_1 = item.content;
              break;
            case 'contact_phone_2':
              info.phone_2 = item.content;
              break;
            case 'contact_email_1':
              info.email_1 = item.content;
              break;
            case 'contact_email_2':
              info.email_2 = item.content;
              break;
            case 'contact_address':
              info.address = item.content;
              break;
            case 'contact_hours':
              info.hours = item.content;
              break;
            case 'social_facebook':
              info.facebook = item.content;
              break;
            case 'social_instagram':
              info.instagram = item.content;
              break;
            case 'social_twitter':
              info.twitter = item.content;
              break;
          }
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
