
import { useState } from 'react';
import { useInspirationGallery } from '@/hooks/useInspirationGallery';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const InspirationGallery = () => {
  const { items, isLoading } = useInspirationGallery();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tout Kategori' },
    ...Array.from(new Set(items.map(item => item.category).filter(Boolean))).map(cat => ({
      id: cat,
      label: cat
    }))
  ];

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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Ap chaje enspirasyon yo...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="inspiration" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-primary mb-4">
              Galri Enspirasyon
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Dekouvri ide ak enspirasyon pou pwojè dekorasyon, renovasyon, ak amenajman ou yo.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-inter font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-xs text-gray-200">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 font-inter text-lg">Pa gen enspirasyon nan kategori sa a.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-full w-full">
            <img
              src={filteredItems[selectedImage]?.image_url}
              alt={filteredItems[selectedImage]?.title}
              className="w-full h-full object-contain"
            />
            <div className="text-center mt-4 px-4">
              <h3 className="text-white font-medium text-lg mb-2">
                {filteredItems[selectedImage]?.title}
              </h3>
              {filteredItems[selectedImage]?.description && (
                <p className="text-gray-300 mb-4">
                  {filteredItems[selectedImage]?.description}
                </p>
              )}
              <div className="flex justify-center gap-4">
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Diskite Enspirasyon Sa A
                </Link>
                <a
                  href="https://wa.me/50934567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
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
