
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { ArrowLeft, Calendar, MapPin, Tag, ExternalLink, Play, ChevronLeft, ChevronRight, X, MessageCircle } from 'lucide-react';
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
  const [showLightbox, setShowLightbox] = useState(false);

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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 font-inter">Ap chaje pwojè a...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Pwojè pa jwenn</h1>
          <Link to="/projects" className="text-primary hover:underline font-semibold">
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

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
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-24">
          {/* Navigation */}
          <section className="py-8 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 text-primary hover:text-accent font-semibold transition-colors duration-300 px-6 py-3 rounded-lg hover:bg-gray-50"
              >
                <ArrowLeft className="w-5 h-5" />
                Retounen nan Pwojè yo
              </Link>
            </div>
          </section>

          {/* Project Header */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className={`px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg ${
                    project.project_type === 'reyalize' 
                      ? 'bg-green-500' 
                      : project.project_type === 'an-kour'
                      ? 'bg-blue-500'
                      : 'bg-purple-500'
                  }`}>
                    {project.project_type === 'reyalize' ? 'Reyalize' : 
                     project.project_type === 'an-kour' ? 'An Kour' : 'Sou Wout'}
                  </span>
                  {project.category && (
                    <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold">
                      {project.category}
                    </span>
                  )}
                </div>

                <h1 className="font-poppins font-bold text-3xl md:text-5xl text-primary mb-6 leading-tight">
                  {project.title}
                </h1>

                <p className="font-inter text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-8 text-gray-500 mb-8">
                  {project.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{project.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{project.date}</span>
                  </div>
                </div>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    <Tag className="w-5 h-5 text-gray-500 mt-1" />
                    {project.tags.map((tag, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
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
            <section className="py-16 bg-gray-100">
              <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                  {/* Main Image */}
                  <div className="relative mb-10">
                    <div 
                      className="aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                      onClick={() => setShowLightbox(true)}
                    >
                      <img
                        src={allImages[selectedImage]}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {project.video_url && selectedImage === 0 && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                            <Play className="w-10 h-10 text-primary ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Navigation arrows */}
                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
                        >
                          <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
                        >
                          <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl ${
                            selectedImage === index 
                              ? 'ring-4 ring-primary scale-105' 
                              : 'hover:scale-105'
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
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <h2 className="font-poppins font-bold text-3xl text-primary mb-12 text-center">
                    Avan ak Apre
                  </h2>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="text-center">
                      <h3 className="font-bold text-red-600 mb-6 text-xl">Avan</h3>
                      <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
                        <img
                          src={project.before_image_url}
                          alt={`${project.title} - Avan`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-green-600 mb-6 text-xl">Apre</h3>
                      <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
                        <img
                          src={project.after_image_url}
                          alt={`${project.title} - Apre`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-3xl p-12 shadow-xl">
                    <h2 className="font-poppins font-bold text-2xl text-primary mb-8">Detay Pwojè a</h2>
                    <div className="prose prose-lg max-w-none">
                      {project.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="font-inter text-gray-700 mb-6 leading-relaxed text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
                Ou renmen pwojè sa a?
              </h2>
              <p className="font-inter text-lg md:text-xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Ann diskite sou pwojè ou a ak ekip Rev Konstriksyon. Nou la pou ede w reyalize rèv ou yo ak menm nivo kalite.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/contact"
                  className="bg-white hover:bg-gray-100 text-primary px-10 py-5 rounded-xl font-inter font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  Diskite Pwojè Ou A
                </Link>
                <a
                  href="https://wa.me/50934567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-xl font-inter font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-3"
                >
                  <ExternalLink className="w-6 h-6" />
                  WhatsApp
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Lightbox Modal */}
        {showLightbox && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
            >
              <X className="w-7 h-7" />
            </button>
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}

            <div className="max-w-7xl max-h-full w-full flex items-center justify-center">
              <img
                src={allImages[selectedImage]}
                alt={project.title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProjectDetailPage;
