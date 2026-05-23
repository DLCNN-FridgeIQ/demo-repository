import { useState } from 'react';
import { authService } from '@/services/authService';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());

  const login = async (username: string, password: string): Promise<void> => {
    await authService.login(username, password);
    setIsAuthenticated(true);
  };

  const register = async (name: string, username: string, password: string): Promise<void> => {
    await authService.register(name, username, password);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, register, logout };
}
