# Backend setup

NestJS service providing the Product Catalog REST API with PostgreSQL persistence and Redis caching.

## Architecture
- NestJS with global validation, configuration, and Redis-backed cache manager.
- PostgreSQL via TypeORM (`products` table defined in `database/init.sql`).
- Redis Stack for caching: individual product keys (`product:{id}`) and list queries (`products:list:{...}`) with TTL from `REDIS_TTL` (default 600 seconds). Cache is cleared after create/update/delete to avoid stale lists.
- Health endpoint (`GET /health`) pings PostgreSQL and Redis through the cache manager.

## Running locally
```bash
cd backend
pnpm install
pnpm run start:dev
```

Environment defaults match `docker-compose.yml`, but you can override with a `.env` file in `backend/`:
- `PORT` (default `3001`)
- `DATABASE_HOST` (default `localhost`)
- `DATABASE_PORT` (default `5432`)
- `DATABASE_USER` (default `postgres`)
- `DATABASE_PASSWORD` (default `postgres`)
- `DATABASE_NAME` (default `product_catalog`)
- `DATABASE_SYNCHRONIZE` (default `false`, set to `true` for local schema auto-sync)
- `REDIS_HOST` (default `localhost`)
- `REDIS_PORT` (default `6379`)
- `REDIS_PASSWORD` (optional)
- `REDIS_TTL` (default `600` seconds)
- `CORS_ORIGINS` (comma-separated list, default `*`)
- `RATE_LIMIT_TTL` (default `60` seconds)
- `RATE_LIMIT_LIMIT` (default `120` requests per TTL window)

## API
Base URL: `http://localhost:3001/api`

- `GET /products` — list products with optional filters (`search`, `category`, `minPrice`, `maxPrice`, `page`, `limit`, `sortBy`, `order`). Response includes `cacheHit` plus pagination meta.
- `GET /products/:id` — fetch one product (cached per ID, shows `cacheHit`).
- `POST /products` — create product.
- `PATCH /products/:id` — update product and clear cache.
- `DELETE /products/:id` — remove product and clear cache.
- `GET /health` — service health (no `/api` prefix).

## Data model
`Product` fields: `id`, `name`, `description`, `price`, `category`, `stockQuantity`, `imageUrl`, `createdAt`, `updatedAt`. Decimal `price` is exposed as a number via a TypeORM transformer.

## Security
- Env validation via Joi guards required settings.
- Helmet adds sensible HTTP headers.
- Global rate limiting via `@nestjs/throttler` (tune with `RATE_LIMIT_*`).
- Strict validation (`ValidationPipe` with whitelist + forbid non-whitelisted) and CORS origins configurable.

## Docker
`docker-compose.yml` starts PostgreSQL, Redis Stack, backend, and frontend. Health checks rely on `GET /health`; product APIs are under `/api`.
