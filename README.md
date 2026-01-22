# Mango Backend

A production-ready NestJS backend template with JWT authentication and user management.

## Features

- **Authentication**: JWT-based authentication with access and refresh tokens
- **User Management**: Complete user CRUD operations with role-based access control
- **Database**: PostgreSQL with TypeORM
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Validation**: Request validation using class-validator
- **Security**: Password hashing with bcrypt, JWT guards, and role-based guards
- **TypeScript**: Full TypeScript support
- **Code Quality**: ESLint and Prettier configured

## Project Structure

```
mango-backend/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── roles.guard.ts
│   │   ├── public.decorator.ts
│   │   └── roles.decorator.ts
│   ├── users/                # Users module
│   │   ├── dto/
│   │   ├── user.entity.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── common/               # Shared utilities
│   │   └── enums/
│   │       └── user-role.enum.ts
│   ├── app.module.ts         # Root module
│   ├── main.ts               # Application entry point
│   └── data-source.ts        # TypeORM configuration
├── .env.example              # Environment variables template
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
```bash
cd mango-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=mango_db
JWT_SECRET=your-secret-key-change-this-in-production
PORT=3000
NODE_ENV=development
```

4. **Create database**
```bash
createdb mango_db
```
Or using PostgreSQL CLI:
```sql
CREATE DATABASE mango_db;
```

## Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

The application will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## API Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "USER"
  }
}
```

### Users

#### Get Profile (Protected)
```http
GET /users/me
Authorization: Bearer {accessToken}
```

#### Update Profile (Protected)
```http
PATCH /users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "phoneNumber": "+1234567890"
}
```

## Database Migrations

Generate a new migration:
```bash
npm run migration:generate -- src/migrations/MigrationName
```

Run migrations:
```bash
npm run migration:run
```

Revert last migration:
```bash
npm run migration:revert
```

## User Roles

The template includes two default roles:
- **USER**: Regular user with basic access
- **ADMIN**: Administrator with elevated privileges

You can extend roles in `src/common/enums/user-role.enum.ts`

## Guards and Decorators

### @Public()
Mark routes as public (skip JWT authentication):
```typescript
@Public()
@Get('public-route')
getPublicData() {
  return 'This is public';
}
```

### @Roles()
Restrict routes to specific roles:
```typescript
@Roles(UserRole.ADMIN)
@Get('admin-only')
getAdminData() {
  return 'Admin only data';
}
```

## Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

Check coverage:
```bash
npm run test:cov
```

## Code Quality

Format code:
```bash
npm run format
```

Lint code:
```bash
npm run lint
```

## Extending the Template

### Adding a New Module

1. Generate module:
```bash
nest g module feature-name
nest g controller feature-name
nest g service feature-name
```

2. Create entity in `src/feature-name/feature.entity.ts`
3. Create DTOs in `src/feature-name/dto/`
4. Import module in `app.module.ts`

### Adding Relations

Modify entities to include TypeORM relations:
```typescript
@ManyToOne(() => User, (user) => user.posts)
user: User;
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USERNAME | Database username | postgres |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | mango_db |
| JWT_SECRET | Secret key for JWT | - |
| PORT | Application port | 3000 |
| NODE_ENV | Environment | development |

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
