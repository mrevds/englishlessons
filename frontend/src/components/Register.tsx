import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api/auth';
import ThemeToggle from './ThemeToggle';
import { validatePassword, validateUsername, validateEmail } from '../utils/validation';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    email: '',
    level: 5,
    level_letter: 'А',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'level' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация username
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.valid) {
      setError(usernameValidation.error || 'Неверное имя пользователя');
      return;
    }

    // Валидация email
    if (formData.email) {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.valid) {
        setError(emailValidation.error || 'Неверный email');
        return;
      }
    }

    // Валидация пароля
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error || 'Неверный пароль');
      return;
    }

    if (formData.password !== formData.password_confirm) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    try {
      // Конвертируем level в число перед отправкой
      const registerData = {
        ...formData,
        level: typeof formData.level === 'string' ? parseInt(formData.level, 10) : formData.level,
      };
      await authAPI.register(registerData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 relative">
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
        <ThemeToggle />
      </div>
      <div className="card max-w-md w-full mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Регистрация
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Создайте новый аккаунт</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Имя пользователя</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field text-sm sm:text-base"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Имя</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Фамилия</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field text-sm sm:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Класс</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                required
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Буква</label>
              <select
                name="level_letter"
                value={formData.level_letter}
                onChange={handleChange}
                className="input-field text-sm sm:text-base"
                required
              >
                {['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field text-sm sm:text-base pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">Подтвердите пароль</label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                className="input-field text-sm sm:text-base pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label={showPasswordConfirm ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPasswordConfirm ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

