import React, { useEffect, useState } from 'react';
import { achievementsAPI } from '../api/achievements';
import type { Achievement } from '../api/achievements';
import { formatDateShort } from '../utils/date';
import { Trophy, Target, Loader2, Award } from 'lucide-react';

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const data = await achievementsAPI.getMyAchievements();
      setAchievements(data);
    } catch (error) {
      console.error('Error loading achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        Достижения
      </h2>
      
      {achievements.length === 0 ? (
        <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
          <Target className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
          <p className="text-sm sm:text-base">Пока нет достижений</p>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">Проходите уроки и получайте бейджи!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800 p-3 sm:p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="mb-1.5 sm:mb-2">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="font-bold text-sm sm:text-lg text-gray-800 dark:text-gray-200">{achievement.title}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">{achievement.description}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-1.5 sm:mt-2">
                Получено: {formatDateShort(achievement.earned_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;

