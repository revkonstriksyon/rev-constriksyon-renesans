
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save } from 'lucide-react';

interface StaticContent {
  key: string;
  title: string;
  content: string;
}

const defaultContent: StaticContent[] = [
  { key: 'hero_title', title: 'Tit Hero', content: 'Rev Konstriksyon - Konstriksyon ak Renovasyon' },
  { key: 'hero_subtitle', title: 'Sou-tit Hero', content: 'Ekspètiz ak Kalite nan Chak Pwojè' },
  { key: 'cta_primary_text', title: 'CTA Prensipal', content: 'Jwenn Konsiltasyon Gratis' },
  { key: 'cta_secondary_text', title: 'CTA Segondè', content: 'Gade Pwojè Nou Yo' },
  { key: 'services_section_title', title: 'Tit Sèvis', content: 'Sèvis Nou Yo' },
  { key: 'services_section_subtitle', title: 'Sou-tit Sèvis', content: 'Nou ofri solisyon konplè pou tout bezwen konstriksyon ou yo' },
  { key: 'projects_section_title', title: 'Tit Pwojè', content: 'Pwojè Nou Yo' },
  { key: 'projects_section_subtitle', title: 'Sou-tit Pwojè', content: 'Dekouvri kèk nan pwojè nou yo ki pi rekonèt' },
  { key: 'blog_section_title', title: 'Tit Blog', content: 'Blog / Atik Konsèy' },
  { key: 'blog_section_subtitle', title: 'Sou-tit Blog', content: 'Dekouvri konsèy ekspè ak enfòmasyon itil' },
  { key: 'contact_section_title', title: 'Tit Kontak', content: 'Kominike Ak Nou' },
  { key: 'contact_section_subtitle', title: 'Sou-tit Kontak', content: 'Pare pou kòmanse pwojè ou a?' },
  { key: 'newsletter_title', title: 'Tit Newsletter', content: 'Abònman Newsletter Nou An' },
  { key: 'newsletter_subtitle', title: 'Sou-tit Newsletter', content: 'Resevwa konsèy ekspè ak nouvo pwojè' },
  { key: 'contact_phone_1', title: 'Telefòn 1', content: '+509 3456-7890' },
  { key: 'contact_phone_2', title: 'Telefòn 2', content: '+509 2812-3456' },
  { key: 'contact_email_1', title: 'Email Prensipal', content: 'info@revkonstriksyon.com' },
  { key: 'contact_email_2', title: 'Email Devis', content: 'devis@revkonstriksyon.com' },
  { key: 'contact_address', title: 'Adrès', content: '123 Rue Lamarre, Péguy-Ville, Port-au-Prince, Haïti' },
  { key: 'contact_hours', title: 'Otè Travay', content: 'Lendi - Vandredi: 7:00 AM - 5:00 PM, Samdi: 8:00 AM - 2:00 PM' },
  { key: 'social_facebook', title: 'Facebook', content: '#' },
  { key: 'social_instagram', title: 'Instagram', content: '#' },
  { key: 'social_twitter', title: 'Twitter/X', content: '#' }
];

const StaticContentManagement = () => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('static_content')
        .select('key, content');

      if (error) throw error;

      const contentMap: Record<string, string> = {};
      data?.forEach(item => {
        contentMap[item.key] = item.content;
      });

      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan chaje kontni an.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('static_content')
        .upsert([{
          key,
          title: defaultContent.find(item => item.key === key)?.title || key,
          content: content[key] || ''
        }]);

      if (error) throw error;

      toast({
        title: 'Siksè',
        description: 'Kontni sove ak siksè.',
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan sove kontni an.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const updates = defaultContent.map(item => ({
        key: item.key,
        title: item.title,
        content: content[item.key] || item.content
      }));

      const { error } = await supabase
        .from('static_content')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: 'Siksè',
        description: 'Tout kontni yo sove ak siksè.',
      });
    } catch (error) {
      console.error('Error saving all content:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan sove kontni yo.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Jesyon Kontni Estatik</h2>
          <p className="text-gray-600">Modifye teks ak enfòmasyon kontak yo sou sit la</p>
        </div>
        <Button 
          onClick={handleSaveAll}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Sove Tout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {defaultContent.map(item => (
          <Card key={item.key}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>Key: {item.key}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.key.includes('subtitle') || item.key.includes('address') || item.key.includes('hours') ? (
                <div>
                  <Label htmlFor={item.key}></Label>
                  <Textarea
                    id={item.key}
                    value={content[item.key] || item.content}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    rows={3}
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor={item.key}></Label>
                  <Input
                    id={item.key}
                    value={content[item.key] || item.content}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                  />
                </div>
              )}
              <Button 
                onClick={() => handleSave(item.key)}
                disabled={isSaving}
                size="sm"
                className="w-full"
              >
                Sove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaticContentManagement;
