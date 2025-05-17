import React from 'react';

const Leaderboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Sustainability Leaderboard
      </h1>
      
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Rank</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">User</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Score</th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Products Analyzed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-900 dark:text-white">1</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">EcoWarrior</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">95</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">42</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-900 dark:text-white">2</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">GreenGuru</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">92</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">38</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-900 dark:text-white">3</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">EcoExplorer</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">88</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white">35</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 