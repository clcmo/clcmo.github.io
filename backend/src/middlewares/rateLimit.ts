import { rateLimit } from 'express-rate-limit';

export const syncRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de sincronizações atingido; tente novamente mais tarde' },
});

export const analyticsRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Limite de visitas atingido; tente novamente em breve' },
});
