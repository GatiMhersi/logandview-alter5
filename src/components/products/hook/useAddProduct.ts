import { useState } from "react";
import { Product } from "../types"; // Asegúrate de importar el tipo Product
import { addProduct as addProductService } from "../service/postNewProduct"; // Importa la función del servicio que ya tienes
import { useProductsStore } from "../store/productsStore"; // Importa el store donde gestionamos los productos

// Hook para agregar un producto
const useAddProduct = () => {
  const [loading, setLoading] = useState(false); // Estado para manejar la carga de la solicitud
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores


  // Función para agregar un producto
  const addNewProduct = async (product: Product) => {
    setLoading(true);
    setError(null); // Limpiamos el error previo

    try {
      // Llamamos al servicio para agregar el producto
      const response = await addProductService(product);

      // Aquí es donde agregamos el producto a la variable global
      const { addProduct } = useProductsStore.getState(); // Obtenemos la función addProduct del store
      addProduct(response); // Agregamos el producto retornado al store

    } catch (err) {
      setError("Error al agregar el producto. Intente de nuevo.");
      console.error("Error al agregar el producto:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    addNewProduct,
    loading,
    error,
  };
};

export default useAddProduct;
