// features/products/hooks/useFetchSortedProducts.ts

import { useState, useEffect } from 'react';
import { fetchSortedProducts, SortBy, Order } from '../service/sortFetch';
import { useProductsStore } from '../../products/store/productsStore'; // Importa el estado global
import { Product } from '@/features/products/types';

interface UseFetchSortedProductsResult {
  products: Product[]; // Productos obtenidos
  loading: boolean; // Estado de carga
  error: string | null; // Mensaje de error, si ocurre
}

/**
 * Hook para obtener productos ordenados desde la API.
 * @param sortBy - Campo por el cual ordenar los productos.
 * @param order - Orden de la ordenación ('asc' o 'desc').
 * @returns Un estado con los productos, el estado de carga y posibles errores.
 */
export const useFetchSortedProducts = (
  sortBy: SortBy,
  order: Order
): UseFetchSortedProductsResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtén la acción para actualizar los productos desde el estado global
  const setProducts = useProductsStore((state) => state.setProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const sortedProducts = await fetchSortedProducts(sortBy, order);

        // Guarda los productos en el estado global
        setProducts(sortedProducts);
      } catch (err) {
        setError((err as Error).message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, order, setProducts]);

  // Devuelve el estado global, ya que los productos ahora están almacenados ahí
  const products = useProductsStore((state) => state.products);

  return { products, loading, error };
};
