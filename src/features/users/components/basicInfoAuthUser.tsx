// UserProfile.tsx
import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/features/users/store/authStore';  // Importa el store de Zustand

const UserProfile: React.FC = () => {
  // Datos hardcodeados del usuario
  const { userData } = useAuthStore();

  if (!userData) {
    return <div>No user data available</div>;  // Mensaje si no hay datos de usuario
  }
  

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-lg p-6">
      {/* Imagen de perfil con Next.js Image */}
      <div className="flex justify-center mb-4">
        <Image
          src={userData.image}
          alt={`${userData.firstName} ${userData.lastName}`}
          width={96}
          height={96}
          className="rounded-full border-4 border-purple-600"
        />
      </div>

      {/* Nombre y Edad */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-purple-400">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="text-lg text-gray-400">{userData.age} years old</p>
      </div>

      {/* Información de contacto */}
      <div className="space-y-3">
        <div>
          <strong>Email: </strong>
          <span className="text-gray-300">{userData.email}</span>
        </div>
        <div>
          <strong>Phone: </strong>
          <span className="text-gray-300">{userData.phone}</span>
        </div>
      </div>

      {/* Botón de acción (Ej. Editar perfil) */}
      <div className="mt-6 flex justify-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
