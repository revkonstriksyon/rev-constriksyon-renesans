
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Jeanne Pierre',
      location: 'Delmas 75, Port-au-Prince',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Rev Konstriksyon transofòme kay mwen an nan yon jan ki depase tout atant mwen yo. Travay la fèt ak presizyon ak respè pou echeye a. Mwen rekòmande yo san rezèv.',
      project: 'Rénovation complète - Villa Delmas'
    },
    {
      id: 2,
      name: 'Jean Claude Moïse',
      location: 'Péguy-Ville, Port-au-Prince',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Yo pa sèlman konstriktè, yo se véritab patnè. Yo konsèye m ak pasiyan ak yo toujou disponib pou kominike. Résultat final la magnifik.',
      project: 'Extension maison - Péguy-Ville'
    },
    {
      id: 3,
      name: 'Lucienne Augustin',
      location: 'Tabarre, Port-au-Prince',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Kominikasyon ak transparans se fòs Rev Konstriksyon. Yo fè m konnen chak etap ak yo respekte bidjè a eksakteman. Travay la ireprochab.',
      project: 'Bureaux commerciaux - Tabarre'
    },
    {
      id: 4,
      name: 'Antoine Beauvoir',
      location: 'Kenscoff, Ouest',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      text: 'Nan de an, mwen pa gen okenn pwoblèm ak travay yo te fè a. Garanti a réèl ak yo toujou disponib pou sèvis apre vant. Kalite exceptionnel.',
      project: 'Maison écologique - Kenscoff'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Temwayaj Kliyan Nou Yo
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Dekouvri sa kliyan nou yo di sou eksperyans yo ak Rev Konstriksyon ak kalite travay nou an.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-accent/20">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="font-inter text-gray-700 mb-6 text-lg leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Project Info */}
              <div className="text-sm text-accent font-inter font-medium mb-4">
                Pwojè: {testimonial.project}
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-poppins font-semibold text-primary text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="font-inter text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <h3 className="font-poppins font-bold text-2xl mb-4">
              Ou vle vin pwochèn temwen nou an?
            </h3>
            <p className="font-inter text-lg mb-6 text-gray-200">
              Kominikasyon ak nou kònnye a pou w kòmanse pwojè ou a ak Rev Konstriksyon.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300">
              Kòmanse Pwojè Ou A
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
