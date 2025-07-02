
import { Award, Users, Briefcase } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Panier Agaby',
      role: 'CEO / Civil Engineer',
      image: '/lovable-uploads/d11c487b-6fcb-4a8f-88bd-742cc22c1064.png',
      experience: '8 ans d\'expérience',
      specialties: ['Design achitekti & estriktirèl', 'Planifikasyon woutin', 'BIM / CAD / Suivi Site'],
      bio: 'Agaby se yon jèn enjenyè sivil ak yon vizyon pwofon pou inovasyon ak entegrite nan konstriksyon. Li konbine eksperyans sou teren ak yon sans detay nan konsepsyon ak jesyon pwojè.'
    },
    {
      name: 'Dominique Wattson',
      role: 'COO / Structural Engineer',
      image: '/lovable-uploads/57a2242f-0bbf-42a6-a13a-381bc7a09c71.png',
      experience: '10 ans d\'expérience',
      specialties: ['Analiz estriktirèl', 'BIM, AutoCAD, Revit', 'Optimizasyon modèl estriktirèl'],
      bio: 'Dominique se sèvo lojik ekip la. Li se yon enjenyè estriktirèl ki mete kalkil devan emosyon. Li analize chak moso plan ak presizyon chirijikal.'
    },
    {
      name: 'Bigly Coriolan',
      role: 'Civil Site Engineer',
      image: '/lovable-uploads/b01bca38-b58e-47f7-ab57-21c2a3eb0da0.png',
      experience: '7 ans d\'expérience',
      specialties: ['Swivi chantiers', 'Jesyon travay jounalye', 'Travay ak ekip & kontra'],
      bio: 'Bigly se youn nan moun ki konekte byen ak ekip ak ouvriye yo. Li pote disiplin ak kouraj sou teren an. Toujou pare pou mete men.'
    }
  ];

  const stats = [
    { icon: Users, number: '5', label: 'Pwofesyonèl kalifye' },
    { icon: Award, number: '100%', label: 'Konfyans kliyan yo' },
    { icon: Briefcase, number: 'Plizyè', label: 'Pwojè reyalize sou tout Ayiti' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Ekip Nou An
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Yon ekip pwofesyonèl ak ekspètiz ak eksperyans ki angaje pou livre pwojè ou a ak kalite eksepsyonèl.
          </p>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
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

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
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
                      className="bg-white text-primary px-3 py-1 rounded-full text-xs font-inter"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="mt-16 bg-primary rounded-2xl p-8 text-white text-center">
          <h3 className="font-poppins font-bold text-2xl mb-4">
            Nou travay ak presizyon, respè, ak transparans
          </h3>
          <p className="font-inter text-lg text-gray-200 max-w-3xl mx-auto">
            Chak manm ekip nou an gen menm vizyon: livré pwojè kalite wo ki depase atant kliyan nou yo. 
            Nou kwè nan inovasyon, sekirite, ak excellence nan chak detay.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
