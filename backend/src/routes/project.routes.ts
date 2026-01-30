import { Router } from 'express';
import { listProjects, getOneProject } from '../controllers/project.controller';

const router = Router();
router.get('/', listProjects);
router.get('/:name', getOneProject);

export default router;
