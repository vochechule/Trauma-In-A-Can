import axios, { AxiosInstance } from 'axios';
import {
  Product,
  ProductWithCache,
  CreateProductDto,
  UpdateProductDto,
  PaginatedProducts,
  ProductResponse,
} from '@/types/product';

const API_URL = `${
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
}/api`;

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

  private normalizePayload<T extends CreateProductDto | UpdateProductDto>(
    payload: T
  ): T {
    const cleanPayload: Record<string, unknown> = { ...payload };

    if ('imageUrl' in cleanPayload && typeof cleanPayload.imageUrl === 'string') {
      const trimmed = (cleanPayload.imageUrl as string).trim();
      cleanPayload.imageUrl = trimmed.length ? trimmed : undefined;
    }

    return cleanPayload as T;
  }

  // Products endpoints
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'name' | 'price' | 'category' | 'createdAt' | 'updatedAt';
    order?: 'ASC' | 'DESC';
  }): Promise<PaginatedProducts> {
    const { data } = await this.client.get<PaginatedProducts>('/products', {
      params,
    });
    return data;
  }

  async getProduct(id: number): Promise<ProductWithCache> {
    const { data } = await this.client.get<ProductResponse>(`/products/${id}`);
    return { ...data.data, cacheHit: data.cacheHit };
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const body = this.normalizePayload(product);
    const { data } = await this.client.post<Product>('/products', body);
    return data;
  }

  async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
    const body = this.normalizePayload(product);
    const { data } = await this.client.patch<Product>(`/products/${id}`, body);
    return data;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.client.delete(`/products/${id}`);
  }
}

export const api = new ApiClient();
export default api;
