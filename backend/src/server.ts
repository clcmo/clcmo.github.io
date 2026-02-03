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

// ✅ use array para o cors() (compatível)
// ✅ use Set para checagem rápida no middleware manual
const allowedOriginsArray = [
  'http://localhost:8081',
  'http://localhost:19006',
  'http://localhost:19000',
  'https://clcmo.github.io',
  'https://dev.camilaloliveira.me',
];

const allowedOriginsSet = new Set(allowedOriginsArray);

/**
 * ✅ Middleware "na marra" para garantir CORS no preflight
 * Coloque ANTES do helmet/cors para evitar interferências.
 */
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (typeof origin === 'string' && allowedOriginsSet.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    // ✅ Se você NÃO usa cookies, mantenha isso fora:
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // ✅ Responde preflight imediatamente
  if (req.method === 'OPTIONS') return res.sendStatus(204);

  next();
});

// ✅ Agora pode aplicar helmet
app.use(helmet());

// ✅ CORS normal (para as requisições "reais", não só OPTIONS)
app.use(cors({
  origin: allowedOriginsArray,
  credentials: false, // ✅ deixe false se você não usa cookies
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.options('*', cors({
  origin: allowedOriginsArray,
  credentials: false,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

app.use(express.json());
app.use(compression());
app.use(morgan('tiny'));

app.get('/', (_req, res) => {
  res.json({
    message: 'Gitmilla Projects API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      projects: '/api/projects',
      analytics: '/api/analytics'
    }
  });
});

// ✅ marcador de build (ótimo!)
app.get('/health', (_req, res) =>
  res.json({ ok: true, build: 'cors-fix-2026-02-03-1519' })
);

app.use('/api/projects', projectsRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(errorHandler);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta ${env.PORT} (env: ${env.NODE_ENV})`);
});