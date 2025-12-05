export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCache extends Product {
  cacheHit?: boolean;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url?: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock_quantity?: number;
  image_url?: string;
}

export interface PaginatedProducts {
  data: ProductWithCache[];
  total: number;
  page: number;
  limit: number;
  cacheHit?: boolean;
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
