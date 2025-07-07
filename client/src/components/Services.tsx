import { Home, Wrench, FileText, Eye, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStaticContent } from '@/hooks/useStaticContent';

const iconMap = {
  Home,
  Wrench,
  FileText,
  Eye,
  Zap,
  Shield
};

export default function Services() {
  const { content } = useStaticContent();

  const featuredServices = [
    {
      id: 1,
      title: content?.services_title || "Sèvis Konstriksyon",
      description: content?.services_description || "Nou bay sèvis konstriksyon kalite pi wo a.",
      icon: "Home"
    },
    {
      id: 2,
      title: content?.renovation_title || "Renovasyon",
      description: content?.renovation_description || "Nou renove kay ak bilding yo ak ekspètiz.",
      icon: "Wrench"
    },
    {
      id: 3,
      title: content?.consultation_title || "Konsèltasyon",
      description: content?.consultation_description || "Konsèy ekspè pou pwojè konstriksyon w yo.",
      icon: "FileText"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-primary mb-6">
            {content?.services_section_title || "Sèvis nou yo"}
          </h2>
          <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content?.services_section_description || "Nou gen ekspètiz ak eksperyans pou nou ede w nan tout pwojè konstriksyon w yo"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => {
            const IconComponent = iconMap[service.icon || 'Home'] || Home;

            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-poppins font-semibold text-xl text-primary mb-3">
                    {service.title}
                  </h3>

                  <p className="font-inter text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <Link
                    to="/services"
                    className="inline-flex items-center font-inter font-semibold text-accent hover:text-primary transition-colors duration-300"
                  >
                    Aprann plis
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-poppins font-semibold rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Gade tout sèvis yo
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}