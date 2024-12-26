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
      const errorData = await response.json();
      const errorMessage =
        errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data; // Devuelve la respuesta con el token y la información del usuario
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage =
      error.message ;
      throw new Error(errorMessage);
    } else {
      const errorMessage = 'An unexpected error occurred while logging in.';
      throw new Error(errorMessage);
    }

    // Lanza un error más informativo
    
  }
};
