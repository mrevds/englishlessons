import apiClient from './client';

export type Achievement = {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

export const achievementsAPI = {
  getMyAchievements: async (): Promise<Achievement[]> => {
    const response = await apiClient.get('/achievements/me');
    return response.data;
  },
};

