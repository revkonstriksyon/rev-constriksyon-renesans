
import { Shield, Zap, Award, Users, Lightbulb, Clock } from 'lucide-react';

const Values = () => {
  const values = [
    {
      icon: Shield,
      title: 'Sekirite & Kalite',
      description: 'Nou itilize materyèl premium ak teknik modèn pou garanti longévité ak sekirite chak pwojè.',
      features: ['Materyèl certifiés ISO', 'Normes sécurité strictes', 'Contrôle qualité permanent']
    },
    {
      icon: Zap,
      title: 'Teknoloji BIM',
      description: 'Modèlisation 3D ak Building Information Modeling pou precizyon maksimòm ak redwi erè yo.',
      features: ['Visualisation 3D réaliste', 'Coordination parfaite', 'Optimisation des coûts']
    },
    {
      icon: Award,
      title: 'Inovasyon & Presizyon',
      description: 'Nou entegre teknoloji ki pi nouvo yo ak metòd konstriksyon inovatè pou résultat exceptionnel.',
      features: ['Techniques avant-gardistes', 'Matériaux écologiques', 'Design personnalisé']
    },
    {
      icon: Users,
      title: 'Relasyon Kliyan',
      description: 'Transpans ak komunikasyon kontini tout au long pwojè a, ak sipò apre vant garanti.',
      features: ['Suivi personnalisé', 'Communication régulière', 'Support 24/7']
    },
    {
      icon: Lightbulb,
      title: 'Konseye Ekspè',
      description: 'Ekip nou an konsèye w ak ekspètiz ak eksperyans pou optimise pwojè ou a ak bidjè ou a.',
      features: ['Analyse détaillée', 'Solutions sur mesure', 'Conseils professionnels']
    },
    {
      icon: Clock,
      title: 'Respè Echeye',
      description: 'Jesyon pwojè rigoureuse ak metòd éprouvé pou respekte délai yo ak bidjè acordé a.',
      features: ['Planning détaillé', 'Suivi temps réel', 'Respect des budgets']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Valè & Diferansyasyon Nou An
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
            Sa ki fè Rev Konstriksyon diferan se angajman nou an nan inovasyon, kalite, ak ekselans. 
            Nou itilize teknoloji modèn ak teknik konstriksyon avangardist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-8 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300 shadow-sm">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              <h3 className="font-poppins font-semibold text-xl text-primary mb-4">
                {value.title}
              </h3>
              
              <p className="font-inter text-gray-600 mb-6">
                {value.description}
              </p>

              <ul className="space-y-3">
                {value.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="font-inter text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlighted Section */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-poppins font-bold text-2xl md:text-3xl mb-6">
              "Nou pa sèlman bati kay - nou kreye espas lavi ki transofòme vè w yo nan réalité"
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="font-poppins font-bold text-3xl text-accent mb-2">100%</div>
                <div className="font-inter text-gray-200">Materyèl Premium</div>
              </div>
              <div className="text-center">
                <div className="font-poppins font-bold text-3xl text-accent mb-2">5 An</div>
                <div className="font-inter text-gray-200">Garanti Konplè</div>
              </div>
              <div className="text-center">
                <div className="font-poppins font-bold text-3xl text-accent mb-2">24/7</div>
                <div className="font-inter text-gray-200">Sipò Kliyan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
