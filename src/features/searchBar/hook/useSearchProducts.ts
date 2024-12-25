import { useState } from "react";
import { searchProducts } from "../service/searchProducts"; // Importa el servicio
import { useProductsStore } from "../../products/store/productsStore"; // Importa el store
import { Order, SortBy } from "@/features/sortProducts/service/sortFetch";



/**
 * Hook para buscar productos y actualizar el estado global.
 */
export const useSearchProducts = () => {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const setProducts = useProductsStore((state) => state.setProducts); // Acción del store

  /**
   * Realiza la búsqueda de productos y actualiza el estado global.
   * @param query - Texto de búsqueda.
   */
  const search = async (query: string, skip: number, limit: number , sortBy: SortBy, order: Order) => {
    setLoading(true);
    setError(null);

    try {
      // Llama al servicio
      const response  = await searchProducts(query, skip, limit, sortBy, order );

      // Actualiza el estado global con los productos
      setProducts(response);
    } catch (err: any) {
      setError(err.message || "Error inesperado al buscar productos.");
    } finally {
      setLoading(false);
    }
  };

  return { search, loading, error };
};
