import React from 'react';
import { Recycle, Package, Truck, Building2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onFindAlternatives: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFindAlternatives }) => {
  // Helper function to get badge color based on score
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
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/3 relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 md:h-full object-cover"
          />
          <div className={`absolute top-2 left-2 ${getBadgeColor(product.ecoScore)} text-white font-bold px-2 py-1 rounded-md`}>
            {product.ecoScore}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="md:w-2/3 p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            ${product.price}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Packaging</p>
                <p className="text-base font-medium text-gray-800 dark:text-white">{product.packaging}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Brand Rating</p>
                <p className="text-base font-medium text-gray-800 dark:text-white">{product.brandRating}/10</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Footprint</p>
                <p className="text-base font-medium text-gray-800 dark:text-white">{product.carbonFootprint} kg</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Recycle className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recyclability</p>
                <p className="text-base font-medium text-gray-800 dark:text-white">{product.recyclability}%</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onFindAlternatives}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <span>Find Greener Alternative</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;