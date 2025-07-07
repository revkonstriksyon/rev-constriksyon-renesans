
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, MessageCircle, Lightbulb } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';

const ConceptSection = () => {
  const { projects: concepts, isLoading } = useProjects('konsèp');

  if (isLoading) {
    return (
      <section id="concepts" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje konsèp yo...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="concepts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-accent" />
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
              Konsepsyon 3D
            </h2>
          </div>
          <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
            Dekouvri rendering ak modèl 3D nou kreye yo pou vizualize pwojè yo avan yo kòmanse. 
            Teknoloji modèn pou wè rèv ou yo vin reyèl.
          </p>
        </div>

        {concepts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-3xl p-16 max-w-2xl mx-auto">
              <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              <p className="text-gray-600 font-inter text-lg mb-8">
                Nou ap travay sou nouvo konsèp 3D yo. Rete konekte pou nouvo rendering yo!
              </p>
              <Link
                to="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Mande Konsèp ou a
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {concepts.map((concept) => (
              <div
                key={concept.id}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                {/* Concept Media */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {concept.video_url ? (
                    <div className="relative w-full h-full">
                      <img
                        src={concept.images[0] || concept.image_url || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={concept.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-10 h-10 text-primary ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        3D Video
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={concept.images[0] || concept.image_url || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={concept.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-6 right-6 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        3D Render
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold">
                      {concept.category || 'Konsèp 3D'}
                    </span>
                  </div>

                  <h3 className="font-poppins font-bold text-xl text-primary mb-4 line-clamp-2">
                    {concept.title}
                  </h3>

                  <p className="font-inter text-gray-600 mb-8 line-clamp-4 leading-relaxed">
                    {concept.description}
                  </p>

                  {/* Tags */}
                  {concept.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {concept.tags.slice(0, 4).map((tag, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    to="/contact"
                    className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white px-8 py-4 rounded-xl font-inter font-bold text-center transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Diskite sou Konsèp sa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConceptSection;
