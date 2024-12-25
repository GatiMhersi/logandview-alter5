import { Product } from "@/features/products/types";
import { Order, SortBy } from "@/features/sortProducts/service/sortFetch";


export const searchProducts = async (
  query: string,
  skip: number = 0,
  limit: number = 10,
  sortBy: SortBy = 'id',
  order: Order = 'asc'
): Promise<Product[]> => {
  if (!query) {
    throw new Error("La consulta no puede estar vacía");
  }

  // Construir la URL con parámetros dinámicos
  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    // Verificar que los datos tengan un array de productos
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error("Formato inesperado de los datos");
    }

    return data.products;
  } catch (error: any) {
    console.error("Error al buscar productos:", error.message);
    throw new Error("Hubo un problema al realizar la búsqueda.");
  }
};
