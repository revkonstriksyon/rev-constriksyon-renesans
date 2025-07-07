import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOManager from '@/components/SEO/SEOManager';
import { OrganizationStructuredData } from '@/components/SEO/StructuredData';
import { Award, Users, Briefcase, Target, Eye, Heart } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Panier Agaby',
      role: 'CEO / Civil Engineer',
      image: '/lovable-uploads/d11c487b-6fcb-4a8f-88bd-742cc22c1064.png',
      specialties: ['Design achitekti & estriktirèl', 'Planifikasyon woutin', 'BIM / CAD / Suivi Site'],
      bio: 'Agaby se yon jèn enjenyè sivil ak yon vizyon pwofon pou inovasyon ak entegrite nan konstriksyon. Li konbine eksperyans sou teren ak yon sans detay nan konsepsyon ak jesyon pwojè.'
    },
    {
      name: 'Dominique Wattson',
      role: 'COO / Structural Engineer',
      image: '/lovable-uploads/57a2242f-0bbf-42a6-a13a-381bc7a09c71.png',
      specialties: ['Analiz estriktirèl', 'BIM, AutoCAD, Revit', 'Optimizasyon modèl estriktirèl'],
      bio: 'Dominique se sèvo lojik ekip la. Li se yon enjenyè estriktirèl ki mete kalkil devan emosyon. Li analize chak moso plan ak presizyon chirijikal.'
    },
    {
      name: 'Bigly Coriolan',
      role: 'Civil Site Engineer',
      image: '/lovable-uploads/b01bca38-b58e-47f7-ab57-21c2a3eb0da0.png',
      specialties: ['Swivi chantiers', 'Jesyon travay jounalye', 'Travay ak ekip & kontra'],
      bio: 'Bigly se youn nan moun ki konekte byen ak ekip ak ouvriye yo. Li pote disiplin ak kouraj sou teren an. Toujou pare pou mete men.'
    },
    {
      name: 'Toussaint Youvenson',
      role: 'Chef Chantye',
      image: '/lovable-uploads/07214ea8-fb52-4b3d-a98a-03968718cb1a.png',
      specialties: ['Jesyon ekip', 'Swivi konstriksyon', 'Enspeksyon ak verifikasyon travay'],
      bio: 'Youvenson se bra dwat ekzekisyon Rev Konstriksyon. Avèk eksperyans li sou teren, li gide ouvriye yo, tcheke detay, epi asire tout bagay fèt jan plan an mande.'
    },
    {
      name: 'Joseph Lucknerson',
      role: 'Quality Control & Logistics Coordinator',
      image: '/lovable-uploads/d3489930-649a-4f5f-8a55-2bbe0dd4ebb9.png',
      specialties: ['Kontwòl kalite', 'Swivi livrezon', 'Siveyans règ sekirite'],
      bio: 'Joseph se moun ki asire bon jan kalite ak bon jan livrezon sou teren. Li se lyen ant biwo ak chantye, li verifye ke tout materyo ak travay respekte estanda.'
    }
  ];

  const stats = [
    { icon: Users, number: '+10', label: 'Pwofesyonèl angaje nan misyon nou' },
    { icon: Award, number: '100%', label: 'Konfyans kliyan yo' },
    { icon: Briefcase, number: 'Plizyè', label: 'Pwojè reyalize sou tout Ayiti' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Presizyon',
      description: 'Nou konsantre sou chak detay pou livre travay ki gen kalite wo nan chak pwojè.'
    },
    {
      icon: Eye,
      title: 'Transparans',
      description: 'Nou kominikè klèman ak kliyan nou yo nan chak etap pwojè a.'
    },
    {
      icon: Heart,
      title: 'Pasyon',
      description: 'Nou gen pasyon pou kreye espas ki bèl ak fonksyonèl ki depase atant yo.'
    }
  ];

  return (
    <>
      <SEOManager
        title="Sou Rev Konstriksyon - Konpani Konstriksyon ak Renovasyon nan Ayiti"
        description="Konnen istwa Rev Konstriksyon, ekip nou ak valè nou yo. Nou se konpani konstriksyon ak renovasyon ki gen pi gwo konfyans nan Ayiti ak ekspètiz nan plan achitekti ak siveyans chantye."
        keywords="sou Rev Konstriksyon, ekip konstriksyon Ayiti, konpani renovasyon Haiti, ekspètiz konstriksyon, plan achitekti Ayiti, siveyans chantye"
        canonicalUrl="https://www.revkonstriksyon.com/about"
        ogTitle="Sou Rev Konstriksyon - Ekip ak Ekspètiz Konstriksyon nan Ayiti"
        ogDescription="Konnen ekip ekspè Rev Konstriksyon ak misyon nou pou bay pi bon sèvis konstriksyon ak renovasyon nan Ayiti."
      />
      <OrganizationStructuredData />
      
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Sou Rev Konstriksyon
            </h1>
            <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
              Nou ap konstwi rèv ak ekspètiz, presizyon ak pasyon nan tout kwen Ayiti.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-poppins font-bold text-3xl text-primary mb-6">
                  Istwa Nou An
                </h2>
                <p className="font-inter text-gray-700 mb-6">
                  Rev Konstriksyon te kòmanse ak yon vizyon senp: konstwi kay ak enfrasti ki solid, 
                  bèl ak fonksyonèl pou pèp Ayisyen an. Depi kòmansman nou an, nou te konsantre 
                  sou kalite ak sevis kliyan ki eksepsyonèl.
                </p>
                <p className="font-inter text-gray-700 mb-6">
                  Jodi a, nou gen yon ekip pwofesyonèl ki gen ekspètiz nan divès domèn: 
                  achitekti, jeni sivil, jesyon pwojè, ak plis ankò. Nou pa konte eksperyans an ane, 
                  nou konte li nan rezilta ak pasyon nou mete nan chak pwojè.
                </p>
                <p className="font-inter text-gray-700">
                  Misyon nou se ede moun yo ak biznis yo reyalize rèv konstriksyon yo ak yon 
                  anviwonman ki solid ak bèl.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Ekip Rev Konstriksyon k ap travay sou pwojè konstriksyon nan Ayiti"
                  className="rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="font-poppins font-bold text-3xl text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="font-inter text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
                Valè Nou Yo
              </h2>
              <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                Valè sa yo gide nou nan chak pwojè ak relasyon nou konstwi ak kliyan nou yo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="font-inter text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Team Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
                Konnen Ekip Nou An
              </h2>
              <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
                Yon ekip pwofesyonèl ak ekspètiz ak eksperyans ki angaje pou livre pwojè ou a ak kalite eksepsyonèl.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="font-poppins font-bold text-xl text-primary mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="font-inter text-accent font-medium mb-4">
                    {member.role}
                  </p>

                  <p className="font-inter text-gray-600 text-sm mb-4">
                    {member.bio}
                  </p>

                  <div className="space-y-2">
                    <p className="font-inter font-medium text-primary text-sm">Spécialités:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-secondary text-primary px-3 py-1 rounded-full text-xs font-inter"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-poppins font-bold text-3xl mb-4">
              Pare pou Kòmanse?
            </h2>
            <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
              Ann travay ansanm pou reyalize rèv konstriksyon ou a ak menm nivo kalite ak pwofesyonalis.
            </p>
            <a
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-block"
            >
              Kòmanse Pwojè Ou A
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
