
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye, Play, Filter, ArrowRight, Building2, Construction, Clock, Lightbulb } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { Pagination } from '@/components/ui/pagination';

const ProjectTypeSection = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'reyalize' | 'an-kour' | 'planifye'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { projects, isLoading } = useProjects(selectedType === 'all' ? undefined : selectedType);
  
  const ITEMS_PER_PAGE = 9;

  // Pagination logic
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  // Reset to first page when project type changes
  const handleTypeChange = (type: 'all' | 'reyalize' | 'an-kour' | 'planifye') => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectTypes = [
    { 
      id: 'all', 
      label: 'Tout', 
      icon: Filter,
      count: projects.length,
      color: 'bg-gray-600',
      description: 'Gade tout pwojè nou yo'
    },
    { 
      id: 'reyalize', 
      label: 'Reyalize', 
      icon: Building2,
      count: projects.filter(p => p.project_type === 'reyalize').length,
      color: 'bg-green-600',
      description: 'Pwojè nou fini reyalize yo'
    },
    { 
      id: 'an-kour', 
      label: 'An Kour', 
      icon: Construction,
      count: projects.filter(p => p.project_type === 'an-kour').length,
      color: 'bg-blue-600',
      description: 'Pwojè k ap fèt kounye a'
    },
    { 
      id: 'planifye', 
      label: 'Planifye', 
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

        {/* Modern Tab Filter */}
        <div className="mb-12 md:mb-16">
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full p-1 inline-flex gap-1 min-w-max mx-2 md:mx-0">
                {projectTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleTypeChange(type.id as any)}
                      className={`flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-full font-inter font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 min-w-max ${
                        selectedType === type.id
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'text-gray-600 hover:text-primary hover:bg-white hover:scale-102'
                      }`}
                    >
                      <IconComponent className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="font-poppins">{type.label}</span>
                      <span className={`text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full flex-shrink-0 ${
                        selectedType === type.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {type.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Mobile scroll hint */}
          <div className="text-center md:hidden mb-2">
            <p className="text-xs text-gray-400 font-inter">← Swipe pou wè kategori yo →</p>
          </div>
          
          {/* Description for selected type */}
          <div className="text-center">
            <p className="text-gray-500 font-inter text-sm md:text-base">
              {projectTypes.find(t => t.id === selectedType)?.description}
            </p>
          </div>
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
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
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
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
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/60 rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  )}

                  {/* Project type badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                      project.project_type === 'reyalize' 
                        ? 'bg-green-500' 
                        : project.project_type === 'an-kour'
                        ? 'bg-blue-500'
                        : 'bg-purple-500'
                    }`}>
                      {project.project_type === 'reyalize' ? 'Reyalize' : 
                       project.project_type === 'an-kour' ? 'An Kour' : 'Planifye'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {project.category && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                    </div>
                  )}

                  <h3 className="font-poppins font-bold text-lg text-primary mb-3 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="font-inter text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    {project.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-gray-400 text-xs font-medium">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {project.slug ? (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-3 rounded-xl font-inter font-semibold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Gade Detay</span>
                        <span className="sm:hidden">Detay</span>
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white px-4 py-3 rounded-xl font-inter font-semibold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span className="hidden sm:inline">Diskite</span>
                        <span className="sm:hidden">Kontak</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              ))}
            </div>
            
            {/* Pagination */}
            {projects.length > ITEMS_PER_PAGE && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="justify-center"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectTypeSection;
