import type { RequestHandler } from 'express';
import { timingSafeEqual } from 'crypto';
import env from '../config/env';

export const requireSecret: RequestHandler = (req, res, next) => {
  const expected = Buffer.from(env.ADMIN_SECRET);
  const given = Buffer.from(String(req.header('x-admin-secret') ?? ''));
  if (!expected.length || expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  next();
};
