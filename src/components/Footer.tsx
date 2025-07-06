
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';
import { useStaticContent } from '@/hooks/useStaticContent';
import { useFooterServices } from '@/hooks/useFooterServices';

const Footer = () => {
  const { contactInfo, isLoading } = useContactInfo();
  const { content } = useStaticContent();
  const { services } = useFooterServices();

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

  const TikTokIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.93-1.4-2.16-1.4-3.538v-.364C16.341.436 15.905 0 15.369 0h-2.454c-.536 0-.972.436-.972.972v10.024c0 1.696-1.377 3.072-3.072 3.072s-3.072-1.377-3.072-3.072 1.377-3.072 3.072-3.072c.169 0 .336.014.5.04V5.506c-.164-.026-.331-.04-.5-.04-3.632 0-6.576 2.944-6.576 6.576s2.944 6.576 6.576 6.576 6.576-2.944 6.576-6.576V8.851c1.035.606 2.23.951 3.497.951v-3.503c-.65 0-1.266-.137-1.823-.387-.557-.25-1.057-.607-1.448-1.05z"/>
    </svg>
  );

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/13fb6e7e-0f38-4087-a603-87332522b654.png" 
                alt="Rev Konstriksyon Logo" 
                className="h-10 w-10 object-contain"
              />
              <div>
                <h1 className="font-poppins font-bold text-xl">Rev Konstriksyon</h1>
                <p className="text-xs text-gray-300">Ekspètiz ak Presizyon</p>
              </div>
            </div>
            <p className="font-inter text-gray-300 mb-4">
              Nou konstwi rèv ou yo ak ekspètiz, presizyon ak pasyon. Chak pwojè gen pwòp istwa li, chak detay gen valè li.
            </p>
            <div className="flex space-x-4">
              {contactInfo.social_facebook && (
                <a 
                  href={contactInfo.social_facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {contactInfo.social_instagram && (
                <a 
                  href={contactInfo.social_instagram} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {contactInfo.social_tiktok && (
                <a 
                  href={contactInfo.social_tiktok} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                >
                  <TikTokIcon />
                </a>
              )}
              {contactInfo.social_youtube && (
                <a 
                  href={contactInfo.social_youtube} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-bold text-lg mb-6">Sèvis Nou Yo</h3>
            <ul className="space-y-3 font-inter text-gray-300">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <a href={service.url} className="hover:text-accent transition-colors duration-300">
                      {service.title}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="/services" className="hover:text-accent transition-colors duration-300">Plan achitekti</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors duration-300">Plan estriktirèl</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors duration-300">Visualisation 3D</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors duration-300">Deviz estimatif</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors duration-300">Siveyans ak jesyon chantye</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors duration-300">Renovasyon</a></li>
                </>
              )}
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
                  <a href={`tel:${contactInfo.contact_phone_1 || '+50947624431'}`} className="hover:text-accent transition-colors">
                    {contactInfo.contact_phone_1 || '+509 4762 4431'}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <a href={`mailto:${contactInfo.contact_email_1 || 'revkonstriksyon@gmail.com'}`} className="hover:text-accent transition-colors">
                    {contactInfo.contact_email_1 || 'revkonstriksyon@gmail.com'}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p>{contactInfo.contact_address || 'Pòtoprens ak anviwon yo, Ayiti'}</p>
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
