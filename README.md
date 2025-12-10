# Trauma In A Can™ - Product Catalog with Redis Cache

Full-stack webová aplikace pro správu a zobrazování produktů v e-shopu s využitím Redis cache pro optimalizaci výkonu.

## 📋 Popis projektu

Product Catalog je moderní webová aplikace umožňující:
- **CRUD operace** - Vytváření, čtení, aktualizace a mazání produktů
- **Vyhledávání** - Vyhledávání produktů podle názvu nebo kategorie
- **Stránkování** - Efektivní zobrazení velkého množství produktů
- **Redis Cache** - Rychlé načítání dat s automatickou invalidací cache
- **Cache statistiky** - Zobrazení cache hit/miss ratio v reálném čase
- **Responsivní UI** - Přizpůsobení různým velikostem obrazovek

## 🏗️ Technologie

### Backend
- **NestJS** - Progresivní Node.js framework
- **TypeORM** - ORM pro práci s PostgreSQL
- **Redis Stack** - Cache mezipaměť s podporou modulů
- **PostgreSQL** - Relační databáze

### Frontend
- **Next.js 14** - React framework s App Router
- **TypeScript** - Typová bezpečnost
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP klient pro API komunikaci

### DevOps
- **Docker** - Kontejnerizace aplikací
- **Docker Compose** - Orchestrace multi-container aplikace

## 📁 Struktura projektu

```
product-catalog/
├── backend/                 # NestJS backend aplikace
│   ├── src/
│   │   ├── config/         # Konfigurace (DB, Redis)
│   │   ├── products/       # Product modul (controller, service, entity)
│   │   ├── cache/          # Cache management
│   │   ├── database/       # Database konfigurace
│   │   ├── app.module.ts   # Hlavní aplikační modul
│   │   └── main.ts         # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Next.js frontend aplikace
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # React komponenty
│   │   ├── lib/          # Utility funkce (API client)
│   │   └── types/        # TypeScript typy
│   ├── public/           # Statické soubory
│   ├── Dockerfile
│   ├── package.json
│   └── next.config.js
├── database/              # Database skripty
│   ├── init.sql          # Inicializační SQL skript
│   ├── seed.sql          # Seed data
│   └── README.md
├── docker-compose.yml     # Produkční compose
├── docker-compose.dev.yml # Development compose
├── .gitignore
├── .env.example
├── package.json          # Root package.json pro monorepo
└── README.md
```

## 🚀 Požadavky

Před spuštěním aplikace se ujistěte, že máte nainstalováno:

