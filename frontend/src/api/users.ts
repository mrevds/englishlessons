import apiClient from './client';

export interface Student {
  id: number;
  username: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  class_display: string;
  level: number | null;
  level_letter: string;
}

export interface StudentStats {
  total_points: number;
  completed_lessons: number;
  average_percentage: number;
  total_attempts: number;
  lessons_detail: Array<{
    lesson_id: number;
    lesson_title: string;
    lesson_order: number;
    best_percentage: number;
    best_score: number;
    attempts: number;
    is_completed: boolean;
    last_attempt: string | null;
    completed_at: string | null;
  }>;
}

export const usersAPI = {
  getStudents: async (params?: { level?: number; level_letter?: string }): Promise<Student[]> => {
    const response = await apiClient.get('/users/students', { params });
    return response.data;
  },

  getStudentStats: async (studentId: number): Promise<StudentStats> => {
    const response = await apiClient.get(`/users/stats/${studentId}`);
    return response.data;
  },

  resetStudentPassword: async (username: string): Promise<{ message: string; username: string; new_password: string }> => {
    const response = await apiClient.post('/users/reset-password', { username });
    return response.data;
  },

  updateProfile: async (data: { email?: string; level?: number; level_letter?: string }): Promise<{ message: string }> => {
    const response = await apiClient.put('/users/profile', data);
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.put('/users/password', { old_password: oldPassword, new_password: newPassword });
    return response.data;
  },
};

export const analyticsAPI = {
  getClassActivity: async (days?: number): Promise<{ period: { start_date: string; end_date: string; days: number }; stats: Array<{ level: number | null; level_letter: string; class_display: string; count: number; date: string }> }> => {
    const params: any = {};
    if (days) params.days = days;
    const response = await apiClient.get('/analytics/activity', { params });
    return response.data;
  },
};

