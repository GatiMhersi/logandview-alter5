import { fetchProducts } from "../service/getAllProducts";
import { useProductsStore } from "../store/productsStore";


export const fetchAndStoreProducts = async () => {
  try {
    const data = await fetchProducts(); // Solicita los productos desde el servicio
    const setProducts = useProductsStore.getState().setProducts; // Obtén la acción para actualizar el store
    setProducts(data.products); // Actualiza el estado global con los productos
  } catch (error) {
    console.error("Error al guardar los productos en el store:", error);
  }
};
