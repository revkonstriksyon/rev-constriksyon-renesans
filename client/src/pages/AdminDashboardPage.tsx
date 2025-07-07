import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StaticContentManagement from '@/components/admin/StaticContentManagement';
import ServicesManagement from '@/components/admin/ServicesManagement';
import ProjectManagement from '@/components/admin/ProjectManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import HomepageSliderManagement from '@/components/admin/HomepageSliderManagement';
import InspirationGalleryManagement from '@/components/admin/InspirationGalleryManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import TranslationManagement from '@/components/admin/TranslationManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('static');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="static">Kontni</TabsTrigger>
            <TabsTrigger value="services">Sèvis</TabsTrigger>
            <TabsTrigger value="projects">Pwojè</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="blogs">Blog</TabsTrigger>
            <TabsTrigger value="slider">Slider</TabsTrigger>
            <TabsTrigger value="gallery">Galri</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
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

          <TabsContent value="categories">
            <CategoryManagement />
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

          <TabsContent value="translations">
            <TranslationManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
