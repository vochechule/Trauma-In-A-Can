# 👨‍💻 Development Notes

Internal dokumentace pro vývojáře.

## 📋 Frontend Checklist

### ✅ Hotovo
- [x] TypeScript typy (Product, API responses)
- [x] API client (axios)
- [x] Layout s navigation
- [x] Homepage s product grid
- [x] ProductCard komponenta s cache indikátorem
- [x] SearchBar s vyhledáváním a filtry
- [x] CacheIndicator s real-time stats
- [x] ProductForm pro CRUD operace
- [x] Product detail modal
- [x] Dark theme s Tailwind CSS
- [x] Responsive design
- [x] Error handling
- [x] Loading states
- [x] Dockerfile multi-stage build

### 🔄 Připraveno pro backend
Frontend je **ready** pro propojení s backendem. Očekává tyto endpointy:

```typescript
GET    /products              // List products
GET    /products/:id          // Get product detail
POST   /products              // Create product
PATCH  /products/:id          // Update product
DELETE /products/:id          // Delete product
GET    /products/search?q=... // Search products
GET    /cache/stats           // Cache statistics
```

### 📦 Response Format

Frontend očekává tyto response formáty:

#### Product List Response
```json
{
  "data": [
    {
      "id": 1,
      "name": "Dental Office Waiting Room",
      "description": "...",
      "price": 99.99,
      "category": "Medical Trauma",
      "stock_quantity": 15,
      "image_url": "...",
      "created_at": "2025-12-05T10:00:00Z",
      "updated_at": "2025-12-05T10:00:00Z",
      "cacheHit": false
    }
  ],
  "total": 20,
  "page": 1,
  "limit": 12
}
```

#### Single Product Response
```json
{
  "id": 1,
  "name": "...",
  "description": "...",
  "price": 99.99,
  "category": "...",
  "stock_quantity": 15,
  "image_url": "...",
  "created_at": "...",
  "updated_at": "...",
  "cacheHit": true  // Important for cache indicator
}
```

#### Cache Stats Response
```json
{
  "hits": 150,
  "misses": 50,
  "hitRate": 75.0
}
```

## 🎯 Co backend musí implementovat

### 1. Products CRUD
- [x] Database schema (PostgreSQL)
- [ ] TypeORM entities
- [ ] NestJS controller
- [ ] NestJS service
- [ ] DTOs a validace
- [ ] Error handling

### 2. Redis Cache
- [ ] Redis connection
- [ ] Cache service
- [ ] Cache-aside pattern
- [ ] TTL (10 minut)
- [ ] Cache invalidation při UPDATE/DELETE
- [ ] Cache statistics tracking

### 3. API Features
- [ ] Pagination support
- [ ] Search/filter by name
- [ ] Category filtering
- [ ] CORS configuration
- [ ] Health check endpoint

### 4. Cache Logic Flowchart

```
GET /products/:id
    ↓
Check Redis cache
    ↓
  Found? ←─────────┐
    ↓ Yes          │
Return data        │ No
cacheHit: true     │
    ↓              │
   END          Load from DB
                   ↓
              Save to Redis (TTL: 10min)
                   ↓
              Return data
              cacheHit: false
                   ↓
                  END

UPDATE/DELETE /products/:id
    ↓
Update/Delete in DB
    ↓
Invalidate Redis cache (del product:id)
    ↓
Return updated data
```

## 🔧 Environment Setup

### Backend .env
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=product_catalog

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_TTL=600

PORT=3001
NODE_ENV=development
```

### Frontend .env
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing Plan

### Unit Tests
- [ ] API client tests
- [ ] Component tests (ProductCard, SearchBar, etc.)
- [ ] Utility functions tests
- [ ] Type validation tests

### Integration Tests
- [ ] API endpoint tests
- [ ] Cache behavior tests
- [ ] CRUD flow tests

### E2E Tests
- [ ] User can view products
- [ ] User can search products
- [ ] Admin can create product
- [ ] Admin can edit product
- [ ] Admin can delete product
- [ ] Cache hit/miss displayed correctly

## 📊 Performance Targets

- **Cache Hit Rate**: > 70%
- **Page Load Time**: < 2s
- **API Response Time**: < 100ms (cached), < 500ms (DB)
- **Bundle Size**: < 500KB (gzipped)

## 🐛 Known Issues

### TypeScript Errors
- React imports showing errors → Normal, budou vyřešeny po `npm install`
- NodeJS namespace errors → Opraví se po instalaci `@types/node`

### Docker
- First build může trvat 5-10 minut
- Hot reload funguje jen v dev mode

## 📝 Code Style

### TypeScript
- Prefer `interface` over `type`
- Use explicit return types
- Enable strict mode

### React
- Functional components only
- Hooks over HOCs
- Use 'use client' directive where needed

### CSS
- Tailwind utility classes
- No custom CSS unless necessary
- Mobile-first approach

## 🚀 Deployment Checklist

- [ ] Build passes without errors
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Docker images build successfully
- [ ] Database migrations run
- [ ] Redis connection works
- [ ] CORS configured for production
- [ ] Performance tested

## 🎨 Design Tokens

```css
/* Colors */
--bg-primary: #111827
--bg-secondary: #1f2937
--accent: #ef4444
--text-primary: #e5e7eb
--text-secondary: #9ca3af

/* Spacing */
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 2rem

/* Border radius */
--radius-sm: 0.375rem
--radius-md: 0.5rem
--radius-lg: 0.75rem
```

## 📞 Contact

Máš otázky? Check Slack nebo ping @vochechule

---

Last updated: 2025-12-05
