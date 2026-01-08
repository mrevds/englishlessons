import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../api/users';
import { gamesAPI, gameNames } from '../api/games';
import type { ClassGameStats, GameResult } from '../api/games';
import type { Student, StudentStats } from '../api/users';
import ClassAnalytics from '../components/ClassAnalytics';
import ClassActivityChart from '../components/ClassActivityChart';
import ThemeToggle from '../components/ThemeToggle';
import { formatDateShort } from '../utils/date';
import { BarChart3, BookOpen, Loader2, CheckCircle2, Clock, Key, X, Gamepad2, Timer, Users } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [filters, setFilters] = useState({
    level: '',
    level_letter: '',
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetResult, setResetResult] = useState<{ username: string; new_password: string } | null>(null);
  const [classGameStats, setClassGameStats] = useState<ClassGameStats[]>([]);
  const [recentGames, setRecentGames] = useState<GameResult[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gameFilters, setGameFilters] = useState({
    level: '',
    level_letter: '',
    game_type: '',
  });
  const [gamesTab, setGamesTab] = useState<'stats' | 'recent'>('stats');

  useEffect(() => {
    if (user?.role !== 'teacher') {
      navigate('/lessons');
      return;
    }
    loadStudents();
  }, [user, filters]);

  useEffect(() => {
    if (user?.role === 'teacher') {
      loadGameStats();
    }
  }, [user, gameFilters]);

  const loadGameStats = async () => {
    try {
      setGamesLoading(true);
      const level = gameFilters.level ? parseInt(gameFilters.level) : undefined;
      const [classStats, recent] = await Promise.all([
        gamesAPI.getClassStats(level, gameFilters.level_letter),
        gamesAPI.getRecentResults(30, level, gameFilters.level_letter),
      ]);
      setClassGameStats(classStats || []);
      // Фильтруем по типу игры если выбран
      const filteredRecent = gameFilters.game_type 
        ? recent.filter(g => g.game_type === gameFilters.game_type)
        : recent;
      setRecentGames(filteredRecent);
    } catch (error) {
      console.error('Error loading game stats:', error);
    } finally {
      setGamesLoading(false);
    }
  };

  const loadStudents = async () => {
    try {
      const params: any = {};
      if (filters.level) params.level = parseInt(filters.level);
      if (filters.level_letter) params.level_letter = filters.level_letter;
      
      const data = await usersAPI.getStudents(params);
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentStats = async (studentId: number) => {
    setStatsLoading(true);
    try {
      const stats = await usersAPI.getStudentStats(studentId);
      setStudentStats(stats);
    } catch (error) {
      console.error('Error loading student stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    loadStudentStats(student.id);
  };

  const handleResetPassword = async () => {
    if (!resetUsername.trim()) return;
    
    setResetLoading(true);
    try {
      const result = await usersAPI.resetStudentPassword(resetUsername.trim());
      setResetResult(result);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Ошибка при сбросе пароля');
    } finally {
      setResetLoading(false);
    }
  };

  if (user?.role !== 'teacher') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
              Дашборд учителя
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
              Добро пожаловать, {user?.first_name || user?.username}!
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
            <button
              onClick={() => setShowResetPassword(true)}
              className="btn-primary text-xs sm:text-sm py-2 px-3 sm:py-3 sm:px-4 flex items-center gap-1 sm:gap-2"
            >
              <Key className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Сбросить</span> пароль
            </button>
            <button
              onClick={() => navigate('/lessons')}
              className="btn-secondary text-xs sm:text-sm py-2 px-3 sm:py-3 sm:px-4 flex items-center gap-1 sm:gap-2"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              Уроки
            </button>
            <ThemeToggle />
            <button onClick={logout} className="btn-secondary text-xs sm:text-sm py-2 px-3 sm:py-3 sm:px-4">
              Выйти
            </button>
          </div>
        </div>

        {/* Аналитика класса */}
        <div className="mb-6">
          <ClassAnalytics />
        </div>

        {/* График активности классов */}
        <div className="mb-6">
          <ClassActivityChart />
        </div>

        {/* Статистика по играм */}
        <div className="mb-6">
          <div className="card">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-purple-600" />
                Статистика по играм
              </h2>
              
              {/* Фильтры для игр */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={gameFilters.level}
                  onChange={(e) => setGameFilters({ ...gameFilters, level: e.target.value })}
                  className="input-field text-sm py-1 px-2 w-24"
                >
                  <option value="">Класс</option>
                  {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num} класс</option>
                  ))}
                </select>
                <select
                  value={gameFilters.level_letter}
                  onChange={(e) => setGameFilters({ ...gameFilters, level_letter: e.target.value })}
                  className="input-field text-sm py-1 px-2 w-20"
                >
                  <option value="">Буква</option>
                  {['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'].map((letter) => (
                    <option key={letter} value={letter}>{letter}</option>
                  ))}
                </select>
                <select
                  value={gameFilters.game_type}
                  onChange={(e) => setGameFilters({ ...gameFilters, game_type: e.target.value })}
                  className="input-field text-sm py-1 px-2 w-36"
                >
                  <option value="">Все игры</option>
                  {Object.entries(gameNames).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Табы */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setGamesTab('stats')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${
                  gamesTab === 'stats' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Users className="w-4 h-4" />
                Топ студентов
              </button>
              <button
                onClick={() => setGamesTab('recent')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${
                  gamesTab === 'recent' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Timer className="w-4 h-4" />
                Последние игры
              </button>
            </div>

            {gamesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
              </div>
            ) : gamesTab === 'stats' ? (
              /* Топ студентов по играм */
              <div>
                {/* Сводка */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-600">{(classGameStats || []).length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Активных игроков</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {(classGameStats || []).reduce((sum, s) => sum + s.total_games, 0)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Всего игр</div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {(classGameStats || []).length > 0 
                        ? Math.round((classGameStats || []).reduce((sum, s) => sum + s.avg_percentage, 0) / (classGameStats || []).length)
                        : 0}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Средний балл</div>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.floor((classGameStats || []).reduce((sum, s) => sum + s.total_time, 0) / 60)}м
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Общее время</div>
                  </div>
                </div>

                {(!classGameStats || classGameStats.length === 0) ? (
                  <p className="text-gray-500 text-center py-4">Нет данных по играм</p>
                  ) : (
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {(classGameStats || []).map((stat, idx) => (
                        <div
                          key={stat.user_id}
                          className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-3"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            idx === 0 ? 'bg-yellow-500' :
                            idx === 1 ? 'bg-gray-400' :
                            idx === 2 ? 'bg-amber-600' :
                            'bg-blue-500'
                          }`}>
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{stat.full_name || stat.username}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {stat.total_games} игр • {Math.round(stat.avg_percentage)}% • {Math.floor(stat.total_time / 60)}м
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">{stat.best_score}</div>
                            <div className="text-xs text-gray-500">лучший</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ) : (
              /* Последние игры */
              <div>
                {recentGames.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Нет недавних игр</p>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {recentGames.map((game) => (
                      <div
                        key={game.id}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex items-center gap-3"
                      >
                        <div className={`w-14 text-center font-bold text-lg rounded-lg py-1 ${
                          game.percentage >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                          game.percentage >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                        }`}>
                          {game.percentage.toFixed(0)}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">
                            {game.user ? `${game.user.first_name} ${game.user.last_name}`.trim() || game.user.username : 'Студент'}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {gameNames[game.game_type] || game.game_type} • Ур. {game.level}
                          </div>
                        </div>
                        <div className="text-right text-sm">
                          <div className="text-gray-700 dark:text-gray-300">{game.correct_count}/{game.total_count}</div>
                          <div className="text-xs text-gray-500">{game.time_spent}с</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Список студентов */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">👥 Студенты</h2>
              
              {/* Фильтры */}
              <div className="mb-4 space-y-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Класс
                  </label>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                    className="input-field text-sm"
                  >
                    <option value="">Все классы</option>
                    {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Буква класса
                  </label>
                  <select
                    value={filters.level_letter}
                    onChange={(e) => setFilters({ ...filters, level_letter: e.target.value })}
                    className="input-field text-sm"
                  >
                    <option value="">Все буквы</option>
                    {['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Список */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {students.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Нет студентов</p>
                ) : (
                  students.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => handleStudentClick(student)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                        selectedStudent?.id === student.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{student.full_name || student.username}</div>
                      <div className={`text-sm ${selectedStudent?.id === student.id ? 'text-blue-100' : 'text-gray-600'}`}>
                        {student.class_display || 'Без класса'}
                      </div>
                      <div className={`text-xs ${selectedStudent?.id === student.id ? 'text-blue-200' : 'text-gray-500'}`}>
                        @{student.username}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Статистика выбранного студента */}
          <div className="lg:col-span-2">
            {selectedStudent ? (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">
                  Статистика: {selectedStudent.full_name || selectedStudent.username}
                </h2>
                <p className="text-gray-600 mb-6">{selectedStudent.class_display}</p>

                {statsLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                  </div>
                ) : studentStats ? (
                  <>
                    {/* Общая статистика */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl">
                        <div className="text-2xl font-bold">{studentStats.total_points}</div>
                        <div className="text-blue-100 text-sm">Всего баллов</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-xl">
                        <div className="text-2xl font-bold">{studentStats.completed_lessons}</div>
                        <div className="text-green-100 text-sm">Пройдено уроков</div>
                      </div>
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4 rounded-xl">
                        <div className="text-2xl font-bold">{((studentStats.average_percentage) || 0).toFixed(1)}%</div>
                        <div className="text-yellow-100 text-sm">Средний %</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-xl">
                        <div className="text-2xl font-bold">{studentStats.total_attempts}</div>
                        <div className="text-purple-100 text-sm">Попыток</div>
                      </div>
                    </div>

                    {/* Детали по урокам */}
                    <h3 className="text-xl font-bold mb-4">Детали по урокам</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                      {studentStats.lessons_detail.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Нет данных по урокам</p>
                      ) : (
                        studentStats.lessons_detail.map((lesson) => (
                          <div
                            key={lesson.lesson_id}
                            className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-lg">{lesson.lesson_title}</h4>
                                <p className="text-gray-600 text-sm">Урок #{lesson.lesson_order}</p>
                              </div>
                              {lesson.is_completed ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : (
                                <Clock className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                            <div className="mt-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Лучший результат</span>
                                <span className="font-bold">{((lesson.best_percentage) || 0).toFixed(1)}%</span>
                              </div>
                              <div className="bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    lesson.is_completed
                                      ? 'bg-gradient-to-r from-green-500 to-teal-600'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                                  }`}
                                  style={{ width: `${Math.min((lesson.best_percentage) || 0, 100)}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Попыток: {lesson.attempts}</span>
                                {lesson.completed_at && (
                                  <span>Пройден: {formatDateShort(lesson.completed_at)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Выберите студента для просмотра статистики
                  </div>
                )}
              </div>
            ) : (
              <div className="card">
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">👆</div>
                  <p className="text-xl">Выберите студента из списка</p>
                  <p className="text-sm mt-2">для просмотра его статистики</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Модальное окно сброса пароля */}
        {showResetPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Сброс пароля студента
                </h3>
                <button
                  onClick={() => {
                    setShowResetPassword(false);
                    setResetUsername('');
                    setResetResult(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!resetResult ? (
                <>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Введите username студента для сброса пароля
                  </p>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={resetUsername}
                      onChange={(e) => setResetUsername(e.target.value)}
                      className="input-field w-full"
                      placeholder="Введите username"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && resetUsername.trim()) {
                          handleResetPassword();
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleResetPassword}
                      disabled={!resetUsername.trim() || resetLoading}
                      className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resetLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Сброс...
                        </>
                      ) : (
                        'Сбросить пароль'
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowResetPassword(false);
                        setResetUsername('');
                        setResetResult(null);
                      }}
                      className="btn-secondary"
                    >
                      Отмена
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
                    <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
                      Пароль успешно сброшен!
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Username: <span className="font-mono font-bold">{resetResult.username}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Новый пароль:
                    </p>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded border-2 border-green-300 dark:border-green-600">
                      <p className="font-mono text-lg font-bold text-center text-green-700 dark:text-green-300">
                        {resetResult.new_password}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Сохраните этот пароль! Он больше не будет показан.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowResetPassword(false);
                      setResetUsername('');
                      setResetResult(null);
                    }}
                    className="btn-primary w-full"
                  >
                    Закрыть
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;

