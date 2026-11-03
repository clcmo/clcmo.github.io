import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireSecret } from '../middlewares/requireSecret';
import { syncRateLimit } from '../middlewares/rateLimit';
import { syncRepos } from '../services/githubSync';

const router = Router();

router.get('/repos', async (_req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        visibility: 'public',
        archived: false,
        OR: [{ hidden: false }, { hidden: null }],
      },
      orderBy: { pushedAt: 'desc' },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post('/sync', syncRateLimit, requireSecret, async (_req, res, next) => {
  try {
    res.json(await syncRepos());
  } catch (error) {
    next(error);
  }
});

router.get('/last-sync', async (_req, res, next) => {
  try {
    const lastSync = await prisma.gitHubSync.findFirst({ orderBy: { lastSync: 'desc' } });
    res.json(lastSync ?? { status: 'not-synced', lastSync: null });
  } catch (error) {
    next(error);
  }
});

export default router;
