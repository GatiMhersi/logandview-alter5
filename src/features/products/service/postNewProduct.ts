// Importar la interfaz Product
import { Product } from '../types'; // Ajusta la ruta según la estructura de tu proyecto

export const addProduct = async (productData: Product) => {
  try {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: productData.title,
        description: productData.description,
        category: productData.category,
        price: productData.price,
        discountPercentage: productData.discountPercentage,
        rating: productData.rating,
        stock: productData.stock,
        tags: productData.tags,
        brand: productData.brand,
        sku: productData.sku,
        weight: productData.weight,
        dimensions: productData.dimensions,
        warrantyInformation: productData.warrantyInformation,
        shippingInformation: productData.shippingInformation,
        availabilityStatus: productData.availabilityStatus,
        reviews: productData.reviews,
        returnPolicy: productData.returnPolicy,
        minimumOrderQuantity: productData.minimumOrderQuantity,
        meta: productData.meta,
        thumbnail: productData.thumbnail,
        images: productData.images,
      }),
    });

    // Comprobar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('Error al agregar el producto');
    }

    // Convertir la respuesta a JSON
    const data = await response.json();
    return data; // Aquí puedes devolver el producto agregado o cualquier dato relevante
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    throw error; // Re-lanzamos el error para que se pueda manejar en otro lugar si es necesario
  }
};
