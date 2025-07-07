
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStaticContent } from '@/hooks/useStaticContent';

const Hero = () => {
  const { content } = useStaticContent();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            {content.hero_title || (
              <>
                <span className="block">Firme de Construction</span>
                <span className="block text-accent">Rev Konstriksyon</span>
              </>
            )}
          </h1>
          
          <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {content.hero_subtitle || 'Bureau d\'étude ak firme de construction ki gen pi gwo konfyans nan Ayiti. Nou konstwi rèv ou yo ak ekspètiz, presizyon ak pasyon. Plan achitekti, deviz estimatif, renovasyon kay ak siveyans chantye pwofesyonèl.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg"
              aria-label="Jwenn deviz gratis pou pwojè konstriksyon ou"
            >
              Jwenn Deviz Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <a
              href="tel:+50947624431"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors duration-300 flex items-center justify-center gap-2"
              aria-label="Rele nou kounye a pou konsèltasyon"
            >
              <Phone className="w-5 h-5" />
              Rele Nou Kounye A
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center text-gray-300">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              <span className="font-inter">+509 4762-4431</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="font-inter">Pòtoprens, Ayiti</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
