import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EcoImpact {
  carbonSaved: number;
  plasticAvoided: number;
  treesSaved: number;
  waterSaved: number;
}

interface DashboardPageProps {
  userEcoImpact: EcoImpact;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userEcoImpact }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Eco Impact Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-700"
          >
            Back to Shopping
          </button>
        </div>

        <div className="space-y-8">
          {/* Impact Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">🌍</div>
              <p className="text-3xl font-bold text-green-600">{userEcoImpact.carbonSaved.toFixed(1)}</p>
              <p className="text-gray-600">kg CO2 Saved</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">🌊</div>
              <p className="text-3xl font-bold text-green-600">{userEcoImpact.plasticAvoided.toFixed(1)}</p>
              <p className="text-gray-600">kg Plastic Avoided</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">🌳</div>
              <p className="text-3xl font-bold text-green-600">{userEcoImpact.treesSaved.toFixed(1)}</p>
              <p className="text-gray-600">Trees Saved</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-3">💧</div>
              <p className="text-3xl font-bold text-green-600">{userEcoImpact.waterSaved.toFixed(1)}</p>
              <p className="text-gray-600">L Water Saved</p>
            </div>
          </div>

          {/* Impact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Environmental Impact Equivalent</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🚗</span>
                  <div>
                    <p className="font-medium text-gray-800">Car Travel Avoided</p>
                    <p className="text-gray-600">{(userEcoImpact.carbonSaved * 4).toFixed(1)} kilometers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🌱</span>
                  <div>
                    <p className="font-medium text-gray-800">Tree Growth</p>
                    <p className="text-gray-600">{(userEcoImpact.treesSaved * 10).toFixed(1)} seedlings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🗑️</span>
                  <div>
                    <p className="font-medium text-gray-800">Plastic Waste Reduction</p>
                    <p className="text-gray-600">{(userEcoImpact.plasticAvoided * 200).toFixed(0)} bottles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🚿</span>
                  <div>
                    <p className="font-medium text-gray-800">Water Conservation</p>
                    <p className="text-gray-600">{(userEcoImpact.waterSaved / 200).toFixed(1)} months of showers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievement Badges</h2>
              <div className="grid grid-cols-2 gap-4">
                {userEcoImpact.carbonSaved > 5 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <span className="text-4xl">🌟</span>
                    <p className="font-medium text-gray-800 mt-2">Carbon Warrior</p>
                    <p className="text-sm text-gray-600">Saved over 5kg CO2</p>
                  </div>
                )}
                {userEcoImpact.plasticAvoided > 2 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <span className="text-4xl">🌊</span>
                    <p className="font-medium text-gray-800 mt-2">Ocean Guardian</p>
                    <p className="text-sm text-gray-600">Avoided 2kg+ plastic</p>
                  </div>
                )}
                {userEcoImpact.treesSaved > 1 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <span className="text-4xl">🌳</span>
                    <p className="font-medium text-gray-800 mt-2">Forest Friend</p>
                    <p className="text-sm text-gray-600">Saved over 1 tree</p>
                  </div>
                )}
                {userEcoImpact.waterSaved > 100 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <span className="text-4xl">💧</span>
                    <p className="font-medium text-gray-800 mt-2">Water Wise</p>
                    <p className="text-sm text-gray-600">Saved 100L+ water</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Share Your Impact</h2>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">
                <span>Share on Twitter</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors">
                <span>Share on Facebook</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <span>Download Impact Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 