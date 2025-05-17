import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CertificationBadge from '../components/Products/CertificationBadge';

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
  category: string;
  manufacturer: string;
  countryOfOrigin: string;
  lifespan: string;
  disposalInstructions: string;
}

interface ProductPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-green-600 hover:text-green-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-green-600 hover:text-green-700 mb-8 flex items-center"
        >
          ← Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-xl text-green-600 font-semibold">${product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${index < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Environmental Impact</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Carbon Footprint</p>
                  <p className="text-lg font-semibold text-green-600">{product.ecoStats.carbonFootprint}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Water Usage</p>
                  <p className="text-lg font-semibold text-green-600">{product.ecoStats.waterUsage}</p>
                </div>
                {product.ecoStats.recyclable && (
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-lg font-semibold text-green-600">♻️ Recyclable</p>
                  </div>
                )}
                {product.ecoStats.biodegradable && (
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-lg font-semibold text-green-600">🌱 Biodegradable</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Materials</h2>
              <div className="flex flex-wrap gap-2">
                {product.ecoStats.sustainableMaterials.map((material, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Certifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.certifications.map((cert, index) => (
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

            <div className="pt-6 border-t">
              <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors shadow-md text-lg font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Manufacturer</span>
                <span className="font-medium">{product.manufacturer}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Country of Origin</span>
                <span className="font-medium">{product.countryOfOrigin}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Expected Lifespan</span>
                <span className="font-medium">{product.lifespan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Disposal Instructions</h2>
            <p className="text-gray-600">{product.disposalInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 