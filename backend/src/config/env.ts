import { z } from 'zod';

const schema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.string().default('development'),
  GITHUB_USERNAME: z.string().min(1, 'Defina GITHUB_USERNAME no .env'),
  GITHUB_TOKEN: z.string().optional(),
  CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(300),
  GITHUB_PER_PAGE: z.coerce.number().int().min(1).max(100).default(100),
  GITHUB_MAX_PAGES: z.coerce.number().int().min(1).max(10).default(2),
  DATABASE_URL: z.string().optional(),
  ENABLE_DB_SYNC: z.coerce.boolean().default(false),
  FRONTEND_URL: z.string().optional(),
});

const parsed = schema.parse(process.env);

export default parsed;
