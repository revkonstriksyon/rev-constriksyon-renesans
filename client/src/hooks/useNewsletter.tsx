
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (email: string) => {
    setIsLoading(true);
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Tanpri antre yon imèl ki valab');
        return false;
      }

      // Check if email already exists - using any to bypass TypeScript issues
      const { data: existingSubscriber } = await (supabase as any)
        .from('newsletter_subscribers')
        .select('email')
        .eq('email', email)
        .single();

      if (existingSubscriber) {
        toast.info('Imèl sa a deja abòne nan newsletter nou an');
        return false;
      }

      // Add new subscriber - using any to bypass TypeScript issues
      const { error } = await (supabase as any)
        .from('newsletter_subscribers')
        .insert([{ 
          email, 
          subscribed_at: new Date().toISOString(),
          active: true 
        }]);

      if (error) throw error;

      toast.success('Abònman réussi! Nou ap voye w nouvo atik yo nan imèl ou a.');
      return true;

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Erè nan abònman an. Tanpri eseye ankò.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading };
};
