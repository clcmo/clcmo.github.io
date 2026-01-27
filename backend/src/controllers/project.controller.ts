import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';

const projectService = new ProjectService();

export class ProjectController {
  async getAllProjects(req: Request, res: Response) {
    try {
      const { featured, tag, search } = req.query;
      
      const filters = {
        featured: featured === 'true',
        tag: tag as string,
        search: search as string
      };

      const projects = await projectService.getAllProjects(filters);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }

  async getProjectBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const project = await projectService.getProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  }

  async createProject(req: Request, res: Response) {
    try {
      const projectData = req.body;
      const project = await projectService.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create project' });
    }
  }

  async updateProject(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const projectData = req.body;
      const project = await projectService.updateProject(slug, projectData);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update project' });
    }
  }

  async deleteProject(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      await projectService.deleteProject(slug);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }

  async getProjectStats(req: Request, res: Response) {
    try {
      const stats = await projectService.getProjectStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  }
}

export const projectController = new ProjectController();
