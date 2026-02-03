import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ⚠️ Rotas específicas PRIMEIRO
router.get('/test/connection', async (_req, res) => {
  try {
    await prisma.$connect();
    const count = await prisma.project.count();
    res.json({ 
      status: 'connected',
      projectCount: count,
      message: 'Database connection OK'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Rotas genéricas DEPOIS
router.get('/', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { stars: 'desc' }
    });

    const serializedProjects = projects.map(project => ({
      ...project,
      githubId: project.githubId.toString()
    }));

    res.json(serializedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


/**
 * @route   POST /api/projects/sync
 * @desc    Sync projects from GitHub
 * @access  Public
 */
router.post('/sync', async (_req, res) => {
  try {
    // Importa a função de sync
    const syncModule = await import('../scripts/syncGitHub');
    const { syncGitHubProjects } = syncModule;
    
    console.log('🚀 Iniciando sincronização via API...');
    const result = await syncGitHubProjects();
    
    res.json({ 
      message: 'Sync completed successfully',
      projectsSynced: result.count,
      status: result.status
    });
  } catch (error) {
    console.error('❌ Error syncing projects:', error);
    res.status(500).json({ 
      error: 'Failed to sync projects',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const serializedProject = {
      ...project,
      githubId: project.githubId.toString()
    };

    res.json(serializedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

export default router;