export interface Project {
  id: string;
  githubId: number;
  slug: string;
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  isFork: boolean;
  isArchived: boolean;
  pushedAt: string | null;
  featured: boolean;
  coverUrl: string | null;
  category: string | null;
}

export const projectYear = (p: Project) =>
  p.pushedAt ? new Date(p.pushedAt).getFullYear() : null;

/** "TypeScript, 2026": mesma linha de meta do card de livro ("LCAL, 2026"). */
export const projectMeta = (p: Project) =>
  [p.language, projectYear(p)].filter(Boolean).join(', ');
