import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { PrismaClient } from '@prisma/client';

import { notFound, errorHandler } from './middlewares/errorMiddleware';
import { rateLimiter } from './middlewares/rateLimiter';
import { requestContext } from './middlewares/requestContext';
import { Logger } from './infrastructure/logger/Logger';
import { WebSocketManager } from './infrastructure/websocket/WebSocketManager';

import authRoutes from './routes/authRoutes';
import aiRoutes from './routes/aiRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import ehrRoutes from './routes/ehrRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// Initialize WebSocket Manager
WebSocketManager.initialize(server);

// ==========================================
// SYSTEM HARDENING & INFRASTRUCTURE
// ==========================================

// 1. Observability
app.use(requestContext);
app.use(morgan('dev'));

// 2. Security Hardening
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS Hardening
const envOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
const allowedOrigins = [...new Set([...envOrigins, 'http://localhost:3000', 'https://nex-heal.vercel.app'])];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// 3. Performance
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Rate Limiting
app.use(rateLimiter);

// ==========================================
// HEALTH CHECKS
// ==========================================

app.get('/api/health/liveness', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Liveness OK' });
});

app.get('/api/health/readiness', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    // In a real app, also check Redis connection here
    res.status(200).json({ status: 'success', message: 'Readiness OK', database: 'connected' });
  } catch (error) {
    Logger.error('Readiness check failed', error);
    res.status(503).json({ status: 'error', message: 'Service Unavailable' });
  }
});

// ==========================================
// API VERSIONING
// ==========================================

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/ai', aiRoutes);
apiRouter.use('/dashboard', dashboardRoutes);
apiRouter.use('/ehr', ehrRoutes);
apiRouter.use('/appointments', appointmentRoutes);
apiRouter.use('/analytics', analyticsRoutes);

app.use('/api/v1', apiRouter);

// Fallback for backward compatibility with previous sprints
app.use('/api', apiRouter);

// ==========================================
// ERROR HANDLING
// ==========================================
app.use(notFound);
app.use(errorHandler);

// ==========================================
// STARTUP & GRACEFUL SHUTDOWN
// ==========================================
const port = process.env.PORT || 5000;

server.listen(port, () => {
  Logger.info(`Server is running at http://localhost:${port}`);
});

const gracefulShutdown = async (signal: string) => {
  Logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  server.close(async () => {
    Logger.info('HTTP server closed.');
    
    // Disconnect WebSockets
    WebSocketManager.close();

    // Disconnect Database
    await prisma.$disconnect();
    Logger.info('Database connection closed.');

    // In a real app: disconnect Redis, Stop Queues here
    
    Logger.info('Graceful shutdown completed. Exiting process.');
    process.exit(0);
  });

  // Force close if taking too long
  setTimeout(() => {
    Logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
