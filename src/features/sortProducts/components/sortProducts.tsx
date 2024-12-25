import React from 'react';
/* import { useFetchSortedProducts } from '../hook/useSortProducts'; // Hook personalizado
import { usePaginationStore } from '@/features/pagination/store/storeSkip&Limit'; */
import { useSortStore } from '../store/storeParamsSort';

const SortProducts: React.FC<{ onClose: () => void }> = ({ onClose })  => {
  // Estado local para controlar las selecciones
  /* const [sortBy, setSortBy] = useState<'title' | 'price'>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc'); */

  /* const limitGlobal = usePaginationStore((state) => state.limit)
  const skipGlobal = usePaginationStore((state) => state.skip) */
  const { setOrder, setSortBy, sortBy, order} = useSortStore()

  // Ejecuta el hook cada vez que cambian las opciones
  /* useFetchSortedProducts(sortBy, order, skipGlobal, limitGlobal); */

  // Maneja el cambio del selector de sortBy
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'title' | 'price');
  };

  // Maneja el cambio del selector de order
  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value as 'asc' | 'desc');
  };

  // Cambiar el evento de envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Evita la recarga de la página
    onClose(); // Cierra el modal
  };

  return (
    <form className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-4" onSubmit={handleSubmit} >{/* // Añadir el manejador de envío */}
      <div className="flex flex-col gap-2">
        <label htmlFor="sortBy" className="text-gray-700 font-medium">
          Ordenar por:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortByChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="title">Título</option>
          <option value="price">Precio</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="order" className="text-gray-700 font-medium">
          Orden:
        </label>
        <select
          id="order"
          value={order}
          onChange={handleOrderChange}
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <button
        type="submit"
        className="self-end bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Aplicar
      </button>
    </form>
  );
};

export default SortProducts;
