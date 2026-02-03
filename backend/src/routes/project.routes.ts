import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', async (_req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { stars: 'desc' }
    });

    // Converte BigInt para String
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
 * @route   GET /api/projects/:id
 * @desc    Get project by ID
 * @access  Public
 */
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

    // Converte BigInt para String
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