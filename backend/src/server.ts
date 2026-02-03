import 'dotenv/config';
import env from './config/env';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import projectsRoutes from './routes/project.routes';
import analyticsRoutes from './routes/analytics.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// Para IP correto atrás do Railway/proxy
app.set('trust proxy', 1);

const allowedOriginsArray = [
  'http://localhost:8081',
  'http://localhost:19006',
  'http://localhost:19000',
  'https://clcmo.github.io',
  'https://dev.camilaloliveira.me',
];

const allowedOriginsSet = new Set(allowedOriginsArray);

/**
 * Middleware "na marra" para garantir CORS no preflight
 * (foi esse que fez aparecer o Access-Control-Allow-Origin)
 */
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (typeof origin === 'string' && allowedOriginsSet.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(helmet());

app.use(cors({
  origin: allowedOriginsArray,
  credentials: false, // ok se você não usa cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors({
  origin: allowedOriginsArray,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Logs e compressão para todas as rotas
app.use(morgan('tiny'));
app.use(compression());

// Rotas
app.use('/api/projects', projectsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Endpoints básicos
app.get('/', (_req, res) => {
  res.json({
    message: 'Gitmilla Projects API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      projects: '/api/projects',
      analytics: '/api/analytics',
    },
  });
});

app.get('/health', (_req, res) =>
  res.json({ ok: true, build: 'cors-fix-2026-02-03-1519' })
);

// Handler de erro (sempre por último)
app.use(errorHandler);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta ${env.PORT} (env: ${env.NODE_ENV})`);
});