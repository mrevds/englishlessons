import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import { BarChart3, User, Trophy, Menu, X, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<string>(i18n.language || 'ru');
  const [isMobileLangDropdownOpen, setIsMobileLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLang(lng);
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileLangDropdownOpen && !(event.target as Element).closest('.mobile-language-dropdown')) {
        setIsMobileLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileLangDropdownOpen]);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      console.log('Language changed to:', lng);
    } catch (e) {
      console.error('Error changing language:', e);
    }
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
            <div className="hidden md:flex items-center gap-1 sm:gap-2 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-sm">
              <button
                onClick={() => navigate('/games/leaderboard')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg hover:from-yellow-600 hover:to-orange-600 flex items-center gap-1 font-semibold shadow-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105"
              >
                <Trophy className="w-3 h-3" />
                <span className="hidden lg:inline">{t('nav.leaderboard')}</span>
              </button>
              {/* <button
                onClick={() => navigate('/games')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center gap-1 font-semibold shadow-lg text-xs sm:text-sm"
              >
                <Gamepad2 className="w-3 h-3" />
                <span className="hidden lg:inline">ИГРЫ</span>
              </button> */}
              {user?.role === 'student' && (
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 text-xs sm:text-sm transition-colors duration-200"
                >
                  <User className="w-3 h-3" />
                  <span className="hidden lg:inline">{t('nav.profile')}</span>
                </button>
              )}
              <ThemeToggle />

              <div className="ml-1">
                <select
                  value={lang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="px-2 py-1 text-xs sm:text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="ru">🇷🇺 RU</option>
                  <option value="uz-latn">🇺🇿 UZ</option>
                </select>
              </div>

              <button onClick={logout} className="btn-secondary text-xs sm:text-sm px-2 py-1 transition-all duration-200 hover:scale-105">
                {t('nav.logout')}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out">
              {/* <button
                onClick={() => { navigate('/games'); setMobileMenuOpen(false); }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <Gamepad2 className="w-5 h-5" />
                ИГРЫ
              </button> */}
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
                <div className="relative mobile-language-dropdown mb-3">
                  <button
                    onClick={() => setIsMobileLangDropdownOpen(!isMobileLangDropdownOpen)}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    {lang === 'ru' ? '🇷🇺 RU' : '🇺🇿 UZ'}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isMobileLangDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => { i18n.changeLanguage('ru'); setIsMobileLangDropdownOpen(false); setMobileMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        🇷🇺 RU
                      </button>
                      <button
                        onClick={() => { i18n.changeLanguage('uz-latn'); setIsMobileLangDropdownOpen(false); setMobileMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        🇺🇿 UZ
                      </button>
                    </div>
                  )}
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

