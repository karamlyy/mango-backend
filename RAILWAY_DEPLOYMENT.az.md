# Railway Deployment Guide

## Addım-addım Railway-də Deploy

### 1. Railway Proyekti Yarat

1. [Railway.app](https://railway.app)-da qeydiyyatdan keç
2. "New Project" → "Deploy from GitHub repo"
3. `mango-backend` repo-nu seç

### 2. PostgreSQL Əlavə Et

1. Proyektdə "New" → "Database" → "Add PostgreSQL"
2. Railway avtomatik olaraq `DATABASE_URL` environment variable yaradacaq

### 3. Environment Variables Təyin Et

Railway Dashboard-da "Variables" sekmesində:

```env
NODE_ENV=production
JWT_SECRET=railway-super-secret-key-change-this-12345
PORT=3000
```

> **Qeyd:** `DATABASE_URL` Railway tərəfindən avtomatik təyin olunur, əlavə etməyə ehtiyac yoxdur.

### 4. Build Command Düzəlt

Railway Settings-də:

**Build Command:**
```bash
npm install && npm run build && npm run migration:run
```

**Start Command:**
```bash
npm run start:prod
```

### 5. Deploy Et

Railway avtomatik deploy edəcək. Logs-da yoxlayın:
- ✅ Dependencies yükləndi
- ✅ Build uğurlu oldu
- ✅ Migrations işə düşdü
- ✅ Server başladı

## Alternative: Manual Migration

Əgər build zamanı migration işləməsə:

1. Railway proyektində terminal açın (sağ üst küncdə)
2. Əmri işə salın:
```bash
npm run migration:run
```

## Environment Variables (Tam Siyahı)

Railway-də bu dəyişənləri təyin edin:

| Variable | Dəyər | Qeyd |
|----------|-------|------|
| NODE_ENV | production | Məcburi |
| JWT_SECRET | güclü-şifrə | Təhlükəsizlik üçün uzun random string |
| PORT | 3000 | Railway avtomatik istifadə edir |
| DATABASE_URL | - | Railway avtomatik təyin edir |

## Migration Əmrləri

### Lokal Development
```bash
# Yeni migration yarat
npm run migration:create -- src/migrations/MigrationName

# Migration işə sal
npm run migration:run

# Son migration-ı geri al
npm run migration:revert
```

### Railway Production
```bash
# Railway terminal-da
npm run migration:run
```

## Troubleshooting

### "relation users does not exist" Xətası

**Problem:** Migration işə düşməyib, cədvəllər yaradılmayıb.

**Həll:**
1. Railway terminal-da `npm run migration:run` işə sal
2. Və ya build command-ə `&& npm run migration:run` əlavə et

### Database Connection Error

**Problem:** PostgreSQL service işləmir

**Həll:**
1. PostgreSQL service-in işlədiyini yoxla
2. `DATABASE_URL` dəyişəninin olduğunu təsdiq et

### Build Failed

**Problem:** Dependencies yüklənmədi

**Həll:**
1. `package.json`-da bütün dependencies-lərin olduğunu yoxla
2. Railway-də Node.js versiyasını yoxla (v18+)

## Production URL

Deploy olduqdan sonra:
```
https://your-project.up.railway.app
```

Swagger dokumentasiya:
```
https://your-project.up.railway.app/api
```

## Healthcheck

Test endpoint:
```bash
curl https://your-project.up.railway.app/
```

## Logs Yoxlama

Railway Dashboard → Deployments → View Logs

Axtarın:
- `Application is running on: ...`
- `Swagger documentation: ...`

## Database Backup

Railway dashboard-dan:
1. PostgreSQL service aç
2. "Data" tab
3. Export data

---

## Tez Düzəliş (Quick Fix)

Əgər migration problemi varsa, müvəqqəti həll:

**app.module.ts**-də dəyişiklik et (yalnız test üçün):
```typescript
synchronize: true, // Production üçün təhlükəlidir!
```

> ⚠️ **Diqqət:** Production-da `synchronize: true` istifadə etməyin! Yalnız migration düzələnə qədər.
