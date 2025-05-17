import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../../types';

interface AlternativeCardProps {
  product: Product;
  onAddToWishlist: (product: Product) => void;
}

const AlternativeCard: React.FC<AlternativeCardProps> = ({ product, onAddToWishlist }) => {
  const getBadgeColor = (score: string) => {
    switch(score) {
      case 'A+': return 'bg-green-500';
      case 'A': return 'bg-green-400';
      case 'B+': return 'bg-green-300';
      case 'B': return 'bg-yellow-400';
      case 'C': return 'bg-orange-400';
      case 'D': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 left-2 ${getBadgeColor(product.ecoScore)} text-white font-bold px-2 py-1 rounded-md`}>
          {product.ecoScore}
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            ${product.price}
          </p>
          <div className="text-sm text-green-600 dark:text-green-400 font-medium">
            {product.carbonSaved && `${product.carbonSaved}kg CO₂ saved`}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="mr-2">Recyclability: {product.recyclability}%</span>
          <span>|</span>
          <span className="ml-2">Brand: {product.brandRating}/10</span>
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <button 
          onClick={() => onAddToWishlist(product)}
          className="w-full flex items-center justify-center px-4 py-2 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
        >
          <Heart className="h-4 w-4 mr-2" />
          <span>Add to Wishlist</span>
        </button>
      </div>
    </div>
  );
};

export default AlternativeCard;