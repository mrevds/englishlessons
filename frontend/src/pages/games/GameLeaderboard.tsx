import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { gamesAPI, gameNames, levelNames } from '../../api/games';
import type { GameResult, GameSummary } from '../../api/games';
import { Trophy, ArrowLeft, Medal, Gamepad2, Loader2, Star, Clock, Zap, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

interface LeaderboardEntry {
  id: number;
  user_id: number;
  score: number;
  percentage: number;
  time_spent: number;
  user?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
}

const GameLeaderboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [mySummary, setMySummary] = useState<GameSummary | null>(null);
  const [myRecentGames, setMyRecentGames] = useState<GameResult[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [myRankInLevel, setMyRankInLevel] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ranking' | 'history'>('ranking');
  
  // Фильтры для рейтинга
  const [selectedGame, setSelectedGame] = useState<string>('grammar-detective');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [selectedGame, selectedLevel]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [summaryData, recentData] = await Promise.all([
        gamesAPI.getMySummary(),
        gamesAPI.getMyResults(),
      ]);
      
      setMySummary(summaryData);
      setMyRecentGames(recentData.slice(0, 15));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    setLeaderboardLoading(true);
    try {
      const data = await gamesAPI.getLeaderboard(selectedGame, selectedLevel, 20);
      setLeaderboard(data);
      
      // Находим своё место
      if (user) {
        const myIndex = data.findIndex((entry: LeaderboardEntry) => entry.user_id === user.id);
        setMyRankInLevel(myIndex !== -1 ? myIndex + 1 : null);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setLeaderboard([]);
      setMyRankInLevel(null);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}с`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}м ${secs}с` : `${mins}м`;
  };

  const formatTotalTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} сек`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return mins > 0 ? `${hours}ч ${mins}м` : `${hours}ч`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (percentage >= 50) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/games')}
          className="btn-secondary mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('games.backToGames')}
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3">
          <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            {t('games.leaderboard.header')}
          </span>
        </h1>

        {/* Моё место в рейтинге текущего уровня */}
        {myRankInLevel && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 text-center shadow-lg">
            <div className="text-xs sm:text-sm opacity-90">{t('games.leaderboard.myRank', { game: gameNames[selectedGame], level: selectedLevel })}</div>
            <div className="text-3xl sm:text-5xl font-bold my-1 sm:my-2">#{myRankInLevel}</div>
            <div className="text-xs sm:text-sm opacity-80">{t('games.leaderboard.outOf', { count: leaderboard.length })}</div>
          </div>
        )}

        {/* Моя статистика - крупные карточки */}
        {mySummary && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center shadow-lg">
              <Gamepad2 className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-80" />
              <div className="text-xl sm:text-3xl font-bold">{mySummary.total_games}</div>
              <div className="text-purple-100 text-xs sm:text-sm">{t('games.leaderboard.totalGamesLabel')}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center shadow-lg">
              <Star className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-80" />
              <div className="text-xl sm:text-3xl font-bold">{mySummary.avg_percentage.toFixed(0)}%</div>
              <div className="text-blue-100 text-xs sm:text-sm">{t('games.leaderboard.avgScoreLabel')}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center shadow-lg">
              <Clock className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-80" />
              <div className="text-xl sm:text-3xl font-bold">{formatTotalTime(mySummary.total_time)}</div>
              <div className="text-green-100 text-xs sm:text-sm">{t('games.leaderboard.totalTimeLabel')}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl text-center shadow-lg">
              <Zap className="w-5 h-5 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 opacity-80" />
              <div className="text-xl sm:text-3xl font-bold">{Object.keys(mySummary.games_played || {}).length}/5</div>
              <div className="text-orange-100 text-xs sm:text-sm">{t('games.leaderboard.gameTypesLabel')}</div>
            </div>
          </div>
        )}

        {/* Табы */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base transition-all ${
              activeTab === 'ranking'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{t('games.tabs.ranking')}</span>
            <span className="xs:hidden">{t('games.tabs.ranking')}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">{t('games.tabs.history')}</span>
            <span className="xs:hidden">{t('games.tabs.history')}</span>
          </button>
        </div>

        {/* Рейтинг по уровням */}
        {activeTab === 'ranking' && (
          <div className="card mb-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              {t('games.leaderboard.rankingByLevels')}
            </h2>
            
            {/* Фильтры */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">{t('games.filters.game')}</label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="input-field text-sm"
                >
                  {Object.entries(gameNames).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">{t('games.filters.level')}</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                  className="input-field text-sm"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}. {t(`games.levels.${lvl}.label`, { defaultValue: levelNames[lvl] || `Level ${lvl}` })}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {leaderboardLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mx-auto" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500">{t('games.leaderboard.noOneYet')}</p>
                <p className="text-sm text-gray-400 mt-1">{t('games.leaderboard.beFirst')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, idx) => {
                  const isMe = user && entry.user_id === user.id;
                  const displayName = entry.user 
                    ? `${entry.user.first_name} ${entry.user.last_name}`.trim() || entry.user.username
                    : t('games.leaderboard.player');
                  return (
                    <div
                      key={entry.id}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 ${
                        isMe 
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 ring-2 ring-yellow-400'
                          : 'bg-gray-50 dark:bg-gray-700'
                      }`}
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold ${
                        idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        idx === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-700' :
                        'bg-gradient-to-br from-blue-400 to-blue-600'
                      }`}>
                        {idx < 3 ? <Medal className="w-4 h-4 sm:w-5 sm:h-5" /> : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm sm:text-base font-semibold truncate ${isMe ? 'text-orange-700 dark:text-orange-300' : ''}`}>
                          {displayName} {isMe && ` ${t('games.leaderboard.you')}`}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                          {entry.percentage.toFixed(0)}% • {entry.time_spent}с
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-xl font-bold text-purple-600">{entry.score}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500">очков</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* История игр */}
        {activeTab === 'history' && (
          <>
            {/* Прогресс по играм */}
            {mySummary?.games_played && Object.keys(mySummary.games_played).length > 0 && (
              <div className="card mb-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-yellow-500" />
                  {t('games.leaderboard.progressByGames')}
                </h2>
                <div className="space-y-3">
                  {Object.entries(mySummary.games_played).map(([gameType, count]) => (
                    <div key={gameType} className="flex items-center gap-3">
                      <div className="w-40 sm:w-48 font-medium text-sm truncate">
                        {gameNames[gameType] || gameType}
                      </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.min(count * 10, 100)}%` }}
                    >
                      {count >= 3 && <span className="text-xs text-white font-bold">{count}</span>}
                    </div>
                  </div>
                  <div className="w-12 text-right font-bold text-purple-600">{count}</div>
                </div>
              ))}
                </div>
              </div>
            )}

            {/* Список игр */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                {t('games.leaderboard.recentGamesTitle')}
              </h2>

              {myRecentGames.length === 0 ? (
                <div className="text-center py-8">
                  <Gamepad2 className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 mb-4">{t('games.leaderboard.notPlayed')}</p>
                  <button
                    onClick={() => navigate('/games')}
                    className="btn-primary"
                  >
                    {t('games.leaderboard.startPlaying')}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {myRecentGames.map((game) => (
                    <div
                      key={game.id}
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 ${getScoreBg(game.percentage)}`}
                    >
                      <div className={`text-lg sm:text-2xl font-bold w-12 sm:w-16 text-center ${getScoreColor(game.percentage)}`}>
                        {game.percentage.toFixed(0)}%
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-semibold truncate">
                          {gameNames[game.game_type] || game.game_type}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                          Ур. {game.level} • {game.correct_count}/{game.total_count}
                        </div>
                      </div>
                      <div className="text-right text-xs sm:text-sm text-gray-500">
                        {formatTime(game.time_spent)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Кнопка играть */}
        <div className="mt-4 sm:mt-6 text-center">
          <button
            onClick={() => navigate('/games')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            {t('games.playMore') }
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default GameLeaderboard;
