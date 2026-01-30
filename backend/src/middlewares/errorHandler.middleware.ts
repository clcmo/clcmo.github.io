import type { Request, Response, NextFunction } from 'express';

export async function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Erro interno',
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}
module.exports = errorHandler;