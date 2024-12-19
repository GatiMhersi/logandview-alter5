'use client'
import React, { useEffect } from "react";
import { fetchAndStoreProducts } from "../../../features/products/hook/useFetchAndStore"; // Ajusta la ruta según tu estructura
import { useProductsStore } from "../../../features/products/store/productsStore"; // Ajusta la ruta según tu estructura
import ProductCard from "../../../features/products/components/singleProduct"; // Ajusta la ruta según tu estructura



const ProductPage: React.FC = () => {

  // Obtener los productos desde el store
  const products = useProductsStore((state) => state.products);

  // Ejecutar fetch al cargar la página
  useEffect(() => {
    fetchAndStoreProducts();
  }, [products]);

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Listado de Productos</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              stock={product.stock}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando productos...</p>
      )}
    </div>
  );
};

export default ProductPage;
