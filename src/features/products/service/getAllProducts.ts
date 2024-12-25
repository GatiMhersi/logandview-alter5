import { Order, SortBy } from "@/features/sortProducts/service/sortFetch";
import { ProductsResponse } from "../types"; // Importa el tipo de respuesta de la API

const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async (
  skip: number = 0,
  limit: number = 10,
  sortBy: SortBy = 'id',
  order: Order = 'asc'
): Promise<ProductsResponse> => {
  
  try {
    // Construir la URL con los parámetros dinámicos
    const url = `${BASE_URL}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al obtener los productos: ${response.statusText}`);
    }

    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un error al obtener los productos:", error);
    throw error;
  }
};
