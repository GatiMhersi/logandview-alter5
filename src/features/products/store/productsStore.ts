import { create } from "zustand";
import { Product } from "../types"; // Importa el tipo Product

interface ProductsState {
  products: Product[]; // Estado global para los productos
  setProducts: (newProducts: Product[]) => void; // Acción para actualizar los productos
  addProduct: (newProduct: Product) => void; // Nueva acción para agregar un producto
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [], // Estado inicial
  setProducts: (newProducts) => set({ products: newProducts }), // Función para actualizar el estado
  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })), // Función para agregar un nuevo producto
}));
