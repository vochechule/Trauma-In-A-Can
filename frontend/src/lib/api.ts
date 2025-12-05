import axios, { AxiosInstance } from 'axios';
import {
  Product,
  ProductWithCache,
  CreateProductDto,
  UpdateProductDto,
  PaginatedProducts,
  CacheStats,
} from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Products endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<PaginatedProducts> {
    const { data } = await this.client.get<PaginatedProducts>('/products', { params });
    return data;
  }

  async getProduct(id: number): Promise<ProductWithCache> {
    const { data } = await this.client.get<ProductWithCache>(`/products/${id}`);
    return data;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const { data } = await this.client.post<Product>('/products', product);
    return data;
  }

  async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
    const { data } = await this.client.patch<Product>(`/products/${id}`, product);
    return data;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.client.delete(`/products/${id}`);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await this.client.get<Product[]>('/products/search', {
      params: { q: query },
    });
    return data;
  }

  // Cache endpoints
  async getCacheStats(): Promise<CacheStats> {
    const { data } = await this.client.get<CacheStats>('/cache/stats');
    return data;
  }

  async clearCache(): Promise<void> {
    await this.client.delete('/cache/clear');
  }
}

export const api = new ApiClient();
export default api;
