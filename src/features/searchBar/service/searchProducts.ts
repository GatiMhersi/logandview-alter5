// src/features/products/service/searchProducts.ts

import { Product } from "@/features/products/types";


export const searchProducts = async (query: string): Promise<Product[]> => {
    if (!query) {
      throw new Error("La consulta no puede estar vacía");
    }
  
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Verifica que los datos tengan un array de productos
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error("Formato inesperado de los datos");
      }
  
      return data.products;
    } catch (error: any) {
      console.error("Error al buscar productos:", error.message);
      throw new Error("Hubo un problema al realizar la búsqueda.");
    }
  };
  