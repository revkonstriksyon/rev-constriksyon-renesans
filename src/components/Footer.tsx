
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';
import { useStaticContent } from '@/hooks/useStaticContent';

const Footer = () => {
  const { contactInfo, isLoading } = useContactInfo();
  const { content } = useStaticContent();

  if (isLoading) {
    return (
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
          <p className="mt-2 text-gray-300">Ap chaje...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/880a9829-94fc-4423-bfc3-3eff62ff347d.png" 
                alt="Rev Konstriksyon Logo" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h1 className="font-poppins font-bold text-xl">Rev Konstriksyon</h1>
                <p className="text-xs text-gray-300">Ekspètiz ak Presizyon</p>
              </div>
            </div>
            <p className="font-inter text-gray-300 mb-4">
              Nou konstwi rèv ou yo ak ekspètiz, presizyon ak pasyon. Chак pwojè gen pwòp istwa li, chак detay gen valè li.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v5.73a2.88 2.88 0 0 1-2.88 2.88 2.88 2.88 0 0 1-2.88-2.88V2H6.9v5.73a4.83 4.83 0 0 0 4.83 4.83c.424 0 .844-.055 1.252-.162.08 2.18.688 4.18 1.742 5.85l-.72.72L15.5 20.5l.72-.72c1.054-1.67 1.662-3.67 1.742-5.85.408.107.828.162 1.252.162a4.83 4.83 0 0 0 4.83-4.83V2h-2.08v.44a4.83 4.83 0 0 1-3.77 4.25z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Sèvis Nou Yo</h3>
            <ul className="space-y-3 font-inter text-gray-300">
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Renovasyon Konplè</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Extansyon Kay</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Plan Achitekti</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Supervizyon Chantye</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Entalasyon Elektrik</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Konsèltasyon ak Manten</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Navigasyon</h3>
            <ul className="space-y-3 font-inter text-gray-300">
              <li><a href="/" className="hover:text-accent transition-colors duration-300">Akèy</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors duration-300">Sèvis yo</a></li>
              <li><a href="/projects" className="hover:text-accent transition-colors duration-300">Pwojè yo</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors duration-300">Sou Nou</a></li>
              <li><a href="/contact" className="hover:text-accent transition-colors duration-300">Kontakte Nou</a></li>
              <li><a href="/blog" className="hover:text-accent transition-colors duration-300">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Kontak</h3>
            <div className="space-y-4 font-inter text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <a href="tel:+50947624431" className="hover:text-accent transition-colors">
                    +509 4762 4431
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <a href="mailto:revkonstriksyon@gmail.com" className="hover:text-accent transition-colors">
                    revkonstriksyon@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p>Pòtoprens ak anviwon yo, Ayiti</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <p className="font-inter text-gray-300 text-sm">
              © 2024 Rev Konstriksyon. Tout dwa rezève.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
