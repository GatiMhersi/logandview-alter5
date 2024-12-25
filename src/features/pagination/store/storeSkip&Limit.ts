import { create } from 'zustand';

interface PaginationState {
  limit: number;
  skip: number;
  setLimit: (newLimit: number) => void;
  setSkip: (newSkip: number) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  limit: 10, // Valor por defecto para limit
  skip: 0,  // Valor por defecto para skip
  setLimit: (newLimit) => set({ limit: newLimit }),
  setSkip: (newSkip) => set({ skip: newSkip }),
}));


