import { useState, useEffect } from 'react';
import { loginUser } from '../services/authService';
import { LoginCredentials, AuthResponse } from '../types';
import { useAuthStore } from '../store/authStore'; // Estado global con Zustand
import { fetchUserData } from '../services/getUserWithToken';

export const useAuth = () => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { login: saveToStore } = useAuthStore();

  /**
   * Verifica el token y autentica automáticamente si es válido.
   */
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      initializeAuth(); // Auto-login si ya hay un token almacenado
    }
  }, []);

  /**
   * Inicializa la autenticación verificando el token.
   */
  const initializeAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return; // Si no hay token, no hacer nada

    try {
      setLoading(true);
      const userData = await fetchUserData(); // Obtiene los datos del usuario
      saveToStore(userData); // Guarda los datos en Zustand
      setAuthData(userData); // Actualiza el estado local
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error.message); // Usa el mensaje del error
      } else {
        handleError('Error verifying token.'); // Mensaje genérico si el error no tiene mensaje
      }
      setIsAuthenticated(false);
      localStorage.removeItem('authToken'); // Limpia el token inválido
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia sesión con las credenciales proporcionadas.
   */
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);
      localStorage.setItem('authToken', response.accessToken);
      setAuthData(response);
      setIsAuthenticated(true);
      await initializeAuth(); // Obtiene los datos del usuario tras iniciar sesión
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleError(error.message); // Usa el mensaje del error
      } else {
        handleError('Error during login.'); // Mensaje genérico si el error no tiene mensaje
      }
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja errores actualizando el estado de error.
   */
  const handleError = (message: string) => {
    setError(message);
  };

  return {
    authData,
    login,
    error,
    loading,
    isAuthenticated,
    initializeAuth, // Permite inicializar manualmente si es necesario
  };
};
