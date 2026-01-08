import apiClient from './client';

// Типы
export type GameResult = {
  id: number;
  user_id: number;
  game_type: string;
  level: number;
  score: number;
  max_score: number;
  percentage: number;
  time_spent: number;
  correct_count: number;
  total_count: number;
  created_at: string;
  user?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
};

export type GameStats = {
  game_type: string;
  level: number;
  total_attempts: number;
  best_score: number;
  best_percentage: number;
  avg_score: number;
  avg_percentage: number;
  avg_time: number;
  last_played: string | null;
};

export type GameSummary = {
  total_games: number;
  total_time: number;
  avg_percentage: number;
  games_played: Record<string, number>;
  levels_completed: number;
};

export type ClassGameStats = {
  user_id: number;
  username: string;
  full_name: string;
  total_games: number;
  avg_percentage: number;
  total_time: number;
  best_score: number;
  favorite_game: string;
  last_activity: string | null;
};

export type SubmitGameResultRequest = {
  game_type: string;
  level: number;
  score: number;
  max_score: number;
  time_spent: number;
  correct_count: number;
  total_count: number;
};

// Названия игр для отображения
export const gameNames: Record<string, string> = {
  'grammar-detective': 'Grammar Detective',
  'sentence-builder': 'Sentence Builder',
  'memory-cards': 'Memory Cards',
  'fill-gap-race': 'Fill Gap Race',
  'quiz-show': 'Quiz Show',
};

// Названия уровней
export const levelNames: Record<number, string> = {
  0: 'Beginner',
  1: 'Beginner+',
  2: 'Elementary',
  3: 'Elementary+',
  4: 'Pre-Intermediate',
  5: 'Pre-Intermediate+',
  6: 'Intermediate',
  7: 'Intermediate+',
  8: 'Upper-Intermediate',
  9: 'Advanced',
  10: 'Proficiency',
};

export const gamesAPI = {
  // Сохранить результат игры
  submitResult: async (data: SubmitGameResultRequest): Promise<GameResult> => {
    const response = await apiClient.post('/games/results', data);
    return response.data;
  },

  // Получить свои результаты
  getMyResults: async (gameType?: string, level?: number): Promise<GameResult[]> => {
    const params: any = {};
    if (gameType) params.game_type = gameType;
    if (level !== undefined) params.level = level;
    const response = await apiClient.get('/games/results', { params });
    return response.data;
  },

  // Получить свою статистику
  getMyStats: async (): Promise<GameStats[]> => {
    const response = await apiClient.get('/games/stats');
    return response.data;
  },

  // Получить сводку
  getMySummary: async (): Promise<GameSummary> => {
    const response = await apiClient.get('/games/summary');
    return response.data;
  },

  // Получить лучший результат
  getBestResult: async (gameType: string, level: number): Promise<GameResult | null> => {
    const response = await apiClient.get('/games/best', {
      params: { game_type: gameType, level },
    });
    return response.data;
  },

  // Получить рейтинг по игре
  getLeaderboard: async (gameType: string, level: number, limit = 10): Promise<GameResult[]> => {
    const response = await apiClient.get('/games/leaderboard', {
      params: { game_type: gameType, level, limit },
    });
    return response.data;
  },

  // Для учителя: статистика класса
  getClassStats: async (level?: number, levelLetter?: string): Promise<ClassGameStats[]> => {
    const params: any = {};
    if (level !== undefined) params.level = level;
    if (levelLetter) params.level_letter = levelLetter;
    const response = await apiClient.get('/games/class-stats', { params });
    return response.data;
  },

  // Для учителя: последние результаты
  getRecentResults: async (limit = 20, level?: number, levelLetter?: string): Promise<GameResult[]> => {
    const params: any = { limit };
    if (level !== undefined) params.level = level;
    if (levelLetter) params.level_letter = levelLetter;
    const response = await apiClient.get('/games/recent', { params });
    return response.data;
  },

  // Для учителя: статистика студента
  getStudentStats: async (studentId: number): Promise<{ stats: GameStats[]; summary: GameSummary }> => {
    const response = await apiClient.get(`/games/student/${studentId}/stats`);
    return response.data;
  },
};
