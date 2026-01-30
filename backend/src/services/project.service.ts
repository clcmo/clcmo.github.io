const env = require('../config/env');
const TTLCache = require('../utils/cache');
const { listUserPublicRepos } = require('./github.service');

const cache = new TTLCache(env.CACHE_TTL_SECONDS);

// Prisma é opcional (sincronização no banco)
let prisma: any = null;
if (env.DATABASE_URL) {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
}

export async function getProjects({ refresh = false } = {}) {
  const cacheKey = `projects:${env.GITHUB_USERNAME}`;
  if (!refresh) {
    const cached = cache.get(cacheKey);
    if (cached) return cached;
  }

  const repos = await listUserPublicRepos(env.GITHUB_USERNAME, {
    perPage: env.GITHUB_PER_PAGE,
    maxPages: env.GITHUB_MAX_PAGES
  });

  cache.set(cacheKey, repos);

  // sincronização opcional no banco
  if (prisma && env.ENABLE_DB_SYNC) {
    await Promise.allSettled(
      repos.map((r: any) =>
        prisma.project.upsert({
          where: { githubId: BigInt(r.githubId) },
          create: {
            ...r,
            githubId: BigInt(r.githubId),
            syncedAt: new Date()
          },
          update: {
            ...r,
            githubId: BigInt(r.githubId),
            syncedAt: new Date()
          }
        })
      )
    );
  }

  return repos;
}

export async function getProjectByName(name: string) {
  const projects = await getProjects();
  return projects.find((p: any) => p.name.toLowerCase() === String(name).toLowerCase()) || null;
}

module.exports = { getProjects, getProjectByName };