
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye, Play, Filter, ArrowRight, Building2, Construction, Clock, Lightbulb } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const ProjectTypeSection = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'reyalize' | 'an-kour' | 'planifye'>('all');
  const { projects, isLoading } = useProjects(selectedType === 'all' ? undefined : selectedType);

  const projectTypes = [
    { 
      id: 'all', 
      label: 'Tout Pwojè', 
      icon: Filter,
      count: projects.length,
      color: 'bg-gray-600',
      description: 'Gade tout pwojè nou yo'
    },
    { 
      id: 'reyalize', 
      label: 'Pwojè Reyalize', 
      icon: Building2,
      count: projects.filter(p => p.project_type === 'reyalize').length,
      color: 'bg-green-600',
      description: 'Pwojè nou fini reyalize yo'
    },
    { 
      id: 'an-kour', 
      label: 'Pwojè An Kour', 
      icon: Construction,
      count: projects.filter(p => p.project_type === 'an-kour').length,
      color: 'bg-blue-600',
      description: 'Pwojè k ap fèt kounye a'
    },
    { 
      id: 'planifye', 
      label: 'Sou Wout Reyalizasyon', 
      icon: Clock,
      count: projects.filter(p => p.project_type === 'planifye').length,
      color: 'bg-purple-600',
      description: 'Pwojè ki sou wout reyalizasyon yo'
    }
  ];

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 font-inter">Ap chaje pwojè yo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-5xl text-primary">
              Nou Pwojè yo
            </h2>
          </div>
          <p className="font-inter text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dekouvri pwojè nou yo ki reyalize, ki an kour ak sa ki sou wout reyalizasyon yo. Chak pwojè montre kalite ak ekspètiz nou.
          </p>
        </div>

        {/* Project Type Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {projectTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as any)}
                className={`group p-8 rounded-3xl font-inter font-semibold transition-all duration-300 text-left shadow-lg hover:shadow-2xl transform hover:-translate-y-2 ${
                  selectedType === type.id
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    selectedType === type.id 
                      ? 'bg-white/20' 
                      : `${type.color}/10`
                  }`}>
                    <IconComponent className={`w-7 h-7 ${
                      selectedType === type.id 
                        ? 'text-white' 
                        : type.color.replace('bg-', 'text-')
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{type.label}</h3>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mt-2 ${
                      selectedType === type.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {type.count} pwojè
                    </span>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${
                  selectedType === type.id ? 'text-gray-100' : 'text-gray-500'
                }`}>
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gray-50 rounded-3xl p-16 max-w-2xl mx-auto">
              <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Pa gen pwojè nan kategori sa a</h3>
              <p className="text-gray-600 font-inter text-lg mb-8">
                Nou ap travay sou nouvo pwojè yo. Rete konekte pou nouvo pwojè yo!
              </p>
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-colors inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                Kominike Avè Nou
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                {/* Project Image */}
                <div className="relative h-80 overflow-hidden">
                  {project.before_image_url && project.after_image_url ? (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={project.before_image_url}
                          alt={`${project.title} - Avan`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          Avan
                        </div>
                      </div>
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={project.after_image_url}
                          alt={`${project.title} - Apre`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          Apre
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={project.images[0] || project.image_url || 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  )}
                  
                  {/* Video indicator */}
                  {project.video_url && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black/60 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" />
                    </div>
                  )}

                  {/* Project type badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                      project.project_type === 'reyalize' 
                        ? 'bg-green-500' 
                        : project.project_type === 'an-kour'
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    }`}>
                      {project.project_type === 'reyalize' ? 'Reyalize' : 
                       project.project_type === 'an-kour' ? 'An Kour' : 'Sou Wout'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {project.category && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold">
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
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-gray-400 text-xs font-medium">+{project.tags.length - 4}</span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.slug ? (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-6 py-4 rounded-xl font-inter font-bold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <Eye className="w-5 h-5" />
                        Gade Detay
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-6 py-4 rounded-xl font-inter font-bold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <ArrowRight className="w-5 h-5" />
                        Diskite Pwojè Sa
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
