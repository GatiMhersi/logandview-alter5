// deleteProduct.ts

/**
 * Elimina un producto por su ID utilizando la API de dummyJson.
 * @param {number} productId - El ID del producto a eliminar.
 * @returns {Promise<any>} - Una promesa con los datos de la respuesta o un error.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteProduct = async (productId: number): Promise<any> => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Error eliminando el producto: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw error;
    }
  };
  