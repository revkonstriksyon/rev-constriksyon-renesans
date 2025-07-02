
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Guy Cadely',
      project: 'Kay rezidansyèl Delmas 55 (de A a Z)',
      content: 'Mwen te vle yon kay ki solid, modèn, ak fonksyonèl. Rev Konstriksyon te reyalize vizyon mwen san mank. Tout sa te fèt ak presizyon – depi planifikasyon rive jiska fini.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Kliyan Konfidansyèl',
      project: 'Renovasyon kay Canapé-Vert',
      content: 'Travay la te fèt ak anpil pwofesyonalis. Mwen pa vle non mwen sou sit la, men mwen pa kapab pa remèsye yo pou jan yo te transfòme espas sa a.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            Sa Kliyan Nou Yo Di
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Dekouvri eksperyans kliyan nou yo ak jan nou te ede yo reyalize rèv konstriksyon yo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              <div className="absolute top-6 right-6 text-accent/20">
                <Quote className="w-12 h-12" />
              </div>

              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-poppins font-bold text-lg text-primary">
                    {testimonial.name}
                  </h3>
                  <p className="font-inter text-gray-600 text-sm">
                    {testimonial.project}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="font-inter text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-accent/10 rounded-2xl p-8">
            <h3 className="font-poppins font-bold text-2xl text-primary mb-4">
              Ou gen yon pwojè nan tèt ou?
            </h3>
            <p className="font-inter text-lg text-gray-600 mb-6">
              Ann travay ansanm pou kreye yon bagay ki depase atant ou yo.
            </p>
            <a
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-block"
            >
              Kòmanse Pwojè Ou A
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
