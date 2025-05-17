import React from 'react';
import CertificationBadge from './CertificationBadge';

interface Certification {
  name: string;
  icon: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  ecoStats: {
    carbonFootprint: string;
    recyclable: boolean;
    biodegradable: boolean;
    sustainableMaterials: string[];
    waterUsage: string;
  };
  certifications: Certification[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
      </div>
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>
      
      {/* Eco Stats */}
      <div className="mb-4 text-sm">
        <p className="text-green-600">Carbon Footprint: {product.ecoStats.carbonFootprint}</p>
        <p className="text-green-600">Water Usage: {product.ecoStats.waterUsage}</p>
        {product.ecoStats.recyclable && (
          <p className="text-green-600">♻️ Recyclable</p>
        )}
        {product.ecoStats.biodegradable && (
          <p className="text-green-600">🌱 Biodegradable</p>
        )}
      </div>

      {/* Certification Badges */}
      {product.certifications && product.certifications.length > 0 && (
        <div className="mb-4 space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Certifications:</h4>
          <div className="grid grid-cols-1 gap-2">
            {product.certifications.map((cert: Certification, index: number) => (
              <CertificationBadge
                key={index}
                name={cert.name}
                icon={cert.icon}
                description={cert.description}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;