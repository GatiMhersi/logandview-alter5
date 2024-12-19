import { create } from "zustand";
import { Product } from "../types"; // Importa el tipo Product

interface ProductsState {
  products: Product[]; // Estado global para los productos
  setProducts: (newProducts: Product[]) => void; // Acción para actualizar los productos
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [], // Estado inicial
  setProducts: (newProducts) => set({ products: newProducts }), // Función para actualizar el estado
}));
