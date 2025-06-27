
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StaticContent {
  id: string;
  key: string;
  title: string;
  content: string;
  updated_at: string;
}

const StaticContentManagement = () => {
  const [contents, setContents] = useState<StaticContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<StaticContent | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('static_content')
        .select('*')
        .order('key');

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje kontni yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (content: StaticContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      content: content.content,
    });
  };

  const handleSave = async () => {
    if (!editingContent) return;

    try {
      const { error } = await supabase
        .from('static_content')
        .update({
          title: formData.title,
          content: formData.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingContent.id);

      if (error) throw error;
      
      toast({ title: 'Kontni modifye ak siksè!' });
      fetchContents();
      cancelEdit();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const cancelEdit = () => {
    setEditingContent(null);
    setFormData({ title: '', content: '' });
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje kontni yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kontni Estatik</h2>
      </div>

      <div className="grid gap-4">
        {contents.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{content.title}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => startEdit(content)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifye
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingContent?.id === content.id ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Tit</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Tit kontni a"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Kontni</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Kontni a..."
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Sove
                    </Button>
                    <Button variant="outline" onClick={cancelEdit} className="flex items-center gap-2">
                      <X className="w-4 h-4" />
                      Anile
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 whitespace-pre-wrap">{content.content}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Dènye modifikasyon: {new Date(content.updated_at).toLocaleString('fr-FR')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {contents.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Pa gen kontni estatik ankò.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StaticContentManagement;
