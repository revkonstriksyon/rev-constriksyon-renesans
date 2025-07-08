
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface BlogPost {
  id: string;
  title: string;
  title_en?: string;
  title_fr?: string;
  title_ht?: string;
  excerpt: string;
  excerpt_en?: string;
  excerpt_fr?: string;
  excerpt_ht?: string;
  content: string;
  content_en?: string;
  content_fr?: string;
  content_ht?: string;
  image_url?: string;
  category: string;
  category_en?: string;
  category_fr?: string;
  category_ht?: string;
  author: string;
  date: string;
  read_time: string;
  slug: string;
  published: boolean;
  show_on_homepage: boolean | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  created_at: string;
  updated_at: string;
}

const BlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: '',
    author: '',
    read_time: '',
    published: true,
    show_on_homepage: false,
    tags: [] as string[],
    meta_title: '',
    meta_description: '',
    cta_text: '',
    cta_url: ''
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data.map(blog => ({
        ...blog,
        title_en: blog.title_en || undefined,
        title_fr: blog.title_fr || undefined,
        title_ht: blog.title_ht || undefined,
        content_en: blog.content_en || undefined,
        content_fr: blog.content_fr || undefined,
        content_ht: blog.content_ht || undefined,
        excerpt_en: blog.excerpt_en || undefined,
        excerpt_fr: blog.excerpt_fr || undefined,
        excerpt_ht: blog.excerpt_ht || undefined,
        category_en: blog.category_en || undefined,
        category_fr: blog.category_fr || undefined,
        category_ht: blog.category_ht || undefined,
        image_url: blog.image_url || undefined,
      })) || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan chajman atik yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: '',
      author: '',
      read_time: '',
      published: true,
      show_on_homepage: false,
      tags: [] as string[],
      meta_title: '',
      meta_description: '',
      cta_text: '',
      cta_url: ''
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.image_url || '',
      category: post.category,
      author: post.author,
      read_time: post.read_time,
      published: post.published,
      show_on_homepage: post.show_on_homepage || false,
      tags: post.tags || [],
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      cta_text: post.cta_text || '',
      cta_url: post.cta_url || ''
    });
    setEditingPost(post);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = generateSlug(formData.title);
      const currentDate = new Date().toISOString().split('T')[0];

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url || null,
        category: formData.category,
        author: formData.author,
        date: currentDate,
        read_time: formData.read_time,
        slug: editingPost ? editingPost.slug : slug,
        published: formData.published,
        show_on_homepage: formData.show_on_homepage,
        tags: formData.tags,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        cta_text: formData.cta_text || null,
        cta_url: formData.cta_url || null
      };

      if (editingPost) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingPost.id);

        if (error) throw error;
        
        toast({
          title: 'Siksè',
          description: 'Atik la modifye ak siksè.',
        });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
        
        toast({
          title: 'Siksè',
          description: 'Nouvo atik la ajoute ak siksè.',
        });
      }

      resetForm();
      fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan anrejistre atik la.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Èske ou vle efase atik sa a?')) return;
    
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: 'Siksè',
        description: 'Atik la efase ak siksè.',
      });
      
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan efase atik la.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-gray-600">Ap chaje atik yo...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jesyon Blog</h2>
          <p className="text-gray-600">Jere atik blog yo ak rich text editor</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajoute Nouvo Atik
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? 'Modifye Atik' : 'Nouvo Atik'}</CardTitle>
            <CardDescription>
              {editingPost ? 'Modifye enfòmasyon atik la' : 'Ajoute nouvo atik pou blog la'}
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
                  <label className="block text-sm font-medium mb-2">Kategori *</label>
                  <Input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reziume (Excerpt) *</label>
                <RichTextEditor
                  content={formData.excerpt}
                  onChange={(content) => setFormData({ ...formData, excerpt: content })}
                  placeholder="Ekri yon kout reziume sou atik la..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kontni Konplè *</label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content: content })}
                  placeholder="Ekri kontni konplè atik la ak tout fòmatting ou vle..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Imaj (URL)</label>
                  <Input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Otè *</label>
                  <Input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tan Lekti (ex: 5 min) *</label>
                  <Input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    required
                    placeholder="5 min"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <label className="text-sm font-medium">Pibliye</label>
                </div>
              </div>

              {/* New Enhanced Blog Fields */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Opsyon Avanse</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.show_on_homepage}
                      onCheckedChange={(checked) => setFormData({ ...formData, show_on_homepage: checked })}
                    />
                    <label className="text-sm font-medium">Montre sou paj akèy</label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (separe yo ak vigil)</label>
                    <Input
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                      })}
                      placeholder="konstriksyon, renovasyon, arkitekti"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Tit (SEO)</label>
                    <Input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      placeholder="Tit pou SEO (60 karaktè maksimòm)"
                      maxLength={60}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Meta Deskripsyon (SEO)</label>
                    <Input
                      type="text"
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="Deskripsyon pou SEO (160 karaktè maksimòm)"
                      maxLength={160}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tèks Bouton CTA</label>
                    <Input
                      type="text"
                      value={formData.cta_text}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                      placeholder="Li atik konplè a"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Lyen CTA</label>
                    <Input
                      type="url"
                      value={formData.cta_url}
                      onChange={(e) => setFormData({ ...formData, cta_url: e.target.value })}
                      placeholder="https://example.com/article"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingPost ? 'Modifye' : 'Ajoute'}
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
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {post.image_url && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.category} • {post.author}</p>
                  <p className="text-gray-500 text-sm">{post.date} • {post.read_time}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      post.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {post.published ? 'Pibliye' : 'Pa Pibliye'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">Pa gen atik ankò</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ajoute Premye Atik Ou A
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlogManagement;
