
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Eye, Play, Filter } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useStaticContent } from '@/hooks/useStaticContent';
import InspirationGallery from '@/components/InspirationGallery';

const ProjectsPage = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'reyalize' | 'an-kour' | 'planifye' | 'konsèp'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { projects, isLoading } = useProjects(selectedType === 'all' ? undefined : selectedType);
  const { content } = useStaticContent();

  // Get unique categories from projects
  const categories = [
    { id: 'all', label: 'Tout Kategori' },
    ...Array.from(new Set(projects.map(project => project.category).filter(Boolean))).map(cat => ({
      id: cat,
      label: cat
    }))
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  if (isLoading) {
    return (
      <>
        <SEOManager
          title="Pwojè Konstriksyon ak Renovasyon nan Ayiti"
          description="Dekouvri pwojè konstriksyon ak renovasyon Rev Konstriksyon yo nan Ayiti. Gade travay nou yo ak rezilta nou yo nan plan achitekti, siveyans chantye ak renovasyon konplè."
          keywords="pwojè konstriksyon Ayiti, renovasyon kay Haiti, travay Rev Konstriksyon, plan achitekti reyalize, chantye konstriksyon, avan apre renovasyon"
          canonicalUrl="https://www.revkonstriksyon.com/projects"
        />
        <div className="min-h-screen">
          <Header />
          <div className="pt-24 pb-16 bg-gray-50 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Ap chaje pwojè yo...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOManager
        title="Pwojè Konstriksyon ak Renovasyon nan Ayiti"
        description="Dekouvri pwojè konstriksyon ak renovasyon Rev Konstriksyon yo nan Ayiti. Gade travay nou yo ak rezilta nou yo nan plan achitekti, siveyans chantye ak renovasyon konplè."
        keywords="pwojè konstriksyon Ayiti, renovasyon kay Haiti, travay Rev Konstriksyon, plan achitekti reyalize, chantye konstriksyon, avan apre renovasyon"
        canonicalUrl="https://www.revkonstriksyon.com/projects"
        ogTitle="Pwojè Rev Konstriksyon - Travay Konstriksyon ak Renovasyon nan Ayiti"
        ogDescription="Gade pwojè konstriksyon ak renovasyon nou yo nan Ayiti. Avan ak apre travay nou yo ki montre kalite ak ekspètiz nou."
      />
      <OrganizationStructuredData />
      
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Pwojè Rev Konstriksyon
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Dekouvri pwojè nou yo ki reyalize, ki an kour reyalizasyon, ak pwojè nou yo ki planifye ak ideyòm modèn ak kvalite pwofesyonèl.
            </p>
          </div>
        </section>

        {/* Navigation Menu */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center">
              <div className="flex space-x-8">
                <a href="#projects" className="text-primary hover:text-primary/80 font-medium">
                  Pwojè yo
                </a>
                <a href="#inspiration" className="text-primary hover:text-primary/80 font-medium">
                  Enspirasyon
                </a>
              </div>
            </nav>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="font-poppins font-semibold text-2xl text-primary">Nou Pwojè yo</h2>
            </div>
            
            {/* Project Type Filter */}
            <div className="mb-6">
              <h3 className="font-inter font-medium text-gray-700 mb-3">Tip Pwojè</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: 'all', label: 'Tout Pwojè', count: projects.length },
                  { id: 'reyalize', label: 'Pwojè Reyalize', count: projects.filter(p => p.project_type === 'reyalize').length },
                  { id: 'an-kour', label: 'Pwojè An Kour', count: projects.filter(p => p.project_type === 'an-kour').length },
                  { id: 'planifye', label: 'Pwojè Planifye', count: projects.filter(p => p.project_type === 'planifye').length },
                  { id: 'konsèp', label: 'Konsèp 3D', count: projects.filter(p => p.project_type === 'konsèp').length }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`px-6 py-3 rounded-lg font-inter font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedType === type.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    {type.label}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedType === type.id ? 'bg-white/20' : 'bg-gray-200'
                    }`}>
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-inter font-medium text-gray-700 mb-3">Kategori</h3>
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-lg font-inter font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 font-inter text-lg">Pa gen pwojè ki jwenn.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Project Images */}
                    <div className="relative h-64 overflow-hidden">
                      {project.before_image_url && project.after_image_url ? (
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 relative overflow-hidden">
                            <img
                              src={project.before_image_url}
                              alt={`${project.title} - Avan`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                              Avan
                            </div>
                          </div>
                          <div className="w-1/2 relative overflow-hidden">
                            <img
                              src={project.after_image_url}
                              alt={`${project.title} - Apre`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                              Apre
                            </div>
                          </div>
                        </div>
                      ) : project.images.length > 0 ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <img
                          src={project.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      
                      {/* Video indicator */}
                      {project.video_url && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      )}

                      {/* Project type badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-inter font-medium ${
                          project.project_type === 'reyalize' 
                            ? 'bg-green-500 text-white' 
                            : project.project_type === 'an-kour'
                            ? 'bg-blue-500 text-white'
                            : project.project_type === 'planifye'
                            ? 'bg-purple-500 text-white'
                            : 'bg-orange-500 text-white'
                        }`}>
                          {project.project_type === 'reyalize' ? 'Reyalize' : 
                           project.project_type === 'an-kour' ? 'An Kour' : 
                           project.project_type === 'planifye' ? 'Planifye' : 'Konsèp'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {project.category && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-inter font-medium">
                            {project.category}
                          </span>
                        </div>
                      )}

                      <h3 className="font-poppins font-bold text-xl text-primary mb-3">
                        {project.title}
                      </h3>

                      <p className="font-inter text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-inter">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-gray-400 text-xs font-inter">+{project.tags.length - 3} pi</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {project.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.date}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {project.slug ? (
                          <Link
                            to={`/projects/${project.slug}`}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-inter font-medium text-center transition-colors"
                          >
                            <Eye className="w-4 h-4 inline mr-2" />
                            Gade Detay
                          </Link>
                        ) : (
                          <Link
                            to="/contact"
                            className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-inter font-medium text-center transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 inline mr-2" />
                            Li Plis
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Inspiration Gallery Section */}
        <InspirationGallery />

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-poppins font-bold text-3xl mb-4">
              Ou Gen Yon Pwojè nan Tèt Ou?
            </h2>
            <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
              Ann travay ansanm pou reyalize rèv konstriksyon ou a ak menm nivo kalite ak presizyon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors"
              >
                Kòmanse Pwojè Ou A
              </Link>
              <a
                href="https://wa.me/50934567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors inline-flex items-center gap-2 justify-center"
              >
                <ArrowRight className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;
