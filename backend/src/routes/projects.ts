import type { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { prisma } from '../config/prisma';
import { adminRateLimit } from '../middlewares/rateLimit';
import { requireSecret } from '../middlewares/requireSecret';

export const projectsRouter = Router();

const publicProjects: Prisma.ProjectWhereInput = {
  visibility: 'public',
  archived: false,
  OR: [{ hidden: false }, { hidden: null }],
};

projectsRouter.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { language, topic, featured, forks } = req.query;
    const where: Prisma.ProjectWhereInput = {
      ...publicProjects,
      ...(language ? { language: String(language) } : {}),
      ...(topic ? { topics: { has: String(topic) } } : {}),
      ...(featured === 'true' ? { featured: true } : {}),
      ...(forks === 'false' ? { isFork: false } : {}),
    };
    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { pushedAt: 'desc' }],
    });

    return res
      .set('Cache-Control', 'public, max-age=300')
      .json(projects);
  } catch (error) {
    return next(error);
  }
});

projectsRouter.get(
  '/projects/:slug',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await prisma.project.findFirst({
        where: { slug: req.params.slug, ...publicProjects },
      });
      if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });
      return res.json(project);
    } catch (error) {
      return next(error);
    }
  },
);

projectsRouter.put(
  '/projects/:slug',
  adminRateLimit,
  requireSecret,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body ?? {};
      const data: Prisma.ProjectUpdateInput = {};
      if (typeof body.featured === 'boolean') data.featured = body.featured;
      if (typeof body.hidden === 'boolean') data.hidden = body.hidden;
      if (typeof body.coverUrl === 'string' || body.coverUrl === null) data.coverUrl = body.coverUrl;
      if (typeof body.category === 'string' || body.category === null) data.category = body.category;
      if (!Object.keys(data).length) {
        return res.status(400).json({ error: 'Nenhum campo editorial válido' });
      }

      const existing = await prisma.project.findFirst({
        where: { slug: req.params.slug },
        select: { id: true },
      });
      if (!existing) return res.status(404).json({ error: 'Projeto não encontrado' });

      const project = await prisma.project.update({
        where: { id: existing.id },
        data,
      });
      return res.json(project);
    } catch (error) {
      return next(error);
    }
  },
);
