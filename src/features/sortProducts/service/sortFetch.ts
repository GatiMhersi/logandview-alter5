import { Product } from "@/features/products/types";

export type SortBy = 'title' | 'price' | 'rating' | 'id'; // Agrega más opciones si es necesario.
export type Order = 'asc' | 'desc';

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetches products sorted by a specified field and order, with optional pagination.
 * @param sortBy - The field to sort by (e.g., 'title', 'price').
 * @param order - The order of sorting ('asc' or 'desc').
 * @param skip - Number of products to skip (default: 0).
 * @param limit - Maximum number of products to fetch (default: 10).
 * @returns A promise with the sorted and paginated products.
 */
export const fetchSortedProducts = async (
  sortBy: SortBy,
  order: Order,
  skip: number = 0,
  limit: number = 10
): Promise<Product[]> => {
  // Construir la URL con los parámetros dinámicos
  const url = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&skip=${skip}&limit=${limit}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data: ProductResponse = await response.json();
    return data.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};
