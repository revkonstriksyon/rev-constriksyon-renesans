
import { Award, Users, Briefcase } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Ing. Réveillère Joseph',
      role: 'Directeur Général & Ingénieur Civil',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '15 ans d\'expérience',
      specialties: ['Gestion de projet', 'Ingénierie structurelle', 'BIM & CAD'],
      bio: 'Diplômé en génie civil avec une passion pour l\'innovation dans la construction. Leader de l\'équipe Rev Konstriksyon depuis sa création.'
    },
    {
      name: 'Arch. Marie-Claire Désir',
      role: 'Architecte Principal',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '12 ans d\'expérience',
      specialties: ['Design moderne', 'Architecture durable', 'Urbanisme'],
      bio: 'Créatrice de designs innovants qui allient esthétique moderne et fonctionnalité. Spécialiste en architecture écologique.'
    },
    {
      name: 'Eng. Patrick Moreau',
      role: 'Chef de Chantier',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '10 ans d\'expérience',
      specialties: ['Supervision', 'Sécurité chantier', 'Coordination équipes'],
      bio: 'Expert en gestion de chantier avec un focus sur la sécurité et le respect des délais. Garantit la qualité d\'exécution de chaque projet.'
    }
  ];

  const stats = [
    { icon: Users, number: '25+', label: 'Professionnels qualifiés' },
    { icon: Award, number: '8', label: 'Années d\'excellence' },
    { icon: Briefcase, number: '150+', label: 'Projets réalisés' }
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
            Chак manm ekip nou an gen menm vizyon: livré pwojè kalite wo ki depase atant kliyan nou yo. 
            Nou kwè nan inovasyon, sekirite, ak excellence nan chak detay.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
