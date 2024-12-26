'use client'
import React from "react";
import { useAuthStore } from "@/components/users/store/authStore"; // Importa el store de Zustand
import { useAuth } from "@/components/users/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

const UserProfile: React.FC = () => {
  const { initializeAuth } = useAuth()
  const { userData } = useAuthStore();

  if(!userData){
    return(
      <h1>cargando...</h1>
    )
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-8 border border-gray-300">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Image
              src={userData.image}
              alt={`${userData.firstName} ${userData.lastName}`}
              className="rounded-full object-cover border-4 border-gray-300"
              width={128} // Ancho de la imagen (equivalente a w-32)
              height={128} // Alto de la imagen (equivalente a h-32)
              layout="intrinsic" // Esto mantiene las proporciones originales de la imagen
            />
            <div className="flex-1">
              <h1 className="text-3xl font-serif text-gray-800">
                {userData.firstName} {userData.lastName}{" "}
                <span className="text-gray-600 text-sm">
                  ({userData.maidenName})
                </span>
              </h1>
              <p className="text-gray-600">{userData.role.toUpperCase()}</p>
            </div>
          </div>

          {/* Information Sections */}
          <div className="mt-8 space-y-6">
            {/* Personal Information */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
                <p>
                  <strong>Age:</strong> {userData.age}
                </p>
                <p>
                  <strong>Gender:</strong> {userData.gender}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.phone}
                </p>
                <p>
                  <strong>Birth Date:</strong> {userData.birthDate}
                </p>
                <p>
                  <strong>Blood Group:</strong> {userData.bloodGroup}
                </p>
              </div>
            </section>

            {/* Appearance */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Appearance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600">
                <p>
                  <strong>Height:</strong> {userData.height} cm
                </p>
                <p>
                  <strong>Weight:</strong> {userData.weight} kg
                </p>
                <p>
                  <strong>Eye Color:</strong> {userData.eyeColor}
                </p>
                <p>
                  <strong>Hair:</strong> {userData.hair.color} (
                  {userData.hair.type})
                </p>
              </div>
            </section>

            {/* Address */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Address
              </h2>
              <p className="text-sm text-gray-600">
                {userData.address.address}, {userData.address.city},{" "}
                {userData.address.state} {userData.address.postalCode},{" "}
                {userData.address.country}
              </p>
            </section>

            {/* Company */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Company
              </h2>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Name:</strong> {userData.company.name}
                </p>
                <p>
                  <strong>Title:</strong> {userData.company.title}
                </p>
                <p>
                  <strong>Department:</strong> {userData.company.department}
                </p>
              </div>
            </section>

            {/* Crypto */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Crypto
              </h2>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Coin:</strong> {userData.crypto.coin}
                </p>
                <p>
                  <strong>Wallet:</strong> {userData.crypto.wallet}
                </p>
                <p>
                  <strong>Network:</strong> {userData.crypto.network}
                </p>
              </div>
            </section>

            {/* Bank Information */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Bank Information
              </h2>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Card Expiry:</strong> {userData.bank.cardExpire}
                </p>
                <p>
                  <strong>Card Number:</strong> {userData.bank.cardNumber}
                </p>
                <p>
                  <strong>Currency:</strong> {userData.bank.currency}
                </p>
                <p>
                  <strong>IBAN:</strong> {userData.bank.iban}
                </p>
              </div>
            </section>

            {/* University */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                University
              </h2>
              <p className="text-sm text-gray-600">{userData.university}</p>
            </section>

            {/* IP and MAC */}
            <section>
              <h2 className="text-xl font-serif text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
                Network Information
              </h2>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>IP Address:</strong> {userData.ip}
                </p>
                <p>
                  <strong>MAC Address:</strong> {userData.macAddress}
                </p>
              </div>
            </section>
            {/* Botón fijo para redirigir a la página de autenticación */}
            <div className="fixed bottom-6 right-6">
              <Link href="/">
                <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                  GO TO HOME
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  }
};

export default UserProfile;
