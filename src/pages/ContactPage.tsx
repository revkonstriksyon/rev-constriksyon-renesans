
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Calendar, User, Building } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: 'phone'
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

  const officeHours = [
    { day: 'Lendi - Vandredi', hours: '7:00 AM - 5:00 PM' },
    { day: 'Samdi', hours: '8:00 AM - 2:00 PM' },
    { day: 'Dimanch', hours: 'Fèmen (Urgence sèlman)' }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefòn',
      primary: '+509 3456-7890',
      secondary: '+509 2812-3456',
      description: 'Rele nou direkteman pou diskisyon rapid'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'info@revkonstriksyon.com',
      secondary: 'devis@revkonstriksyon.com',
      description: 'Voye nou yon email ak detay pwojè ou a'
    },
    {
      icon: MapPin,
      title: 'Biwo',
      primary: '123 Rue Lamarre, Péguy-Ville',
      secondary: 'Port-au-Prince, Haïti',
      description: 'Vizite nou nan biwo nou an'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      primary: '+509 3456-7890',
      secondary: 'Disponib 24/7',
      description: 'Mesaj rapid ak reponn rapid'
    }
  ];

  const projectTypes = [
    'Konstriksyon Nouvo',
    'Renovasyon Konplè',
    'Extansyon Kay',
    'Plan Achitekti',
    'Supervizyon Chantye',
    'Konsèltasyon',
    'Lòt'
  ];

  const budgetRanges = [
    'Anba $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    'Plis pase $100,000',
    'Pa sèten'
  ];

  const timelineOptions = [
    'Pi vit posib',
    '1-3 mwa',
    '3-6 mwa',
    '6-12 mwa',
    'Plis pase 1 an',
    'Pa gen presyon'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            Kominike Ak Nou
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Pare pou kòmanse pwojè ou a? Kominike ak nou kònnye a pou konsèltasyon gratis ak devis personalize ki adapte ak bezwen ou yo.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-poppins font-bold text-lg text-primary mb-2">
                  {method.title}
                </h3>
                <p className="font-inter font-semibold text-gray-800 mb-1">
                  {method.primary}
                </p>
                <p className="font-inter text-gray-600 text-sm mb-3">
                  {method.secondary}
                </p>
                <p className="font-inter text-gray-500 text-sm">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-secondary rounded-2xl p-8">
              <h2 className="font-poppins font-bold text-2xl text-primary mb-6">
                Depo Devis Gratis
              </h2>
              <p className="font-inter text-gray-600 mb-8">
                Ranpli fòm sa a ak nou pral kominike ak ou nan mwens pase 24 èdtan ak yon devis detaye.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
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

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block font-inter font-medium text-primary mb-2">
                      Tip Pwojè *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Chwazi tip pwojè...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block font-inter font-medium text-primary mb-2">
                      Bidjè Apprèximatif
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Chwazi bidjè...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="timeline" className="block font-inter font-medium text-primary mb-2">
                    Echeye Yo Prefere
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Chwazi echeye...</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
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
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Eksplike pwojè ou a ak detay yo, sètè ou a, ak objètif ou yo..."
                  ></textarea>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block font-inter font-medium text-primary mb-2">
                    Kijan ou prefere nou kominike ak ou?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                        className="mr-2 text-accent focus:ring-accent"
                      />
                      <span className="font-inter">Telefòn</span>
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
                      <span className="font-inter">Email</span>
                    </label>
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
                  </div>
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
                * Nou pral kominike ak ou nan mwens pase 24 èdtan pou diskite pwojè ou a.
              </p>
            </div>

            {/* Contact Information & Office Hours */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-primary rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-accent" />
                  <h3 className="font-poppins font-bold text-2xl">
                    Otè Travay
                  </h3>
                </div>
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0">
                      <span className="font-inter font-medium">{schedule.day}</span>
                      <span className="font-inter text-gray-200">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="font-inter text-sm text-gray-200">
                    <strong>Kontak Urgans:</strong> Nan ka urgans sèlman (pwoblèm sekirite, aksidan), 
                    nou disponib 24/7 nan +509 3456-7890
                  </p>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                <h3 className="font-poppins font-bold text-xl text-primary mb-4">
                  Kontè Rapid
                </h3>
                <div className="space-y-4">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 flex items-center justify-center gap-3">
                    <MessageCircle className="w-6 h-6" />
                    WhatsApp Nou
                  </button>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 flex items-center justify-center gap-3">
                    <Phone className="w-6 h-6" />
                    Rele Nou Kounye A
                  </button>
                  <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Rann Randevou
                  </button>
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-inter">
                    Google Map pral ajoute isit la byentò
                  </p>
                  <p className="text-gray-500 font-inter text-sm mt-2">
                    123 Rue Lamarre, Péguy-Ville, Port-au-Prince
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-3xl text-primary mb-4">
              Kesyon ki Poze Souvan
            </h2>
            <p className="font-inter text-lg text-gray-600">
              Jwenn reponn ak kesyon ki pi komen yo sou sèvis nou yo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-poppins font-semibold text-lg text-primary mb-3">
                Konbyen tan li pran pou jwenn yon devis?
              </h4>
              <p className="font-inter text-gray-600">
                Nou bay devis inisyal yo nan 24-48 èdtan. Pou devis detaye yo ak vizit sèt la, 
                sa ka pran 3-5 jou travay depi nou resevwa tout enfòmasyon yo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-poppins font-semibold text-lg text-primary mb-3">
                Èske gen lajan pou konsèltasyon inisyal la?
              </h4>
              <p className="font-inter text-gray-600">
                Non, premye konsèltasyon an ak devis inisyal la gratis nèt. 
                Nou sèlman chaje lajan pou konsèltasyon detaye yo ak plan espesyal yo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-poppins font-semibold text-lg text-primary mb-3">
                Ki kalite garanti nou bay?
              </h4>
              <p className="font-inter text-gray-600">
                Nou bay garanti 5 an sou travay nou yo ak 2 an sou materyèl yo. 
                Nou gen tou sèvis aprè-vant ak sipo teknik.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-poppins font-semibold text-lg text-primary mb-3">
                Èske nou travay nan tout Ayiti?
              </h4>
              <p className="font-inter text-gray-600">
                Nou konsantre sou zòn Pòtoprens lan ak anviwon yo, men nou ka diskite 
                pwojè yo nan lòt depatman yo selon kondisyon yo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
