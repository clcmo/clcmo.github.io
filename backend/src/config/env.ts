import { z } from 'zod';

const corsOrigins = z
  .string()
  .default('')
  .transform((value) =>
    value
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
  .pipe(
    z.array(
      z
        .string()
        .url()
        .refine((value) => new URL(value).origin === value, 'Informe apenas origens, sem caminhos'),
    ),
  );

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5555),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'Defina DATABASE_URL no ambiente'),
  GITHUB_USERNAME: z.string().min(1, 'Defina GITHUB_USERNAME no ambiente'),
  GITHUB_TOKEN: z.string().optional(),
  ADMIN_SECRET: z.string().min(16, 'ADMIN_SECRET precisa ter pelo menos 16 caracteres'),
  CORS_ORIGINS: corsOrigins,
  GITHUB_PER_PAGE: z.coerce.number().int().min(1).max(100).default(100),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  const issues = result.error.issues
    .map((issue) => `${issue.path.join('.') || 'ambiente'}: ${issue.message}`)
    .join('; ');
  throw new Error(`Configuração inválida: ${issues}`);
}

const env = result.data;
export default env;
