# Docker

**Categoría:** Infra · **Prioridad:** 🟡 Media

---

## Por qué importa en este proyecto

Entorno de desarrollo reproducible (todos corren lo mismo), y base para el deploy en Cloud Run / K8s.

## docker-compose para desarrollo

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: gymapp
      POSTGRES_USER: gymapp
      POSTGRES_PASSWORD: gymapp
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  api:
    build: { context: ., dockerfile: Dockerfile.dev }
    volumes: [".:/app", "/app/node_modules"]
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://gymapp:gymapp@postgres:5432/gymapp
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    command: npm run start:dev

volumes:
  pgdata:
```

## Dockerfile multi-stage (producción)

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

## Comandos frecuentes

```bash
# Levantar todo
docker compose up -d

# Ver logs del API
docker compose logs -f api

# Correr migrations
docker compose exec api npx drizzle-kit migrate

# Acceder a PostgreSQL
docker compose exec postgres psql -U gymapp -d gymapp

# Rebuild tras cambiar deps
docker compose up -d --build api
```

## Recursos
- [Docker docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
