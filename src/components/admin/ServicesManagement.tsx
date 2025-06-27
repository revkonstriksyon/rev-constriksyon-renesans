
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  features: string[] | null;
  price_range: string | null;
  duration: string | null;
  order_position: number | null;
  published: boolean;
  created_at: string;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: '',
    price_range: '',
    duration: '',
    order_position: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pa ka chaje sèvis yo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const featuresArray = formData.features ? formData.features.split('\n').filter(f => f.trim()) : [];
      
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon || null,
            features: featuresArray,
            price_range: formData.price_range || null,
            duration: formData.duration || null,
            order_position: formData.order_position,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingService.id);

        if (error) throw error;
        toast({ title: 'Sèvis modifye ak siksè!' });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([{
            title: formData.title,
            description: formData.description,
            icon: formData.icon || null,
            features: featuresArray,
            price_range: formData.price_range || null,
            duration: formData.duration || null,
            order_position: formData.order_position,
            published: true,
          }]);

        if (error) throw error;
        toast({ title: 'Sèvis kreye ak siksè!' });
      }

      fetchServices();
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
        .from('services')
        .update({ published: !published })
        .eq('id', id);

      if (error) throw error;
      toast({
        title: !published ? 'Sèvis pibliye!' : 'Sèvis pa pibliye ankò!',
      });
      fetchServices();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ou kwè ou vle efase sèvis sa a?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Sèvis efase ak siksè!' });
      fetchServices();
    } catch (error: any) {
      toast({
        title: 'Erè',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const startEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      features: service.features ? service.features.join('\n') : '',
      price_range: service.price_range || '',
      duration: service.duration || '',
      order_position: service.order_position || 0,
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setEditingService(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      icon: '',
      features: '',
      price_range: '',
      duration: '',
      order_position: 0,
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Ap chaje sèvis yo...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sèvis Management</h2>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvo Sèvis
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingService ? 'Modifye Sèvis' : 'Nouvo Sèvis'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tit Sèvis</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tit sèvis la"
                />
              </div>
              <div>
                <Label htmlFor="icon">Ikòn (Lucide icon name)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Home, Wrench, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Deskripsyon</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsyon sèvis la..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="features">Fonksionalite yo (yon nan chak liy)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Fonksionalite 1&#10;Fonksionalite 2&#10;Fonksionalite 3"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price_range">Pri</Label>
                <Input
                  id="price_range"
                  value={formData.price_range}
                  onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                  placeholder="15,000 - 50,000 USD"
                />
              </div>
              <div>
                <Label htmlFor="duration">Dire</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="2-4 mwa"
                />
              </div>
              <div>
                <Label htmlFor="order_position">Pozisyon</Label>
                <Input
                  id="order_position"
                  type="number"
                  value={formData.order_position}
                  onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
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

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.published ? 'Pibliye' : 'Kache'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{service.price_range}</span>
                    <span>{service.duration}</span>
                    <span>Pozisyon: {service.order_position}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant={service.published ? "destructive" : "default"}
                    onClick={() => handleTogglePublish(service.id, service.published)}
                  >
                    {service.published ? 'Kache' : 'Pibliye'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => startEdit(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Pa gen sèvis ankò. Kòmanse kreye premye sèvis ou a!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesManagement;
