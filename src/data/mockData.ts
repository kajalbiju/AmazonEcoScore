import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Echo Dot (4th Gen) Smart Speaker with Alexa',
    price: 49.99,
    description: 'Meet Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/4790255/pexels-photo-4790255.jpeg',
    rating: 5,
    prime: true,
    ecoScore: 'B+',
    packaging: 'Recyclable',
    brandRating: 8,
    carbonFootprint: 2.1,
    recyclability: 85
  },
  {
    id: '2',
    title: 'Organic Cotton Bath Towels Set',
    price: 34.99,
    description: '100% organic cotton, eco-friendly dyes, sustainable manufacturing process. Includes 2 bath towels, 2 hand towels, and 2 washcloths.',
    category: 'Home & Kitchen',
    image: 'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg',
    rating: 4,
    prime: true,
    ecoScore: 'A+',
    packaging: 'Plastic-free',
    brandRating: 9,
    carbonFootprint: 1.2,
    recyclability: 100
  },
  // Add more mock products...
];