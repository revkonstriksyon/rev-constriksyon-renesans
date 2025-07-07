
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save, X, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  type: 'project' | 'inspiration' | 'concept';
  created_at: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    type: 'project' as 'project' | 'inspiration' | 'concept',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje kategori yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Erè',
        description: 'Non kategori a obligatwa.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name,
            type: formData.type,
          })
          .eq('id', editingCategory.id);

        if (error) throw error;
        toast({ title: 'Kategori modifye ak siksè!' });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{
            name: formData.name,
            type: formData.type,
          }]);

        if (error) throw error;
        toast({ title: 'Kategori kreye ak siksè!' });
      }

      fetchCategories();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ou kwè ou vle efase kategori sa a?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Kategori efase ak siksè!' });
      fetchCategories();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      type: category.type,
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setEditingCategory(null);
    setIsCreating(false);
    setFormData({
      name: '',
      type: 'project',
    });
  };

  const getCategoriesByType = (type: 'project' | 'inspiration' | 'concept') => {
    return categories.filter(cat => cat.type === type);
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje kategori yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Jesyon Kategori</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvo Kategori
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingCategory ? 'Modifye Kategori' : 'Nouvo Kategori'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Non Kategori</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Modern, Renovasyon, Minimalis..."
                />
              </div>
              <div>
                <Label htmlFor="type">Tip</Label>
                <Select value={formData.type} onValueChange={(value: 'project' | 'inspiration' | 'concept') => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chwazi tip" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Pwojè</SelectItem>
                    <SelectItem value="inspiration">Enspirasyon</SelectItem>
                    <SelectItem value="concept">Konsèp 3D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
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

      {/* Categories by Type */}
      <Tabs defaultValue="project" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="project">Pwojè ({getCategoriesByType('project').length})</TabsTrigger>
          <TabsTrigger value="inspiration">Enspirasyon ({getCategoriesByType('inspiration').length})</TabsTrigger>
          <TabsTrigger value="concept">Konsèp 3D ({getCategoriesByType('concept').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="project" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Kategori Pwojè
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getCategoriesByType('project').length === 0 ? (
                <p className="text-gray-500 text-center py-8">Pa gen kategori pwojè ankò.</p>
              ) : (
                <div className="grid gap-4">
                  {getCategoriesByType('project').map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-500">Pwojè</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspiration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Kategori Enspirasyon
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getCategoriesByType('inspiration').length === 0 ? (
                <p className="text-gray-500 text-center py-8">Pa gen kategori enspirasyon ankò.</p>
              ) : (
                <div className="grid gap-4">
                  {getCategoriesByType('inspiration').map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-500">Enspirasyon</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concept" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Kategori Konsèp 3D
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getCategoriesByType('concept').length === 0 ? (
                <p className="text-gray-500 text-center py-8">Pa gen kategori konsèp 3D ankò.</p>
              ) : (
                <div className="grid gap-4">
                  {getCategoriesByType('concept').map((category) => (
                    <div key={category.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-500">Konsèp 3D</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEdit(category)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoryManagement;
