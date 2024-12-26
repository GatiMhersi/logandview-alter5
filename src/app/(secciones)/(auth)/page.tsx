'use client';
// pages/App.tsx

import React from 'react';
import { useAuthStore } from '@/components/users/store/authStore';  // Estado global con Zustand
import AuthForm from '@/components/users/components/auth';         // Formulario de autenticación
import UserProfile from '@/components/users/components/basicInfoAuthUser'; // Perfil del usuario autenticado

/**
 * Componente principal de la aplicación. 
 * Muestra un formulario de autenticación o el perfil del usuario dependiendo del estado de autenticación.
 */
const Login: React.FC = () => {
  const { userData } = useAuthStore(); // Obtener los datos del usuario autenticado desde el store

  // Renderizado condicional basado en el estado de autenticación
  return (
    <div className="app-container">
      {userData ? (
        <UserProfile />
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default Login;
