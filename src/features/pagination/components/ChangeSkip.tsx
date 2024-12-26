import React from 'react';
import { usePaginationStore } from '../store/storeSkip&Limit';

// Componente para manejar la paginación
export const Paginator: React.FC = () => {
  const { limit, skip, setSkip } = usePaginationStore();

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newSkip = direction === 'next' ? skip + limit : Math.max(0, skip - limit);
    setSkip(newSkip);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => handlePageChange('prev')}
        disabled={skip === 0}
        className={`px-4 py-2 rounded ${skip === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 text-white'}`}
      >
        Anterior
      </button>
      <span className="text-sm text-black">
        Página {Math.floor(skip / limit) + 1}
      </span>
      <button
        onClick={() => handlePageChange('next')}
        className="px-4 py-2 rounded bg-gray-500 text-white"
      >
        Siguiente
      </button>
    </div>
  );
};
