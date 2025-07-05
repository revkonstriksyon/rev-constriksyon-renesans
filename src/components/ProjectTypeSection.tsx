
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye, Play, Filter, ArrowRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const ProjectTypeSection = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'reyalize' | 'an-kour' | 'planifye'>('all');
  const { projects, isLoading } = useProjects(selectedType === 'all' ? undefined : selectedType);

  const projectTypes = [
    { id: 'all', label: 'Tout Pwojè', count: projects.length },
    { 
      id: 'reyalize', 
      label: 'Pwojè Reyalize', 
      count: projects.filter(p => p.project_type === 'reyalize').length,
      color: 'bg-green-500'
    },
    { 
      id: 'an-kour', 
      label: 'Pwojè An Kour', 
      count: projects.filter(p => p.project_type === 'an-kour').length,
      color: 'bg-blue-500'
    },
    { 
      id: 'planifye', 
      label: 'Poko Kòmanse', 
      count: projects.filter(p => p.project_type === 'planifye').length,
      color: 'bg-purple-500'
    }
  ];

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje pwojè yo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter className="w-6 h-6 text-primary" />
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
              Nou Pwojè yo
            </h2>
          </div>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Dekouvri pwojè nou yo ki reyalize, ki an kour ak sa ki pral kòmanse yo.
          </p>
        </div>

        {/* Project Type Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {projectTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id as any)}
              className={`px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                selectedType === type.id
                  ? 'bg-primary text-white scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{type.label}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                selectedType === type.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <p className="text-gray-600 font-inter text-lg mb-6">Pa gen pwojè nan kategori sa a.</p>
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Kominike Avè Nou
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  {project.before_image_url && project.after_image_url ? (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={project.before_image_url}
                          alt={`${project.title} - Avan`}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Avan
                        </div>
                      </div>
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={project.after_image_url}
                          alt={`${project.title} - Apre`}
                          className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Apre
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={project.images[0] || project.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  )}
                  
                  {/* Video indicator */}
                  {project.video_url && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/60 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  )}

                  {/* Project type badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg ${
                      project.project_type === 'reyalize' 
                        ? 'bg-green-500' 
                        : project.project_type === 'an-kour'
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    }`}>
                      {project.project_type === 'reyalize' ? 'Reyalize' : 
                       project.project_type === 'an-kour' ? 'An Kour' : 'Poko Kòmanse'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {project.category && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                    </div>
                  )}

                  <h3 className="font-poppins font-bold text-xl text-primary mb-4 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="font-inter text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-gray-400 text-xs font-medium">+{project.tags.length - 3} pi</span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.slug ? (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-inter font-semibold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Eye className="w-5 h-5" />
                        Gade Plis
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-inter font-semibold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <ArrowRight className="w-5 h-5" />
                        Gade Plis
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
  );
};

export default ProjectTypeSection;
