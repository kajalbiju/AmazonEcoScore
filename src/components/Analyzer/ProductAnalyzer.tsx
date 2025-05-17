import React, { useState } from 'react';
import ProductCard from './ProductCard';
import PackagingAnalyzer from './PackagingAnalyzer';
import { Product, PackagingAnalysis } from '../../types';
import { TagsIcon as TabsIcon, ImageIcon } from 'lucide-react';

interface ProductAnalyzerProps {
  product: Product;
  onFindAlternatives: () => void;
  onAnalyzePackaging: (imageFile: File) => Promise<PackagingAnalysis>;
}

const ProductAnalyzer: React.FC<ProductAnalyzerProps> = ({
  product,
  onFindAlternatives,
  onAnalyzePackaging
}) => {
  const [activeTab, setActiveTab] = useState<'product' | 'packaging'>('product');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('product')}
            className={`px-6 py-3 flex items-center text-sm font-medium transition-colors duration-200 ${
              activeTab === 'product'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <TabsIcon className="h-5 w-5 mr-2" />
            Product Analysis
          </button>
          <button
            onClick={() => setActiveTab('packaging')}
            className={`px-6 py-3 flex items-center text-sm font-medium transition-colors duration-200 ${
              activeTab === 'packaging'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="h-5 w-5 mr-2" />
            Packaging Analyzer
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {activeTab === 'product' ? (
          <ProductCard 
            product={product} 
            onFindAlternatives={onFindAlternatives} 
          />
        ) : (
          <PackagingAnalyzer onAnalyze={onAnalyzePackaging} />
        )}
      </div>
    </div>
  );
};

export default ProductAnalyzer;