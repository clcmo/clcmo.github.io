import type { RequestHandler } from 'express';
import { timingSafeEqual } from 'crypto';

/** Protege rotas de escrita/sync com o header x-admin-secret. */
export const requireSecret: RequestHandler = (req, res, next) => {
  const expected = Buffer.from(process.env.ADMIN_SECRET ?? '');
  const given = Buffer.from(String(req.header('x-admin-secret') ?? ''));
  if (!expected.length || expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  next();
};
