'use client';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthForm: React.FC = () => {
  const {initializeAuth, login: loginFromAuthHook, error: errorHook, loading } = useAuth(); // Hook personalizado para autenticación
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username || !password) {
      alert('Username and password are required.');
      return;
    }
  
    await loginFromAuthHook({ username, password });
    initializeAuth(); // Llama a initializeAuth después de iniciar sesión
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-96 p-8 rounded-lg bg-gray-900 shadow-lg">
        <h2 className="text-2xl text-gray-200 mb-6 text-center font-medium">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
              required
            />
          </div>
          {/* Mostrar el mensaje de error del hook */}
          {errorHook && (
            <p className="text-sm text-red-400 text-center mb-6">
              {errorHook}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors duration-200 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-gray-400 text-sm hover:text-gray-200 transition-colors"
          >
            Forgot password?
          </a>
        </div>
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
