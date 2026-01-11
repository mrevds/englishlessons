import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import { BarChart3, User, Trophy, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
                {t('nav.siteTitle')}
              </button>
              {user?.role === 'teacher' && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 items-center gap-2 text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  {t('nav.dashboard')}
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
                <span className="hidden lg:inline">{t('nav.leaderboard')}</span>
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
                  <span className="hidden lg:inline">{t('nav.profile')}</span>
                </button>
              )}
              <ThemeToggle />

              <div className="ml-2">
                <div role="tablist" aria-label={t('nav.languageSelector')} className="inline-flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i18n.language === 'ru'}
                    onClick={() => changeLanguage('ru')}
                    className={`px-3 py-1 text-sm ${i18n.language === 'ru' ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'bg-transparent'}`}
                  >
                    {t('nav.lang_ru')}
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i18n.language === 'uz-latn' || (i18n.language || '').startsWith('uz')}
                    onClick={() => changeLanguage('uz-latn')}
                    className={`px-3 py-1 text-sm ${i18n.language === 'uz-latn' || (i18n.language || '').startsWith('uz') ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'bg-transparent'}`}
                  >
                    {t('nav.lang_uz')}
                  </button>
                </div>
              </div>

              <button onClick={logout} className="btn-secondary text-xs sm:text-sm py-2 px-3">
                {t('nav.logout')}
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
                {t('nav.gamesLeaderboard')}
              </button>
              {user?.role === 'teacher' && (
                <button
                  onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  {t('nav.dashboard')}
                </button>
              )}
              {user?.role === 'student' && (
                <button
                  onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  {t('nav.profile')}
                </button>
              )}
              <div className="px-4">
                <div className="w-full inline-flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 mb-3">
                  <button
                    type="button"
                    onClick={() => { changeLanguage('ru'); setMobileMenuOpen(false); }}
                    className={`flex-1 px-3 py-2 text-sm ${i18n.language === 'ru' ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'bg-transparent'}`}
                  >
                    {t('nav.lang_ru')}
                  </button>
                  <button
                    type="button"
                    onClick={() => { changeLanguage('uz-latn'); setMobileMenuOpen(false); }}
                    className={`flex-1 px-3 py-2 text-sm ${i18n.language === 'uz-latn' || (i18n.language || '').startsWith('uz') ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'bg-transparent'}`}
                  >
                    {t('nav.lang_uz')}
                  </button>
                </div>

                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full btn-secondary"
                >
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;

