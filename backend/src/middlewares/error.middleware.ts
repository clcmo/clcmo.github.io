import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const err = error instanceof Error ? error : new Error('Erro interno');
  const status =
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number' &&
    error.status >= 400 &&
    error.status < 600
      ? error.status
      : 500;
  console.error(`[api-error] ${status}: ${err.message}`);
  const publicMessage =
    process.env.NODE_ENV !== 'production' || status < 500 ? err.message : 'Erro interno';
  res.status(status).json({
    message: publicMessage,
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}