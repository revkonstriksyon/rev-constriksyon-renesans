
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Award, Users, Briefcase, Target, Eye, Heart, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Ing. Réveillère Joseph',
      role: 'Direktè Jeneral & Enjenyè Sivil',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '15 an ekspètiz',
      specialties: ['Jesyon pwojè', 'Enjenyè estrikti', 'BIM & CAD'],
      bio: 'Diplome nan jeni sivil ak yon pasyon pou inovasyon nan konstriksyon. Lidè ekip Rev Konstriksyon ak ekspètiz nan jesyon pwojè yo.',
      education: 'Enjenyè Sivil, Inivèsite Deta Ayiti',
      certifications: ['PMP', 'BIM Manager', 'Sekirite Konstriksyon']
    },
    {
      name: 'Arch. Marie-Claire Désir',
      role: 'Achitèkt Prensipal',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '12 an ekspètiz',
      specialties: ['Design modèn', 'Achitekti dirab', 'Urbanis'],
      bio: 'Kreative design ki inovatè ki konbine estetik modèn ak fonksyonalite. Spesyalis nan achitekti ekolojik ki adapte ak klima Ayisyen.',
      education: 'Master nan Achitekti, Lekòl Nasyonal Siperyè Achitekti',
      certifications: ['LEED AP', 'Architect AIA', 'Design Dirab']
    },
    {
      name: 'Eng. Patrick Moreau',
      role: 'Chèf Chantye',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '10 an ekspètiz',
      specialties: ['Sipèvizyon', 'Sekitite chantye', 'Kòdinasyon ekip'],
      bio: 'Ekspè nan jesyon chantye ak yon focus sou sekitite ak respè pou dat yo. Garanti kalite egzekisyon nan chak pwojè.',
      education: 'Enjenyè nan Konstriksyon, Enstitì Teknolojik',
      certifications: ['OSHA Safety', 'Project Management', 'Quality Control']
    },
    {
      name: 'Teknicyen Jean-Baptiste Louis',
      role: 'Sipèvizè Elektrik',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '8 an ekspètiz',
      specialties: ['Enstalasyon elektrik', 'Otomatizasyon', 'Enèji renouvlab'],
      bio: 'Spesyalis nan sistèm elektrik modèn ak solisyon enèji dirab pou konstriksyon yo nan Ayiti.',
      education: 'Teknicyen Siperyè nan Elektrisite',
      certifications: ['Elektricyen Sètifye', 'Enèji Solè', 'Automation']
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Presizyon',
      description: 'Nou travay ak metikilòz ak atansyon pou detay yo nan chak pwojè.',
      details: 'Chak mezi, chak materyèl, ak chak finisman yo chwazi ak kalkile ak presizyon pou garanti rezèlta ki depase atant yo.'
    },
    {
      icon: Heart,
      title: 'Konfyans',
      description: 'Relasyon ak kliyan nou yo konstwi sou konfyans ak transparans.',
      details: 'Nou kominike klèman ak nou respekte angajman nou yo pou kreye relasyon ki dire lontan ak kliyan nou yo.'
    },
    {
      icon: Target,
      title: 'Transparans',
      description: 'Nou ba enfòmasyon klè sou pwosè yo, bidjè yo, ak echeye yo.',
      details: 'Kliyan nou yo toujou konnen sa k ap pase ak pwojè yo, ak yo pa janm gen sipriz ki pa bon sou kòb oswa tan.'
    },
    {
      icon: Award,
      title: 'Ekselans',
      description: 'Nou vize ekselans nan chak aspè nan travay nou an.',
      details: 'Depi seleksyon materyèl yo jiska livrezon final la, nou pa aksepte anyen ki pa nan nivo ki pi wo a.'
    }
  ];

  const milestones = [
    {
      year: '2015',
      title: 'Kòmansman Rev Konstriksyon',
      description: 'Fondasyon konpayi a ak yon vizyon klè: bati ak kalite ak presizyon.'
    },
    {
      year: '2017',
      title: 'Premye Pwojè Kòmèsyal',
      description: 'Konstriksyon santè komèsyal nan Tabarre, ki ouvri nouvo opòtinite yo.'
    },
    {
      year: '2019',
      title: 'Adopte Estanda Entènasyonal',
      description: 'Entegre estanda entènasyonal kalite ak adopte BIM ak teknoloji modèn.'
    },
    {
      year: '2021',
      title: 'Inovasyon Teknolojik',
      description: 'Entegrasyon BIM ak teknoloji modèn nan tout pwojè yo pou pi bon rezèlta.'
    },
    {
      year: '2023',
      title: 'Etabli Pozisyon nan Mache a',
      description: 'Vin youn nan konpayi konstriksyon ki pi gen konfyans nan rejyon an.'
    }
  ];

  const stats = [
    { icon: Users, number: '25+', label: 'Pwofesyonèl ki Gen Kalifikasyon' },
    { icon: Award, number: '8', label: 'An Ekselans nan Endustri a' },
    { icon: Briefcase, number: 'Chak', label: 'Pwojè Nou Yo Konte' },
    { icon: Target, number: '100%', label: 'Kliyan ki Satisfè ak Travay la' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            Sou Rev Konstriksyon
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Rev Konstriksyon, se yon konpayi ki kwè nan vizyon ak rèsponsablite. Chak pwojè nou touche, nou trete li tankou pa nou.
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
              <div className="space-y-4 font-inter text-gray-600 text-lg">
                <p>
                  Rev Konstriksyon te kòmanse ak yon vizyon senp: ba Ayiti sèvis konstriksyon 
                  ki gen kalite ak presizyon ki ka konpare ak estanda entènasyonal yo.
                </p>
                <p>
                  Nou pa chèche fè kantite, men nou vize kalite. Chak pwojè nou pran, nou trete li ak 
                  menm respè ak atansyon nou ta ba kay nou. Nou travay kole kole ak kliyan pou pote 
                  solisyon ki solid, fonksyonèl, ak elegant.
                </p>
                <p>
                  Nou chita sou respè, bon jan planifikasyon, ak kominikasyon klè. Jòdi a, ak yon ekip 
                  pwofesyonèl ki gen ekspètiz ak pasyon, nou kontinye ap bati ak menm angajman nan 
                  ekselans ak entegrite ki te etabli nou depi kòmansman.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/projects"
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-inter font-semibold transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Wè Pwojè Nou Yo
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Rev Konstriksyon History"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-4 rounded-xl">
                <div className="font-poppins font-bold text-2xl">2015</div>
                <div className="font-inter text-sm">Kòmansman</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-primary mb-4">
                Misyon Nou An
              </h3>
              <p className="font-inter text-gray-600 text-lg">
                Nou vle bati ak konfyans, presizyon, ak pwofesyonalis ki depase atant kliyan nou yo. 
                Nou konsantre sou delivre sèvis kalite wo, inovatè ak dirab ki kontribye nan devlopman Ayiti.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-primary mb-4">
                Vizyon Nou An
              </h3>
              <p className="font-inter text-gray-600 text-lg">
                Vin konpayi konstriksyon ki pi gen konfyans nan Ayiti, ki rekonèt pou kalite travay nou, 
                inovasyon nou ak angajman nou nan devlopman dirab ak responsab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl text-primary mb-4">
              Valè Nou Yo
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Valè sa yo guide chak desizyon ak aksyon nou pran nan travay nou yo ak kliyan nou yo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-secondary transition-all duration-300"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-primary mb-3">
                  {value.title}
                </h3>
                <p className="font-inter text-gray-600 mb-4">
                  {value.description}
                </p>
                <p className="font-inter text-sm text-gray-500">
                  {value.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="font-poppins font-bold text-3xl mb-2">
                  {stat.number}
                </div>
                <div className="font-inter text-gray-200">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl text-primary mb-4">
              Ekip Ekspè Nou An
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Renkont ak pwofesyonèl yo ki ap dirije Rev Konstriksyon ak ki responsab pou kalite ak inovasyon yo nan travay nou an.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-secondary rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-sm font-inter font-medium">
                    {member.experience}
                  </div>
                </div>

                <h3 className="font-poppins font-bold text-lg text-primary mb-2">
                  {member.name}
                </h3>
                
                <p className="font-inter text-accent font-medium mb-3">
                  {member.role}
                </p>

                <p className="font-inter text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="text-xs font-inter font-medium text-primary">
                    {member.education}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-accent px-2 py-1 rounded text-xs font-inter"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-inter font-medium text-primary text-sm">Spésyalite:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-inter"
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

      {/* Timeline */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl text-primary mb-4">
              Etap Enpòtan yo nan Istwa Nou
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Gade kijan nou te evolye ak grandi pou vin konpayi nou ye kònnye a.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-accent h-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="font-poppins font-bold text-xl text-accent mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-poppins font-semibold text-lg text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="font-inter text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-white z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl mb-4">
            Pare pou Travay ak Nou?
          </h2>
          <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            Kominike ak ekip ekspè nou an pou diskite pwojè ou a ak jwenn konsèy pwofesyonèl.
          </p>
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            Kominike ak Nou
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
