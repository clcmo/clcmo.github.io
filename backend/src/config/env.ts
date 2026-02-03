import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().transform(val => parseInt(val, 10)).default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
  GITHUB_USERNAME: z.string().min(1, 'Defina GITHUB_USERNAME no .env'),
  GITHUB_TOKEN: z.string().optional(),
  CACHE_TTL_SECONDS: z.coerce.number().int().positive().default(300),
  GITHUB_PER_PAGE: z.coerce.number().int().min(1).max(100).default(100),
  GITHUB_MAX_PAGES: z.coerce.number().int().min(1).max(10).default(2),
  ENABLE_DB_SYNC: z.coerce.boolean().default(false),
  FRONTEND_URL: z.string().optional(),
});

const env = envSchema.parse(process.env);

export default env;