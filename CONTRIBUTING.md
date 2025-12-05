# 🤝 Contributing to Trauma In A Can™

Děkujeme za zájem přispět k projektu! Tento dokument poskytuje guidelines.

## 📋 Jak přispět

### 1. Fork & Clone
```bash
# Fork repo na GitHubu
# Pak clone:
git clone https://github.com/YOUR_USERNAME/Trauma-In-A-Can.git
cd Trauma-In-A-Can
```

### 2. Vytvoř branch
```bash
git checkout -b feature/amazing-feature
# nebo
git checkout -b fix/terrible-bug
```

### 3. Proveď změny
- Piš čistý, čitelný kód
- Drž se existující code style
- Přidej komentáře kde je to potřeba
- Aktualizuj dokumentaci

### 4. Commit
```bash
git add .
git commit -m "feat: add amazing feature"
```

**Commit message format:**
- `feat:` nová funkce
- `fix:` oprava bugu
- `docs:` změny v dokumentaci
- `style:` formátování, chybějící středníky, etc.
- `refactor:` refactoring kódu
- `test:` přidání testů
- `chore:` údržba, dependencies

### 5. Push & Pull Request
```bash
git push origin feature/amazing-feature
```

Pak vytvoř Pull Request na GitHubu.

## 🎯 Guidelines

### Code Style

#### TypeScript
```typescript
// ✅ Good
interface Product {
  id: number;
  name: string;
}

// ❌ Bad
type Product = {
  id: number,
  name: string,
}
```

#### React Components
```typescript
// ✅ Good
export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  
  return <div>...</div>;
}

// ❌ Bad
export default function ProductCard(props: any) {
  return <div>...</div>;
}
```

#### CSS/Tailwind
```tsx
// ✅ Good - Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-gray-800">

// ❌ Bad - Custom inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

### Naming Conventions

- **Components**: PascalCase (`ProductCard.tsx`)
- **Files**: camelCase (`api.ts`, `mockData.ts`)
- **Variables**: camelCase (`userName`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
- **Types/Interfaces**: PascalCase (`Product`, `CacheStats`)

### Struktura souborů

```
frontend/src/
├── app/              # Next.js pages
├── components/       # Reusable components
├── lib/             # Utilities, API client
├── types/           # TypeScript types
└── public/          # Static assets
```

### Commit best practices

```bash
# ✅ Good commits
git commit -m "feat: add search functionality to product list"
git commit -m "fix: resolve cache invalidation issue on update"
git commit -m "docs: update API documentation"

# ❌ Bad commits
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "WIP"
```

## 🧪 Testing

Před submitem PR:

```bash
# Zkontroluj TypeScript errors
npm run type-check

# Zkontroluj linting
npm run lint

# Build test
npm run build
```

## 📝 Pull Request Template

```markdown
## Popis změn
Krátký popis co bylo změněno a proč.

## Typ změny
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Kód funguje lokálně
- [ ] TypeScript errors vyřešeny
- [ ] Dokumentace aktualizována
- [ ] Commit messages jsou jasné

## Screenshots (pokud relevantní)
```

## 🎨 Design Guidelines

### Barvy
- Primary: Red (#EF4444)
- Background: Gray-900 (#111827)
- Text: Gray-100 (#E5E7EB)

### Spacing
- Používej Tailwind spacing scale (p-4, m-2, etc.)
- Consistent margins mezi sekcemi

### Typography
- Headings: Bold, white
- Body: Regular, gray-300
- Small text: text-sm, gray-500

## 🚫 Co NEDĚLAT

- ❌ Commitovat `node_modules/`
- ❌ Commitovat `.env` soubory
- ❌ Commitovat personal credentials
- ❌ Mazat existující funkčnost bez diskuze
- ❌ Psát kód bez TypeScript typů
- ❌ Ignorovat linting errors

## 💡 Ideas for Contributions

### Frontend
- [ ] Loading skeletons
- [ ] Image upload functionality
- [ ] Product reviews system
- [ ] Shopping cart
- [ ] Checkout process
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Dark/Light mode toggle
- [ ] Internationalization (i18n)

### Backend
- [ ] User authentication
- [ ] Product reviews API
- [ ] Order management
- [ ] Email notifications
- [ ] Image upload to S3
- [ ] Rate limiting
- [ ] API documentation (Swagger)
- [ ] Unit tests
- [ ] Integration tests

### DevOps
- [ ] CI/CD pipeline
- [ ] Kubernetes deployment
- [ ] Monitoring (Prometheus)
- [ ] Logging (ELK stack)

### Documentation
- [ ] API documentation
- [ ] Component documentation (Storybook)
- [ ] Video tutorials
- [ ] Architecture diagrams

## ❓ Questions?

- Open an issue na GitHubu
- Check existing issues
- Read documentation v README.md

## 📄 License

Přispíváním souhlasíš s MIT licencí projektu.

---

Děkujeme za tvůj příspěvek! 🥫❤️
