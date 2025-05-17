import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Your Sustainability Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Analyses
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No recent analyses yet. Start by analyzing a product!
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sustainability Score
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your overall sustainability score will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 