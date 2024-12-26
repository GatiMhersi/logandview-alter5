'use client'
import React, { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/features/users/store/authStore"; // Importa el store de Zustand para acceder a los datos de autenticación
import Image from "next/image";
import { useAuth } from "@/features/users/hooks/useAuth";
import { UserData } from "@/features/users/types";

// Definición de los tipos de los props que recibirá el layout
interface DashboardLayoutProps {
  children: ReactNode; // Representa el contenido principal que se mostrará en el layout
}

/**
 * Componente que representa la estructura principal del Dashboard.
 * Incluye el encabezado, el contenido principal y el pie de página.
 * Se encarga de gestionar la visualización de los datos del usuario autenticado.
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Obtener la función de inicialización de la autenticación y los datos del usuario
  const { initializeAuth } = useAuth();
  const { userData } = useAuthStore();

  // Efecto para inicializar la autenticación al cargar el componente
  useEffect(() => {
    const fetchWithToken = async () => {
      await initializeAuth(); // Inicializa la autenticación
    };
    fetchWithToken(); // Llama a la función al montar el componente
  }, []);

  // Mostrar un estado de carga mientras `userData` es null
  if (!userData) {
    return <LoadingState />; // Muestra un componente de carga mientras se obtienen los datos
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header del layout */}
      <Header userData={userData} />

      {/* Contenido principal donde se renderizan los children */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>

      {/* Footer opcional */}
      <Footer />
    </div>
  );
};

/**
 * Componente que muestra un estado de carga mientras se espera la información del usuario.
 */
const LoadingState: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <p className="text-lg font-medium text-gray-700">Cargando usuario...</p>
  </div>
);

/**
 * Componente que muestra el encabezado del layout, incluyendo la información del usuario.
 */
const Header: React.FC<{ userData: UserData }> = ({ userData }) => (
  <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
    {/* Información del usuario */}
    <div className="flex items-center space-x-4">
      {/* Avatar del usuario */}
      <Image
        src={userData.image || ""} // Usamos la imagen del usuario si está disponible
        alt="Avatar del usuario"
        width={40} // Ancho de la imagen
        height={40} // Alto de la imagen
        className="rounded-full" // Clases de Tailwind para darle estilo
        priority // Carga la imagen con alta prioridad
      />
      {/* Nombre y correo del usuario */}
      <div>
        <p className="text-sm font-medium">{userData.firstName || "Usuario Anónimo"}</p>
        <p className="text-xs text-gray-300">{userData.email || "email@example.com"}</p>
      </div>
    </div>

    {/* Título del Dashboard */}
    <h1 className="text-lg font-bold">Dashboard</h1>
  </header>
);

/**
 * Componente que muestra el pie de página del layout.
 */
const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    © 2024 - Mi Aplicación
  </footer>
);

export default DashboardLayout;
