import React from 'react';
import { useAuthStore } from '@/features/users/store/authStore'; // Importa el store de Zustand
import ProfileImage from './ProfileImage';
import UserInfo from './UserInfo';
import ActionButtons from './ActionButton';

// Componente principal que renderiza el perfil del usuario
const UserProfile: React.FC = () => {
  const { userData } = useAuthStore(); // Obtenemos los datos del usuario desde el store

  if (!userData) {
    return <div>No user data available</div>; // Mensaje si no hay datos de usuario
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-lg p-6">
        {/* Componente de Imagen de perfil */}
        <ProfileImage imageUrl={userData.image} fullName={`${userData.firstName} ${userData.lastName}`} />

        {/* Componente de Información del Usuario */}
        <UserInfo userData={userData} />

        {/* Componente de Botón de acción (Ej. Editar perfil) */}
        <ActionButtons />
      </div>
    </div>
  );
};

export default UserProfile;
