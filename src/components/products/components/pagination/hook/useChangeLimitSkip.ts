import {usePaginationStore} from '../store/storeSkip&Limit';

/**
 * Hook para actualizar los valores de limit y skip en el estado global.
 * @param limit Nuevo valor para el límite de productos por página.
 * @param skip Nuevo valor para el número de productos a omitir.
 */
const useUpdatePagination = (limit: number, skip: number): void => {
  const { setLimit, setSkip } = usePaginationStore();

  if (limit !== undefined) {
    setLimit(limit);
  }

  if (skip !== undefined) {
    setSkip(skip);
  }
};

export default useUpdatePagination;
