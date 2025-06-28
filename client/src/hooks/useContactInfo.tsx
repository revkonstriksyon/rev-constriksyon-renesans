
import { useQuery } from '@tanstack/react-query';

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
  const { data: staticContent = [], isLoading, error } = useQuery({
    queryKey: ['contact-info'],
    queryFn: async () => {
      const response = await fetch('/api/static-content');
      if (!response.ok) {
        throw new Error('Failed to fetch contact info');
      }
      return response.json() as Promise<Array<{key: string, content: string}>>;
    },
  });

  const contactInfo: ContactInfo = {
    phone_1: '+509 3456-7890',
    phone_2: '+509 2812-3456',
    email_1: 'info@revkonstriksyon.com',
    email_2: 'devis@revkonstriksyon.com',
    address: '123 Rue Lamarre, Péguy-Ville, Port-au-Prince, Haïti',
    hours: 'Lendi - Vandredi: 7:00 AM - 5:00 PM, Samdi: 8:00 AM - 2:00 PM',
    facebook: '#',
    instagram: '#',
    twitter: '#'
  };

  staticContent.forEach(item => {
    switch(item.key) {
      case 'contact_phone_1':
        contactInfo.phone_1 = item.content;
        break;
      case 'contact_phone_2':
        contactInfo.phone_2 = item.content;
        break;
      case 'contact_email_1':
        contactInfo.email_1 = item.content;
        break;
      case 'contact_email_2':
        contactInfo.email_2 = item.content;
        break;
      case 'contact_address':
        contactInfo.address = item.content;
        break;
      case 'contact_hours':
        contactInfo.hours = item.content;
        break;
      case 'social_facebook':
        contactInfo.facebook = item.content;
        break;
      case 'social_instagram':
        contactInfo.instagram = item.content;
        break;
      case 'social_twitter':
        contactInfo.twitter = item.content;
        break;
    }
  });

  return { contactInfo, isLoading, error };
};
