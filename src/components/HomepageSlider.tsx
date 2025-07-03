
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useHomepageSlider } from '@/hooks/useHomepageSlider';

const HomepageSlider = () => {
  const { sliderItems, isLoading } = useHomepageSlider();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    if (sliderItems.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === sliderItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [sliderItems.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === sliderItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? sliderItems.length - 1 : prevIndex - 1
    );
  };

  if (isLoading || sliderItems.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Ap chaje slider la...</p>
        </div>
      </section>
    );
  }

  const currentItem = sliderItems[currentIndex];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Main Slider */}
      <div className="relative h-full">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          {currentItem.video_url ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
                poster={currentItem.main_image_url || currentItem.thumbnail_url}
              >
                <source src={currentItem.video_url} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${currentItem.main_image_url || currentItem.thumbnail_url})`
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          )}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white z-10">
            <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight drop-shadow-lg">
              {currentItem.title}
            </h1>
            
            {currentItem.subtitle && (
              <p className="font-inter text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {currentItem.subtitle}
              </p>
            )}

            {currentItem.link_url && (
              <a
                href={currentItem.link_url}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-inter font-semibold text-lg transition-colors duration-300 shadow-lg"
              >
                {currentItem.video_url && <Play className="w-5 h-5" />}
                Gade Pwojè Sa A
              </a>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {sliderItems.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300 z-20"
              aria-label="Slider anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-300 z-20"
              aria-label="Slider suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {sliderItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-3 bg-black/50 backdrop-blur-sm p-3 rounded-lg">
            {sliderItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-accent scale-110' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={item.title}
              >
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.video_url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slide Indicators */}
      {sliderItems.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {sliderItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomepageSlider;
