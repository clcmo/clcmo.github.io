import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @route   POST /api/analytics/visit
 * @desc    Track page visit
 * @access  Public
 */
router.post('/visit', async (req, res) => {
  try {
    const { path } = req.body;
    const ip = req.ip || 'unknown';
    const userAgent = req.headers['user-agent'] || '';

    await prisma.visitor.create({
      data: {
        ip,
        userAgent,
        path: path || '/'
      }
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

/**
 * @route   GET /api/analytics/stats
 * @desc    Get analytics statistics
 * @access  Public
 */
router.get('/stats', async (req, res) => {
  try {
    const totalVisits = await prisma.visitor.count();
    
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const recentVisits = await prisma.visitor.count({
      where: {
        createdAt: { gte: last30Days }
      }
    });

    const topPages = await prisma.visitor.groupBy({
      by: ['path'],
      _count: true,
      orderBy: { _count: { path: 'desc' } },
      take: 10
    });

    res.json({
      totalVisits,
      recentVisits,
      topPages: topPages.map(page => ({
        path: page.path,
        visits: page._count
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
