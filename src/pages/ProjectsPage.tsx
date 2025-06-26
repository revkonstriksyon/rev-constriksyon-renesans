
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Eye } from 'lucide-react';
import { useState } from 'react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout Pwojè' },
    { id: 'residential', label: 'Rezidansyèl' },
    { id: 'commercial', label: 'Komèsyal' },
    { id: 'renovation', label: 'Renovasyon' },
    { id: 'extension', label: 'Extansyon' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Villa Moderne Péguy-Ville',
      category: 'residential',
      location: 'Péguy-Ville, Port-au-Prince',
      date: '2024',
      type: 'Construction Neuve',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Transformation complète d\'une résidence avec architecture moderne, finitions premium, et intégration de technologies smart home.',
      features: ['4 chanm', '3 twalèt', '350m²', 'Piscine', 'Garage 2 machin']
    },
    {
      id: 2,
      title: 'Rénovation Maison Coloniale Delmas',
      category: 'renovation',
      location: 'Delmas 31, Port-au-Prince',
      date: '2023',
      type: 'Rénovation Complète',
      beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Restauration et modernisation d\'une maison coloniale historique en préservant son charme authentique tout en ajoutant le confort moderne.',
      features: ['5 chanm', '4 twalèt', '280m²', 'Jardin', 'Terrass']
    },
    {
      id: 3,
      title: 'Centre Commercial Tabarre',
      category: 'commercial',
      location: 'Tabarre, Port-au-Prince',
      date: '2023',
      type: 'Construction Commerciale',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Construction d\'un centre commercial moderne avec espaces optimisés, éclairage naturel, et facilités d\'accessibilité.',
      features: ['12 boutiques', '2 étages', '1200m²', 'Parking', 'Sécurité 24/7']
    },
    {
      id: 4,
      title: 'Résidence Écologique Kenscoff',
      category: 'residential',
      location: 'Kenscoff, Ouest',
      date: '2022',
      type: 'Construction Verte',
      beforeImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Maison écologique avec panneaux solaires, système de récupération d\'eau, et matériaux durables respectueux de l\'environnement.',
      features: ['3 chanm', '2 twalèt', '200m²', 'Panèl solè', 'Jardin òganik']
    },
    {
      id: 5,
      title: 'Extension Luxe Pétion-Ville',
      category: 'extension',
      location: 'Pétion-Ville Centre',
      date: '2024',
      type: 'Extension Premium',
      beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Extension d\'une maison existante avec suite parentale, bureau moderne, et terrasse panoramique avec vue sur la ville.',
      features: ['Suite prensipal', 'Biwo modèn', '+120m²', 'Terrass', 'Vue sou vil la']
    },
    {
      id: 6,
      title: 'Bureaux Corporate Croix-des-Bouquets',
      category: 'commercial',
      location: 'Croix-des-Bouquets',
      date: '2023',
      type: 'Bureaux Modernes',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Aménagement de bureaux corporatifs avec espaces de travail collaboratif, salles de réunion modernes, et zones de détente.',
      features: ['15 biwo', '3 sal reyinyon', '800m²', 'Kafeterya', 'Espas detant']
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            Pwojè Rev Konstriksyon
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Dekouvri kèk nan pwojè nou yo ki pi rekonèt, ki montre ekspètiz nou an ak kalite travay nou an nan divès domèn konstriksyon.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Before/After Images */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative overflow-hidden">
                      <img
                        src={project.beforeImage}
                        alt={`${project.title} - Avan`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                        Avan
                      </div>
                    </div>
                    <div className="w-1/2 relative overflow-hidden">
                      <img
                        src={project.afterImage}
                        alt={`${project.title} - Apre`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                        Apre
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-inter font-medium">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-xl text-primary mb-3">
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

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary text-primary px-2 py-1 rounded text-sm font-inter"
                      >
                        {feature}
                      </span>
                    ))}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl mb-4">
            Ou Gen Yon Pwojè nan Tèt Ou?
          </h2>
          <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            Ann travay ansanm pou reyalize rèv konstriksyon ou a ak menm nivo kalite ak presizyon.
          </p>
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            Kòmanse Pwojè Ou A
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
