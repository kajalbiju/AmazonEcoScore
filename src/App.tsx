import './index.css'
import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_your_publishable_key');

// Add OpenAI configuration
const OPENAI_API_KEY = 'your-api-key'; // This should be moved to environment variables
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

interface Certification {
  name: string;
  icon: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
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

interface EcoImpact {
  carbonSaved: number;
  plasticAvoided: number;
  treesSaved: number;
  waterSaved: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}

// Function to save products to JSON file
const saveProductsToFile = async (products: Product[]) => {
  try {
    const response = await fetch('/api/saveProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products }),
    });

    if (!response.ok) {
      throw new Error('Failed to save products');
    }
  } catch (error) {
    console.error('Error saving products:', error);
    alert('Failed to save products. Please try again.');
  }
};

function App() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Bamboo Lunch Box Set",
      price: 29.99,
      rating: 4.8,
      image: "/images/foodcontainer.avif",
      description: "Premium bamboo lunch box with compartments, perfect for meal prep and reducing single-use containers. Includes bamboo cutlery set.",
      ecoStats: {
        carbonFootprint: "0.3 kg CO2",
        recyclable: true,
        biodegradable: true,
        sustainableMaterials: ["Organic Bamboo", "Natural Oils"],
        waterUsage: "Low"
      },
      certifications: [],
      category: "Kitchen",
      manufacturer: "EcoKitchen",
      countryOfOrigin: "Vietnam",
      lifespan: "3 years",
      disposalInstructions: "Compostable"
    },
    {
      id: 2,
      name: "Solar-Powered Garden Lights",
      price: 34.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Set of 6 elegant solar garden lights. Automatically illuminate your garden using clean energy. Weather-resistant and long-lasting.",
      ecoStats: {
        carbonFootprint: "0.8 kg CO2",
        recyclable: true,
        biodegradable: false,
        sustainableMaterials: ["Recycled Aluminum", "Solar Panels"],
        waterUsage: "None"
      },
      certifications: [],
      category: "Garden",
      manufacturer: "SolarGlow",
      countryOfOrigin: "USA",
      lifespan: "5 years",
      disposalInstructions: "Recycle electronics separately"
    },
    {
      id: 3,
      name: "Wool Dryer Balls Set",
      price: 19.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Set of 6 natural wool dryer balls. Reduces drying time by 25% and eliminates need for disposable dryer sheets. Saves energy and reduces waste.",
      ecoStats: {
        carbonFootprint: "0.2 kg CO2",
        recyclable: false,
        biodegradable: true,
        sustainableMaterials: ["100% New Zealand Wool"],
        waterUsage: "Minimal"
      },
      certifications: [],
      category: "Laundry",
      manufacturer: "EcoLaundry",
      countryOfOrigin: "New Zealand",
      lifespan: "2 years",
      disposalInstructions: "Compostable"
    },
    {
      id: 4,
      name: "Reusable Produce Bags",
      price: 15.99,
      rating: 4.9,
      image: "/images/bagbag.avif",
      description: "Set of 8 mesh produce bags in various sizes. Perfect for grocery shopping and storing fruits and vegetables. Washable and durable.",
      ecoStats: {
        carbonFootprint: "0.1 kg CO2",
        recyclable: true,
        biodegradable: true,
        sustainableMaterials: ["Organic Cotton Mesh"],
        waterUsage: "Low"
      },
      certifications: [],
      category: "Shopping",
      manufacturer: "GreenBags",
      countryOfOrigin: "India",
      lifespan: "4 years",
      disposalInstructions: "Recycle or compost"
    },
    {
      id: 5,
      name: "Bamboo Bathroom Set",
      price: 39.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Complete bathroom set including toothbrush holder, soap dispenser, and storage containers. Made from sustainable bamboo with modern design.",
      ecoStats: {
        carbonFootprint: "0.4 kg CO2",
        recyclable: true,
        biodegradable: true,
        sustainableMaterials: ["Bamboo", "Glass"],
        waterUsage: "Low"
      },
      certifications: [],
      category: "Bathroom",
      manufacturer: "BambooLife",
      countryOfOrigin: "Indonesia",
      lifespan: "3 years",
      disposalInstructions: "Compost bamboo parts, recycle glass"
    },
    {
      id: 6,
      name: "Stainless Steel Food Containers",
      price: 45.99,
      rating: 4.8,
      image: "/images/foodcontainer.avif",
      description: "Set of 3 leak-proof stainless steel containers in different sizes. Perfect for food storage and packed lunches. Plastic-free and durable.",
      ecoStats: {
        carbonFootprint: "0.6 kg CO2",
        recyclable: true,
        biodegradable: false,
        sustainableMaterials: ["Food-grade Stainless Steel", "Silicone Seals"],
        waterUsage: "Minimal"
      },
      certifications: [],
      category: "Kitchen",
      manufacturer: "SteelFood",
      countryOfOrigin: "Germany",
      lifespan: "10+ years",
      disposalInstructions: "Fully recyclable"
    },
    {
      id: 7,
      name: "Biodegradable Phone Case",
      price: 24.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1604418605195-7dcb058b43dd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Stylish and protective phone case made from biodegradable materials. Available for various phone models. Reduces plastic waste.",
      ecoStats: {
        carbonFootprint: "0.2 kg CO2",
        recyclable: false,
        biodegradable: true,
        sustainableMaterials: ["Plant-based Polymers", "Natural Dyes"],
        waterUsage: "Very Low"
      },
      certifications: [],
      category: "Electronics",
      manufacturer: "EcoTech",
      countryOfOrigin: "Sweden",
      lifespan: "1 year",
      disposalInstructions: "Compostable"
    },
    {
      id: 8,
      name: "Recycled Glass Vase Set",
      price: 49.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Set of 3 handcrafted vases made from recycled glass. Each piece is unique with slight variations in color. Perfect for home decor.",
      ecoStats: {
        carbonFootprint: "0.5 kg CO2",
        recyclable: true,
        biodegradable: false,
        sustainableMaterials: ["100% Recycled Glass"],
        waterUsage: "Low"
      },
      certifications: [],
      category: "Home Decor",
      manufacturer: "GlassWorks",
      countryOfOrigin: "Italy",
      lifespan: "Lifetime",
      disposalInstructions: "Recyclable"
    },
    {
      id: 9,
      name: "Natural Yoga Mat",
      price: 59.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Premium yoga mat made from natural rubber and cork. Non-slip surface, excellent grip when wet. Perfect for eco-conscious yogis.",
      ecoStats: {
        carbonFootprint: "0.7 kg CO2",
        recyclable: true,
        biodegradable: true,
        sustainableMaterials: ["Natural Rubber", "Cork"],
        waterUsage: "Low"
      },
      certifications: [],
      category: "Fitness",
      manufacturer: "EcoYoga",
      countryOfOrigin: "Portugal",
      lifespan: "2-3 years",
      disposalInstructions: "Compostable"
    },
    {
      id: 10,
      name: "Solar-Powered Watch",
      price: 89.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3",
      description: "Elegant watch powered by solar energy. Never needs a battery change. Water-resistant and made with recycled materials.",
      ecoStats: {
        carbonFootprint: "0.4 kg CO2",
        recyclable: true,
        biodegradable: false,
        sustainableMaterials: ["Recycled Steel", "Solar Cells"],
        waterUsage: "None"
      },
      certifications: [],
      category: "Accessories",
      manufacturer: "SolarTime",
      countryOfOrigin: "Switzerland",
      lifespan: "10+ years",
      disposalInstructions: "Recycle electronics"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    rating: 0,
    image: '',
    description: '',
    ecoStats: {
      carbonFootprint: '',
      recyclable: false,
      biodegradable: false,
      sustainableMaterials: [],
      waterUsage: ''
    },
    certifications: [],
    category: '',
    manufacturer: '',
    countryOfOrigin: '',
    lifespan: '',
    disposalInstructions: ''
  });
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [showEcoImpact, setShowEcoImpact] = useState(false);
  const [userEcoImpact, setUserEcoImpact] = useState<EcoImpact>({
    carbonSaved: 0,
    plasticAvoided: 0,
    treesSaved: 0,
    waterSaved: 0
  });
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m EcoGuide, your sustainable shopping assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&auto=format&fit=crop&q=80",
      title: "Shop Sustainably",
      description: "Discover eco-friendly products that make a difference for our planet."
    },
    {
      url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&auto=format&fit=crop&q=80",
      title: "Eco-Friendly Living",
      description: "Make conscious choices for a better tomorrow."
    },
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80",
      title: "Sustainable Choices",
      description: "Every purchase helps protect our environment."
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&auto=format&fit=crop&q=80",
      title: "Green Future",
      description: "Join us in building a sustainable future."
    }
  ];

  const availableCertifications: Certification[] = [
    {
      name: "Energy Star",
      icon: "⚡",
      description: "Certified for energy efficiency"
    },
    {
      name: "USDA Organic",
      icon: "🌱",
      description: "Meets organic farming standards"
    },
    {
      name: "Fair Trade",
      icon: "🤝",
      description: "Ensures fair compensation and working conditions"
    },
    {
      name: "FSC Certified",
      icon: "🌳",
      description: "Responsibly sourced forest products"
    },
    {
      name: "Rainforest Alliance",
      icon: "🦋",
      description: "Promotes biodiversity and sustainable agriculture"
    },
    {
      name: "Cradle to Cradle",
      icon: "♻️",
      description: "Certified for circular economy design"
    },
    {
      name: "Green Seal",
      icon: "🌿",
      description: "Meets environmental leadership standards"
    },
    {
      name: "Carbon Neutral",
      icon: "🌍",
      description: "Net-zero carbon emissions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Add useEffect to handle search filtering
  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ecoStats.sustainableMaterials.some(material => 
        material.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load products from JSON file on initial render
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials with a backend
    setIsLoggedIn(true);
    setShowSignIn(false);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const addToCart = (product: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateEcoImpact = (product: Product) => {
    // Convert carbon footprint string to number (assuming format "X.X kg CO2")
    const carbonValue = parseFloat(product.ecoStats.carbonFootprint.split(' ')[0]);
    
    // Calculate impacts based on product type and materials
    const impacts = {
      carbonSaved: carbonValue * 2, // Assuming we save twice the carbon footprint
      plasticAvoided: product.ecoStats.recyclable ? 0.5 : 0, // 0.5 kg per recyclable product
      treesSaved: product.ecoStats.sustainableMaterials.includes('Bamboo') ? 0.1 : 0, // 0.1 trees per bamboo product
      waterSaved: product.ecoStats.waterUsage === 'Low' ? 10 : 
                 product.ecoStats.waterUsage === 'Medium' ? 5 : 2 // Water saved in liters
    };

    return impacts;
  };

  const handleCheckout = async () => {
    try {
      // Calculate total eco impact from cart items
      const totalImpact = cart.reduce((impact, item) => {
        const productImpact = calculateEcoImpact(item);
        return {
          carbonSaved: impact.carbonSaved + (productImpact.carbonSaved * item.quantity),
          plasticAvoided: impact.plasticAvoided + (productImpact.plasticAvoided * item.quantity),
          treesSaved: impact.treesSaved + (productImpact.treesSaved * item.quantity),
          waterSaved: impact.waterSaved + (productImpact.waterSaved * item.quantity)
        };
      }, {
        carbonSaved: userEcoImpact.carbonSaved,
        plasticAvoided: userEcoImpact.plasticAvoided,
        treesSaved: userEcoImpact.treesSaved,
        waterSaved: userEcoImpact.waterSaved
      });

      setUserEcoImpact(totalImpact);
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Here you would typically make an API call to your backend
      alert('Proceeding to checkout...');
      setShowEcoImpact(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const addCertification = () => {
    setNewProduct(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: '',
          icon: '',
          description: ''
        }
      ]
    }));
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = products.length + 1;
    const productToAdd: Product = {
      ...newProduct,
      id: newId,
      rating: 5,
      price: parseFloat(newProduct.price.toString()) || 0
    };
    setProducts([...products, productToAdd]);
    await saveProductsToFile([...products, productToAdd]);
    setShowAddProduct(false);
    setNewProduct({
      id: 0,
      name: '',
      price: 0,
      rating: 0,
      image: '',
      description: '',
      category: '',
      manufacturer: '',
      countryOfOrigin: '',
      lifespan: '',
      disposalInstructions: '',
      ecoStats: {
        carbonFootprint: '',
        recyclable: false,
        biodegradable: false,
        sustainableMaterials: [],
        waterUsage: ''
      },
      certifications: []
    });
  };

  const addMaterialField = () => {
    setNewProduct(prev => ({
      ...prev,
      ecoStats: {
        ...prev.ecoStats,
        sustainableMaterials: [...prev.ecoStats.sustainableMaterials, '']
      }
    }));
  };

  const updateMaterial = (index: number, value: string) => {
    setNewProduct(prev => ({
      ...prev,
      ecoStats: {
        ...prev.ecoStats,
        sustainableMaterials: prev.ecoStats.sustainableMaterials.map((material, i) => 
          i === index ? value : material
        )
      }
    }));
  };

  const removeMaterial = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      ecoStats: {
        ...prev.ecoStats,
        sustainableMaterials: prev.ecoStats.sustainableMaterials.filter((_, i) => i !== index)
      }
    }));
  };

  const generateAIResponse = async (userInput: string) => {
    try {
      const response = await fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are EcoGuide, an AI assistant for an eco-friendly e-commerce platform. 
              You help users find sustainable products and provide information about environmental impact.
              You have access to products like eco-friendly water bottles, bamboo cutlery, organic bags, and more.
              Keep responses concise, friendly, and focused on sustainability.
              You can help with:
              - Finding eco-friendly products
              - Explaining environmental impact
              - Providing sustainability tips
              - Answering questions about materials and recycling
              Current product categories: Kitchen, Personal Care, Home, Fashion
              All responses should be under 150 words.`
            },
            {
              role: "user",
              content: userInput
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI response error:', error);
      return 'I apologize, but I\'m having trouble connecting to my AI service right now. Please try again later or ask a different question.';
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: '...',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputMessage('');

    // Get AI response
    const aiResponse = await generateAIResponse(inputMessage);

    // Replace loading message with AI response
    setMessages(prev => prev.map(msg => 
      msg.isLoading ? {
        id: msg.id,
        type: 'bot',
        text: aiResponse,
        timestamp: new Date()
      } : msg
    ));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
          {/* Header */}
        <header className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-2xl font-bold">EcoAmazon</Link>
              <span className="text-sm bg-green-500 px-2 py-1 rounded-full">Eco-Friendly</span>
            </div>
              
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                  placeholder="Search eco-friendly products..."
                  className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-2.5 text-gray-500">
                  🔍
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => setShowAddProduct(true)}
                    className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition-colors shadow-md"
                  >
                    Add Product
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="hover:text-green-100 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowSignIn(true)}
                  className="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-green-50 transition-colors shadow-md"
                >
                  Sign In
                </button>
              )}
              {isLoggedIn && (
                <button 
                  onClick={() => setShowEcoImpact(true)}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-full hover:bg-green-200 transition-colors flex items-center space-x-2"
                >
                  <span>🌱</span>
                  <span>My Impact</span>
                </button>
              )}
              <Link 
                to="/cart"
                className="hover:text-green-100 transition-colors flex items-center space-x-2"
              >
                <span>🛒</span>
                <span className="bg-white text-green-600 px-2 py-1 rounded-full text-sm">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                products={filteredProducts}
                heroImages={heroImages}
                currentHeroImage={currentHeroImage}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductPage 
                products={products}
                onAddToCart={addToCart}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                handleCheckout={handleCheckout}
              />
            } 
          />
        </Routes>

        {/* Modals */}
        {showSignIn && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                <button
                  onClick={() => setShowSignIn(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSignIn} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({...signInForm, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({...signInForm, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  Sign In
                </button>
                <div className="text-center">
                  <a href="#" className="text-green-600 hover:text-green-700">
                    Forgot your password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-4xl transform transition-all max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-6">
                {/* Basic Information */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="productName" className="block text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        id="productName"
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="productPrice" className="block text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        id="productPrice"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label htmlFor="productCategory" className="block text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        id="productCategory"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Home">Home</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Beauty">Beauty</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="productManufacturer" className="block text-gray-700 mb-2">
                        Manufacturer
                      </label>
                      <input
                        id="productManufacturer"
                        type="text"
                        value={newProduct.manufacturer}
                        onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="productDescription" className="block text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id="productDescription"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={4}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="productImage" className="block text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          id="productImage"
                          type="url"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="productCountryOfOrigin" className="block text-gray-700 mb-2">
                          Country of Origin
                        </label>
                        <input
                          id="productCountryOfOrigin"
                          type="text"
                          value={newProduct.countryOfOrigin}
                          onChange={(e) => setNewProduct({ ...newProduct, countryOfOrigin: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {availableCertifications.map((cert, index) => (
                      <label key={index} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newProduct.certifications.some(c => c.name === cert.name)}
                          onChange={(e) => {
                            const updatedCerts = e.target.checked
                              ? [...newProduct.certifications, cert]
                              : newProduct.certifications.filter(c => c.name !== cert.name);
                            setNewProduct({...newProduct, certifications: updatedCerts});
                          }}
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{cert.icon}</span>
                            <span className="font-medium">{cert.name}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{cert.description}</p>
                        </div>
                      </label>
                    ))}
                </div>
              </div>

                {/* Eco Stats */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="carbonFootprint" className="block text-gray-700 mb-2">
                        Carbon Footprint
                      </label>
                      <input
                        id="carbonFootprint"
                        type="text"
                        value={newProduct.ecoStats.carbonFootprint}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          ecoStats: { ...newProduct.ecoStats, carbonFootprint: e.target.value }
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="waterUsage" className="block text-gray-700 mb-2">
                        Water Usage
                      </label>
                      <select
                        id="waterUsage"
                        value={newProduct.ecoStats.waterUsage}
                        onChange={(e) => setNewProduct({
                          ...newProduct,
                          ecoStats: { ...newProduct.ecoStats, waterUsage: e.target.value }
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select water usage level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 mb-2">Disposal Instructions</label>
                      <textarea
                        value={newProduct.disposalInstructions}
                        onChange={(e) => setNewProduct({...newProduct, disposalInstructions: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={3}
                        placeholder="Instructions for proper disposal or recycling"
                      />
                    </div>
              <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newProduct.ecoStats.recyclable}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            ecoStats: {...newProduct.ecoStats, recyclable: e.target.checked}
                          })}
                          className="rounded text-green-600"
                        />
                        <span>Recyclable</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newProduct.ecoStats.biodegradable}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            ecoStats: {...newProduct.ecoStats, biodegradable: e.target.checked}
                          })}
                          className="rounded text-green-600"
                        />
                        <span>Biodegradable</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEcoImpact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-2xl transform transition-all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Eco Impact</h2>
                <button
                  onClick={() => setShowEcoImpact(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* Impact Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">🌍</div>
                    <p className="text-2xl font-bold text-green-600">{userEcoImpact.carbonSaved.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">kg CO2 Saved</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">🌊</div>
                    <p className="text-2xl font-bold text-green-600">{userEcoImpact.plasticAvoided.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">kg Plastic Avoided</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">🌳</div>
                    <p className="text-2xl font-bold text-green-600">{userEcoImpact.treesSaved.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">Trees Saved</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-3xl mb-2">💧</div>
                    <p className="text-2xl font-bold text-green-600">{userEcoImpact.waterSaved.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">L Water Saved</p>
                  </div>
                </div>

                {/* Impact Comparison */}
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Impact Equivalent To:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🚗</span>
                      <p className="text-gray-600">
                        Not driving for {(userEcoImpact.carbonSaved * 4).toFixed(1)} km
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌱</span>
                      <p className="text-gray-600">
                        Planting {(userEcoImpact.treesSaved * 10).toFixed(1)} seedlings
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🗑️</span>
                      <p className="text-gray-600">
                        {(userEcoImpact.plasticAvoided * 200).toFixed(0)} plastic bottles saved
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🚿</span>
                      <p className="text-gray-600">
                        {(userEcoImpact.waterSaved / 200).toFixed(1)} months of shorter showers
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Impact */}
                <div className="flex justify-center space-x-4 pt-4 border-t">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <span>Share on Twitter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <span>Download Impact Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot */}
        <div className="fixed bottom-4 right-4 z-50">
          {!showChat ? (
            <button
              onClick={() => setShowChat(true)}
              className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span className="text-2xl">💬</span>
              <span className="hidden md:inline">Chat with EcoGuide</span>
            </button>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl w-[360px] max-w-full">
              <div className="p-4 bg-green-600 text-white rounded-t-2xl flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌱</span>
                  <span className="font-semibold">EcoGuide Assistant</span>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-white hover:text-green-100"
                >
                  ✕
                </button>
              </div>
              
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-green-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex space-x-2 items-center h-6">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      ) : (
                        message.text
                      )}
                    </div>
                </div>
              ))}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about eco-friendly products..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
                  >
                    <span className="text-xl">↗️</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;