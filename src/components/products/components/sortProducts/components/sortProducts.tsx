import React from 'react';
import { useSortStore } from '../store/storeParamsSort';

const SortProducts: React.FC = () => {
  const { setOrder, setSortBy, sortBy, order } = useSortStore();

  // Maneja el cambio del selector de sortBy
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'title' | 'price' | 'id');
  };

  // Maneja el cambio del selector de order
  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value as 'asc' | 'desc');
  };

  return (
    <form className="flex gap-4 text-black p-4 bg-white text-sm sm:text-base">
      <div className="flex flex-col">
        <label htmlFor="sortBy" className="text-xs sm:text-sm">Ordenar por:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="p-2 w-full sm:w-40 text-xs sm:text-sm"
        >
          <option value="id">Identificador</option>
          <option value="title">Título</option>
          <option value="price">Precio</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="order" className="text-xs sm:text-sm">Orden:</label>
        <select
          id="order"
          value={order}
          onChange={handleOrderChange}
          className="p-2 w-full sm:w-40 text-xs sm:text-sm"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </form>
  );
};

export default SortProducts;
