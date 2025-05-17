import React from 'react';
import { Trophy, Award, ChevronUp } from 'lucide-react';
import { LeaderboardUser } from '../../types';

interface LeaderboardProps {
  users: LeaderboardUser[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Eco Leaderboard</h2>
        <Trophy className="h-6 w-6 text-yellow-500" />
      </div>
      
      <div className="space-y-4">
        {users.map((user, index) => (
          <div 
            key={user.id}
            className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              index === 0 
                ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-800/50' 
                : index === 1 
                  ? 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/30 dark:to-gray-700/30 border border-gray-200 dark:border-gray-700/50' 
                  : index === 2 
                    ? 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800/50' 
                    : 'bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-800/30'
            }`}
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-4">
              {index === 0 ? (
                <Award className="h-4 w-4 text-yellow-500" />
              ) : index === 1 ? (
                <Award className="h-4 w-4 text-gray-500" />
              ) : index === 2 ? (
                <Award className="h-4 w-4 text-amber-500" />
              ) : (
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.rank}</span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover mr-2"
                />
                <span className="font-medium text-gray-800 dark:text-white">{user.name}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center text-green-500">
                <span className="text-sm font-medium mr-1">{user.carbonSaved} kg</span>
                <ChevronUp className="h-4 w-4" />
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{user.averageEcoScore} Avg</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-green-500 hover:text-green-600 text-sm font-medium">
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;