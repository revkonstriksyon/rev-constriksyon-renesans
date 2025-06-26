
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-poppins">R</span>
              </div>
              <div>
                <h1 className="font-poppins font-bold text-xl">Rev Konstriksyon</h1>
                <p className="text-xs text-gray-300">Excellence & Précision</p>
              </div>
            </div>
            <p className="font-inter text-gray-300 mb-4">
              Depi 2015, nou se konpayi konstriksyon ki pi gen konfyans nan Ayiti. 
              Nou konsantre sou kalite, presizyon ak relasyon kliyan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Sèvis Nou Yo</h3>
            <ul className="space-y-3 font-inter text-gray-300">
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Renovasyon Konplè</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Extansyon Kay</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Plan Achitekti</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Supervizyon Chantye</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Entalasyon Elektrik</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Garanti & Manten</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Navigasyon</h3>
            <ul className="space-y-3 font-inter text-gray-300">
              <li><a href="#home" className="hover:text-accent transition-colors duration-300">Accueil</a></li>
              <li><a href="#services" className="hover:text-accent transition-colors duration-300">Services</a></li>
              <li><a href="#projects" className="hover:text-accent transition-colors duration-300">Projets</a></li>
              <li><a href="#testimonials" className="hover:text-accent transition-colors duration-300">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Kontak</h3>
            <div className="space-y-4 font-inter text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <p>+509 3456-7890</p>
                  <p>+509 2812-3456</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <p>info@revkonstriksyon.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p>123 Rue Lamarre, Péguy-Ville</p>
                  <p>Port-au-Prince, Haïti</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-inter text-gray-300 text-sm">
              © 2024 Rev Konstriksyon. Tout dwa rezève.
            </p>
            <div className="flex gap-6 font-inter text-gray-300 text-sm">
              <a href="#" className="hover:text-accent transition-colors duration-300">Konfidensyalite</a>
              <a href="#" className="hover:text-accent transition-colors duration-300">Kondisyon</a>
              <a href="#" className="hover:text-accent transition-colors duration-300">Sitimap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
