
import { Star } from 'lucide-react';
import { useStaticContent } from '@/hooks/useStaticContent';

const Testimonials = () => {
  const { content } = useStaticContent();

  const testimonials = [
    {
      id: 1,
      name: "Guy Cadely",
      project: "Kay rezidansyèl Delmas 55 (de A a Z)",
      content: "Mwen te vle yon kay ki solid, modèn, ak fonksyonèl. Rev Konstriksyon te reyalize vizyon mwen san mank. Tout sa te fèt ak presizyon – depi planifikasyon rive jiska fini.",
      rating: 5,
    },
    {
      id: 2,
      name: "Kliyan Anonim",
      project: "Renovasyon kay Canapé-Vert",
      content: "Travay la te fèt ak anpil pwofesyonalis. Mwen pa vle non mwen sou sit la, men mwen pa kapab pa remèsye yo pou jan yo te transfòme espas sa a.",
      rating: 5,
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
            {content.testimonials_section_title || 'Sa Kliyan Nou Yo Di'}
          </h2>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            {content.testimonials_section_subtitle || 'Entegrite nou an ak kalite travay nou an reflete nan tèt kontan kliyan nou yo.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="font-inter text-gray-700 mb-6 text-lg leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Client Info */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-poppins font-semibold text-primary text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="font-inter text-gray-600 text-sm">
                      {testimonial.project}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="font-poppins font-bold text-accent text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary text-white rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-poppins font-bold text-2xl mb-4">
              Ou Vle Vin Pwochèn Kliyan Kontan Nou An?
            </h3>
            <p className="font-inter text-lg opacity-90 mb-6">
              Kite nou ede w reyalize pwojè ou a ak menm nivo presizyon ak ekspètiz.
            </p>
            <a
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors duration-300 inline-block"
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
