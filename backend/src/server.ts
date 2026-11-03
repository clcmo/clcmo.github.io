import 'dotenv/config';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env';
import { prisma } from './config/prisma';
import { errorHandler } from './middlewares/error.middleware';
import analyticsRouter from './routes/analytics.routes';
import { projectsRouter } from './routes/projects';
import githubRoutes from './routes/github.routes';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());

const allowedOrigins = new Set([
  'https://clcmo.github.io',
  'https://dev.camilaloliveira.com',
  'https://dev.camilaloliveira.me',
  'https://camilaloliveira.com',
  ...env.CORS_ORIGINS,
]);

app.use(
  cors({
    origin(origin, callback) {
      const localOrigin =
        env.NODE_ENV !== 'production' &&
        typeof origin === 'string' &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      if (!origin || allowedOrigins.has(origin) || localOrigin) {
        return callback(null, true);
      }
      return callback(new Error('Origem não permitida pelo CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-secret'],
  }),
);
app.use(express.json({ limit: '32kb' }));
app.use(morgan('tiny'));
app.use(compression());

app.use('/api', projectsRouter);
app.use('/api/github', githubRoutes);
app.use('/api/analytics', analyticsRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'Gitmilla Projects API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      ready: '/ready',
      projects: '/api/projects',
      sync: '/api/github/sync',
      analytics: '/api/analytics',
    },
  });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/ready', async (_req, res) => {
  try {
    await prisma.$runCommandRaw({ ping: 1 });
    return res.json({ ready: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'erro desconhecido';
    console.error(`[readiness] MongoDB indisponível: ${message}`);
    return res.status(503).json({ ready: false, error: 'Banco de dados indisponível' });
  }
});

app.use(errorHandler);

const server = app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta ${env.PORT} (env: ${env.NODE_ENV})`);
});

let shuttingDown = false;
const shutdown = (signal: string) => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Recebido ${signal}; encerrando a API...`);
  server.close(async (error) => {
    if (error) {
      console.error('Erro ao encerrar o servidor HTTP:', error.message);
      process.exitCode = 1;
    }
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      const message =
        disconnectError instanceof Error ? disconnectError.message : 'erro desconhecido';
      console.error(`Erro ao encerrar Prisma: ${message}`);
      process.exitCode = 1;
    }
  });
};

process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));

export { app, server };
