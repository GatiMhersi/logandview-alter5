// features/products/services/productService.ts
import { Product } from "@/features/products/types";
export type SortBy = 'title' | 'price' | 'rating'; // Agrega más opciones si es necesario.
export type Order = 'asc' | 'desc';


export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetches products sorted by a specified field and order.
 * @param sortBy - The field to sort by (e.g., 'title', 'price').
 * @param order - The order of sorting ('asc' or 'desc').
 * @returns A promise with the sorted products.
 */
export const fetchSortedProducts = async (
  sortBy: SortBy,
  order: Order
): Promise<Product[]> => {
  const url = `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`;

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
