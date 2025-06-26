import { Home, Wrench, FileText, Eye, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: 'Renovasyon Konplè',
      description: 'Nou transofòme espas ou yo ak teknoloji modèn ak materyèl kalite wo.',
      features: ['Design modern', 'Materyèl premium', 'Finisman perfect']
    },
    {
      icon: Wrench,
      title: 'Extansyon Kay',
      description: 'Agrandi espas ou yo ak respè pou achitekti orijinal ak règleman yo.',
      features: ['Planifikasyon 3D', 'Permè legal', 'Entegrasyon atiran']
    },
    {
      icon: FileText,
      title: 'Plan Achitekti',
      description: 'Konsèp inovatè ak plan detaye ki konfòme ak estanda entènasyonal yo.',
      features: ['Modeling BIM', 'Vizyon 3D', 'Plan teknik']
    },
    {
      icon: Eye,
      title: 'Supervizyon Chantye',
      description: 'Jesyon pwofesyonèl ak swivi rigoureuse chak etap nan travay la.',
      features: ['Jesyon kalite', 'Respè echeye', 'Rapò regyè']
    },
    {
      icon: Zap,
      title: 'Entalasyon Elektrik',
      description: 'Sistèm elektrik segè ak teknoloji nouvo ak estanda sekirite.',
      features: ['Sistèm modèn', 'Sekirite garanti', 'Ekonomi enèji']
    },
    {
      icon: Shield,
      title: 'Garanti & Manten',
      description: 'Sèvis apre vant ak garanti pou kè poze sou travay nou an.',
      features: ['Garanti 5 an', 'Manten regyè', 'Sipò 24/7']
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Sèvis Nou Yo
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Nou ofri solisyon konplè pou tout bezwen konstriksyon ou yo, 
            depi konsèp la jiska livrezon final la ak garanti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
              </div>
              
              <h3 className="font-poppins font-semibold text-xl text-primary mb-3">
                {service.title}
              </h3>
              
              <p className="font-inter text-gray-600 mb-4">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/services"
                className="text-accent hover:text-accent/80 font-inter font-medium transition-colors duration-300"
              >
                Aprann plis →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300"
          >
            Depo Devis Gratis
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
