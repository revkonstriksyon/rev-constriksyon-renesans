
import { useState } from 'react';
import { useInspirationGallery } from '@/hooks/useInspirationGallery';
import { X, ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const InspirationGallery = () => {
  const { items, isLoading } = useInspirationGallery();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout Enspirasyon', icon: '✨' },
    ...Array.from(new Set(items.map(item => item.category).filter(Boolean))).map(cat => ({
      id: cat as string,
      label: cat as string,
      icon: getIconForCategory(cat as string)
    }))
  ];

  function getIconForCategory(category: string) {
    const icons: { [key: string]: string } = {
      'Dekorasyon': '🎨',
      'Pisin': '🏊',
      'Fasad': '🏠',
      'Lakou': '🌿',
      'Entèyè': '🛋️',
      'Kwizin': '🍽️',
      'Chanm': '🛏️',
      'Sal de ben': '🚿'
    };
    return icons[category] || '📸';
  }

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-inter">Ap chaje enspirasyon yo...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="inspiration" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary">
                Galri Enspirasyon
              </h2>
            </div>
            <p className="font-inter text-lg text-gray-600 max-w-3xl mx-auto">
              Dekouvri ide ak enspirasyon pou pwojè dekorasyon, renovasyon, ak amenajman ou yo. 
              Klike sou foto yo pou wè yo pi gwo ak diskite sou yo.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-4 rounded-2xl font-inter font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  selectedCategory === category.id
                    ? 'bg-accent text-white scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-3xl shadow-xl p-16 max-w-2xl mx-auto">
                <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <p className="text-gray-600 font-inter text-lg mb-8">
                  Pa gen enspirasyon nan kategori sa a pou kounye a.
                </p>
                <Link
                  to="/contact"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Mande Enspirasyon ou a
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white w-full">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-xs text-gray-200 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image and Content */}
          <div className="max-w-6xl max-h-full w-full flex flex-col items-center">
            <div className="relative max-h-[70vh] w-full flex items-center justify-center mb-8">
              <img
                src={filteredItems[selectedImage]?.image_url}
                alt={filteredItems[selectedImage]?.title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Content */}
            <div className="text-center px-8 max-w-2xl">
              <h3 className="text-white font-poppins font-bold text-2xl mb-4">
                {filteredItems[selectedImage]?.title}
              </h3>
              {filteredItems[selectedImage]?.description && (
                <p className="text-gray-300 font-inter mb-8 leading-relaxed">
                  {filteredItems[selectedImage]?.description}
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Diskite Enspirasyon Sa A
                </Link>
                <a
                  href="https://wa.me/50934567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-inter font-semibold transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InspirationGallery;
