# Mango Backend - Qısa İstifadə Təlimatı

## 🚀 Sürətli Başlanğıc

### 1. Dependencies yüklə
```bash
cd /Users/karamafandi/BackendProjects/mango-backend
npm install
```

### 2. Environment dəyişənlərini təyin et
```bash
cp .env.example .env
```

`.env` faylını redaktə et:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=mango_db
JWT_SECRET=your-secret-key-change-this-in-production
```

### 3. Database yarat
```bash
createdb mango_db
```

### 4. Serveri işə sal
```bash
npm run start:dev
```

## 📍 API Endpoints

### Swagger Dokumentasiya
http://localhost:3000/api

### Authentication Endpoints

**Qeydiyyat:**
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "Your Name"
}
```

**Giriş:**
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Cavab:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "Your Name",
    "role": "USER"
  }
}
```

### User Endpoints (Protected)

**Profili gör:**
```bash
GET http://localhost:3000/users/me
Authorization: Bearer {accessToken}
```

**Profili yenilə:**
```bash
PATCH http://localhost:3000/users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fullName": "Updated Name",
  "phoneNumber": "+994501234567"
}
```

## 🏗️ Proyekt Strukturu

```
mango-backend/
├── src/
│   ├── auth/              # Authentication modulu
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   └── guards/decorators
│   ├── users/             # Users modulu
│   │   ├── dto/
│   │   ├── user.entity.ts
│   │   ├── users.service.ts
│   │   └── users.controller.ts
│   ├── common/            # Shared utilities
│   │   └── enums/
│   ├── app.module.ts
│   └── main.ts
```

## ⚙️ Əsas Xüsusiyyətlər

✅ **JWT Authentication** - Access və refresh tokens  
✅ **User Management** - CRUD əməliyyatları  
✅ **Password Hashing** - Bcrypt ilə təhlükəsizlik  
✅ **Role-Based Access Control** - USER və ADMIN rolları  
✅ **Database** - PostgreSQL + TypeORM  
✅ **API Documentation** - Swagger/OpenAPI  
✅ **Validation** - class-validator ilə avtomatik validasiya  

## 🔒 Guards və Decorators

### @Public() - Açıq route-lar üçün
```typescript
@Public()
@Get('public-route')
getPublicData() {
  return 'Bu açıqdır';
}
```

### @Roles() - Rol məhdudiyyəti
```typescript
@Roles(UserRole.ADMIN)
@Get('admin-only')
getAdminData() {
  return 'Yalnız adminlər üçün';
}
```

## 🗄️ Database Migration

Migration yaratmaq:
```bash
npm run migration:generate -- src/migrations/MigrationName
```

Migration işə salmaq:
```bash
npm run migration:run
```

## 📦 Yeni Modul Əlavə Etmək

```bash
nest g module posts
nest g controller posts
nest g service posts
```

Sonra `app.module.ts`-də import et.

## 🛠️ Əmrlər

```bash
npm run start:dev      # Development mode
npm run build          # Build proyekt
npm run start:prod     # Production mode
npm run lint           # Code lint
npm run format         # Code format
```

## 💡 Növbəti Addımlar

1. ✅ Dependencies yüklə və database qur
2. ✅ `.env` faylını düzəlt
3. ✅ Serveri işə sal və test et
4. 📝 Öz modullarını əlavə et
5. 🚀 Deploy et

Uğurlar! 🎉
