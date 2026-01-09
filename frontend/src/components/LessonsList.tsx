import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessonsAPI } from '../api/lessons';
import type { Lesson } from '../api/lessons';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { BookOpen, BarChart3, Trophy, Lock, Rocket, RotateCcw, CheckCircle2, Sparkles, Loader2, HandHeart, User, Gamepad2 } from 'lucide-react';

const LessonsList: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Кеш для уроков
  const [cache, setCache] = useState<{ data: Lesson[]; timestamp: number } | null>(null);
  const CACHE_DURATION = 10 * 60 * 1000; // 10 минут

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    const now = Date.now();
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      setLessons(cache.data);
      setLoading(false);
      return;
    }

    try {
      const data = await lessonsAPI.getLessons();
      setLessons(data);
      setCache({ data, timestamp: now });
    } catch (error) {
      console.error('Error loading lessons:', error);
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

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="text-4xl sm:text-5xl animate-float">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  English Lessons
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-pink-500" />
                  <span>Добро пожаловать, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.first_name || user?.username}</span>!</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center w-full sm:w-auto">
            {user?.role === 'teacher' ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary text-sm sm:text-base flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Дашборд
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/games')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center gap-2 font-semibold shadow-lg text-sm sm:text-base"
                >
                  <Gamepad2 className="w-4 h-4" />
                  🎮 ИГРЫ
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="btn-primary text-sm sm:text-base flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Профиль
                </button>
                <button
                  onClick={() => navigate('/stats')}
                  className="btn-secondary text-sm sm:text-base flex items-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Статистика
                </button>
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="btn-secondary text-sm sm:text-base flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Рейтинг
                </button>
              </>
            )}
            <ThemeToggle />
            <button onClick={logout} className="btn-secondary text-sm sm:text-base">
              Выйти
            </button>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {lessons.map((lesson) => {
            const isCompleted = lesson.progress?.is_completed;
            const isAccessible = lesson.order === 1 || lessons[lesson.order - 2]?.progress?.is_completed;

            return (
              <div
                key={lesson.id}
                className={`card-hover cursor-pointer group relative ${
                  !isAccessible ? 'opacity-50 cursor-not-allowed' : ''
                } ${isCompleted ? 'ring-4 ring-green-400 dark:ring-green-500 shadow-green-200 dark:shadow-green-900' : ''}`}
                onClick={() => isAccessible && navigate(`/lesson/${lesson.id}`)}
              >
                {/* Декоративный градиентный фон */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                  isCompleted 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                    : 'bg-gradient-to-br from-blue-400 to-purple-500'
                }`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`relative ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 animate-pulse-glow' 
                        : 'bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600'
                    } text-white rounded-2xl w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      {lesson.order}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 animate-float">
                          <Sparkles className="w-5 h-5 text-yellow-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {isCompleted && (
                        <CheckCircle2 className="w-8 h-8 text-green-500 animate-bounce-in" />
                      )}
                      {!isAccessible && (
                        <Lock className="w-8 h-8 text-gray-400 opacity-50" />
                      )}
                      {isAccessible && !isCompleted && (
                        <Rocket className="w-7 h-7 text-blue-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{lesson.description}</p>

                  {lesson.progress && (
                    <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Прогресс</span>
                        <span className={`font-bold ${
                          lesson.progress.best_percentage >= 70 
                            ? 'text-green-600 dark:text-green-400' 
                            : lesson.progress.best_percentage >= 40
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {lesson.progress.best_percentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            lesson.progress.best_percentage >= 70
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                              : lesson.progress.best_percentage >= 40
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              : 'bg-gradient-to-r from-red-400 to-pink-500'
                          }`}
                          style={{ width: `${lesson.progress.best_percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Попыток: <span className="font-semibold">{lesson.progress.attempts_count}</span>
                        </p>
                        {lesson.progress.is_completed && (
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Пройдено
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    className={`w-full relative ${
                      isAccessible 
                        ? isCompleted
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                          : 'btn-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    } font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200`}
                    disabled={!isAccessible}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {!isAccessible ? (
                        <>
                          <Lock className="w-4 h-4" />
                          Урок заблокирован
                        </>
                      ) : isCompleted ? (
                        <>
                          <RotateCcw className="w-4 h-4" />
                          Повторить урок
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          Начать урок
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LessonsList;

