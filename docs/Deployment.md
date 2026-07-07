# NexHeal Deployment Guide

## Prerequisites
- Docker & Docker Compose
- Node.js 20+
- PostgreSQL 15
- Redis 7

## Environment Configuration
Ensure you have created a `.env` file based on `.env.example` in both the `web` and `backend` directories.

## Docker Deployment (Recommended)
NexHeal provides a `docker-compose.yml` for unified orchestration.

```bash
# Start all services in detached mode
docker-compose up -d
```

Services will be exposed at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Database: `localhost:5432`
- Redis: `localhost:6379`

## Manual Deployment

### Database Initialization
```bash
cd backend
npx prisma generate
npx prisma db push # Or prisma migrate deploy for production
```

### Starting the Backend
```bash
cd backend
npm run build
npm start
```

### Starting the Frontend
```bash
cd web
npm run build
npm start
```
