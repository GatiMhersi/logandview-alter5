// features/users/hooks/useAuth.ts

import { useState } from 'react';
import { loginUser } from '../services/authService';
import { LoginCredentials, AuthResponse } from '../types';

export const useAuth = () => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);
      setAuthData(response);
      localStorage.setItem('authToken', response.accessToken);  // Guarda el token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    authData,
    login,
    error,
    loading,
  };
};
