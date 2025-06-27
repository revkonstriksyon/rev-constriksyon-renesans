
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  location: string | null;
  date: string;
  category: string | null;
  published: boolean;
  created_at: string;
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    before_image_url: '',
    after_image_url: '',
    location: '',
    date: new Date().getFullYear().toString(),
    category: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje pwojè yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingProject.id);

        if (error) throw error;
        toast({ title: 'Pwojè modifye ak siksè!' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{
            ...formData,
            published: true,
          }]);

        if (error) throw error;
        toast({ title: 'Pwojè kreye ak siksè!' });
      }

      fetchProjects();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: !published ? 'Pwojè pibliye!' : 'Pwojè pa pibliye ankò!',
      });
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ou kwè ou vle efase pwojè sa a?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Pwojè efase ak siksè!' });
      fetchProjects();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url || '',
      before_image_url: project.before_image_url || '',
      after_image_url: project.after_image_url || '',
      location: project.location || '',
      date: project.date,
      category: project.category || '',
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setEditingProject(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      image_url: '',
      before_image_url: '',
      after_image_url: '',
      location: '',
      date: new Date().getFullYear().toString(),
      category: '',
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje pwojè yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pwojè Management</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvo Pwojè
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingProject ? 'Modifye Pwojè' : 'Nouvo Pwojè'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tit Pwojè</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tit pwojè a"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chwazi kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Construction Neuve">Construction Neuve</SelectItem>
                    <SelectItem value="Rénovation">Rénovation</SelectItem>
                    <SelectItem value="Extension">Extension</SelectItem>
                    <SelectItem value="Construction Verte">Construction Verte</SelectItem>
                    <SelectItem value="Rénovation Premium">Rénovation Premium</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Kote</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Kote pwojè a ye"
                />
              </div>
              <div>
                <Label htmlFor="date">Dat</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="2024"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="image_url">URL Imaj Prensipal</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="before_image_url">URL Imaj Avan</Label>
                <Input
                  id="before_image_url"
                  value={formData.before_image_url}
                  onChange={(e) => setFormData({ ...formData, before_image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="after_image_url">URL Imaj Apre</Label>
                <Input
                  id="after_image_url"
                  value={formData.after_image_url}
                  onChange={(e) => setFormData({ ...formData, after_image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsyon</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsyon pwojè a..."
                rows={6}
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

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.published ? 'Pibliye' : 'Kache'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                    <span>{project.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant={project.published ? "destructive" : "default"}
                    onClick={() => handleTogglePublish(project.id, project.published)}
                  >
                    {project.published ? 'Kache' : 'Pibliye'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Pa gen pwojè ankò. Kòmanse kreye premye pwojè ou a!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectManagement;
