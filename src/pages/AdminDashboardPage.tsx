
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Plus, FileText, Folder, Settings, Phone, Briefcase, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BlogManagement from '@/components/admin/BlogManagement';
import ProjectManagement from '@/components/admin/ProjectManagement';
import StaticContentManagement from '@/components/admin/StaticContentManagement';
import ServicesManagement from '@/components/admin/ServicesManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import HomepageSliderManagement from '@/components/admin/HomepageSliderManagement';

const AdminDashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('slider');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/admin/login');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          navigate('/admin/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Erè',
        description: 'Pwoblèm nan dekoneksyon an.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Dekonekte',
        description: 'Ou dekonekte ak siksè.',
      });
      navigate('/admin/login');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'slider', label: 'Slider Dakey', icon: Image },
    { id: 'blogs', label: 'Blog Management', icon: FileText },
    { id: 'projects', label: 'Pwojè Management', icon: Folder },
    { id: 'services', label: 'Sèvis Management', icon: Briefcase },
    { id: 'contact', label: 'Enfòmasyon Kontak', icon: Phone },
    { id: 'content', label: 'Kontni Estatik', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Rev Konstriksyon Admin
              </h1>
              <p className="text-sm text-gray-500">
                Bonjou, {user.email}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Dekonekte
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'slider' && <HomepageSliderManagement />}
          {activeTab === 'blogs' && <BlogManagement />}
          {activeTab === 'projects' && <ProjectManagement />}
          {activeTab === 'services' && <ServicesManagement />}
          {activeTab === 'contact' && <ContactManagement />}
          {activeTab === 'content' && <StaticContentManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
