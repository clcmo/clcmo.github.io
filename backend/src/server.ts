import 'dotenv/config';
import env from './config/env'; // se seu env.ts faz export default; se não, ajuste
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import projectsRoutes from './routes/project.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/projects', projectsRoutes);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`API rodando na porta ${env.PORT} (env: ${env.NODE_ENV})`);
});
