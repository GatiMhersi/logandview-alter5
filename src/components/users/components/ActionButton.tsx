import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore'; // Importa el hook de Zustand para logout

const ActionButtons: React.FC = () => {
  // Llamada a la función de logout desde Zustand
  const { logout } = useAuthStore.getState();

  // Función para manejar el logout
  const handleLogout = () => {
    logout(); // Llama a la función logout de Zustand
    // Puedes redirigir al usuario a la página de inicio o login después del logout
    window.location.href = '/'; // Redirige a la página de inicio (o a cualquier página que desees)
  };

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

      {/* Botón de logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white w-36 h-10 rounded-lg transition duration-200 flex items-center justify-center"
      >
        Logout
      </button>
    </div>
  );
};

export default ActionButtons;
