import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AlternativeCard from './AlternativeCard';
import { Product } from '../../types';

interface AlternativesCarouselProps {
  alternatives: Product[];
  onAddToWishlist: (product: Product) => void;
}

const AlternativesCarousel: React.FC<AlternativesCarouselProps> = ({ 
  alternatives, 
  onAddToWishlist 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = current.offsetWidth * 0.8;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Greener Alternatives
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {alternatives.map((product, index) => (
          <div 
            key={index} 
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 snap-start"
          >
            <AlternativeCard 
              product={product} 
              onAddToWishlist={onAddToWishlist} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlternativesCarousel;