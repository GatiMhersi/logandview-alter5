// features/users/services/authService.ts

import { LoginCredentials, AuthResponse } from '../types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch('https://dummyjson.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials or server error');
    }

    const data = await response.json();
    return data;  // Aquí devuelves la respuesta que contiene el token y la información del usuario
  } catch (error) {
    console.error('Login error:', error);
    throw error;  // Lanza el error para que pueda ser manejado por el hook o componente
  }
};
