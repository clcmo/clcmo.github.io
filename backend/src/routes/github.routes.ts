import { Router } from 'express';
import { GitHubService } from '../services/github.service';

const router = Router();
const githubService = new GitHubService();

/**
 * @route   GET /api/github/repos
 * @desc    Get GitHub repositories
 * @access  Public
 */
router.get('/repos', async (req, res) => {
  try {
    const repos = await githubService.fetchRepositories();
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
router.post('/sync', async (req, res) => {
  try {
    const result = await githubService.syncProjectsWithGitHub();
    res.json(result);
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
router.get('/last-sync', async (req, res) => {
  try {
    const lastSync = await githubService.getLastSync();
    res.json(lastSync);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch last sync info',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
