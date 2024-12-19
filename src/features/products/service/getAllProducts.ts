import { ProductsResponse } from "../types"; // Importa el tipo de respuesta de la API

const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await fetch(BASE_URL);
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
