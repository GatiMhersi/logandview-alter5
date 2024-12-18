// features/users/types.ts

export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;  // Este campo es opcional, para la duración de la sesión
}

export interface AuthResponse {
  accessToken: string;
  username: string;
  expiresIn: number;
  // Otros datos relevantes como roles, etc.
}
