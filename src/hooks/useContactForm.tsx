
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Generate email content
      const emailSubject = encodeURIComponent(`Nouvo depo deviz - ${formData.name}`);
      const emailBody = encodeURIComponent(`
Nouvo depo deviz nan sit Rev Konstriksyon:

Non: ${formData.name}
Imèl: ${formData.email}
Telefòn: ${formData.phone}
Tip Pwojè: ${formData.projectType}
Bidjè: ${formData.budget}
Echeye: ${formData.timeline}
Kominikasyon prefere: ${formData.preferredContact}

Mesaj:
${formData.message}
      `);

      // Generate WhatsApp message
      const whatsappMessage = encodeURIComponent(`
Bonjou Rev Konstriksyon!

Nou gen yon nouvo depo deviz:
Non: ${formData.name}
Imèl: ${formData.email}
Telefòn: ${formData.phone}
Tip Pwojè: ${formData.projectType}

Mesaj: ${formData.message}
      `);

      // Open email client
      if (formData.preferredContact === 'email') {
        window.open(`mailto:revkonstriksyon@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
      } else if (formData.preferredContact === 'whatsapp') {
        window.open(`https://wa.me/50947624431?text=${whatsappMessage}`, '_blank');
      } else {
        // Default to phone
        window.open('tel:+50947624431', '_self');
      }

      toast({
        title: 'Siksè!',
        description: 'Depo ou a te voye ak siksè. N ap kominike ak ou nan mwens pase 24 èdtan.',
      });

      return true;
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan voye depo a. Tanpri eseye ankò oswa rele nou dirèkteman.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting };
};
