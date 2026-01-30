import { Router } from 'express';
import { listUserPublicRepos } from '../services/github.service';

const router = Router();

/**
 * @route   GET /api/github/repos
 * @desc    Get GitHub repositories
 * @access  Public
 */
router.get('/repos', async (_req, res) => {
  try {
    const repos = await listUserPublicRepos(process.env.GITHUB_USERNAME || '');
    res.json(repos);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch GitHub repositories',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   POST /api/github/sync
 * @desc    Sync projects with GitHub repositories
 * @access  Private (TODO: Add authentication)
 */
router.post('/sync', async (_req, res) => {
  try {
    const repos = await listUserPublicRepos(process.env.GITHUB_USERNAME || '');
    res.json({ success: true, synced: repos.length });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to sync with GitHub',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @route   GET /api/github/last-sync
 * @desc    Get last GitHub sync info
 * @access  Public
 */
router.get('/last-sync', async (_req, res) => {
  try {
    res.json({ lastSync: new Date().toISOString(), status: 'ok' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch last sync info',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
