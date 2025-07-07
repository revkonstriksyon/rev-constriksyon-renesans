
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, MapPin, Calendar } from 'lucide-react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Jeanne Pierre',
      location: 'Delmas 75, Port-au-Prince',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Janvye 2024',
      project: 'Rénovation complète - Villa Delmas',
      text: 'Rev Konstriksyon transofòme kay mwen an nan yon jan ki depase tout atant mwen yo. Travay la fèt ak presizyon ak respè pou echeye a. Mwen rekòmande yo san rezèv.',
      fullText: 'Lè m te deside pou m renove kay mwen an, mwen te gen anpil enkyetid. Men Rev Konstriksyon montre m yo se pwofesyonèl vre. Yo konsèye m ak pasiyan, yo respekte bidjè a, ak yo livre yon travay ki depase atant mwen yo. Depi 6 mwa pase yo, mwen pa gen okenn pwoblèm. Kalite materyèl yo ak finisman an gen yon nivo eksepsyonèl.',
      beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Jean Claude Moïse',
      location: 'Péguy-Ville, Port-au-Prince',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Desanm 2023',
      project: 'Extension maison - Péguy-Ville',
      text: 'Yo pa sèlman konstriktè, yo se véritab patnè. Yo konsèye m ak pasiyan ak yo toujou disponib pou kominike. Résultat final la magnifik.',
      fullText: 'Pwojè extansyon kay mwen an te gen anpil defi teknik. Men ekip Rev Konstriksyon pa janm kite m pou kont mwen. Yo eksplike m chak etap, yo ba m altènatif lè gen pwoblèm, ak yo toujou disponib pou reponn kesyon yo. Travay la fini nan tan yo te di a ak bidjè a respekte. Kounye a, mwen gen espas rèv mwen an.',
      beforeImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Lucienne Augustin',
      location: 'Tabarre, Port-au-Prince',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Novanm 2023',
      project: 'Bureaux commerciaux - Tabarre',
      text: 'Kominikasyon ak transparans se fòs Rev Konstriksyon. Yo fè m konnen chak etap ak yo respekte bidjè a eksakteman. Travay la ireprochab.',
      fullText: 'Kòm yon fanm ki dirije biznis mwen an, mwen te bezwen yon konpayi konstriksyon ki ka konprann bezwen mwen yo ak respekte echeye yo. Rev Konstriksyon te depase atant mwen yo. Yo kreye yon espas travay ki bèl ak fonksyonèl pou ekip mwen an. Kominisasyon yo ak pwofesyonalis yo fè eksperyans la san pwoblèm.',
      beforeImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'Antoine Beauvoir',
      location: 'Kenscoff, Ouest',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Septanm 2022',
      project: 'Maison écologique - Kenscoff',
      text: 'Nan de an, mwen pa gen okenn pwoblèm ak travay yo te fè a. Garanti a réèl ak yo toujou disponib pou sèvis apre vant. Kalite eksepsyonèl.',
      fullText: 'Mwen te vle yon kay ki respekte anviwonman an nan Kenscoff. Rev Konstriksyon pa sèlman konseye m sou materyèl yo ak teknoloji yo, men yo ede m fè yon kay ki ekonomize enèji ak dlo. Apre de an, tout bagay ap mache perfectman ak mwen economize anpil sou bul yo.',
      beforeImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      name: 'Micheline Etienne',
      location: 'Carrefour, Ouest',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Fevriye 2024',
      project: 'Rénovation cuisine - Carrefour',
      text: 'Yo transofòme kizin mwen an nan yon espas modèn ak bèl. Yo travay ak pwòpte ak yo respekte kay mwen an pandan tout pwosè a.',
      fullText: 'Renovasyon kizin lan se yon bagay ki gen anpil defi nan kay yo ki gen depi lontan. Men Rev Konstriksyon montre yo gen ekspètiz ak yo respekte kay la. Yo pwoteje tout lòt pati yo pandan y ap travay ak yo netwaye dèyè yo chak jou. Rezultat la depase atant mwen yo.'
    },
    {
      id: 6,
      name: 'Philippe Moreau',
      location: 'Pétion-Ville, Ouest',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: 'Oktòb 2023',
      project: 'Construction piscine - Pétion-Ville',
      text: 'Pwojè piscine a te fèt ak ekspètiz ak atansyon pou detay yo. Yo konsèye m sou entretien ak yo bay garanti sou travay la.',
      fullText: 'Mwen te vle yon piscine nan lakou kay mwen an depi lontan. Rev Konstriksyon pa sèlman konstwi piscine a, men yo ede m prepare tout sistèm lan ak yo montre m kijan pou m entretni li. Travay la fèt ak materyèl kalite ak yo toujou disponib si mwen gen kesyon.'
    }
  ];

  const stats = [
    { number: '150+', label: 'Kliyan Satisfè' },
    { number: '8', label: 'An Eksperyans' },
    { number: '100%', label: 'Pwojè Livre nan Tan' },
    { number: '5★', label: 'Rating Mwayèn' }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
            Temwayaj Kliyan Nou Yo
          </h1>
          <p className="font-inter text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Dekouvri sa kliyan nou yo di sou eksperyans yo ak Rev Konstriksyon ak kalite travay nou an nan pwojè yo ki divès.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-poppins font-bold text-3xl md:text-4xl text-accent mb-2">
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

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-secondary rounded-2xl p-8 hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-accent/20">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Client Info Header */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-poppins font-semibold text-primary text-lg">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{testimonial.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Project Info */}
                <div className="text-sm text-accent font-inter font-medium mb-4">
                  Pwojè: {testimonial.project}
                </div>

                {/* Testimonial Text */}
                <p className="font-inter text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.fullText || testimonial.text}"
                </p>

                {/* Before/After Images (if available) */}
                {testimonial.beforeImage && testimonial.afterImage && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="relative">
                      <img
                        src={testimonial.beforeImage}
                        alt="Avan"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Avan
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        src={testimonial.afterImage}
                        alt="Apre"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Apre
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl text-primary mb-8">
            Temwayaj Video
          </h2>
          <p className="font-inter text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Tande kliyan nou yo pale de eksperyans yo ak Rev Konstriksyon nan video sa yo.
          </p>
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center mb-8">
            <p className="text-gray-600 font-inter">Video temwayaj yo ap vini byentò</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl mb-4">
            Ou Vle Vin Pwochèn Temwen Nou An?
          </h2>
          <p className="font-inter text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
            Kominike ak nou kònnye a pou w kòmanse pwojè ou a ak Rev Konstriksyon ak eksperyans sa kliyan nou yo genyen an.
          </p>
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold transition-colors duration-300 inline-flex items-center gap-2"
          >
            Kòmanse Pwojè Ou A
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
