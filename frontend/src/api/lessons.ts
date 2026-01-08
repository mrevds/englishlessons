import apiClient from './client';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  order: number;
  is_active: boolean;
  questions_count?: number;
  progress?: {
    best_percentage: number;
    is_completed: boolean;
    attempts_count: number;
  };
  questions?: Question[];
  is_accessible?: boolean;
  created_at: string;
}

export interface Question {
  id: number;
  text: string;
  order: number;
  answer_options: AnswerOption[];
}

export interface AnswerOption {
  id: number;
  text: string;
  order: number;
  is_correct?: boolean;
}

export interface TestSubmission {
  lesson_id: number;
  answers: Record<string, number>;
}

export interface TestAttempt {
  id: number;
  user_id: number;
  lesson_id: number;
  score: number;
  percentage: number;
  total_questions: number;
  correct_answers: number;
  is_passed: boolean;
  created_at: string;
}

export interface LessonProgress {
  id: number;
  user_id: number;
  lesson_id: number;
  best_score: number;
  best_percentage: number;
  attempts_count: number;
  is_completed: boolean;
  completed_at: string | null;
  last_attempt_at: string;
}

export const lessonsAPI = {
  getLessons: async (): Promise<Lesson[]> => {
    const response = await apiClient.get('/lessons');
    return response.data;
  },

  getLesson: async (id: number): Promise<Lesson> => {
    const response = await apiClient.get(`/lessons/${id}`);
    return response.data;
  },

  getLessonQuestions: async (id: number): Promise<Question[]> => {
    const response = await apiClient.get(`/lessons/${id}/questions`);
    return response.data;
  },

  submitTest: async (data: TestSubmission): Promise<TestAttempt> => {
    const response = await apiClient.post('/lessons/submit-test', data);
    return response.data;
  },

  getMyProgress: async (): Promise<LessonProgress[]> => {
    const response = await apiClient.get('/lessons/my-progress');
    return response.data;
  },

  getMyStats: async () => {
    const response = await apiClient.get('/users/stats/me');
    return response.data;
  },
};
