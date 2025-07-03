
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import Values from '@/components/Values';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData, ServiceStructuredData } from '@/components/SEO/StructuredData';

const Index = () => {
  const services = [
    { name: "Plan Achitekti", description: "Konsepsyon ak kreye plan detaye pou pwojè konstriksyon yo" },
    { name: "Plan Estriktirèl", description: "Kalkil ak plan estriktirèl pou sekirite ak solid batiman yo" },
    { name: "Visualisation 3D", description: "Rendering ak modèl 3D pou vizualize pwojè yo avan konstriksyon" },
    { name: "Siveyans Chantye", description: "Swivi ak jesyon pwofesyonèl nan travay konstriksyon yo" },
    { name: "Renovasyon Konplè", description: "Renovasyon ak reamenajman kay ak espas yo" },
    { name: "Konsèltasyon Pwojè", description: "Konsèy ak akonpayman nan tout etap pwojè konstriksyon yo" }
  ];

  return (
    <>
      <SEOManager
        title="Rev Konstriksyon - Konpani Konstriksyon ak Renovasyon #1 nan Ayiti"
        description="Rev Konstriksyon se konpani konstriksyon ak renovasyon prensipal nan Ayiti. Nou bay sèvis plan achitekti, siveyans chantye, visualisation 3D ak konsèltasyon pwojè. Jwenn devis gratis kounye a!"
        keywords="konstriksyon kay Ayiti, renovasyon kay Haiti, plan achitekti, siveyans chantye, Rev Konstriksyon, bati lakay, deviz konstriksyon, konsèltasyon pwojè, konstriksyon Pòtoprens"
        canonicalUrl="https://www.revkonstriksyon.com/"
        ogTitle="Rev Konstriksyon - Konpani Konstriksyon #1 nan Ayiti"
        ogDescription="Nou konstwi rèv ou yo ak ekspètiz, presizyon ak pasyon. Jwenn devis gratis pou pwojè konstriksyon oswa renovasyon ou an kounye a!"
        ogImage="https://www.revkonstriksyon.com/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png"
      />
      <OrganizationStructuredData type="localBusiness" />
      <ServiceStructuredData services={services} />
      
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Services />
          <Projects />
          <Testimonials />
          <Team />
          <Values />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
