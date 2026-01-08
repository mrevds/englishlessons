import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { BarChart3, User, Gamepad2, Trophy, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900 mb-4 sm:mb-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate('/lessons')}
                className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                English Lessons
              </button>
              {user?.role === 'teacher' && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 items-center gap-2 text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  Дашборд
                </button>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => navigate('/games/leaderboard')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 lg:px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 flex items-center gap-1 lg:gap-2 font-semibold shadow-lg text-sm"
              >
                <Trophy className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden lg:inline">Рейтинг</span>
              </button>
              {/* <button
                onClick={() => navigate('/games')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 lg:px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center gap-1 lg:gap-2 font-semibold shadow-lg text-sm"
              >
                <Gamepad2 className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden lg:inline">ИГРЫ</span>
              </button> */}
              {user?.role === 'student' && (
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 text-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Профиль</span>
                </button>
              )}
              <ThemeToggle />
              <button onClick={logout} className="btn-secondary text-xs sm:text-sm py-2 px-3">
                Выйти
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              {/* <button
                onClick={() => { navigate('/games'); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <Gamepad2 className="w-5 h-5" />
                ИГРЫ
              </button> */}
              <button
                onClick={() => { navigate('/games/leaderboard'); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <Trophy className="w-5 h-5" />
                Рейтинг игр
              </button>
              {user?.role === 'teacher' && (
                <button
                  onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Дашборд
                </button>
              )}
              {user?.role === 'student' && (
                <button
                  onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Профиль
                </button>
              )}
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full btn-secondary"
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;

