import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save, X, Image, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/ui/rich-text-editor';

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
  project_type: string;
  slug: string | null;
  images: string[] | null;
  video_url: string | null;
  tags: string[] | null;
  featured: boolean | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
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
    project_type: 'reyalize',
    slug: '',
    images: [''],
    video_url: '',
    tags: [''],
    featured: false,
    content: '',
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    fetchProjects();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('category')
        .not('category', 'is', null);

      if (error) throw error;
      
      const uniqueCategories = [...new Set(data?.map(item => item.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSave = async () => {
    try {
      const projectData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== ''),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        updated_at: new Date().toISOString(),
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast({ title: 'Pwojè modifye ak siksè!' });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([{
            ...projectData,
            published: true,
          }]);

        if (error) throw error;
        toast({ title: 'Pwojè kreye ak siksè!' });
      }

      fetchProjects();
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

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ featured: !featured })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: !featured ? 'Pwojè mete kòm featured!' : 'Pwojè pa featured ankò!',
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
      project_type: project.project_type,
      slug: project.slug || '',
      images: project.images && project.images.length > 0 ? project.images : [''],
      video_url: project.video_url || '',
      tags: project.tags && project.tags.length > 0 ? project.tags : [''],
      featured: project.featured || false,
      content: project.content || '',
      meta_title: project.meta_title || '',
      meta_description: project.meta_description || '',
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
      project_type: 'reyalize',
      slug: '',
      images: [''],
      video_url: '',
      tags: [''],
      featured: false,
      content: '',
      meta_title: '',
      meta_description: '',
    });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
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
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Enfòmasyon</TabsTrigger>
                <TabsTrigger value="content">Kontni</TabsTrigger>
                <TabsTrigger value="media">Medya</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                {/* Basic Info */}
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
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="pwoje-kay-modern (optional - ap kreye otomatikman)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="project_type">Tip Pwojè</Label>
                    <Select value={formData.project_type} onValueChange={(value: 'reyalize' | 'an-kour' | 'planifye' | 'konsèp') => setFormData({ ...formData, project_type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chwazi tip" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reyalize">Reyalize</SelectItem>
                        <SelectItem value="an-kour">An Kour</SelectItem>
                        <SelectItem value="planifye">Planifye</SelectItem>
                        <SelectItem value="konsèp">Konsèp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chwazi kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <SelectItem value="Construction Neuve">Construction Neuve</SelectItem>
                        <SelectItem value="Rénovation">Rénovation</SelectItem>
                        <SelectItem value="Extension">Extension</SelectItem>
                        <SelectItem value="Construction Verte">Construction Verte</SelectItem>
                        <SelectItem value="Rénovation Premium">Rénovation Premium</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured (parèt sou paj akey la)</Label>
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

                {/* Tags Section */}
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
                        placeholder="modern, pisin, depo, etc."
                      />
                      {formData.tags.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeTag(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {/* Description */}
                <div>
                  <Label htmlFor="description">Deskripsyon Kout</Label>
                  <RichTextEditor
                    content={formData.description}
                    onChange={(content) => setFormData({ ...formData, description: content })}
                    placeholder="Deskripsyon kout pwojè a..."
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content">Kontni Konplè (pou paj detay la)</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content: content })}
                    placeholder="Kontni konplè pwojè a..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                {/* Images Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Imaj yo
                  </h3>
                  
                  {/* Single main image */}
                  <div>
                    <Label htmlFor="image_url">URL Imaj Prensipal</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Before/After images */}
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

                  {/* Gallery images */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Galri Imaj</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addImageField}>
                        <Plus className="w-4 h-4 mr-1" />
                        Ajoute Imaj
                      </Button>
                    </div>
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={image}
                          onChange={(e) => updateImage(index, e.target.value)}
                          placeholder="https://..."
                        />
                        {formData.images.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeImage(index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Section */}
                <div>
                  <Label htmlFor="video_url" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    URL Videyo (opsyonèl)
                  </Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/... oswa https://vimeo.com/..."
                  />
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                {/* Meta fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                    <Input
                      id="meta_title"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      placeholder="Tit pou motè rechèch yo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                    <Input
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="Deskripsyon pou motè rechèch yo"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

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
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      project.project_type === 'reyalize'
                        ? 'bg-blue-100 text-blue-800'
                        : project.project_type === 'an-kour'
                        ? 'bg-orange-100 text-orange-800'
                        : project.project_type === 'planifye'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.project_type === 'reyalize' ? 'Reyalize' : 
                       project.project_type === 'an-kour' ? 'An Kour' :
                       project.project_type === 'planifye' ? 'Planifye' : 'Konsèp'}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: project.description }} />
                  <div className="flex gap-4 text-sm text-gray-500 mb-2">
                    <span>{project.category}</span>
                    <span>{project.location}</span>
                    <span>{project.date}</span>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tags.slice(0, 5).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="text-gray-400 text-xs">+{project.tags.length - 5}</span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 text-xs text-gray-400">
                    {project.images && project.images.length > 0 && <span>{project.images.length} imaj</span>}
                    {project.video_url && <span>Gen videyo</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant={project.featured ? "default" : "outline"}
                    onClick={() => handleToggleFeatured(project.id, project.featured || false)}
                  >
                    {project.featured ? 'Featured' : 'Featured?'}
                  </Button>
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
