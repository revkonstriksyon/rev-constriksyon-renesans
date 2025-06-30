
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStaticContent } from '@/hooks/useStaticContent';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { content } = useStaticContent();
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary via-gray-900 to-black overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            {content.hero_title || 'Rev Konstriksyon - Konstriksyon ak Renovasyon'}
          </h1>
          
          <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            {content.hero_subtitle || 'Ekspètiz ak Kalite nan Chak Pwojè'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/contact"
              className="bg-accent hover:bg-black hover:border-accent border-2 border-accent text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              {content.cta_primary_text || t('hero.cta_primary', 'Jwenn Konsèltasyon Gratis')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/projects"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {content.cta_secondary_text || t('hero.cta_secondary', 'Gade Pwojè Nou Yo')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-accent mb-2">150+</div>
              <div className="font-inter text-gray-200">Pwojè Realize</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-accent mb-2">8</div>
              <div className="font-inter text-gray-200">Ane Eksperyans</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-accent mb-2">100%</div>
              <div className="font-inter text-gray-200">Kliyan Satisfè</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
