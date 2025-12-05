# 🚀 Quick Start Guide - Trauma In A Can™

Rychlý návod jak rozběhnout frontend aplikaci.

## ⚡ Rychlý start (5 minut)

### 1. Clone repo a vstup do složky
```bash
cd "Trauma In A Can™"
```

### 2. Install dependencies
```bash
cd frontend
npm install
```

### 3. Vytvoř .env soubor
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Nebo ručně vytvoř .env s obsahem:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Spusť dev server
```bash
npm run dev
```

### 5. Otevři v prohlížeči
```
http://localhost:3000
```

## 🐳 S Dockerem (ještě rychlejší)

```bash
# Z root složky
docker-compose up frontend
```

## ✅ Checklist

- [ ] Node.js 20+ nainstalovaný
- [ ] npm install proběhl
- [ ] .env soubor existuje
- [ ] Backend běží na :3001
- [ ] Frontend běží na :3000
- [ ] Můžeš vidět produkty v prohlížeči

## 🐛 Nejčastější problémy

### "Cannot connect to backend"
```bash
# Zkontroluj že backend běží
curl http://localhost:3001/products

# Pokud ne, spusť backend:
cd ../backend
npm install
npm run start:dev
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
# Zastaví proces na portu 3000
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Nebo změň port
npm run dev -- -p 3001
```

## 📚 Další kroky

1. **Backend setup** - Následuj instrukce v `backend/README.md`
2. **Database** - Nastav PostgreSQL a Redis podle `database/README.md`
3. **Production build** - `npm run build && npm start`

## 🎯 Co můžeš dělat?

- ✅ Procházet produkty
- ✅ Vyhledávat podle názvu
- ✅ Filtrovat podle kategorií
- ✅ Zobrazit detail produktu
- ✅ Přidat nový produkt
- ✅ Editovat produkt
- ✅ Smazat produkt
- ✅ Sledovat cache statistiky

## 🎨 Customizace

### Změna barev
`frontend/tailwind.config.js` - sekce `theme.colors`

### Změna layoutu
`frontend/src/app/layout.tsx`

### Přidání nové stránky
`frontend/src/app/[nova-stranka]/page.tsx`

## 💡 Tips

- Použij React DevTools pro debugging
- Hot reload je zapnutý automaticky
- TypeScript chyby vidíš v terminálu i editoru
- Tailwind IntelliSense zrychlí development

---

Need help? Check the main README.md or frontend/README.md
