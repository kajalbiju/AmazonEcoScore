import React from 'react';
import EcoProfile from './EcoProfile';
import TrendGraph from './TrendGraph';
import Leaderboard from './Leaderboard';
import { UserProfile, LeaderboardUser } from '../../types';

interface DashboardProps {
  userProfile: UserProfile;
  leaderboardUsers: LeaderboardUser[];
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, leaderboardUsers }) => {
  return (
    <section id="dashboard" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Your Eco Dashboard
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <EcoProfile profile={userProfile} />
              <TrendGraph profile={userProfile} />
            </div>
          </div>
          
          <div>
            <Leaderboard users={leaderboardUsers} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;