
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InspirationItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  tags: string[];
  source_url: string | null;
  order_position: number;
  is_active: boolean;
  created_at: string;
}

const InspirationGalleryManagement = () => {
  const [items, setItems] = useState<InspirationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<InspirationItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    tags: [''],
    source_url: '',
    order_position: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('inspiration_gallery')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje enspirasyon yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const itemData = {
        ...formData,
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        updated_at: new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from('inspiration_gallery')
          .update(itemData)
          .eq('id', editingItem.id);

        if (error) throw error;
        toast({ title: 'Enspirasyon modifye ak siksè!' });
      } else {
        const { error } = await supabase
          .from('inspiration_gallery')
          .insert([itemData]);

        if (error) throw error;
        toast({ title: 'Enspirasyon kreye ak siksè!' });
      }

      fetchItems();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (id: string, is_active: boolean) => {
    try {
      const { error } = await supabase
        .from('inspiration_gallery')
        .update({ is_active: !is_active })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: !is_active ? 'Enspirasyon aktive!' : 'Enspirasyon pa aktif ankò!',
      });
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ou kwè ou vle efase enspirasyon sa a?')) return;

    try {
      const { error } = await supabase
        .from('inspiration_gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Enspirasyon efase ak siksè!' });
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const startEdit = (item: InspirationItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      image_url: item.image_url,
      category: item.category || '',
      tags: item.tags && item.tags.length > 0 ? item.tags : [''],
      source_url: item.source_url || '',
      order_position: item.order_position,
      is_active: item.is_active,
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: '',
      tags: [''],
      source_url: '',
      order_position: 0,
      is_active: true,
    });
  };

  const addTagField = () => {
    setFormData({ ...formData, tags: [...formData.tags, ''] });
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags.length > 0 ? newTags : [''] });
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje enspirasyon yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Jesyon Galri Enspirasyon</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvo Enspirasyon
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItem ? 'Modifye Enspirasyon' : 'Nouvo Enspirasyon'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tit</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tit enspirasyon an"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chwazi kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dekorasyon Enteryè">Dekorasyon Enteryè</SelectItem>
                    <SelectItem value="Pisin">Pisin</SelectItem>
                    <SelectItem value="Kizin">Kizin</SelectItem>
                    <SelectItem value="Chanm">Chanm</SelectItem>
                    <SelectItem value="Terras">Terras</SelectItem>
                    <SelectItem value="Jaden">Jaden</SelectItem>
                    <SelectItem value="Ekstè">Ekstè</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="order_position">Pozisyon Òd</Label>
                <Input
                  id="order_position"
                  type="number"
                  value={formData.order_position}
                  onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="image_url" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                URL Imaj
              </Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="source_url">URL Sous (opsyonèl)</Label>
              <Input
                id="source_url"
                value={formData.source_url}
                onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Tags</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTagField}>
                  <Plus className="w-4 h-4 mr-1" />
                  Ajoute Tag
                </Button>
              </div>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={tag}
                    onChange={(e) => updateTag(index, e.target.value)}
                    placeholder="modèn, dekorasyon, pisin, etc."
                  />
                  {formData.tags.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeTag(index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="description">Deskripsyon</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsyon enspirasyon an..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Sove
              </Button>
              <Button variant="outline" onClick={resetForm} className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Anile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.is_active ? 'Aktif' : 'Pa Aktif'}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex gap-4 text-sm text-gray-500 mb-2">
                      <span>{item.category}</span>
                      <span>Pozisyon: {item.order_position}</span>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 5).map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 5 && (
                          <span className="text-gray-400 text-xs">+{item.tags.length - 5}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant={item.is_active ? "destructive" : "default"}
                    onClick={() => handleToggleActive(item.id, item.is_active)}
                  >
                    {item.is_active ? 'Dezaktive' : 'Aktive'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Pa gen enspirasyon ankò. Kòmanse kreye premye enspirasyon ou a!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InspirationGalleryManagement;
