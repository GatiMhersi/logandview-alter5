import { useState, useEffect } from 'react';
import { loginUser } from '../services/authService';
import { LoginCredentials, AuthResponse } from '../types';
import { useAuthStore } from '../store/authStore'; // Importa el estado global de Zustand
import { fetchUserData } from '../services/getUserWithToken';


export const useAuth = () => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { login: loginFromStore } = useAuthStore(); // Usamos el login de Zustand para guardar el token en el estado global

  // Verifica si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      fetchUserDataFromToken(); // Llama al servicio para obtener los datos del usuario      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función que obtiene los datos del usuario con el token guardado
  const fetchUserDataFromToken = async () => {
    try {
      const userData = await fetchUserData(); // Llama al servicio para obtener los datos del usuario
      loginFromStore(userData); // Guarda el token en el estado global de Zustand
      setAuthData(userData); // Guarda los datos del usuario en el estado
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to fetch user data'); // En caso de error, muestra un mensaje
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);
      setAuthData(response);
      localStorage.setItem('authToken', response.accessToken);  // Guarda el token
      setIsAuthenticated(true);  // Usuario autenticado
      fetchUserDataFromToken(); // Llama al servicio para obtener los datos del usuario después de hacer login
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsAuthenticated(false); // Si el login falla, se asegura que esté marcado como no autenticado
    } finally {
      setLoading(false);
    }
  };

  return {
    authData,
    login,
    error,
    loading,
    isAuthenticated,  // Exponemos el estado de autenticación
  };
};
