
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useNewsletter } from '@/hooks/useNewsletter';

const Contact = () => {
  const [email, setEmail] = useState('');
  const { subscribe, isLoading } = useNewsletter();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const success = await subscribe(email);
      if (success) {
        setEmail('');
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Kontakte Nou
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Pare pou kòmanse pwojè ou a? Kite nou ede w kreye espas rèv ou an.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="font-poppins font-bold text-2xl text-primary mb-6">
                Enfòmasyon Kontak
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary">Telefòn</h4>
                    <p className="font-inter text-gray-600">+509 4762 4431</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary">Imèl</h4>
                    <p className="font-inter text-gray-600">revkonstriksyon@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary">Adrès</h4>
                    <p className="font-inter text-gray-600">Pòtoprens ak anviwon yo, Ayiti</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-primary">Otè Travay</h4>
                    <p className="font-inter text-gray-600">Lendi - Vandredi: 7:00 AM - 5:00 PM</p>
                    <p className="font-inter text-gray-600">Samdi: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-accent/5 rounded-2xl p-8 border border-accent/20">
              <h3 className="font-poppins font-bold text-xl text-primary mb-4">
                Abònman ak Newsletter Nou
              </h3>
              <p className="font-inter text-gray-600 mb-6">
                Resevwa dènye nouvo yo ak konsèy konstriksyon nan imèl ou.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Antre imèl ou..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Ap abòne...' : 'Abònman'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-poppins font-bold text-2xl text-primary mb-6">
              Voye yon Mesaj
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-poppins font-medium text-primary mb-2">
                    Non
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                    placeholder="Non ou..."
                  />
                </div>
                <div>
                  <label className="block font-poppins font-medium text-primary mb-2">
                    Imèl
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                    placeholder="Imèl ou..."
                  />
                </div>
              </div>

              <div>
                <label className="block font-poppins font-medium text-primary mb-2">
                  Telefòn
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                  placeholder="Telefòn ou..."
                />
              </div>

              <div>
                <label className="block font-poppins font-medium text-primary mb-2">
                  Tip Pwojè
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-inter">
                  <option>Chwazi yon tip pwojè...</option>
                  <option>Renovasyon Konplè</option>
                  <option>Extansyon Kay</option>
                  <option>Konstriksyon Nouvo</option>
                  <option>Plan Achitekti</option>
                  <option>Konsèltasyon</option>
                </select>
              </div>

              <div>
                <label className="block font-poppins font-medium text-primary mb-2">
                  Mesaj
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-inter resize-none"
                  placeholder="Eksplike pwojè ou an ak detay..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white py-4 rounded-lg font-poppins font-semibold text-lg transition-colors duration-300"
              >
                Voye Mesaj
              </button>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-2xl p-8">
            <h3 className="font-poppins font-bold text-2xl mb-4">
              Pare pou Kòmanse Pwojè Ou A?
            </h3>
            <p className="font-inter text-lg opacity-90 mb-6">
              Jwenn konsèltasyon gratis ak devis detaye pou pwojè ou an.
            </p>
            <a
              href="tel:+50947624431"
              className="bg-white text-accent px-8 py-4 rounded-lg font-poppins font-semibold text-lg hover:bg-gray-50 transition-colors duration-300 inline-block"
            >
              Rele Kounye A: +509 4762 4431
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
