import { createHmac } from 'node:crypto';
import { Router } from 'express';
import { prisma } from '../config/prisma';
import env from '../config/env';
import { requireSecret } from '../middlewares/requireSecret';
import { adminRateLimit, analyticsRateLimit } from '../middlewares/rateLimit';

const router = Router();

router.post('/visit', analyticsRateLimit, async (req, res, next) => {
  try {
    const path =
      typeof req.body?.path === 'string' && req.body.path.length <= 500
        ? req.body.path
        : '/';
    const userAgent =
      typeof req.headers['user-agent'] === 'string'
        ? req.headers['user-agent'].slice(0, 1000)
        : '';
    const ipHash = createHmac('sha256', env.ADMIN_SECRET)
      .update(req.ip || 'unknown')
      .digest('hex');

    await prisma.visitor.create({
      data: { ipHash, userAgent, path },
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    return next(error);
  }
});

router.get('/stats', adminRateLimit, requireSecret, async (_req, res, next) => {
  try {
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [totalVisits, recentVisits, aggregate] = await Promise.all([
      prisma.visitor.count(),
      prisma.visitor.count({ where: { createdAt: { gte: last30Days } } }),
      prisma.visitor.aggregateRaw({
        pipeline: [
          { $match: { createdAt: { $gte: { $date: last30Days.toISOString() } } } },
          { $group: { _id: '$path', visits: { $sum: 1 } } },
          { $sort: { visits: -1 } },
          { $limit: 10 },
          { $project: { _id: 0, path: '$_id', visits: 1 } },
        ],
      }),
    ]);

    const topPages = Array.isArray(aggregate)
      ? aggregate.flatMap((item) => {
          if (
            typeof item === 'object' &&
            item !== null &&
            'path' in item &&
            typeof item.path === 'string' &&
            'visits' in item &&
            typeof item.visits === 'number'
          ) {
            return [{ path: item.path, visits: item.visits }];
          }
          return [];
        })
      : [];

    return res.json({ totalVisits, recentVisits, topPages });
  } catch (error) {
    return next(error);
  }
});

export default router;
