
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOManager
        title="404 - Paj la pa jwenn | Rev Konstriksyon"
        description="Paj ou ap chèche a pa egziste. Retounen sou paj dakèy Rev Konstriksyon pou jwenn enfòmasyon sou sèvis konstriksyon ak renovasyon nou yo."
        noIndex={true}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center bg-secondary px-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-2xl font-poppins font-bold text-gray-800 mb-4">
                Oops! Paj la pa jwenn
              </h2>
              <p className="text-gray-600 font-inter mb-8">
                Paj ou ap chèche a pa egziste oswa li te deplase. 
                Eske ou ta renmen retounen sou paj dakèy la?
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                <Home className="w-4 h-4" />
                Paj Dakèy
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Retounen
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-2">Ou ka tou:</p>
              <div className="flex justify-center gap-4 text-sm">
                <Link to="/projects" className="text-accent hover:text-accent/80">Wè Pwojè Nou Yo</Link>
                <Link to="/blog" className="text-accent hover:text-accent/80">Li Blog Nou An</Link>
                <Link to="/contact" className="text-accent hover:text-accent/80">Kontakte Nou</Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
