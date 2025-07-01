
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    preferredContact: 'whatsapp'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the message content
      const messageContent = `Nouvo demann depo devis:
Non: ${formData.name}
Imèl: ${formData.email}
Telefòn: ${formData.phone || 'Pa bay'}
Tip pwojè: ${formData.projectType || 'Pa espesifye'}
Mesaj: ${formData.message}

Metòd preferans pou kontakte: ${formData.preferredContact === 'whatsapp' ? 'WhatsApp' : 'Email'}`;

      if (formData.preferredContact === 'whatsapp') {
        // Send via WhatsApp
        const whatsappMessage = encodeURIComponent(messageContent);
        window.open(`https://wa.me/50947624431?text=${whatsappMessage}`, '_blank');
      } else {
        // Send via Email
        const emailSubject = encodeURIComponent('Nouvo Demann Depo Devis - Rev Konstriksyon');
        const emailBody = encodeURIComponent(messageContent);
        window.open(`mailto:revkonstriksyon@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        preferredContact: 'whatsapp'
      });

      // Show success message
      toast({
        title: "Mèsi pou demann ou a!",
        description: "Nou resevwa demann ou ak nou pral kominike ak ou nan ti tan an.",
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Gen yon pwoblèm",
        description: "Tanpri eseye ankò oswa rele nou dirèkteman.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Bonjou Rev Konstriksyon! Mwen gen yon pwojè konstriksyon epi mwen ta renmen pale ak nou sou li.`
    );
    window.open(`https://wa.me/50947624431?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Kominike Ak Nou
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Pare pou kòmanse pwojè ou a? Kominike ak nou kònnye a pou konsèltasyon gratis ak devis ki fèt espesyalman pou ou.
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
                    <a href="tel:+50947624431" className="font-inter text-gray-600 hover:text-accent transition-colors">
                      +509 4762 4431
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Imèl</h4>
                    <a href="mailto:revkonstriksyon@gmail.com" className="font-inter text-gray-600 hover:text-accent transition-colors">
                      revkonstriksyon@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Kote Nou Ye</h4>
                    <p className="font-inter text-gray-600">
                      Pòtoprens ak anviwon yo, Ayiti
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-inter font-semibold text-primary mb-1">Otè Travay</h4>
                    <p className="font-inter text-gray-600">
                      Lendi - Vandredi: 7:00 AM - 5:00 PM<br />
                      Samdi: 8:00 AM - 2:00 PM
                    </p>
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
                    Kominike ak nou dirèkteman sou WhatsApp
                  </p>
                </div>
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-inter font-medium transition-colors duration-300"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary rounded-xl p-8">
            <h3 className="font-poppins font-bold text-2xl text-primary mb-6">
              Depo Devis Gratis
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
                    Telefòn
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="+509 ..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-inter font-medium text-primary mb-2">
                  Imèl *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="egzanp@email.com"
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
                  <option value="Renovasyon">Renovasyon</option>
                  <option value="Extansyon">Extansyon</option>
                  <option value="Konstriksyon Nouvo">Konstriksyon Nouvo</option>
                  <option value="Plan Achitekti">Plan Achitekti</option>
                  <option value="Konsèltasyon">Konsèltasyon</option>
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

              <div>
                <label className="block font-inter font-medium text-primary mb-2">
                  Kijan ou prefere nou kominike ak ou? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleChange}
                      className="mr-2 text-accent focus:ring-accent"
                    />
                    <span className="font-inter">WhatsApp</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleChange}
                      className="mr-2 text-accent focus:ring-accent"
                    />
                    <span className="font-inter">Imèl</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Ap voye...' : 'Voye Depo A'}
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
