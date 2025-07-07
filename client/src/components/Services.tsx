
import { Home, Wrench, FileText, Eye, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useServices } from '@/hooks/useServices';
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
  const { services, isLoading } = useServices();
  const { content } = useStaticContent();

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje sèvis yo...</p>
        </div>
      </section>
    );
  }

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
          {services.map((service) => {
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
                
                <p className="font-inter text-gray-600 mb-4">
                  {service.description}
                </p>

                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {(service.price_range || service.duration) && (
                  <div className="mb-4 text-sm text-gray-500">
                    {service.price_range && <div>Pri: {service.price_range}</div>}
                    {service.duration && <div>Dire: {service.duration}</div>}
                  </div>
                )}

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
