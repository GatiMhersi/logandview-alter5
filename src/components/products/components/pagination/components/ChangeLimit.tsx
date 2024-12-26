import React from 'react';
import { usePaginationStore } from '../store/storeSkip&Limit';

// Componente para seleccionar el límite de productos por página
export const LimitSelector: React.FC = () => {
  const { limit, setLimit, setSkip } = usePaginationStore();

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit); // Reinicia el skip al cambiar el límite
    setSkip(0);
  };

  return (
    <div className="flex gap-4 text-black p-4 bg-white">
      <div className="flex flex-col">
        <label htmlFor="limit-selector" className="text-sm font-semibold text-gray-700">
          Límite por página:
        </label>
        <select
          id="limit-selector"
          value={limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="p-2 w-full md:w-40 border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          {[5, 10, 20, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
