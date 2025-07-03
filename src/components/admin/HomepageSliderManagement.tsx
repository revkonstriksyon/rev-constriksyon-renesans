
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Upload, MoveUp, MoveDown } from 'lucide-react';
import { SliderItem } from '@/hooks/useHomepageSlider';

const HomepageSliderManagement = () => {
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    main_image_url: '',
    video_url: '',
    thumbnail_url: '',
    description: '',
    category: '',
    tags: '',
    link_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchSliderItems();
  }, []);

  const fetchSliderItems = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_slider')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setSliderItems(data || []);
    } catch (error) {
      console.error('Error fetching slider items:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan chajman slider yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      main_image_url: '',
      video_url: '',
      thumbnail_url: '',
      description: '',
      category: '',
      tags: '',
      link_url: '',
      is_active: true
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: SliderItem) => {
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      main_image_url: item.main_image_url || '',
      video_url: item.video_url || '',
      thumbnail_url: item.thumbnail_url,
      description: item.description || '',
      category: item.category || '',
      tags: item.tags.join(', '),
      link_url: item.link_url || '',
      is_active: item.is_active
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const nextPosition = Math.max(...sliderItems.map(item => item.order_position), 0) + 1;

      const sliderData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        main_image_url: formData.main_image_url || null,
        video_url: formData.video_url || null,
        thumbnail_url: formData.thumbnail_url,
        description: formData.description || null,
        category: formData.category || null,
        tags: tagsArray,
        link_url: formData.link_url || null,
        is_active: formData.is_active,
        order_position: editingItem ? editingItem.order_position : nextPosition
      };

      if (editingItem) {
        const { error } = await supabase
          .from('homepage_slider')
          .update(sliderData)
          .eq('id', editingItem.id);

        if (error) throw error;
        
        toast({
          title: 'Siksè',
          description: 'Slider la modifye ak siksè.',
        });
      } else {
        const { error } = await supabase
          .from('homepage_slider')
          .insert([sliderData]);

        if (error) throw error;
        
        toast({
          title: 'Siksè',
          description: 'Nouvo slider la ajoute ak siksè.',
        });
      }

      resetForm();
      fetchSliderItems();
    } catch (error) {
      console.error('Error saving slider item:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan anrejistre slider la.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Èske ou vle efase slider sa a?')) return;
    
    try {
      const { error } = await supabase
        .from('homepage_slider')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Siksè',
        description: 'Slider la efase ak siksè.',
      });
      
      fetchSliderItems();
    } catch (error) {
      console.error('Error deleting slider item:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan efase slider la.',
        variant: 'destructive',
      });
    }
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const currentItem = sliderItems.find(item => item.id === id);
    if (!currentItem) return;

    const currentIndex = sliderItems.findIndex(item => item.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= sliderItems.length) return;

    const targetItem = sliderItems[targetIndex];

    try {
      // Swap order positions
      await supabase
        .from('homepage_slider')
        .update({ order_position: targetItem.order_position })
        .eq('id', currentItem.id);

      await supabase
        .from('homepage_slider')
        .update({ order_position: currentItem.order_position })
        .eq('id', targetItem.id);

      fetchSliderItems();
      
      toast({
        title: 'Siksè',
        description: 'Òd slider yo chanje ak siksè.',
      });
    } catch (error) {
      console.error('Error moving slider item:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan deplase slider la.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-gray-600">Ap chaje slider yo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jesyon Slider Dakey</h2>
          <p className="text-gray-600">Jere imaj ak videyo slider yo pou paj dakey a</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajoute Nouvo Slider
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Modifye Slider' : 'Nouvo Slider'}</CardTitle>
            <CardDescription>
              {editingItem ? 'Modifye enfòmasyon slider la' : 'Ajoute nouvo slider pou paj dakey a'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tit *</label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <Input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Imaj Prensipal (URL)</label>
                  <Input
                    type="url"
                    value={formData.main_image_url}
                    onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail (URL) *</label>
                  <Input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    required
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Videyo (URL)</label>
                <Input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://example.com/video.mp4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Deskripsyon</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <Input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (separe ak vigul)</label>
                  <Input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="renovasyon, modern, kay"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lyen (URL)</label>
                <Input
                  type="url"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://example.com/project"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <label className="text-sm font-medium">Aktiv</label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingItem ? 'Modifye' : 'Ajoute'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="w-4 h-4" />
                  Anile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {sliderItems.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-gray-600 text-sm">{item.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {item.category && (
                      <Badge variant="secondary">{item.category}</Badge>
                    )}
                    {item.video_url && (
                      <Badge variant="outline">Videyo</Badge>
                    )}
                    <Badge variant={item.is_active ? "default" : "destructive"}>
                      {item.is_active ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveItem(item.id, 'up')}
                    disabled={index === 0}
                  >
                    <MoveUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveItem(item.id, 'down')}
                    disabled={index === sliderItems.length - 1}
                  >
                    <MoveDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sliderItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">Pa gen slider ankò</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajoute Premye Slider Ou A
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomepageSliderManagement;
