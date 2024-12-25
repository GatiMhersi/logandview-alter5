import React from 'react';
import {usePaginationStore} from '../store/storeSkip&Limit';


// Componente para manejar la paginación
export const Paginator: React.FC = () => {
  const { limit, skip, setSkip } = usePaginationStore();
  

  const handlePageChange = (direction: 'next' | 'prev') => {
    const newSkip = direction === 'next' ? skip + limit : Math.max(0, skip - limit);
    setSkip(newSkip)
    
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-gray-100 rounded shadow-md">
      <button
        onClick={() => handlePageChange('prev')}
        disabled={skip === 0}
        className={`px-4 py-2 text-white rounded ${
          skip === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Anterior
      </button>
      <span className="text-lg font-semibold">
        Página actual: {Math.floor(skip / limit) + 1}
      </span>
      <button
        onClick={() => handlePageChange('next')}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Siguiente
      </button>
    </div>
  );
};
