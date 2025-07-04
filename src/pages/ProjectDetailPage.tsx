
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { ArrowLeft, Calendar, MapPin, Tag, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  content: string | null;
  image_url: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  images: string[];
  video_url: string | null;
  location: string | null;
  date: string;
  category: string | null;
  tags: string[];
  project_type: string;
  meta_title: string | null;
  meta_description: string | null;
}

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 bg-gray-50 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje pwojè a...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 bg-gray-50 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Pwojè pa jwenn</h1>
          <Link to="/projects" className="text-primary hover:underline">
            Retounen nan lis pwojè yo
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [
    ...(project.image_url ? [project.image_url] : []),
    ...project.images
  ].filter(Boolean);

  return (
    <>
      <SEOManager
        title={project.meta_title || project.title}
        description={project.meta_description || project.description}
        canonicalUrl={`https://www.revkonstriksyon.com/projects/${slug}`}
        ogTitle={project.meta_title || project.title}
        ogDescription={project.meta_description || project.description}
        ogImage={project.image_url || undefined}
      />
      
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-24">
          {/* Navigation */}
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retounen nan Pwojè yo
              </Link>
            </div>
          </section>

          {/* Project Header */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    project.project_type === 'reyalize' 
                      ? 'bg-green-100 text-green-800' 
                      : project.project_type === 'an-kour'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {project.project_type === 'reyalize' ? 'Reyalize' : 
                     project.project_type === 'an-kour' ? 'An Kour' : 'Planifye'}
                  </span>
                  {project.category && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {project.category}
                    </span>
                  )}
                </div>

                <h1 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
                  {project.title}
                </h1>

                <p className="font-inter text-lg text-gray-600 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
                  {project.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{project.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{project.date}</span>
                  </div>
                </div>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    <Tag className="w-4 h-4 text-gray-500 mt-1" />
                    {project.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Image Gallery */}
          {allImages.length > 0 && (
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  {/* Main Image */}
                  <div className="relative mb-8">
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={allImages[selectedImage]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {project.video_url && selectedImage === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square bg-gray-200 rounded-lg overflow-hidden transition-all ${
                            selectedImage === index 
                              ? 'ring-2 ring-primary' 
                              : 'hover:ring-2 hover:ring-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Before/After Images */}
          {project.before_image_url && project.after_image_url && (
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-poppins font-bold text-2xl text-primary mb-8 text-center">
                    Avan ak Apre
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium text-red-600 mb-4 text-center">Avan</h3>
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={project.before_image_url}
                          alt={`${project.title} - Avan`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-green-600 mb-4 text-center">Apre</h3>
                      <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={project.after_image_url}
                          alt={`${project.title} - Apre`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Project Content */}
          {project.content && (
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="prose prose-lg max-w-none">
                    {project.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="font-inter text-gray-700 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-poppins font-bold text-3xl mb-4">
                Ou renmen pwojè sa a?
              </h2>
              <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
                Ann diskite sou pwojè ou a ak ekip Rev Konstriksyon. Nou la pou ede w reyalize rèv ou yo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors"
                >
                  Diskite Pwojè Ou A
                </Link>
                <a
                  href="https://wa.me/50934567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailPage;
