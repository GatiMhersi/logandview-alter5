import { useState, useEffect } from "react";
import { useSearchProducts } from "../hook/useSearchProducts";
import { useSortStore } from "@/components/products/components/sortProducts/store/storeParamsSort";
import { usePaginationStore } from "@/components/products/components/pagination/store/storeSkip&Limit";

type SearchBarProps = {
  setSearchQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(""); // Valor del input
  const [debouncedValue, setDebouncedValue] = useState(inputValue); // Valor con debounce
  const { search, loading, error } = useSearchProducts(); // Hook de búsqueda
  const { limit, skip } = usePaginationStore();
  const { sortBy, order } = useSortStore();

  // Manejo del cambio en el input y el debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Establecer el valor con debounce: retraso de 1 segundo
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue); // Actualiza el valor con un retraso
    }, 100);

    return () => {
      clearTimeout(handler); // Limpiar el timeout previo si el valor cambia antes del tiempo
    };
  }, [inputValue]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Buscar productos..."
        value={inputValue}
        onChange={handleInputChange} // Actualiza el estado del input
        /* disabled={loading} // Deshabilita el input mientras se realiza la búsqueda */
      />
      {loading && (
        <span className="absolute right-3 top-3 text-gray-500">
          Buscando...
        </span>
      )}
      {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
    </div>
  );
};

export default SearchBar;
