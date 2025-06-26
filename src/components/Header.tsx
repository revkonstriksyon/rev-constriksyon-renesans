
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projets', href: '/projects' },
    { label: 'Témoignages', href: '/testimonials' },
    { label: 'Blog', href: '/blog' },
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl font-poppins">R</span>
            </div>
            <div>
              <h1 className="font-poppins font-bold text-xl text-primary">Rev Konstriksyon</h1>
              <p className="text-xs text-gray-600">Excellence & Précision</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`transition-colors duration-300 font-inter font-medium ${
                  isActive(item.href) 
                    ? 'text-accent border-b-2 border-accent pb-1' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+509 3456-7890</span>
            </div>
            <Link 
              to="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-inter font-medium transition-colors duration-300"
            >
              Consultation Gratuite
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
                      : 'text-gray-700 hover:text-primary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+509 3456-7890</span>
                </div>
                <Link
                  to="/contact"
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-lg font-inter font-medium transition-colors duration-300 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Consultation Gratuite
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
