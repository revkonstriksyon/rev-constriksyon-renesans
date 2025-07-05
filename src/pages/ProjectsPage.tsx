
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Eye, Play, Filter } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useStaticContent } from '@/hooks/useStaticContent';
import InspirationGallery from '@/components/InspirationGallery';
import ProjectTypeSection from '@/components/ProjectTypeSection';
import ConceptSection from '@/components/ConceptSection';

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
      
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Pwojè Rev Konstriksyon
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Dekouvri pwojè nou yo ki reyalize, ki an kour reyalizasyon, ak pwojè nou yo ki planifye ak ideyòm modèn ak kvalite pwofesyonèl.
            </p>
          </div>
        </section>

        {/* Navigation Menu */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center">
              <div className="flex space-x-8">
                <a href="#projects" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Pwojè yo
                </a>
                <a href="#concepts" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Konsepsyon 3D
                </a>
                <a href="#inspiration" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Enspirasyon
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
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-poppins font-bold text-3xl mb-4">
              Ou Gen Yon Pwojè nan Tèt Ou?
            </h2>
            <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
              Ann travay ansanm pou reyalize rèv konstriksyon ou a ak menm nivo kalite ak presizyon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors"
              >
                Kòmanse Pwojè Ou A
              </Link>
              <a
                href="https://wa.me/50934567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors inline-flex items-center gap-2 justify-center"
              >
                <ArrowRight className="w-5 h-5" />
                WhatsApp
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
