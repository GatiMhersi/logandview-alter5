'use client'
import React, { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/features/users/store/authStore"; // Importa el store de Zustand
import Image from "next/image";
import { useAuth } from "@/features/users/hooks/useAuth";

// Define los props que aceptará el layout
interface DashboardLayoutProps {
  children: ReactNode; // Representa el contenido principal del layout
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Obtener los datos del usuario autenticado desde el store
  const { fetchUserDataFromToken } = useAuth();
  const { userData } = useAuthStore();

  useEffect(() => {
    const fetchWithToken = async () => {
      await fetchUserDataFromToken();
    };
    fetchWithToken();
  }, []);

  // Mostrar un estado de carga mientras `userData` es null
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
        {/* Información del usuario */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Image
            src={userData.image || ""} // Usa el avatar del usuario
            alt="Avatar del usuario"
            width={40} // Ancho de la imagen
            height={40} // Alto de la imagen
            className="rounded-full" // Clases de Tailwind para darle estilo
            priority // Opcional: para cargarla con prioridad
          />
          {/* Nombre y correo */}
          <div>
            <p className="text-sm font-medium">{userData.firstName || "Usuario Anónimo"}</p>
            <p className="text-xs text-gray-300">{userData.email || "email@example.com"}</p>
          </div>
        </div>

        {/* Título del header */}
        <h1 className="text-lg font-bold">Dashboard</h1>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>

      {/* Footer opcional */}
      <footer className="bg-gray-800 text-white p-4 text-center">© 2024 - Mi Aplicación</footer>
    </div>
  );
};

export default DashboardLayout;
