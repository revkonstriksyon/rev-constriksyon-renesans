
import { ArrowRight, Calendar, MapPin, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeaturedProjects } from '@/hooks/useProjects';
import { useStaticContent } from '@/hooks/useStaticContent';

const Projects = () => {
  const { projects, isLoading } = useFeaturedProjects();
  const { content } = useStaticContent();

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje pwojè yo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            {content.projects_section_title || 'Pwojè Nou Yo'}
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {content.projects_section_subtitle || 'Dekouvri kèk nan pwojè nou yo ki pi rekonèt, ki montre ekspètiz nou an ak kalite travay nou an.'}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Pa gen pwojè yo montre kounye a.</p>
            <Link
              to="/contact"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300"
            >
              Kominike Avè Nou
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
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
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
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
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            }}
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
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    ) : (
                      <img
                        src={project.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
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
                          : 'bg-blue-500 text-white'
                      }`}>
                        {project.project_type === 'reyalize' ? 'Reyalize' : 'Konsèp'}
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

                    <h3 className="font-poppins font-semibold text-xl text-primary mb-3">
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

                    <Link
                      to="/contact"
                      className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
                    >
                      Diskite Pwojè Sa A Avè Nou
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                Wè Tout Pwojè Yo
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
