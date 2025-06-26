
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Team />
      <Values />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
