
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useContactForm } from '@/hooks/useContactForm';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: '',
    message: '',
    contact_preference: 'email'
  });

  const { submitForm, isSubmitting } = useContactForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectType: formData.project_type,
      budget: '',
      timeline: '',
      message: formData.message,
      preferredContact: formData.contact_preference as 'phone' | 'email' | 'whatsapp'
    };
    const success = await submitForm(contactFormData);
    
    if (success) {
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        project_type: '',
        message: '',
        contact_preference: 'email'
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefòn',
      details: ['+509 4762-4431'],
      action: 'tel:+50947624431'
    },
    {
      icon: Mail,
      title: 'Imèl',
      details: ['revkonstriksyon@gmail.com'],
      action: 'mailto:revkonstriksyon@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['+509 4762-4431'],
      action: 'https://wa.me/50947624431'
    },
    {
      icon: MapPin,
      title: 'Lokalizasyon',
      details: ['Pòtoprens, Ayiti'],
      action: null
    }
  ];

  const workingHours = [
    { day: 'Lendi - Vandredi', hours: '8:00 AM - 5:00 PM' },
    { day: 'Samdi', hours: '8:00 AM - 2:00 PM' },
    { day: 'Dimanch', hours: 'Fèmen' }
  ];

  return (
    <>
      <SEOManager
        title="Kontakte Rev Konstriksyon - Firme de Construction ak Bureau d'Étude nan Ayiti"
        description="Kontakte Rev Konstriksyon pou jwenn deviz gratis ak konsèltasyon sou pwojè konstriksyon ou yo. Firme de construction ak bureau d'étude ki gen pi gwo konfyans nan Ayiti. Rele nou: +509 4762-4431"
        keywords="kontakte Rev Konstriksyon, deviz gratis konstriksyon Haiti, konsèltasyon firme de construction, bureau d'étude Ayiti, kontak konstriksyon Pòtoprens, telefòn Rev Konstriksyon, imèl konstriksyon Haiti"
        canonicalUrl="https://www.revkonstriksyon.com/contact"
        ogTitle="Kontakte Rev Konstriksyon - Deviz Gratis ak Konsèltasyon"
        ogDescription="Jwenn deviz gratis ak konsèltasyon pwofesyonèl pou pwojè konstriksyon ou. Firme de construction ak bureau d'étude ki gen pi gwo konfyans nan Ayiti."
      />
      <OrganizationStructuredData />
      
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Kontakte Firme de Construction Rev Konstriksyon
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Pare pou kòmanse pwojè konstriksyon ou a? Kominike ak bureau d'étude ak firme de construction nou an pou jwenn deviz gratis ak konsèltasyon pwofesyonèl.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-secondary rounded-2xl p-8">
                <h2 className="font-poppins font-bold text-2xl text-primary mb-6">
                  Jwenn Deviz Gratis
                </h2>
                
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-inter">
                      Mèsi! Nou resevwa mesaj ou a. Nou pral kontakte ou nan kèk èdtan.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Non Konplè *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                        placeholder="Tape non ou..."
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                        Telefòn
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                        placeholder="+509..."
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Imèl *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="project_type" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Tip Pwojè
                    </label>
                    <select
                      id="project_type"
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                    >
                      <option value="">Chwazi yon kategori...</option>
                      <option value="plan_achitekti">Plan Achitekti</option>
                      <option value="konstriksyon_nouvo">Konstriksyon Nouvo</option>
                      <option value="renovasyon">Renovasyon</option>
                      <option value="siveyans">Siveyans Chantye</option>
                      <option value="deviz">Deviz Estimatif</option>
                      <option value="konsèltasyon">Konsèltasyon</option>
                      <option value="lòt">Lòt</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact_preference" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Ki jan ou vle nou kontakte ou?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contact_preference"
                          value="email"
                          checked={formData.contact_preference === 'email'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-inter">Imèl</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contact_preference"
                          value="whatsapp"
                          checked={formData.contact_preference === 'whatsapp'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="font-inter">WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Mesaj *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent font-inter"
                      placeholder="Eksplike detay pwojè ou a..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Ap voye...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Voye Deviz La
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-primary mb-6">
                    Enfòmasyon Kontak
                  </h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-poppins font-semibold text-lg text-primary mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="font-inter text-gray-600">
                              {info.action ? (
                                <a
                                  href={info.action}
                                  className="text-accent hover:text-accent/80 transition-colors duration-300"
                                  {...(info.action.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                >
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-secondary rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-accent" />
                    <h3 className="font-poppins font-bold text-xl text-primary">
                      Orè Travay
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {workingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-inter text-gray-700">{schedule.day}</span>
                        <span className="font-inter font-medium text-primary">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
