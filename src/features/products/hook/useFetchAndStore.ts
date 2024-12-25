import { Order, SortBy } from "@/features/sortProducts/service/sortFetch";
import { fetchProducts } from "../service/getAllProducts";
import { useProductsStore } from "../store/productsStore";


export const fetchAndStoreProducts = async (
  skip: number = 0,
  limit: number = 10,
  sortBy: SortBy = 'id',
  order: Order = 'asc'
) => {
  try {
    const data = await fetchProducts(skip, limit, sortBy, order); // Solicita los productos desde el servicio
    const setProducts = useProductsStore.getState().setProducts; // Obtén la acción para actualizar el store
    setProducts(data.products); // Actualiza el estado global con los productos
  } catch (error) {
    console.error("Error al guardar los productos en el store:", error);
  }
};
