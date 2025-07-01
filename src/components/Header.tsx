
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStaticContent } from '@/hooks/useStaticContent';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { content } = useStaticContent();

  const navItems = [
    { label: 'Akèy', href: '/' },
    { label: 'Sèvis yo', href: '/services' },
    { label: 'Pwojè yo', href: '/projects' },
    { label: 'Temwayaj', href: '/testimonials' },
    { label: 'Blog', href: '/blog' },
    { label: 'Sou Nou', href: '/about' },
    { label: 'Kontakte Nou', href: '/contact' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 w-full bg-white/98 backdrop-blur-sm z-50 shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/880a9829-94fc-4423-bfc3-3eff62ff347d.png" 
              alt="Rev Konstriksyon Logo" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="font-poppins font-bold text-xl text-primary">Rev Konstriksyon</h1>
              <p className="text-xs text-gray-600">Ekspètiz ak Presizyon</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`transition-colors duration-300 font-inter font-medium relative ${
                  isActive(item.href) 
                    ? 'text-accent' 
                    : 'text-gray-700 hover:text-accent'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+509 4762 4431</span>
            </div>
            <Link 
              to="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-inter font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Jwenn Devis Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors duration-300 font-inter font-medium ${
                    isActive(item.href) 
                      ? 'text-accent font-semibold' 
                      : 'text-gray-700 hover:text-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+509 4762 4431</span>
                </div>
                <Link
                  to="/contact"
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-inter font-medium transition-all duration-300 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jwenn Devis Gratis
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
