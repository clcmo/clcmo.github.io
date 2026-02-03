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
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:8081', 
    'http://localhost:19006', 
    'http://localhost:19000',
    'https://clcmo.github.io',
    'https://clcmogithubio-production.up.railway.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(compression());
app.use(morgan('tiny'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/projects', projectsRoutes);
app.use('/api/analytics', analyticsRoutes); // ← ADICIONE ISSO
app.use(errorHandler);

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`API rodando na porta ${env.PORT} (env: ${env.NODE_ENV})`);
});