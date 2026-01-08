import apiClient from './client';

export type LeaderboardEntry = {
  user_id: number;
  username: string;
  full_name: string;
  class_display: string;
  total_points: number;
  completed_lessons: number;
  average_percentage: number;
  rank: number;
}

export const leaderboardAPI = {
  getLeaderboard: async (params?: { level?: number; level_letter?: string }): Promise<LeaderboardEntry[]> => {
    const response = await apiClient.get('/leaderboard', { params });
    return response.data;
  },
};

