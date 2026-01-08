import React, { useEffect, useState } from 'react';
import { setTheme, getTheme } from '../utils/theme';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => getTheme());

  useEffect(() => {
    // Обновляем состояние при монтировании
    setIsDark(getTheme());
    
    // Слушаем изменения localStorage (если тема меняется в другой вкладке)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const newTheme = e.newValue === 'dark';
        setTheme(newTheme);
        setIsDark(newTheme);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const currentIsDark = getTheme();
    const newIsDark = !currentIsDark;
    setTheme(newIsDark);
    setIsDark(newIsDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;

