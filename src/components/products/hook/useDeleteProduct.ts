import { useProductsStore } from "../store/productsStore";
import { deleteProduct } from "../service/deleteProduct";

/**
 * Hook para eliminar un producto.
 * @param {number} id - El ID del producto a eliminar.
 */
export const useDeleteProduct = () => {
  const removeProduct = useProductsStore((state) => state.removeProduct);

  const handleDeleteProduct = async (id: number) => {
    try {
      // Llama al servicio para eliminar el producto
      await deleteProduct(id);
      
      // Actualiza el estado global eliminando el producto
      removeProduct(id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return { handleDeleteProduct };
};
