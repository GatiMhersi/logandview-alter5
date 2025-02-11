import React, { useState } from "react";
import { ConfirmDeleteModal } from "./confirmDeleteProduct"; // Ajusta la ruta según tu estructura
import { Product } from "../types"; // Ajusta la ruta según tu estructura

// Usamos Pick para tomar solo las propiedades necesarias de Product
type ProductCardProps = Pick<Product, "title" | "category" | "stock" | "price" | "id">;

const ProductCard: React.FC<ProductCardProps> = ({ title, category, stock, price, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-sm">
      {/* Información del Producto */}
      <div className="flex flex-col space-y-1">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Categoría: {category}</p>
        <p className="text-sm text-gray-500">Stock: {stock > 0 ? stock : "Agotado"}</p>
      </div>

      {/* Precio y botón */}
      <div className="flex flex-col items-end space-y-2">
        <p className="text-lg font-semibold text-green-600">${price}</p>
        <button
          className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          onClick={handleDeleteClick}
        >
          Eliminar
        </button>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productName={title}
        productId={id}
      />
    </div>
  );
};

export default ProductCard;
