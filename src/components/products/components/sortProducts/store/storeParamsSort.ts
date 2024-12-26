import { create } from 'zustand';
import { Order, SortBy } from '../service/sortFetch';

type SortState = {
  sortBy: SortBy; // Campo para el criterio de ordenamiento (por ejemplo, "precio" o "nombre")
  order: Order; // Orden de los productos (ascendente o descendente)
  setSortBy: (newSortBy: SortBy) => void; // Método para actualizar 'sortBy'
  setOrder: (newOrder: Order) => void; // Método para actualizar 'order'
};

export const useSortStore = create<SortState>((set) => ({
  sortBy: 'id', // Valor inicial
  order: 'asc', // Valor inicial
  setSortBy: (newSortBy) =>
    set(() => ({
      sortBy: newSortBy,
    })),
  setOrder: (newOrder) =>
    set(() => ({
      order: newOrder,
    })),
}));
