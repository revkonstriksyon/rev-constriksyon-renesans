
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Home, Wrench, FileText, Eye, Zap, Calculator, ArrowRight, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: FileText,
      title: 'Plan Achitekti',
      shortDesc: 'Konsèp inovatè ak plan detaye ki konfòme ak estanda entènasyonal yo.',
      fullDesc: 'Nou kreye plan achitekti pwofesyonèl ak modeling BIM pou pwojè rezidansyèl ak komèsyal. Ekip nou an itilize teknoloji modèn pou ba ou vizyon 3D ak plan teknik ki detaye.',
      features: [
        'Modeling BIM ak teknoloji modèn',
        'Vizyon 3D ak rendering pwofesyonèl',
        'Plan teknik ak deskripsyon konplè',
        'Respekte kòd ak règleman lokal yo',
        'Konsèy sou materyèl ak teknoloji'
      ],
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Home,
      title: 'Konstriksyon Nouvo',
      shortDesc: 'Konstriksyon bâtiment rezidansyèl ak komèsyal ak materyèl kalite wo.',
      fullDesc: 'Depi fondasyon an jiska twati a, nou konstwi kay ak bilding ak presizyon ak kalite eksepsyonèl. Nou gen ekspètiz nan konstriksyon rezidansyèl ak komèsyal.',
      features: [
        'Konstriksyon rezidansyèl ak komèsyal',
        'Materyèl ak teknoloji modèn',
        'Jesyon konplè nan pwojè a',
        'Respekte echeye ak bidjè',
        'Garanti sou travay ak materyèl'
      ],
      image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Wrench,
      title: 'Renovasyon ak Extansyon',
      shortDesc: 'Transfòme ak agrandi espas ou yo ak respè pou achitekti orijinal la.',
      fullDesc: 'Nou spesyalis nan renovasyon konplè ak extansyon kay ki gen style. Nou konsèlve bèlte achitekti orijinal la pandan n ap ajoute modènite ak fonksyonalite.',
      features: [
        'Renovasyon konplè ak partial',
        'Extansyon ak respè pou estèl orijinal',
        'Amelyorasyon sekirite ak fonksyonalite',
        'Design modèn ak materyèl pwofesyonèl',
        'Planifikasyon 3D ak avan/apre'
      ],
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Eye,
      title: 'Supervizyon Chantye',
      shortDesc: 'Jesyon pwofesyonèl ak swivi rigoureuse chak etap nan travay la.',
      fullDesc: 'Nou asire jesyon ak supervizyon konplè nan chantye ou a. Ekip nou an veye sou kalite travay la, sekirite, ak respekte echeye yo.',
      features: [
        'Supervizyon pwofesyonèl 24/7',
        'Jesyon kalite ak sekirite',
        'Respekte echeye ak bidjè',
        'Rapò regyè ak transparans',
        'Kòdination ak tout sipèrvizè yo'
      ],
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Zap,
      title: 'Entalasyon Elektrik',
      shortDesc: 'Sistèm elektrik segè ak teknoloji nouvo ak estanda sekirite.',
      fullDesc: 'Nou ofri sèvis entalasyon ak reparasyon elektrik ak estanda sekirite ki pi wo yo. Ekip nou an gen sètifikasyon ak ekspètiz nan sistèm elektrik modèn.',
      features: [
        'Entalasyon sistèm elektrik konplè',
        'Sistèm sekirite ak otomatizasyon',
        'Panèl elektrik ak distribisyon',
        'Éclairaj ak priz modèn',
        'Ekonomi enèji ak teknoloji vèt'
      ],
      image: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: Calculator,
      title: 'Konsèltasyon ak Estimasyon',
      shortDesc: 'Konsèy ekspè ak estimasyon detaye pou pwojè ou a.',
      fullDesc: 'Nou ba ou konsèy pwofesyonèl ak estimasyon transparan pou pwojè ou a. Nou analize bezwen ou yo ak nou ba ou solisyon ki adapte ak bidjè ou.',
      features: [
        'Konsèltasyon gratis ak ekspè',
        'Estimasyon detaye ak transparan',
        'Analiz ak rekòmandasyon pwofesyonèl',
        'Planifikasyon ak echeye reyèl',
        'Sipò ak swivi nan tout pwosè a'
      ],
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            Sèvis Rev Konstriksyon
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Nou ofri solisyon konplè pou tout bezwen konstriksyon ou yo, 
            depi konsèp la jiska livrezon final la ak garanti pwofesyonèl.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20"></div>
                  <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="font-poppins font-bold text-2xl text-primary mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="font-inter text-gray-600 mb-6">
                    {service.fullDesc}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="font-inter text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300"
                  >
                    Demande Estimasyon Gratis
                    <ArrowRight className="w-5 h-5" />
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
            Pare pou Kòmanse Pwojè Ou A?
          </h2>
          <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            Kominike ak nou kònnye a pou yon konsèltasyon gratis ak estimasyon detaye.
          </p>
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            Konsèltasyon Gratis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
