import type { Request, Response, NextFunction } from 'express';
import { getProjects as fetchProjects, getProjectByName } from '../services/project.service';

export async function listProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const refresh = ['1', 'true', 'yes'].includes(String(req.query.refresh).toLowerCase());
    const language = (req.query.language as string | undefined) ?? undefined;
    const sort = (req.query.sort as string | undefined) ?? 'updatedAt'; // 'stars' | 'forks' | 'updatedAt'
    const direction = ((req.query.direction as string | undefined) ?? 'desc').toLowerCase(); // 'asc' | 'desc'

    let data = await fetchProjects({ refresh }); // <— renomeado para evitar colisão de nome

    if (language) {
      data = data.filter((p: any) => (p.language || '').toLowerCase() === language.toLowerCase());
    }

    const keyMap: Record<string, 'stars' | 'forks' | 'updatedAt'> = {
      stars: 'stars',
      forks: 'forks',
      updatedAt: 'updatedAt',
    };

    const k = keyMap[sort] ?? 'updatedAt';
    data = data.sort((a: any, b: any) => {
      const av = (a as any)[k] ?? 0;
      const bv = (b as any)[k] ?? 0;
      return direction === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    res.json({ count: data.length, items: data });
  } catch (err) {
    next(err);
  }
}

export async function getOneProject(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
    const item = await getProjectByName(name);
    if (!item) return res.status(404).json({ message: 'Projeto não encontrado' });
    return res.json(item);
  } catch (err) {
    next(err);
  }
}
