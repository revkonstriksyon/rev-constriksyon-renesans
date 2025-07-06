
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  [key: string]: string;
}

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.93-1.4-2.16-1.4-3.538v-.364C16.341.436 15.905 0 15.369 0h-2.454c-.536 0-.972.436-.972.972v10.024c0 1.696-1.377 3.072-3.072 3.072s-3.072-1.377-3.072-3.072 1.377-3.072 3.072-3.072c.169 0 .336.014.5.04V5.506c-.164-.026-.331-.04-.5-.04-3.632 0-6.576 2.944-6.576 6.576s2.944 6.576 6.576 6.576 6.576-2.944 6.576-6.576V8.851c1.035.606 2.23.951 3.497.951v-3.503c-.65 0-1.266-.137-1.823-.387-.557-.25-1.057-.607-1.448-1.05z"/>
  </svg>
);

const ContactManagement = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const contactFields = [
    { key: 'contact_phone_1', label: 'Telefòn 1', icon: Phone, type: 'tel' },
    { key: 'contact_phone_2', label: 'Telefòn 2', icon: Phone, type: 'tel' },
    { key: 'contact_email_1', label: 'Email Prensipal', icon: Mail, type: 'email' },
    { key: 'contact_email_2', label: 'Email Devis', icon: Mail, type: 'email' },
    { key: 'contact_address', label: 'Adrès', icon: MapPin, type: 'textarea' },
    { key: 'contact_hours', label: 'Orè Travay', icon: Clock, type: 'textarea' },
    { key: 'social_facebook', label: 'Facebook URL', icon: Facebook, type: 'url' },
    { key: 'social_instagram', label: 'Instagram URL', icon: Instagram, type: 'url' },
    { key: 'social_twitter', label: 'Twitter URL', icon: Twitter, type: 'url' },
    { key: 'social_tiktok', label: 'TikTok URL', icon: TikTokIcon, type: 'url' },
    { key: 'social_youtube', label: 'YouTube URL', icon: Youtube, type: 'url' },
  ];

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('static_content')
        .select('key, content')
        .in('key', contactFields.map(field => field.key));

      if (error) throw error;
      
      const contactData: ContactInfo = {};
      data?.forEach(item => {
        contactData[item.key] = item.content;
      });
      
      setContactInfo(contactData);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje enfòmasyon kontak yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(contactInfo).map(([key, content]) => ({
        key,
        content,
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('static_content')
          .upsert({
            key: update.key,
            title: update.key,
            content: update.content,
            updated_at: update.updated_at,
          });

        if (error) throw error;
      }

      toast({ title: 'Enfòmasyon kontak yo sove ak siksè!' });
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje enfòmasyon kontak yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Enfòmasyon Kontak</h2>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Ap sove...' : 'Sove Tout'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Enfòmasyon Kontak
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactFields.slice(0, 6).map((field) => {
              const IconComponent = field.icon;
              return (
                <div key={field.key}>
                  <Label htmlFor={field.key} className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {field.label}
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.key}
                      value={contactInfo[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.label}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      type={field.type}
                      value={contactInfo[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.label}
                    />
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Rezo Sosyal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactFields.slice(6).map((field) => {
              const IconComponent = field.icon;
              return (
                <div key={field.key}>
                  <Label htmlFor={field.key} className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    value={contactInfo[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.label}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactManagement;
