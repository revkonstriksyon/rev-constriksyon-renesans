
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStaticContent } from '@/hooks/useStaticContent';
import ProjectTypeSection from '@/components/ProjectTypeSection';
import ConceptSection from '@/components/ConceptSection';
import InspirationGallery from '@/components/InspirationGallery';

const ProjectsPage = () => {
  const { content } = useStaticContent();

  return (
    <>
      <SEOManager
        title="Pwojè Konstriksyon ak Renovasyon nan Ayiti"
        description="Dekouvri pwojè konstriksyon ak renovasyon Rev Konstriksyon yo nan Ayiti. Gade travay nou yo ak rezilta nou yo nan plan achitekti, siveyans chantye ak renovasyon konplè."
        keywords="pwojè konstriksyon Ayiti, renovasyon kay Haiti, travay Rev Konstriksyon, plan achitekti reyalize, chantye konstriksyon, avan apre renovasyon"
        canonicalUrl="https://www.revkonstriksyon.com/projects"
        ogTitle="Pwojè Rev Konstriksyon - Travay Konstriksyon ak Renovasyon nan Ayiti"
        ogDescription="Gade pwojè konstriksyon ak renovasyon nou yo nan Ayiti. Avan ak apre travay nou yo ki montre kalite ak ekspètiz nou."
      />
      <OrganizationStructuredData />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary/90 to-accent">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Pwojè Rev Konstriksyon
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-4xl mx-auto text-gray-100 leading-relaxed">
              Dekouvri pwojè nou yo ki reyalize, ki an kour reyalizasyon, ak pwojè nou yo ki planifye ak ideyòm modèn ak kvalite pwofesyonèl.
            </p>
          </div>
        </section>

        {/* Navigation Menu */}
        <section className="py-12 bg-white shadow-sm sticky top-20 z-10">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-8">
                <a 
                  href="#projects" 
                  className="group text-primary hover:text-accent font-semibold transition-all duration-300 px-6 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  🏗️ <span>Pwojè yo</span>
                </a>
                <a 
                  href="#concepts" 
                  className="group text-primary hover:text-accent font-semibold transition-all duration-300 px-6 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  🎯 <span>Konsepsyon 3D</span>
                </a>
                <a 
                  href="#inspiration" 
                  className="group text-primary hover:text-accent font-semibold transition-all duration-300 px-6 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  ✨ <span>Enspirasyon</span>
                </a>
              </div>
            </nav>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectTypeSection />

        {/* 3D Concepts Section */}
        <ConceptSection />

        {/* Inspiration Gallery Section */}
        <InspirationGallery />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-6">
              Ou Gen Yon Pwojè nan Tèt Ou?
            </h2>
            <p className="font-inter text-lg md:text-xl mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Ann travay ansanm pou reyalize rèv konstriksyon ou a ak menm nivo kalite ak presizyon ki fè nou diferan.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-primary px-10 py-5 rounded-xl font-inter font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>Kòmanse Pwojè Ou A</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/50934567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-xl font-inter font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>WhatsApp</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;
