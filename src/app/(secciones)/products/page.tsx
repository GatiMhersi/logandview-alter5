'use client';
import React, { useEffect, useState } from "react";
import { fetchAndStoreProducts } from "../../../features/products/hook/useFetchAndStore"; // Ajusta la ruta según tu estructura
import { useProductsStore } from "../../../features/products/store/productsStore"; // Ajusta la ruta según tu estructura
import { usePaginationStore } from "@/features/pagination/store/storeSkip&Limit";
import ProductCard from "../../../features/products/components/singleProduct"; // Ajusta la ruta según tu estructura
import AddProductForm from "@/features/products/components/formNewProduct"; // Ajusta la ruta según tu estructura
import SearchBar from "@/features/searchBar/components/searchBar";
import SortProducts from "@/features/sortProducts/components/sortProducts";
import { Paginator } from "@/features/pagination/components/ChangeSkip";
import { LimitSelector } from "@/features/pagination/components/ChangeLimit";
import { useSortStore } from "@/features/sortProducts/store/storeParamsSort";
import { useSearchProducts } from "@/features/searchBar/hook/useSearchProducts";

const ProductPage: React.FC = () => {
  // Estado para manejar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { search } = useSearchProducts(); // Hook de búsqueda
  const [searchQuery, setSearchQuery] = useState("")

  // Obtener los productos desde el store
  const products = useProductsStore((state) => state.products);
  const limitGlobal = usePaginationStore((state) => state.limit)
  const skipGlobal = usePaginationStore((state) => state.skip)
  const {sortBy, order} = useSortStore()

  // Ejecutar fetch al cargar la página
  useEffect(() => {
    if(!searchQuery){
      fetchAndStoreProducts(skipGlobal, limitGlobal, sortBy, order);
    } else {
      search(searchQuery, skipGlobal, limitGlobal, sortBy, order)
    }
    
  }, [skipGlobal, limitGlobal, sortBy, order, searchQuery]);



  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Listado de Productos</h1>
      
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
      <Paginator/>
      <LimitSelector/>

      <SearchBar setSearchQuery={setSearchQuery}/>
      <button
          onClick={() => setIsSortModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Ordenar Productos
        </button>
       {/* Modal para ordenar productos */}
       {isSortModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white border rounded-lg shadow-lg w-96 p-4">
            <SortProducts onClose={() => setIsSortModalOpen(false)}/>
            <button
              onClick={() => setIsSortModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}

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
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando productos...</p>
      )}
    </div>
  );
};

export default ProductPage;
