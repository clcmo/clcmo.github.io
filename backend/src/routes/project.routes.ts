import { Router } from 'express';
import { projectController } from '../controllers/project.controller';
import { validateProject } from '../middlewares/validation.middleware';

const router = Router();

/**
 * @route   GET /api/projects
 * @desc    Get all projects with optional filters
 * @query   featured, tag, search
 * @access  Public
 */
router.get('/', projectController.getAllProjects.bind(projectController));

/**
 * @route   GET /api/projects/stats
 * @desc    Get project statistics
 * @access  Public
 */
router.get('/stats', projectController.getProjectStats.bind(projectController));

/**
 * @route   GET /api/projects/:slug
 * @desc    Get project by slug
 * @access  Public
 */
router.get('/:slug', projectController.getProjectBySlug.bind(projectController));

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private (TODO: Add authentication)
 */
router.post(
  '/',
  validateProject,
  projectController.createProject.bind(projectController)
);

/**
 * @route   PUT /api/projects/:slug
 * @desc    Update project
 * @access  Private (TODO: Add authentication)
 */
router.put(
  '/:slug',
  validateProject,
  projectController.updateProject.bind(projectController)
);

/**
 * @route   DELETE /api/projects/:slug
 * @desc    Delete project
 * @access  Private (TODO: Add authentication)
 */
router.delete('/:slug', projectController.deleteProject.bind(projectController));

export default router;
