import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import type { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { CreateProductDto, QueryProductsDto, UpdateProductDto } from './dto';
import { Product } from './product.entity';

type SortableField = 'name' | 'price' | 'category' | 'createdAt' | 'updatedAt';

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

interface NormalizedQuery {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  limit: number;
  sortBy: SortableField;
  order: 'ASC' | 'DESC';
}

@Injectable()
export class ProductsService {
  private readonly cacheTtl: number;

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.cacheTtl = this.configService.get<number>('redis.ttl', 600);
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const entity = this.productsRepository.create(dto);
    const saved = await this.productsRepository.save(entity);
    await this.invalidateCaches(saved.id);
    return saved;
  }

  async findAll(query: QueryProductsDto): Promise<PaginatedProducts> {
    const normalized = this.normalizeQuery(query);
    const cacheKey = this.getListCacheKey(normalized);
    const cached = await this.cacheManager.get<Omit<PaginatedProducts, 'cacheHit'>>(cacheKey);

    if (cached) {
      return { ...cached, cacheHit: true };
    }

    const qb = this.productsRepository.createQueryBuilder('product');

    if (normalized.search) {
      qb.andWhere(
        '(product.name ILIKE :search OR product.category ILIKE :search OR product.description ILIKE :search)',
        { search: `%${normalized.search}%` },
      );
    }

    if (normalized.category) {
      qb.andWhere('product.category ILIKE :category', {
        category: `%${normalized.category}%`,
      });
    }

    if (typeof normalized.minPrice === 'number') {
      qb.andWhere('product.price >= :minPrice', { minPrice: normalized.minPrice });
    }

    if (typeof normalized.maxPrice === 'number') {
      qb.andWhere('product.price <= :maxPrice', { maxPrice: normalized.maxPrice });
    }

    qb.orderBy(`product.${normalized.sortBy}`, normalized.order);

    const total = await qb.getCount();
    const results = await qb
      .skip((normalized.page - 1) * normalized.limit)
      .take(normalized.limit)
      .getMany();

    const response = {
      data: results,
      meta: {
        total,
        page: normalized.page,
        limit: normalized.limit,
      },
    };

    await this.cacheManager.set(cacheKey, response, this.cacheTtl);

    return { ...response, cacheHit: false };
  }

  async findOne(id: number): Promise<ProductResponse> {
    const cacheKey = this.getProductCacheKey(id);
    const cached = await this.cacheManager.get<Product>(cacheKey);

    if (cached) {
      return { data: cached, cacheHit: true };
    }

    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.cacheManager.set(cacheKey, product, this.cacheTtl);

    return { data: product, cacheHit: false };
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const existing = await this.productsRepository.findOne({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const updated = await this.productsRepository.save({ ...existing, ...dto });
    await this.invalidateCaches(id);
    return updated;
  }

  async remove(id: number): Promise<void> {
    const existing = await this.productsRepository.findOne({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepository.delete(id);
    await this.invalidateCaches(id);
  }

  private normalizeQuery(query: QueryProductsDto): NormalizedQuery {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 10));
    const sortBy = (query.sortBy ?? 'createdAt') as SortableField;
    const order = (query.order ?? 'DESC').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const normalized: NormalizedQuery = {
      page,
      limit,
      sortBy,
      order,
    };

    if (query.search) {
      normalized.search = query.search.trim();
    }

    if (query.category) {
      normalized.category = query.category.trim();
    }

    if (typeof query.minPrice === 'number') {
      normalized.minPrice = query.minPrice;
    }

    if (typeof query.maxPrice === 'number') {
      normalized.maxPrice = query.maxPrice;
    }

    if (
      typeof normalized.minPrice === 'number' &&
      typeof normalized.maxPrice === 'number' &&
      normalized.maxPrice < normalized.minPrice
    ) {
      [normalized.minPrice, normalized.maxPrice] = [normalized.maxPrice, normalized.minPrice];
    }

    return normalized;
  }

  private getProductCacheKey(id: number): string {
    return `product:${id}`;
  }

  private getListCacheKey(query: NormalizedQuery): string {
    const base = JSON.stringify({
      search: query.search || '',
      category: query.category || '',
      minPrice: query.minPrice ?? '',
      maxPrice: query.maxPrice ?? '',
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      order: query.order,
    });
    return `products:list:${base}`;
  }

  private async invalidateCaches(productId?: number) {
    if (productId) {
      await this.cacheManager.del(this.getProductCacheKey(productId));
    }
    await this.cacheManager.reset();
  }
}
