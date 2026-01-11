import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { leaderboardAPI } from '../api/leaderboard';
import type { LeaderboardEntry } from '../api/leaderboard';
import { useAuth } from '../context/AuthContext';
import { Trophy, Medal, Loader2 } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);

  // Кеш для leaderboard
  const [cache, setCache] = useState<{ data: LeaderboardEntry[]; timestamp: number } | null>(null);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const now = Date.now();
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      setLeaderboard(cache.data);
      const myEntry = cache.data.find(entry => entry.user_id === user?.id);
      if (myEntry) setMyRank(myEntry.rank);
      setLoading(false);
      return;
    }

    try {
      const data = await leaderboardAPI.getLeaderboard();
      setLeaderboard(data);
      
      // Находим свой ранг
      const myEntry = data.find(entry => entry.user_id === user?.id);
      if (myEntry) {
        setMyRank(myEntry.rank);
      }

      // Сохраняем в кеш
      setCache({ data, timestamp: now });
    } catch (error) {
      console.error('Error loading leaderboard:', error);
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

  const getRankIcon = (rank: number | undefined) => {
    if (!rank) return <span className="text-gray-600 dark:text-gray-400">—</span>;
    if (rank === 1) return <Medal className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-gray-600 dark:text-gray-400">#{rank}</span>;
  };

  return (
    <div className="card">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        {t('leaderboard.title')}
      </h2>
      
      {myRank && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 sm:p-4 rounded-xl mb-3 sm:mb-4">
          <div className="text-base sm:text-lg font-semibold flex items-center gap-2">
            {t('leaderboard.yourRank')} {getRankIcon(myRank)}
          </div>
        </div>
      )} 

      <div className="space-y-2 max-h-[400px] sm:max-h-[500px] overflow-y-auto">
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t('leaderboard.noData')}</p>
        ) : (
          leaderboard.map((entry, index) => {
            const isMe = entry.user_id === user?.id;
            return (
              <div
                key={entry.user_id}
                className={`p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                  isMe
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg ring-2 sm:ring-4 ring-yellow-400'
                    : index < 3
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                    <div className={`font-bold flex-shrink-0 ${isMe ? 'text-yellow-300' : 'text-gray-600 dark:text-gray-400'}`}>
                      {getRankIcon(entry.rank ?? index + 1)}
                    </div>
                    <div className="min-w-0">
                      <div className={`font-semibold text-sm sm:text-base truncate ${isMe ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                        {entry.full_name || entry.username}
                        {isMe && <span className="ml-1 sm:ml-2 text-yellow-300">{t('leaderboard.you')}</span>}
                      </div>
                      <div className={`text-xs sm:text-sm ${isMe ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                        {entry.class_display}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-base sm:text-xl font-bold ${isMe ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                      {entry.total_points} <span className="hidden sm:inline">{t('leaderboard.points')}</span><span className="sm:hidden">{t('leaderboard.pointsShort')}</span>
                    </div>
                    <div className={`text-xs sm:text-sm ${isMe ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                      {entry.completed_lessons} {t('leaderboard.lessonsAbbr')} • {(entry.average_percentage || 0).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
