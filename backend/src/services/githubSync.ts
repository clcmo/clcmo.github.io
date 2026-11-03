import { Octokit } from '@octokit/rest';
import { prisma } from '../config/prisma';
import env from '../config/env';

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description?: string | null;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  private?: boolean;
  archived?: boolean;
  fork?: boolean;
  license?: { spdx_id?: string | null; key?: string | null } | null;
  created_at?: string | null;
  pushed_at?: string | null;
  updated_at?: string | null;
};

type GitHubFields = {
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  visibility: string;
  archived: boolean;
  isFork: boolean;
  license: string | null;
  createdAt: Date;
  pushedAt: Date | null;
  updatedAt: Date;
  syncedAt: Date;
};

type SyncStore = {
  upsertProject(input: {
    githubId: string;
    slug: string;
    hidden: boolean;
    fields: GitHubFields;
  }): Promise<void>;
  unpublishMissing(publicIds: string[]): Promise<number>;
  recordSync(input: {
    reposCount: number;
    status: 'success' | 'error';
    message: string | null;
  }): Promise<void>;
};

type SyncOptions = {
  listRepositories?: () => Promise<GitHubRepo[]>;
  store?: SyncStore;
};

let syncInProgress = false;
const hiddenByDefault = new Set(['clcmo', 'clcmo.github.io']);

export class SyncInProgressError extends Error {
  readonly status = 409;

  constructor() {
    super('Já existe uma sincronização em andamento');
  }
}

const prismaStore: SyncStore = {
  async upsertProject({ githubId, slug, hidden, fields }) {
    await prisma.project.upsert({
      where: { githubId },
      create: { githubId, slug, hidden, featured: false, ...fields },
      update: { slug, ...fields },
    });
  },
  async unpublishMissing(publicIds) {
    const result = await prisma.project.updateMany({
      where: { githubId: { notIn: publicIds }, visibility: 'public' },
      data: { visibility: 'private' },
    });
    return result.count;
  },
  async recordSync(input) {
    await prisma.gitHubSync.create({ data: input });
  },
};

async function listGitHubRepositories(): Promise<GitHubRepo[]> {
  const octokit = new Octokit({ auth: env.GITHUB_TOKEN || undefined });
  return octokit.paginate(octokit.repos.listForUser, {
    username: env.GITHUB_USERNAME,
    per_page: env.GITHUB_PER_PAGE,
    sort: 'updated',
    direction: 'desc',
    type: 'owner',
  });
}

export async function syncRepos({ listRepositories, store = prismaStore }: SyncOptions = {}) {
  if (syncInProgress) throw new SyncInProgressError();
  syncInProgress = true;

  try {
    const repos = await (listRepositories ?? listGitHubRepositories)();
    if (!repos.length) {
      throw new Error('O GitHub não retornou repositórios; sincronização cancelada para preservar os dados');
    }

    const publicRepos = repos.filter((repo) => repo.private === false);
    for (const repo of publicRepos) {
      if (!repo.created_at || !repo.updated_at) {
        throw new Error(`Datas ausentes no repositório ${repo.full_name}`);
      }

      const fields: GitHubFields = {
        name: repo.name,
        fullName: repo.full_name,
        htmlUrl: repo.html_url,
        description: repo.description ?? null,
        homepage: repo.homepage ?? null,
        language: repo.language ?? null,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count ?? 0,
        forks: repo.forks_count ?? 0,
        visibility: 'public',
        archived: repo.archived ?? false,
        isFork: repo.fork ?? false,
        license: repo.license?.spdx_id ?? repo.license?.key ?? null,
        createdAt: new Date(repo.created_at),
        pushedAt: repo.pushed_at ? new Date(repo.pushed_at) : null,
        updatedAt: new Date(repo.updated_at),
        syncedAt: new Date(),
      };

      await store.upsertProject({
        githubId: String(repo.id),
        slug: repo.name.toLowerCase(),
        hidden: hiddenByDefault.has(repo.name),
        fields,
      });
    }

    const publicIds = publicRepos.map((repo) => String(repo.id));
    const unpublished = await store.unpublishMissing(publicIds);
    await store.recordSync({
      reposCount: publicRepos.length,
      status: 'success',
      message: unpublished ? `${unpublished} projetos foram despublicados` : null,
    });

    return { synced: publicRepos.length, unpublished };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido na sincronização';
    console.error(`[github-sync] ${message}`);
    try {
      await store.recordSync({
        reposCount: 0,
        status: 'error',
        message: message.slice(0, 1000),
      });
    } catch (recordError) {
      const recordMessage =
        recordError instanceof Error ? recordError.message : 'erro desconhecido';
      console.error(`[github-sync] Não foi possível registrar a falha: ${recordMessage}`);
    }
    throw error;
  } finally {
    syncInProgress = false;
  }
}
