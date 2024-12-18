'use client'
// pages/App.tsx
import React from 'react';
import { useAuthStore } from '@/features/users/store/authStore';  // Importa el store de Zustand
import AuthForm from '@/features/users/components/auth';
import UserProfile from '@/features/users/components/basicInfoAuthUser';


const App: React.FC = () => {
  const { userData } = useAuthStore(); // Obtener authData del store global
  

  return (
    <div className="App">
      {!userData ? (
        <AuthForm /> // Si no hay authData, mostrar el formulario de login
      ) : (
        <UserProfile /> // Si hay authData, mostrar el perfil del usuario
      )}
    </div>
  );
};

export default App;
