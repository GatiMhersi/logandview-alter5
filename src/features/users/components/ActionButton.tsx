import React from 'react';
import Link from 'next/link';

const ActionButtons: React.FC = () => {
  return (
    <div className="mt-6 flex justify-center space-x-4 text-center">
      {/* Botón que redirige a la página de configuración */}
      <Link 
        href="/profile" 
        className="bg-blue-600 hover:bg-blue-700 text-white w-36 h-10 rounded-lg transition duration-200 flex items-center justify-center"
      >
        Profile Info
      </Link>

      {/* Botón que redirige al Dashboard */}
      <Link 
        href="/products" 
        className="bg-green-600 hover:bg-green-700 text-white w-36 h-10 rounded-lg transition duration-200 flex items-center justify-center"
      >
        View Products
      </Link>
    </div>
  );
};

export default ActionButtons;
