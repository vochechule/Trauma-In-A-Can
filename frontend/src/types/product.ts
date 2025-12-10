export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithCache extends Product {
  cacheHit?: boolean;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  imageUrl?: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stockQuantity?: number;
  imageUrl?: string | null;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  cacheHit: boolean;
}

export interface ProductResponse {
  data: Product;
  cacheHit: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
