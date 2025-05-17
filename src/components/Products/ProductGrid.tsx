import React from 'react';
import ProductCard from './ProductCard';
import { mockProducts } from '../../data/mockData';

const ProductGrid = () => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;