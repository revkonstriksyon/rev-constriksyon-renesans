
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Villa Moderne Péguy-Ville',
      location: 'Péguy-Ville, Port-au-Prince',
      date: '2024',
      category: 'Construction Neuve',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Transformation complète d\'une résidence avec architecture moderne et finitions premium.'
    },
    {
      id: 2,
      title: 'Rénovation Maison Coloniale',
      location: 'Delmas 31, Port-au-Prince',
      date: '2023',
      category: 'Rénovation',
      beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Restauration et modernisation d\'une maison coloniale en préservant son charme authentique.'
    },
    {
      id: 3,
      title: 'Extension Bureau Commercial',
      location: 'Tabarre, Port-au-Prince',
      date: '2023',
      category: 'Extension',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Agrandissement d\'espaces de bureau avec design contemporain et éclairage naturel optimal.'
    },
    {
      id: 4,
      title: 'Résidence Écologique',
      location: 'Kenscoff, Ouest',
      date: '2022',
      category: 'Construction Verte',
      beforeImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Maison écologique avec panneaux solaires, récupération d\'eau et matériaux durables.'
    },
    {
      id: 5,
      title: 'Rénovation Appartement Luxe',
      location: 'Pétion-Ville Centre',
      date: '2024',
      category: 'Rénovation Premium',
      beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Transformation d\'un appartement en espace de vie luxueux avec finitions haut de gamme.'
    },
    {
      id: 6,
      title: 'Centre Commercial Moderne',
      location: 'Croix-des-Bouquets',
      date: '2023',
      category: 'Commercial',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Construction d\'un centre commercial avec architecture moderne et espaces optimisés.'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Pwojè Nou Yo
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Dekouvri kèk nan pwojè nou yo ki pi rekonèt, ki montre ekspètiz nou an ak kalite travay nou an.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Before/After Images */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 relative overflow-hidden">
                    <img
                      src={project.beforeImage}
                      alt={`${project.title} - Avant`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                      Avan
                    </div>
                  </div>
                  <div className="w-1/2 relative overflow-hidden">
                    <img
                      src={project.afterImage}
                      alt={`${project.title} - Après`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                      Apre
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 border-r-2 border-t-2 border-primary transform rotate-45"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-inter font-medium">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-poppins font-semibold text-xl text-primary mb-3">
                  {project.title}
                </h3>

                <p className="font-inter text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300">
                  Wè detay yo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300">
            Wè Tout Pwojè Yo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
