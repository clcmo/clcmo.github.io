import { Router } from 'express';
import { getDb } from '../lib/mongo';

const router = Router();
const COLLECTION = 'Visit';

/**
 * POST /api/analytics/visit
 * Track page visit
 */
router.post('/visit', async (req, res) => {
  try {
    const path = typeof req.body?.path === 'string' ? req.body.path : '/';

    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : undefined) ||
      req.ip ||
      'unknown';

    const userAgent =
      typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : '';

    const db = await getDb();
    const collection = db.collection(COLLECTION);

    await collection.insertOne({
      path,
      ip,
      userAgent,
      createdAt: new Date(),
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error('❌ Error tracking visit:', error);
    return res.status(500).json({ error: 'Failed to track visit' });
  }
});

/**
 * GET /api/analytics/stats
 * Get analytics statistics
 */
router.get('/stats', async (_req, res) => {
  try {
    const db = await getDb();
    const collection = db.collection(COLLECTION);

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const totalVisits = await collection.countDocuments({});
    const recentVisits = await collection.countDocuments({
      createdAt: { $gte: last30Days },
    });

    const topPages = await collection
      .aggregate([
        { $match: { createdAt: { $gte: last30Days } } },
        { $group: { _id: '$path', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
        { $limit: 10 },
        { $project: { _id: 0, path: '$_id', visits: 1 } },
      ])
      .toArray();

    return res.json({ totalVisits, recentVisits, topPages });
  } catch (error) {
    console.error('❌ Error fetching analytics stats:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;