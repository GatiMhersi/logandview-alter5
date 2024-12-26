import React from 'react';
import { UserData } from '../types';  // Asegúrate de tener el tipo definido en un archivo adecuado

// Tipo para las propiedades del componente
interface UserInfoProps {
  userData: UserData;
}

const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-2xl font-semibold text-purple-400">
        {userData.firstName} {userData.lastName}
      </h2>
      <p className="text-lg text-gray-400">{userData.age} years old</p>

      {/* Información de contacto */}
      <div className="space-y-3 mt-4">
        <div>
          <strong>Email: </strong>
          <span className="text-gray-300">{userData.email}</span>
        </div>
        <div>
          <strong>Phone: </strong>
          <span className="text-gray-300">{userData.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
