import React from 'react';
import { Award, Package, Truck, Leaf } from 'lucide-react';
import { UserProfile } from '../../types';

interface EcoProfileProps {
  profile: UserProfile;
}

const EcoProfile: React.FC<EcoProfileProps> = ({ profile }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Your EcoProfile</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-green-500">{profile.averageEcoScore}</span>
            </div>
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200 dark:text-gray-700" 
                cx="50" 
                cy="50" 
                r="45" 
                stroke="currentColor" 
                strokeWidth="10" 
                fill="none"
              />
              <circle 
                className="text-green-500" 
                cx="50" 
                cy="50" 
                r="45" 
                stroke="currentColor" 
                strokeWidth="10" 
                fill="none" 
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * 0.75)} 
              />
            </svg>
          </div>
          <span className="mt-3 text-gray-700 dark:text-gray-300 font-medium">Average EcoScore</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Package className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">{profile.totalAnalyzed}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Products Analyzed</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Award className="h-6 w-6 text-purple-500 mb-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {profile.totalAnalyzed > 0 ? Math.round((profile.totalAnalyzed / 10) * 100) : 0}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Eco Progress</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <Truck className="h-6 w-6 text-orange-500 mb-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">{profile.carbonSaved}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">kg CO₂ Saved</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Leaf className="h-6 w-6 text-green-500 mb-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {Math.round(profile.carbonSaved / 10)}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Trees Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoProfile;