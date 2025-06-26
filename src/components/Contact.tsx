
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Kominike Ak Nou
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Pare pou kòmanse pwojè ou a? Kominike ak nou kònnye a pou konsiltasyon gratis ak devis personalize.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-poppins font-bold text-2xl text-primary mb-6">
                Enfòmasyon Kontak
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Telefòn</h4>
                    <p className="font-inter text-gray-600">+509 3456-7890</p>
                    <p className="font-inter text-gray-600">+509 2812-3456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Email</h4>
                    <p className="font-inter text-gray-600">info@revkonstriksyon.com</p>
                    <p className="font-inter text-gray-600">devis@revkonstriksyon.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Adrès</h4>
                    <p className="font-inter text-gray-600">123 Rue Lamarre, Péguy-Ville</p>
                    <p className="font-inter text-gray-600">Port-au-Prince, Haïti</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Otè Travay</h4>
                    <p className="font-inter text-gray-600">Lendi - Vandredi: 7:00 AM - 5:00 PM</p>
                    <p className="font-inter text-gray-600">Samdi: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-inter font-semibold text-primary mb-1">
                    Mesaj Rapid
                  </h4>
                  <p className="font-inter text-gray-600 text-sm">
                    Kominike ak nou direkteman sou WhatsApp
                  </p>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-inter font-medium transition-colors duration-300">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary rounded-xl p-8">
            <h3 className="font-poppins font-bold text-2xl text-primary mb-6">
              Depo Konsiltasyon Gratis
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-inter font-medium text-primary mb-2">
                    Non Konplè *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Antre non ou..."
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block font-inter font-medium text-primary mb-2">
                    Telefòn *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="+509 ..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-inter font-medium text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="exemple@email.com"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block font-inter font-medium text-primary mb-2">
                  Tip Pwojè
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Chwazi yon tip pwojè...</option>
                  <option value="renovation">Renovasyon</option>
                  <option value="extension">Extansyon</option>
                  <option value="construction">Konstriksyon Nouvo</option>
                  <option value="plans">Plan Achitekti</option>
                  <option value="consultation">Konsiltasyon</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-inter font-medium text-primary mb-2">
                  Deskripsyon Pwojè *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Eksplike pwojè ou a ak detay yo..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Voye Depo A
              </button>
            </form>

            <p className="font-inter text-sm text-gray-600 mt-4 text-center">
              Nou pral kominike ak ou nan mwens pase 24 èdtan pou diskite pwojè ou a.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
