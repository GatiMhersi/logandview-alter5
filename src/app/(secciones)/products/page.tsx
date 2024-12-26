"use client";
import React, { useEffect, useState } from "react";
import { fetchAndStoreProducts } from "../../../components/products/hook/useFetchAndStore"; // Ajusta la ruta según tu estructura
import { useProductsStore } from "../../../components/products/store/productsStore"; // Ajusta la ruta según tu estructura
import { usePaginationStore } from "@/components/products/components/pagination/store/storeSkip&Limit";
import ProductCard from "../../../components/products/components/singleProduct"; // Ajusta la ruta según tu estructura
import AddProductForm from "@/components/products/components/formNewProduct"; // Ajusta la ruta según tu estructura
import SearchBar from "@/components/products/components/searchBar/components/searchBar";
import SortProducts from "@/components/products/components/sortProducts/components/sortProducts";
import { Paginator } from "@/components/products/components/pagination/components/ChangeSkip";
import { LimitSelector } from "@/components/products/components/pagination/components/ChangeLimit";
import { useSortStore } from "@/components/products/components/sortProducts/store/storeParamsSort";
import { useSearchProducts } from "@/components/products/components/searchBar/hook/useSearchProducts";
import Link from "next/link";

const ProductPage: React.FC = () => {
  // Estado para manejar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { search } = useSearchProducts(); // Hook de búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Obtener los productos desde el store
  const products = useProductsStore((state) => state.products);
  const limitGlobal = usePaginationStore((state) => state.limit);
  const skipGlobal = usePaginationStore((state) => state.skip);
  const { sortBy, order } = useSortStore();

  // Ejecutar fetch al cargar la página
  useEffect(() => {
    if (!searchQuery) {
      fetchAndStoreProducts(skipGlobal, limitGlobal, sortBy, order);
    } else {
      search(searchQuery, skipGlobal, limitGlobal, sortBy, order);
    }
  }, [skipGlobal, limitGlobal, sortBy, order, searchQuery]);

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Listado de Productos
      </h1>

      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Agregar Nuevo Producto
      </button>

      {/* Modal con formulario para agregar producto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="border-slate-500 border-2 rounded-lg shadow-lg w-96">
            <AddProductForm />
            {/* Botón para cerrar el modal */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div>
        <SearchBar setSearchQuery={setSearchQuery} />
        <div className="flex flex-row justify-center">
          <SortProducts />
          <LimitSelector />
        </div>
      </div>

      
      
        <Paginator />
      {/* Renderizado de productos */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              category={product.category}
              stock={product.stock}
              price={product.price}
            />
          ))}
          <div className="fixed bottom-6 right-6">
              <Link href="/">
                <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                  GO TO HOME
                </button>
              </Link>
            </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando productos...</p>
      )}
    </div>
  );
};

export default ProductPage;
