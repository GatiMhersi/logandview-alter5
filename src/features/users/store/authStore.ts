// features/users/store/authStore.ts
import { create } from 'zustand';
import { UserData } from '../types';


interface AuthState {
  userData: UserData | null;  // Solo almacenamos userData
  login: (user: UserData) => void;  // Modificamos login para guardar solo userData
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userData: null,  // Inicializamos userData como null
  login: (user) => {
    set({ userData: user });  // Guardamos solo los datos del usuario
  },
  logout: () => {
    set({ userData: null });  // Limpiamos solo los datos del usuario
  },
}));
