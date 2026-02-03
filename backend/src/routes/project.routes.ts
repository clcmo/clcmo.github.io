import { Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import env from '../config/env';

const router = Router();

/**
 * @route   GET /api/projects/test/connection
 * @desc    Test database connection
 * @access  Public
 */
router.get('/test/connection', async (_req, res) => {
  let client: MongoClient | null = null;
  try {
    client = new MongoClient(env.DATABASE_URL);
    await client.connect();
    const db = client.db();
    const collection = db.collection('Project');
    const count = await collection.countDocuments();
    
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
  } finally {
    if (client) await client.close();
  }
});

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', async (_req, res) => {
  let client: MongoClient | null = null;
  try {
    client = new MongoClient(env.DATABASE_URL);
    await client.connect();
    const db = client.db();
    const collection = db.collection('Project');
    
    const projects = await collection
      .find({})
      .sort({ stars: -1 })
      .toArray();

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  } finally {
    if (client) await client.close();
  }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get project by ID (MongoDB _id or githubId)
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  let client: MongoClient | null = null;
  try {
    const { id } = req.params;
    
    client = new MongoClient(env.DATABASE_URL);
    await client.connect();
    const db = client.db();
    const collection = db.collection('Project');
    
    // Tenta buscar por _id do MongoDB ou por githubId
    let project;
    
    if (ObjectId.isValid(id)) {
      // Se é um ObjectId válido, busca por _id
      project = await collection.findOne({ _id: new ObjectId(id) });
    } else {
      // Senão, busca por githubId
      project = await collection.findOne({ githubId: id });
    }

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  } finally {
    if (client) await client.close();
  }
});

/**
 * @route   POST /api/projects/sync
 * @desc    Sync projects from GitHub
 * @access  Public
 */
router.post('/sync', async (_req, res) => {
  try {
    const syncModule = await import('../scripts/syncGitHub');
    const { syncGitHubProjects } = syncModule;
    
    console.log('🚀 Iniciando sincronização via API...');
    const result = await syncGitHubProjects();
    
    res.json({ 
      message: 'Sync completed successfully',
      projectsSynced: result.count,
      totalFound: result.totalFound,
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

export default router;