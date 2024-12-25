import React from 'react';
import { usePaginationStore } from '../store/storeSkip&Limit';
/* import useUpdatePagination from '../hook/useChangeLimitSkip'; */

// Componente para seleccionar el límite de productos por página
export const LimitSelector: React.FC = () => {
  const { limit, setLimit, setSkip } = usePaginationStore();
  /* const updatePagination = useUpdatePagination; */

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit); // Reinicia el skip al cambiar el límite
    setSkip(0)
  };

  return (
    <div className="flex flex-col items-start p-4 bg-gray-100 rounded shadow-md">
      <label
        htmlFor="limit-selector"
        className="mb-2 text-sm font-semibold text-gray-700"
      >
        Límite por página:
      </label>
      <select
        id="limit-selector"
        value={limit}
        onChange={(e) => handleLimitChange(Number(e.target.value))}
        className="w-32 px-3 py-2 text-sm border rounded bg-white border-gray-300 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {[5, 10, 20, 50].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
