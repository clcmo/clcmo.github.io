import 'dotenv/config';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env';
import { errorHandler } from './middlewares/error.middleware';
import { projectsRouter } from './routes/projects';
import analyticsRoutes from './routes/analytics.routes';
import githubRoutes from './routes/github.routes';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());

const allowedOrigins = new Set([
  'https://clcmo.github.io',
  'https://dev.camilaloliveira.me',
  ...(env.FRONTEND_URL ? [env.FRONTEND_URL] : []),
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
app.use(express.json());
app.use(morgan('tiny'));
app.use(compression());

app.use('/api', projectsRouter);
app.use('/api/github', githubRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'Gitmilla Projects API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      projects: '/api/projects',
      sync: '/api/github/sync',
      analytics: '/api/analytics',
    },
  });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta ${env.PORT} (env: ${env.NODE_ENV})`);
});
