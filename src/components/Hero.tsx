
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Nou bati <span className="text-accent">rèv ou</span> ak presizyon & ekselans
          </h1>
          
          <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Depi 2015, Rev Konstriksyon se konpayi konstriksyon ki pi gen konfyans nan Ayiti. 
            Nou espesyalis nan renovasyon, extansyon, ak konstriksyon nouvo ak teknoloji modèn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Jwenn Konsiltasyon Gratis
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Gade Pwojè Nou Yo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-accent mb-2">150+</div>
              <div className="font-inter text-gray-200">Pwojè Reyalize</div>
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
