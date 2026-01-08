import React from 'react';
import { useNavigate } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/lessons')}
          className="mb-4 sm:mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 text-sm sm:text-base"
        >
          ← Назад к урокам
        </button>
        <Leaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage;

