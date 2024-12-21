import { Product } from '../products/types';

export interface SearchResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }