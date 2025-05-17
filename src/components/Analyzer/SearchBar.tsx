import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (url: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [url, setUrl] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Analyze Amazon Product Sustainability
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Paste an Amazon product URL to check its environmental impact and find greener alternatives
        </p>
      </div>
      
      <form onSubmit={handleSearch} className="w-full">
        <div className={`relative flex items-center transition-all duration-300 rounded-xl border-2 ${
          isActive 
            ? 'border-green-500 shadow-md shadow-green-100 dark:shadow-green-900/10' 
            : 'border-gray-200 dark:border-gray-700'
        }`}>
          <input
            type="text"
            placeholder="Paste Amazon product URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            className="flex-grow px-4 py-3 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 bg-green-500 hover:bg-green-600 text-white rounded-r-lg transition-colors ml-auto"
          >
            <Search className="h-5 w-5 mr-2" />
            <span>Analyze</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Example: https://www.amazon.com/product/...
        </p>
      </form>
    </div>
  );
};

export default SearchBar;