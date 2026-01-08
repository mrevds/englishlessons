import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessonsAPI } from '../api/lessons';
import { useAuth } from '../context/AuthContext';
import Leaderboard from '../components/Leaderboard';
import Achievements from '../components/Achievements';
import { formatDateShort } from '../utils/date';
import { BarChart3, Loader2, ArrowLeft, Gem, Target, Star, Flame, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await lessonsAPI.getMyStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <div>Нет данных</div>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/lessons')}
          className="mb-4 sm:mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к урокам
        </button>

        <div className="card mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            Моя статистика
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="stat-card bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700">
              <div className="flex items-center justify-between mb-2">
                <Gem className="w-8 h-8 text-white" />
                <div className="text-2xl opacity-50">+</div>
              </div>
              <div className="text-2xl sm:text-4xl font-bold mb-1">{stats.total_points}</div>
              <div className="text-blue-100 text-xs sm:text-sm font-medium">Всего баллов</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-white" />
                <CheckCircle2 className="w-6 h-6 text-white opacity-50" />
              </div>
              <div className="text-2xl sm:text-4xl font-bold mb-1">{stats.completed_lessons}</div>
              <div className="text-green-100 text-xs sm:text-sm font-medium">Пройдено уроков</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-600 hover:from-yellow-500 hover:via-orange-600 hover:to-amber-700">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-8 h-8 text-white" />
                <div className="text-2xl opacity-50">%</div>
              </div>
              <div className="text-2xl sm:text-4xl font-bold mb-1">{((stats.average_percentage) || 0).toFixed(1)}%</div>
              <div className="text-yellow-100 text-xs sm:text-sm font-medium">Средний процент</div>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 hover:from-purple-600 hover:via-pink-600 hover:to-rose-700">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8 text-white" />
                <div className="text-2xl opacity-50">↻</div>
              </div>
              <div className="text-2xl sm:text-4xl font-bold mb-1">{stats.total_attempts}</div>
              <div className="text-purple-100 text-xs sm:text-sm font-medium">Всего попыток</div>
            </div>
          </div>

          {/* Общий прогресс */}
          {stats.total_lessons && (
            <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 sm:p-6 border-2 border-blue-100 dark:border-gray-600">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-0.5 sm:mb-1">Общий прогресс</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Ваш путь к мастерству</p>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stats.completed_lessons}/{stats.total_lessons}
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">уроков</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 h-6 rounded-full transition-all duration-700 relative overflow-hidden"
                    style={{ width: `${stats.overall_progress || 0}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-shift" />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Пройдено <span className="text-green-600 dark:text-green-400">{stats.overall_progress?.toFixed(1) || 0}%</span>
                  </p>
                  {stats.overall_progress >= 100 && (
                    <Sparkles className="w-6 h-6 text-yellow-500 animate-float" />
                  )}
                </div>
              </div>
            </div>
          )}

          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Детали по урокам</h2>
          <div className="space-y-3 sm:space-y-4">
            {stats.lessons_detail.map((lesson: any, index: number) => (
              <div
                key={lesson.lesson_id}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0 ${
                      lesson.is_completed
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                        : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                    }`}>
                      {lesson.lesson_order}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100 truncate">{lesson.lesson_title || 'Без названия'}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Урок #{lesson.lesson_order || 'N/A'}</p>
                    </div>
                  </div>
                  {lesson.is_completed ? (
                    <div className="flex flex-col items-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                      <span className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold mt-0.5 sm:mt-1">Пройден</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center flex-shrink-0">
                      <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400" />
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">В процессе</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 sm:mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Лучший результат</span>
                    <span className={`text-lg font-bold ${
                      lesson.best_percentage >= 70
                        ? 'text-green-600 dark:text-green-400'
                        : lesson.best_percentage >= 40
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {((lesson.best_percentage) || 0).toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 relative overflow-hidden ${
                        (lesson.best_percentage || 0) >= 70
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : (lesson.best_percentage || 0) >= 40
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          : 'bg-gradient-to-r from-red-400 to-pink-500'
                      }`}
                      style={{ width: `${Math.min((lesson.best_percentage) || 0, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-shift" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">Попыток:</span>
                      <span className="font-bold text-gray-800 dark:text-gray-200">{lesson.attempts}</span>
                    </div>
                    {lesson.completed_at && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{formatDateShort(lesson.completed_at)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Рейтинг и достижения */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Leaderboard />
          <Achievements />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;

