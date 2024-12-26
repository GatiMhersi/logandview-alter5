import { create } from 'zustand';
import Cookies from 'js-cookie';
import { UserData } from '../types'; // Interfaz o tipo de datos del usuario

/**
 * Estado global para gestionar la autenticación del usuario.
 */
interface AuthState {
  userData: UserData | null; // Datos del usuario autenticado o null si no está autenticado
  login: (user: UserData) => void; // Función para iniciar sesión y establecer datos del usuario
  logout: () => void; // Función para cerrar sesión
}

/**
 * Hook para gestionar el estado de autenticación del usuario.
 */
export const useAuthStore = create<AuthState>((set) => ({
  /**
   * Estado inicial del usuario:
   * - userData: null significa que no hay usuario autenticado.
   */
  userData: null,

  /**
   * Método para iniciar sesión:
   * - Guarda los datos del usuario en el estado global.
   *
   * @param user - Información del usuario que inició sesión.
   */
  login: (user) => {
    set({ userData: user }); // Establecemos los datos del usuario al iniciar sesión
  },

  /**
   * Método para cerrar sesión:
   * - Limpia el estado global de la información del usuario.
   * - Elimina el token del localStorage y la cookie.
   */
  logout: () => {
    // Limpia el estado global
    set({ userData: null }); 

    // Elimina el token del localStorage
    localStorage.removeItem('authToken'); 

    // Elimina la cookie de autenticación
    Cookies.remove('authToken'); 
  },
}));
