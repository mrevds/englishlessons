import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Gamepad2, Target, Puzzle, Brain, Zap, Trophy } from 'lucide-react';

const games = [
  {
    id: 'grammar-detective',
    title: 'Grammar Detective',
    description: 'Найди ошибку в предложении',
    icon: Target,
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    description: 'Собери предложение из слов',
    icon: Puzzle,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'memory-cards',
    title: 'Memory Cards',
    description: 'Найди пары слово-перевод',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'fill-gap-race',
    title: 'Fill the Gap Race',
    description: 'Вставь пропущенное слово',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'quiz-show',
    title: 'Quiz Show',
    description: 'Ответь на вопросы викторины',
    icon: Trophy,
    color: 'from-green-500 to-emerald-500',
  },
];

const GamesPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const levels = [
    { value: 0, label: 'Level 0 - Beginner', description: 'Базовые артикли, множественное число' },
    { value: 1, label: 'Level 1 - Beginner+', description: 'Исчисляемые/неисчисляемые, местоимения' },
    { value: 2, label: 'Level 2 - Elementary', description: 'Present Simple, базовые времена' },
    { value: 3, label: 'Level 3 - Elementary+', description: 'Present Continuous, притяжательные' },
    { value: 4, label: 'Level 4 - Pre-Intermediate', description: 'Past Simple, Past Continuous' },
    { value: 5, label: 'Level 5 - Pre-Intermediate+', description: 'Present Perfect, сравнения' },
    { value: 6, label: 'Level 6 - Intermediate', description: 'Past Perfect, Future tenses' },
    { value: 7, label: 'Level 7 - Intermediate+', description: 'Модальные глаголы, условные предложения' },
    { value: 8, label: 'Level 8 - Upper-Intermediate', description: 'Пассивный залог, фразовые глаголы' },
    { value: 9, label: 'Level 9 - Advanced', description: 'Косвенная речь, сложные структуры' },
    { value: 10, label: 'Level 10 - Proficiency', description: 'Все грамматические конструкции' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('games.title')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg">
            {t('games.subtitle')}
          </p>
        </div>

        {/* Level Selector */}
        <div className="mb-6 sm:mb-8 card p-4 sm:p-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 sm:mb-3 text-sm sm:text-lg">
            {t('games.selectLabel')}
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            className="input-field text-sm sm:text-lg"
          >
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}

              </option>
            ))}
          </select>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            {levels.find(l => l.value === selectedLevel)?.description}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <button
                key={game.id}
                onClick={() => navigate(`/games/${game.id}?level=${selectedLevel}`)}
                className="card p-3 sm:p-6 hover:scale-105 transition-transform duration-300 group"
              >
                <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                  <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xs sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 text-center leading-tight">
                  {t(`games.list.${game.id}.title`, { defaultValue: game.title })}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center hidden sm:block">
                  {t(`games.list.${game.id}.description`, { defaultValue: game.description })}
                </p>
              </button>
            );
          })}
        </div>

        {/* Stats placeholder */}
        <div className="mt-8 sm:mt-12 card p-4 sm:p-6 text-center">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            🏆 {t('games.statsTitle')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {t('games.statsDesc')}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;
