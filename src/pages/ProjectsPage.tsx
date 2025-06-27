
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Eye } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useStaticContent } from '@/hooks/useStaticContent';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { projects, isLoading } = useProjects();
  const { content } = useStaticContent();

  // Get unique categories from projects
  const categories = [
    { id: 'all', label: 'Tout Pwojè' },
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
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-16 bg-gray-50 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje pwojè yo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            {content.projects_section_title || 'Pwojè Rev Konstriksyon'}
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            {content.projects_section_subtitle || 'Dekouvri kèk nan pwojè nou yo ki pi rekonèt, ki montre ekspètiz nou an ak kalite travay nou an nan divès domèn konstriksyon.'}
          </p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
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
                    ) : (
                      <img
                        src={project.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    {project.before_image_url && project.after_image_url && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5 text-primary" />
                      </div>
                    )}
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

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
                    >
                      Diskite Pwojè Ou A
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl mb-4">
            {content.cta_projects_title || 'Ou Gen Yon Pwojè nan Tèt Ou?'}
          </h2>
          <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            {content.cta_projects_subtitle || 'Ann travay ansanm pou reyalize rèv konstriksyon ou a ak menm nivo kalite ak presizyon.'}
          </p>
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            {content.cta_primary_text || 'Kòmanse Pwojè Ou A'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
