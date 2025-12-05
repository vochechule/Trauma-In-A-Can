# Trauma In A Can™ - Frontend

Next.js 14 frontend pro e-shop s plechovkami traumatických zážitků.

## 🎨 Features

- **Modern UI/UX** - Dark theme s Tailwind CSS
- **Real-time Cache Stats** - Zobrazení Redis cache hit/miss
- **Product Management** - CRUD operace s formuláři
- **Search & Filter** - Vyhledávání a filtrování podle kategorií
- **Responsive Design** - Funguje na všech zařízeních
- **Type Safety** - Plná TypeScript podpora

## 🛠️ Tech Stack

- **Next.js 14** - React framework s App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hooks** - State management

## 📁 Struktura

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout s headerem a footerem
│   │   ├── page.tsx            # Homepage - product grid
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ProductCard.tsx     # Karta produktu
│   │   ├── ProductForm.tsx     # Formulář pro CRUD
│   │   ├── SearchBar.tsx       # Vyhledávání a filtry
│   │   └── CacheIndicator.tsx  # Cache statistiky
│   ├── lib/
│   │   └── api.ts              # API client
│   └── types/
│       └── product.ts          # TypeScript typy
├── public/                     # Statické soubory
├── Dockerfile                  # Multi-stage Docker build
├── package.json
└── next.config.js
```

## 🚀 Development

### Lokální vývoj (doporučeno)

```bash
# Install dependencies
npm install

# Spusť dev server
npm run dev
```

Aplikace bude dostupná na http://localhost:3000

**Poznámka:** Pro lokální vývoj musí běžet backend na http://localhost:3001

### S Dockerem

```bash
# Z root složky projektu
docker-compose up frontend
```

## 🎯 Komponenty

### ProductCard
Zobrazuje produkt v gridu s:
- Obrázkem nebo placeholder ikonou
- Názvem a cenou
- Kategorií a skladem
- Cache hit/miss indikátorem

### ProductForm
Formulář pro vytváření/editaci produktů:
- Validace všech polí
- Type-safe s TypeScript
- Error handling

### SearchBar
Vyhledávání a filtrování:
- Full-text search
- Kategorie filtry
- Real-time aktualizace

### CacheIndicator
Real-time Redis cache statistiky:
- Hits / Misses
- Hit rate %
- Visual progress bar
- Auto-refresh každých 5s

## 🔌 API Integrace

API client v `lib/api.ts` poskytuje:

```typescript
// Products
api.getProducts(params)      // GET /products
api.getProduct(id)           // GET /products/:id
api.createProduct(data)      // POST /products
api.updateProduct(id, data)  // PATCH /products/:id
api.deleteProduct(id)        // DELETE /products/:id
api.searchProducts(query)    // GET /products/search

// Cache
api.getCacheStats()          // GET /cache/stats
api.clearCache()             // DELETE /cache/clear
```

## 🎨 Theming

Dark theme s červenými akcenty:
- Primární barva: Red (#EF4444)
- Background: Gradient z tmavě šedé
- Cards: Semi-transparent s backdrop blur
- Hover efekty pro lepší UX

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Grid se automaticky přizpůsobuje:
- Mobile: 1 sloupec
- Tablet: 2 sloupce
- Desktop: 3-4 sloupce

## 🐛 Debug Tips

### API není dostupné
```bash
# Zkontroluj, že backend běží
curl http://localhost:3001/products

# Zkontroluj NEXT_PUBLIC_API_URL v .env
cat .env
```

### TypeScript chyby
```bash
# Zkontroluj instalaci
npm install

# Restart TypeScript serveru
# V VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

### Styles se nenačítají
```bash
# Rebuild Tailwind
npm run dev
```

## 🎭 Easter Eggs

- Animované loading spinnery s emoji 🥫
- Vtipné error messages
- Hover efekty na všech interaktivních prvcích
- Cache hit indikátor se mění podle rychlosti

## 📝 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🏗️ Build

```bash
# Production build
npm run build

# Start production server
npm start
```

## 🐳 Docker

Multi-stage build pro optimální velikost:
- Stage 1: Dependencies
- Stage 2: Build
- Stage 3: Production runtime

Finální image: ~100MB

---

Made with ❤️ and 😱 for traumatic experiences
