// Утилита для управления темой
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const html = document.documentElement;
  
  // ВСЕГДА сначала удаляем класс dark
  html.classList.remove('dark');
  
  // Применяем тему только если явно указано 'dark'
  if (savedTheme === 'dark') {
    html.classList.add('dark');
    console.log('[Theme] Applied dark theme from localStorage');
  } else if (savedTheme === 'light') {
    // Явно светлая тема - класс dark уже удален
    console.log('[Theme] Applied light theme from localStorage');
  } else if (!savedTheme) {
    // Если тема не сохранена, проверяем системную
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      html.classList.add('dark');
      console.log('[Theme] Applied dark theme from system preference');
    } else {
      console.log('[Theme] Applied light theme from system preference');
    }
  }
};

export const setTheme = (isDark: boolean) => {
  const html = document.documentElement;
  
  // ВСЕГДА сначала удаляем класс
  html.classList.remove('dark');
  
  if (isDark) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // Класс уже удален выше - явно убеждаемся что его нет
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  
  // Проверка что класс правильно применен
  const hasDark = html.classList.contains('dark');
  if (hasDark !== isDark) {
    console.error('[Theme] Mismatch detected! Expected:', isDark, 'Got:', hasDark);
    // Принудительно исправляем
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
};

export const getTheme = (): boolean => {
  return document.documentElement.classList.contains('dark');
};

