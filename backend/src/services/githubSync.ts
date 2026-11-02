import { Octokit } from '@octokit/rest';
import { prisma } from '../config/prisma';
import env from '../config/env';

const HIDDEN_BY_DEFAULT = new Set(['clcmo', 'clcmo.github.io']);

export async function syncRepos() {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN || undefined });
  const repos = [];

  for (let page = 1; page <= env.GITHUB_MAX_PAGES; page++) {
    const { data } = await octokit.repos.listForUser({
      username: env.GITHUB_USERNAME,
      per_page: env.GITHUB_PER_PAGE,
      page,
      sort: 'updated',
      direction: 'desc',
      type: 'owner',
    });
    repos.push(...data);
    if (data.length < env.GITHUB_PER_PAGE) break;
  }

  const publicRepos = repos.filter((repo) => repo.visibility !== 'private' && !repo.private);

  for (const repo of publicRepos) {
    if (!repo.created_at || !repo.updated_at) {
      throw new Error(`Datas ausentes no repositório ${repo.full_name}`);
    }

    const fromGithub = {
      name: repo.name,
      fullName: repo.full_name,
      htmlUrl: repo.html_url,
      description: repo.description,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics ?? [],
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      visibility: 'public',
      archived: repo.archived,
      isFork: repo.fork,
      license: repo.license?.spdx_id ?? repo.license?.key ?? null,
      createdAt: new Date(repo.created_at),
      pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
      updatedAt: new Date(repo.updated_at),
      syncedAt: new Date(),
    };

    await prisma.project.upsert({
      where: { githubId: String(repo.id) },
      create: {
        githubId: String(repo.id),
        slug: repo.name.toLowerCase(),
        hidden: HIDDEN_BY_DEFAULT.has(repo.name),
        featured: false,
        ...fromGithub,
      },
      update: {
        slug: repo.name.toLowerCase(),
        ...fromGithub,
      },
    });
  }

  const { count: unpublished } = publicRepos.length
    ? await prisma.project.updateMany({
        where: {
          githubId: { notIn: publicRepos.map((repo) => String(repo.id)) },
          visibility: 'public',
        },
        data: { visibility: 'private' },
      })
    : { count: 0 };

  await prisma.gitHubSync.create({
    data: {
      reposCount: publicRepos.length,
      status: 'success',
      message: unpublished ? `${unpublished} repositórios ficaram indisponíveis` : null,
    },
  });

  return { synced: publicRepos.length, unpublished };
}
