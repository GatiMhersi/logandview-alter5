'use client'
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // Mantén el useAuth para obtener el token de la API

const AuthForm: React.FC = () => {
  const { login: loginFromAuthHook } = useAuth();  // Usamos el login de useAuth para obtener el token de la API
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Guarda el token también usando el hook de autenticación para obtener datos si es necesario
      loginFromAuthHook({ username, password })
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      {/* Contenedor principal */}
      <div className="w-96 p-8 rounded-lg bg-gray-900 shadow-lg">
        {/* Título */}
        <h2 className="text-2xl text-gray-200 mb-6 text-center font-medium">
          Login
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Input de Usuario */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              required
            />
          </div>

          {/* Input de Contraseña */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              required
            />
          </div>

          {/* Mensaje de error */}
          {error && <p className="text-sm text-red-400 text-center mb-6">{error}</p>}

          {/* Botón de Inicio */}
          <button
            type="submit"
            className="w-full py-3 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors duration-200 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Enlace de recuperación */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-gray-200 transition-colors"
          >
            Forgot password?
          </a>
        </div>

        {/* Registro */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <span>Don&apos;t have an account?</span>
          <a
            href="#"
            className="ml-2 text-gray-300 hover:underline hover:text-white"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