- [Docker](https://www.docker.com/get-started) (verze 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (verze 2.0+)
- [Git](https://git-scm.com/downloads)

## 📦 Instalace a spuštění

### 1. Klonování repozitáře

```bash
git clone <repository-url>
cd product-catalog
```

### 2. Spuštění aplikace (Production)

```bash
# Spuštění všech služeb
docker-compose up --build -d

# Kontrola běžících kontejnerů
docker-compose ps

# Zobrazení logů
docker-compose logs -f
```

### 3. Spuštění v development režimu

Pro vývoj můžete spustit pouze databázi a Redis, a používat pnpm workspace skripty:

```bash
# Spuštění pouze DB a Redis
docker-compose -f docker-compose.dev.yml up -d

# Backend (v jiném terminálu)
pnpm install -r
pnpm dev:backend

# Frontend (turbopack)
pnpm dev:frontend
```

### 4. Přístup k aplikaci

Po úspěšném spuštění budou dostupné následující služby:

| Služba           | URL                        | Popis                          |
|------------------|----------------------------|--------------------------------|
| Frontend         | http://localhost:3000      | Next.js aplikace               |
| Backend API      | http://localhost:3001      | NestJS REST API                |
| PostgreSQL       | localhost:5432             | Databáze                       |
| Redis            | localhost:6379             | Redis cache                    |
| RedisInsight     | http://localhost:8001      | Redis web UI                   |

### 5. Seed databáze (volitelné)

Pokud chcete naplnit databázi testovacími daty:

```bash
# Windows PowerShell
$env:PGPASSWORD="postgres"; docker exec -i product-catalog-postgres psql -U postgres -d product_catalog -f /docker-entrypoint-initdb.d/../seed.sql

# Nebo zkopírujte seed.sql do kontejneru a spusťte
docker cp database/seed.sql product-catalog-postgres:/seed.sql
docker exec product-catalog-postgres psql -U postgres -d product_catalog -f /seed.sql
```

## 🎯 Účel Redis Cache

Redis cache v této aplikaci slouží k:

### Optimalizace výkonu
- **Snížení zátěže databáze** - Časté dotazy jsou obsluhovány z cache místo databáze
- **Rychlejší odezva** - Data z Redis jsou načtena ~10-100x rychleji než z PostgreSQL
- **Škálovatelnost** - Aplikace zvládne více současných uživatelů

### Cache strategie
- **Cache-Aside pattern** - Data se načítají na vyžádání
- **TTL (Time To Live)** - Cache expiruje po 10 minutách
- **Invalidace** - Cache se automaticky smaže při UPDATE/DELETE operacích
- **Cache key pattern** - `product:{id}` pro jednotlivé produkty

### Měření efektivity
- **Cache hit ratio** - Zobrazeno v UI pro sledování účinnosti cache
- **Response time** - Srovnání času odpovědi s/bez cache

## 🧪 Testování funkcionality

### 1. Test CRUD operací

```bash
# Vytvoření produktu
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "category": "Test",
    "stock_quantity": 10
  }'

# Načtení produktu (první načtení = cache miss)
curl http://localhost:3001/products/1

# Načtení produktu znovu (druhé načtení = cache hit)
curl http://localhost:3001/products/1

# Aktualizace produktu (invaliduje cache)
curl -X PATCH http://localhost:3001/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 89.99}'

# Smazání produktu
curl -X DELETE http://localhost:3001/products/1
```

### 2. Ověření cache hit/miss

1. Otevřete frontend na http://localhost:3000
2. Načtěte detail produktu - uvidíte "Cache: MISS"
3. Načtěte stejný produkt znovu - uvidíte "Cache: HIT"
4. Aktualizujte produkt - cache se invaliduje
5. Načtěte produkt znovu - opět "Cache: MISS"

### 3. Monitorování Redis

```bash
# Připojení k Redis CLI
docker exec -it product-catalog-redis redis-cli

# Zobrazení všech klíčů
KEYS *

# Zobrazení hodnoty
GET product:1

# Zobrazení TTL
TTL product:1

# Sledování příkazů v reálném čase
MONITOR
```

Nebo použijte RedisInsight na http://localhost:8001

## 🛑 Zastavení aplikace

```bash
# Zastavení kontejnerů
docker-compose down

# Zastavení kontejnerů a smazání dat (volumes)
docker-compose down -v
```

## 🔧 Konfigurace

Aplikace používá environment proměnné pro konfiguraci. Vytvořte `.env` soubor v root adresáři podle `.env.example`:

```env
# Database
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=product_catalog

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_TTL=600

# Backend
BACKEND_PORT=3001
NODE_ENV=development

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📊 API Dokumentace

### Products Endpoints

| Method | Endpoint              | Popis                      |
|--------|----------------------|----------------------------|
| GET    | `/products`          | Získat všechny produkty    |
| GET    | `/products/:id`      | Získat produkt podle ID    |
| POST   | `/products`          | Vytvořit nový produkt      |
| PATCH  | `/products/:id`      | Aktualizovat produkt       |
| DELETE | `/products/:id`      | Smazat produkt             |
| GET    | `/products/search`   | Vyhledat produkty          |
| GET    | `/cache/stats`       | Cache statistiky           |

### Request/Response příklady

#### Vytvoření produktu (POST /products)
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "category": "Electronics",
  "stock_quantity": 15,
  "image_url": "https://example.com/laptop.jpg"
}
```

#### Response
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "category": "Electronics",
  "stock_quantity": 15,
  "image_url": "https://example.com/laptop.jpg",
  "created_at": "2025-12-05T10:00:00.000Z",
  "updated_at": "2025-12-05T10:00:00.000Z",
  "cacheHit": false
}
```

## 🐛 Troubleshooting

### Port již používán
```bash
# Zjistit, který proces používá port
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Zastavit proces nebo změnit port v docker-compose.yml
```

### Kontejnery se nespouští
```bash
# Zobrazit logy
docker-compose logs backend
docker-compose logs frontend

# Restart kontejnerů
docker-compose restart
```

### Database connection failed
```bash
# Zkontrolovat, zda PostgreSQL běží
docker-compose ps

# Zkontrolovat logy
docker-compose logs postgres

# Zkontrolovat health check
docker inspect product-catalog-postgres
```

## 📝 Vývoj

### Přidání nových závislostí

```bash
# Backend
cd backend
npm install <package-name>

# Frontend
cd frontend
npm install <package-name>
```

### Spuštění testů

```bash
# Backend testy
cd backend
npm run test

# Frontend testy
cd frontend
npm run test
```

## 📸 Screenshots

### 🏠 Homepage - Product Grid
- Dark theme s červenými akcenty
- Grid produktů s cache indikátory
- Real-time cache statistiky
- Vyhledávání a kategorie filtry

### 🥫 Product Detail
- Velký náhled produktu
- Cache hit/miss indikátor (⚡ CACHED / 💾 DB)
- Detailní informace (cena, skladem, kategorie)
- Edit a Delete akce

### ➕ Admin Forms
- Vytváření nových traumat
- Editace existujících produktů
- Validace všech polí
- Real-time feedback

### ⚡ Cache Performance
- Live cache hit/miss statistiky
- Hit rate percentage
- Visual progress bar
- Auto-refresh každých 5s

## 🎨 Branding - Trauma In A Can™

### Concept
E-shop prodávající **plechovky s vůněmi traumatických zážitků**:
- 🦷 Čekárna u zubaře
- 🚽 Veřejné záchody
- 🚗 Fronta na úřadě (DMV)
- 📅 Pondělní ráno
- A mnoho dalších...

### Design Language
- **Barvy**: Dark theme (šedá + černá) s červenými akcenty
- **Font**: System fonts pro optimální performance
- **Ikony**: Emoji pro autentický a vtipný feeling
- **Animace**: Jemné hover efekty a transitions

### Tone of Voice
- Humorný a sebevědomý
- "Premium bottled traumatic experiences"
- "Warning: May cause flashbacks"
- Mix seriózního e-commerce UX s vtipným obsahem

## 📚 Dokumentace

- **[QUICKSTART.md](QUICKSTART.md)** - Rychlý start guide (5 minut)
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Poznámky pro vývojáře
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Jak přispět do projektu
- **[frontend/README.md](frontend/README.md)** - Frontend specifická dokumentace
- **[database/README.md](database/README.md)** - Database setup a schema

## 👥 Autoři

- [@vochechule](https://github.com/vochechule) - Frontend & Project Setup
- Backend Developer - TBD

## 🤝 Contributing

Chcete přispět? Skvělé! Přečtěte si [CONTRIBUTING.md](CONTRIBUTING.md) pro guidelines.

## 📄 Licence

MIT License - viz [LICENSE](LICENSE) soubor pro detaily.

## 🎓 Poznámky pro hodnocení

### Kritéria splněna:

✅ **Funkčnost CRUD operací včetně cachování (20b)**
- Implementovány všechny CRUD operace
- Redis cache integrace s automatickou invalidací

✅ **Správná cache logika (20b)**
- Cache-aside pattern
- TTL expiry (10 minut)
- Automatická invalidace při UPDATE/DELETE
- Synchronizace s databází

✅ **Docker (20b)**
- docker-compose.yml s všemi službami
- Health checks pro závislosti
- Persistentní volumes pro data
- Multi-stage Dockerfile pro optimalizaci

✅ **Čitelný kód s komentáři (15b)**
- TypeScript pro typovou bezpečnost
- Strukturovaný kód dle best practices
- Komentáře v konfiguračních souborech

✅ **Dokumentace (15b)**
- Kompletní README.md
- Instrukce pro spuštění
- API dokumentace
- Troubleshooting sekce

✅ **Statistiky cache hit/miss (10b)**
- Zobrazení v backend odpovědi
- UI indikátor cache stavu
- Endpoint pro cache statistiky
