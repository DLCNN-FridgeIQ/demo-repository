import { apiClient } from './api';

const TOKEN_KEY = 'fridgiq_token';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  async login(username: string, password: string): Promise<void> {
    const data = await apiClient.post<TokenResponse>('/auth/login', { username, password });
    localStorage.setItem(TOKEN_KEY, data.access_token);
  },

  async register(name: string, username: string, password: string): Promise<void> {
    const data = await apiClient.post<TokenResponse>('/auth/register', { name, username, password });
    localStorage.setItem(TOKEN_KEY, data.access_token);
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
