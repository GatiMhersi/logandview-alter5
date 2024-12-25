import { useState, useEffect } from 'react';
import { loginUser } from '../services/authService';
import { LoginCredentials, AuthResponse } from '../types';
import { useAuthStore } from '../store/authStore'; // Estado global con Zustand
import { fetchUserData } from '../services/getUserWithToken';


/**
 * Hook personalizado para gestionar la autenticación de usuarios.
 * Incluye lógica para login, verificación de token y manejo de errores.
 */
export const useAuth = () => {
  // Estado local del hook
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Función del estado global (Zustand)
  const { login: saveToStore } = useAuthStore();

  /**
   * Al cargar el hook, verifica si hay un token en el almacenamiento local.
   * Si existe, intenta obtener los datos del usuario.
   */
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      fetchUserDataFromToken();
    }
  }, []);

  /**
   * Obtiene los datos del usuario utilizando el token almacenado.
   * Guarda los datos en el estado global y local.
   */
  const fetchUserDataFromToken = async () => {
    try {
      const userData = await fetchUserData(); // Servicio para obtener datos del usuario
      saveToStore(userData); // Guarda los datos del usuario en Zustand
      setAuthData(userData); // Guarda los datos en el estado local
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
        error.message ;
        handleError(errorMessage);
      } else {
        const errorMessage = 'An unexpected error occurred while logging in.';
        handleError(errorMessage);
      }
    }
  };

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param credentials Credenciales del usuario (username, password)
   */
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials); // Servicio de autenticación
      localStorage.setItem('authToken', response.accessToken); // Guarda el token en localStorage
      setAuthData(response); // Actualiza los datos de autenticación
      setIsAuthenticated(true); // Marca al usuario como autenticado
      await fetchUserDataFromToken(); // Obtiene los datos del usuario
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMessage =
        error.message ;
        handleError(errorMessage);
        setIsAuthenticated(false);
      } else {
        const errorMessage = 'An unexpected error occurred while logging in.';
        handleError(errorMessage);
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja errores actualizando el estado de error.
   * @param message Mensaje de error a mostrar
   */
  const handleError = (message: string) => {
    setError(message);
  };

  /**
   * Devuelve las funciones y estados del hook para usarlos en el componente.
   */
  return {
    authData,
    login,
    error,
    loading,
    isAuthenticated,
    fetchUserDataFromToken,
  };
};
