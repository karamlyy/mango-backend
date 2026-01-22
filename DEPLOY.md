# Railway Deployment - Tez Təlimat

## Railway-də Build Settings

Railway Dashboard → Settings → Deploy:

**Build Command:**
```bash
npm run build:railway
```

**Start Command:**
```bash
npm run start:prod
```

## Environment Variables

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this
```

> `DATABASE_URL` Railway avtomatik təyin edir.

## Deploy

1. GitHub-a push et
2. Railway avtomatik deploy edəcək
3. Migration avtomatik işləyəcək ✅

## Problem varsa?

[RAILWAY_DEPLOYMENT.az.md](file:///Users/karamafandi/BackendProjects/mango-backend/RAILWAY_DEPLOYMENT.az.md) faylına bax.
