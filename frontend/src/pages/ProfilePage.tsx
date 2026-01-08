import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../api/users';
import { lessonsAPI } from '../api/lessons';
import { formatDateShort } from '../utils/date';
import { BarChart3, Loader2, ArrowLeft, Gem, Target, Star, Flame, CheckCircle2, Clock, User, Mail, Key, Save, Edit2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    level: user?.level || null,
    level_letter: user?.level_letter || '',
  });

  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  useEffect(() => {
    loadStats();
    if (user) {
      setProfileData({
        email: user.email || '',
        level: user.level || null,
        level_letter: user.level_letter || '',
      });
    }
  }, [user]);

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

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await usersAPI.updateProfile({
        email: profileData.email || undefined,
        level: profileData.level || undefined,
        level_letter: profileData.level_letter || undefined,
      });
      await refreshUser();
      setEditing(false);
      alert('Профиль успешно обновлен!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Ошибка при обновлении профиля');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert('Новые пароли не совпадают');
      return;
    }
    if (passwordData.new_password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }

    setSaving(true);
    try {
      await usersAPI.changePassword(passwordData.old_password, passwordData.new_password);
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
      setChangingPassword(false);
      alert('Пароль успешно изменен!');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Ошибка при смене пароля');
    } finally {
      setSaving(false);
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
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/lessons')}
          className="mb-4 sm:mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к урокам
        </button>

        <div className="card mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
              <User className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
              Мой профиль
            </h1>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn-primary flex items-center gap-2 text-sm sm:text-base"
              >
                <Edit2 className="w-4 h-4" />
                Редактировать
              </button>
            )}
          </div>

          {/* Информация о пользователе */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                value={user?.username || ''}
                disabled
                className="input-field bg-gray-100 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              {editing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="input-field"
                  placeholder="email@example.com"
                />
              ) : (
                <input
                  type="text"
                  value={profileData.email || 'Не указан'}
                  disabled
                  className="input-field bg-gray-100 dark:bg-gray-700"
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Класс</label>
                {editing ? (
                  <select
                    value={profileData.level || ''}
                    onChange={(e) => setProfileData({ ...profileData, level: e.target.value ? parseInt(e.target.value) : null })}
                    className="input-field"
                  >
                    <option value="">Не указан</option>
                    {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profileData.level ? `${profileData.level} класс` : 'Не указан'}
                    disabled
                    className="input-field bg-gray-100 dark:bg-gray-700"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Буква класса</label>
                {editing ? (
                  <select
                    value={profileData.level_letter}
                    onChange={(e) => setProfileData({ ...profileData, level_letter: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Не указана</option>
                    {['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'].map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={profileData.level_letter || 'Не указана'}
                    disabled
                    className="input-field bg-gray-100 dark:bg-gray-700"
                  />
                )}
              </div>
            </div>

            {editing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Сохранить
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setProfileData({
                      email: user?.email || '',
                      level: user?.level || null,
                      level_letter: user?.level_letter || '',
                    });
                  }}
                  className="btn-secondary"
                >
                  Отмена
                </button>
              </div>
            )}
          </div>

          {/* Смена пароля */}
          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Key className="w-5 h-5" />
                Смена пароля
              </h2>
              {!changingPassword && (
                <button
                  onClick={() => setChangingPassword(true)}
                  className="btn-secondary text-sm"
                >
                  Изменить пароль
                </button>
              )}
            </div>

            {changingPassword && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Текущий пароль</label>
                  <input
                    type="password"
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Новый пароль</label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Подтвердите новый пароль</label>
                  <input
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Сохранить
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setChangingPassword(false);
                      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
                    }}
                    className="btn-secondary"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Статистика */}
        {stats && (
          <div className="card">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              Моя статистика
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="stat-card bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600">
                <Gem className="w-8 h-8 text-white" />
                <div className="text-2xl sm:text-4xl font-bold mb-1">{stats.total_points}</div>
                <div className="text-blue-100 text-xs sm:text-sm font-medium">Всего баллов</div>
              </div>
              <div className="stat-card bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600">
                <Target className="w-8 h-8 text-white" />
                <div className="text-2xl sm:text-4xl font-bold mb-1">{stats.completed_lessons}</div>
                <div className="text-green-100 text-xs sm:text-sm font-medium">Пройдено уроков</div>
              </div>
              <div className="stat-card bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-600">
                <Star className="w-8 h-8 text-white" />
                <div className="text-2xl sm:text-4xl font-bold mb-1">{((stats.average_percentage) || 0).toFixed(1)}%</div>
                <div className="text-yellow-100 text-xs sm:text-sm font-medium">Средний процент</div>
              </div>
              <div className="stat-card bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600">
                <Flame className="w-8 h-8 text-white" />
                <div className="text-2xl sm:text-4xl font-bold mb-1">{stats.total_attempts}</div>
                <div className="text-purple-100 text-xs sm:text-sm font-medium">Всего попыток</div>
              </div>
            </div>

            {/* Детали по урокам */}
            {stats.lessons_detail && stats.lessons_detail.length > 0 && (
              <>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Детали по урокам</h3>
                <div className="space-y-3 sm:space-y-4">
                  {stats.lessons_detail.map((lesson: any) => (
                    <div
                      key={lesson.lesson_id}
                      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-3 sm:p-5 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className={`rounded-lg sm:rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-lg ${
                            lesson.is_completed
                              ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                              : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                          }`}>
                            {lesson.lesson_order}
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">{lesson.lesson_title || 'Без названия'}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">Урок #{lesson.lesson_order || 'N/A'}</p>
                          </div>
                        </div>
                        {lesson.is_completed ? (
                          <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400" />
                        )}
                      </div>
                      <div className="mt-3 sm:mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Лучший результат</span>
                          <span className={`text-lg font-bold ${
                            (lesson.best_percentage || 0) >= 70
                              ? 'text-green-600 dark:text-green-400'
                              : (lesson.best_percentage || 0) >= 40
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {((lesson.best_percentage) || 0).toFixed(1)}%
                          </span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              (lesson.best_percentage || 0) >= 70
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                : (lesson.best_percentage || 0) >= 40
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                                : 'bg-gradient-to-r from-red-400 to-pink-500'
                            }`}
                            style={{ width: `${Math.min((lesson.best_percentage) || 0, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Попыток: {lesson.attempts || 0}</span>
                          {lesson.completed_at && (
                            <span>Пройден: {formatDateShort(lesson.completed_at)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

