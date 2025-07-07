import { Home, Wrench, FileText, Eye, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStaticContent } from '@/hooks/useStaticContent';

const iconMap: Record<string, any> = {
  Home,
  Wrench,
  FileText,
  Eye,
  Zap,
  Shield,
};

const Services = () => {
  const { content } = useStaticContent();

  // Fixed set of 3 services to display on homepage
  const featuredServices = [
    {
      id: 1,
      title: "Plan Achitekti",
      description: "Konsepsyon ak kreye plan detaye pou pwojè konstriksyon yo ak vizualizasyon 3D",
      icon: "FileText",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Renovasyon",
      description: "Renovasyon ak reamenajman konplè kay ak espas yo ak materyèl kalite",
      icon: "Wrench", 
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Siveyans ak Jesyon Chantye",
      description: "Swivi ak jesyon pwofesyonèl nan travay konstriksyon yo ak kontwòl kalite",
      icon: "Eye",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            {content.services_section_title || 'Sèvis Nou Yo'}
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {content.services_section_subtitle || 'Nou ofri solisyon konplè pou tout bezwen konstriksyon ou yo, depi konsèp la jiska livrezon final la ak garanti.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => {
            const IconComponent = iconMap[service.icon || 'Home'] || Home;

            return (
              <div
                key={service.id}
                className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="font-poppins font-semibold text-xl text-primary mb-3">
                  {service.title}
                </h3>

                <p className="font-inter text-gray-600 mb-6">
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="text-accent hover:text-black font-inter font-medium transition-colors duration-300"
                >
                  Aprann plis →
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="bg-accent hover:bg-black hover:border-accent border-2 border-accent text-white px-8 py-4 rounded-lg font-inter font-semibold transition-all duration-300"
          >
            Depo Devis Gratis
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;