import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';
import StaticContentManagement from '@/components/admin/StaticContentManagement';
import ServicesManagement from '@/components/admin/ServicesManagement';
import ProjectManagement from '@/components/admin/ProjectManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import HomepageSliderManagement from '@/components/admin/HomepageSliderManagement';
import InspirationGalleryManagement from '@/components/admin/InspirationGalleryManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import TranslationManagement from '@/components/admin/TranslationManagement';
import BackupManagement from '@/components/admin/BackupManagement';


const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('static');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Dekonekte',
        description: 'Ou dekonekte ak siksè.',
      });
      navigate('/admin/login');
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan dekoneksyon an.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Dekonekte
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="static">Kontni</TabsTrigger>
            <TabsTrigger value="services">Sèvis</TabsTrigger>
            <TabsTrigger value="projects">Pwojè</TabsTrigger>
            <TabsTrigger value="blogs">Blog</TabsTrigger>
            <TabsTrigger value="slider">Slider</TabsTrigger>
            <TabsTrigger value="gallery">Galri</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="translations">Lang</TabsTrigger>
          </TabsList>

          <TabsContent value="static">
            <StaticContentManagement />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManagement />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>


          <TabsContent value="blogs">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="slider">
            <HomepageSliderManagement />
          </TabsContent>

          <TabsContent value="gallery">
            <InspirationGalleryManagement />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManagement />
          </TabsContent>

          <TabsContent value="backup">
            <BackupManagement />
          </TabsContent>

          <TabsContent value="translations">
            <TranslationManagement 
              title="Jesyon Tradiksyon"
              fields={[]}
              onSave={async () => {}}
              onCancel={() => {}}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
