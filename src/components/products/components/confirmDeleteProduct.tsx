import React from "react";
import { useDeleteProduct } from "../hook/useDeleteProduct";

interface ConfirmDeleteModalProps {
  isOpen: boolean; // Controla la visibilidad del modal
  onClose: () => void; // Acción para cerrar el modal
  productName?: string; // Nombre del producto a eliminar (opcional)
  productId: number; // ID del producto a eliminar
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  productName,
  productId
}) => {
  const { handleDeleteProduct } = useDeleteProduct();

  const onConfirm = async () => {
    console.log(productId)
    await handleDeleteProduct(productId); // Llama a la función para eliminar el producto
    onClose(); // Cierra el modal después de confirmar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
        <p className="mb-6">
          {productName
            ? `¿Estás seguro de que deseas eliminar el producto "${productName}"?`
            : "¿Estás seguro de que deseas eliminar este producto?"}
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
