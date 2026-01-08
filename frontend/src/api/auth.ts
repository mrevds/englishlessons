import apiClient from './client';

export interface RegisterData {
  username: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  email: string;
  level: number;
  level_letter: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export const authAPI = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/users/register', data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post('/token', data);
    const tokens: TokenResponse = response.data;
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    return tokens;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  getMe: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },
};

