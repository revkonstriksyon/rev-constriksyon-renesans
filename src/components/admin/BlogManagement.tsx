
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Save, X, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslationForm from './TranslationManagement';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  author: string;
  date: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingBlog, setTranslatingBlog] = useState<Blog | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: 'Rev Konstriksyon',
    date: new Date().toLocaleDateString('fr-FR'),
    read_time: '5 min',
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje blog yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSave = async () => {
    try {
      const slug = generateSlug(formData.title);
      
      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update({
            ...formData,
            slug,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingBlog.id);

        if (error) throw error;
        toast({ title: 'Blog modifye ak siksè!' });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([{
            ...formData,
            slug,
            published: false,
          }]);

        if (error) throw error;
        toast({ title: 'Blog kreye ak siksè!' });
      }

      fetchBlogs();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handlePublish = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: !published ? 'Blog pibliye!' : 'Blog pa pibliye ankò!',
      });
      fetchBlogs();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ou kwè ou vle efase blog sa a?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Blog efase ak siksè!' });
      fetchBlogs();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || '',
      category: blog.category,
      author: blog.author,
      date: blog.date,
      read_time: blog.read_time,
    });
    setIsCreating(true);
  };

  const startTranslation = (blog: Blog) => {
    setTranslatingBlog(blog);
    setIsTranslating(true);
  };

  const handleSaveTranslations = async (translations: Record<string, any>) => {
    if (!translatingBlog) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .update(translations)
        .eq('id', translatingBlog.id);

      if (error) throw error;

      toast({
        title: 'Siksè!',
        description: 'Tradiksyon yo konsève avèk siksè.',
      });

      setIsTranslating(false);
      setTranslatingBlog(null);
      fetchBlogs();
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Gen pwoblèm nan konsève tradiksyon yo.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setIsCreating(false);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: '',
      author: 'Rev Konstriksyon',
      date: new Date().toLocaleDateString('fr-FR'),
      read_time: '5 min',
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje blog yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvo Blog
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingBlog ? 'Modifye Blog' : 'Nouvo Blog'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tit</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tit blog la"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chwazi kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Konsèy Renovasyon">Konsèy Renovasyon</SelectItem>
                    <SelectItem value="Teknoloji">Teknoloji</SelectItem>
                    <SelectItem value="Design Interyè">Design Interyè</SelectItem>
                    <SelectItem value="Konstriksyon">Konstriksyon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="image_url">URL Imaj</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Rezime</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Yon kout deskripsyon blog la..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Kontni</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Kontni konplè blog la..."
                rows={10}
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

      {/* Blogs List */}
      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      blog.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.published ? 'Pibliye' : 'Draf'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{blog.category}</span>
                    <span>{blog.date}</span>
                    <span>{blog.read_time}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant={blog.published ? "destructive" : "default"}
                    onClick={() => handlePublish(blog.id, blog.published)}
                  >
                    {blog.published ? 'Pa pibliye' : 'Pibliye'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => startEdit(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => startTranslation(blog)}
                    title="Modifye tradiksyon"
                  >
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Pa gen blog ankò. Kòmanse kreye premye blog ou a!</p>
          </CardContent>
        </Card>
      )}

      {/* Translation Modal */}
      {isTranslating && translatingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <TranslationForm
              title={`Tradiksyon pou: ${translatingBlog.title}`}
              description="Ajoute tradiksyon yo nan 3 lang yo: Kreyòl Ayisyen, Français, ak English"
              initialData={translatingBlog}
              fields={[
                { key: 'title', label: 'Tit', type: 'text', required: true },
                { key: 'excerpt', label: 'Egzètè', type: 'textarea', required: true },
                { key: 'content', label: 'Kontni', type: 'textarea', required: true },
                { key: 'category', label: 'Kategori', type: 'text', required: true },
                { key: 'author', label: 'Otè', type: 'text', required: true },
              ]}
              onSave={handleSaveTranslations}
              onCancel={() => {
                setIsTranslating(false);
                setTranslatingBlog(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
