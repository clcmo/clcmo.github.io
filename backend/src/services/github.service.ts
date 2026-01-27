import { Octokit } from 'octokit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GitHubService {
  private octokit: Octokit;
  private username: string;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
    this.username = process.env.GITHUB_USERNAME || 'clcmo';
  }

  async fetchRepositories() {
    try {
      const { data } = await this.octokit.rest.repos.listForUser({
        username: this.username,
        sort: 'updated',
        per_page: 100
      });

      return data.map(repo => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || '',
        url: repo.html_url,
        homepage: repo.homepage || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: new Date(repo.created_at),
        updatedAt: new Date(repo.updated_at),
        isPrivate: repo.private,
        isFork: repo.fork
      }));
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw new Error('Failed to fetch GitHub repositories');
    }
  }

  async syncProjectsWithGitHub() {
    try {
      const repos = await this.fetchRepositories();
      
      // Filtrar apenas repositórios públicos e não-forks
      const publicRepos = repos.filter(repo => !repo.isPrivate && !repo.isFork);

      let syncedCount = 0;
      let skippedCount = 0;

      for (const repo of publicRepos) {
        const slug = this.generateSlug(repo.name);
        
        // Verificar se o projeto já existe
        const existingProject = await prisma.project.findUnique({
          where: { slug }
        });

        if (existingProject) {
          // Atualizar apenas stars e data
          await prisma.project.update({
            where: { slug },
            data: {
              stars: repo.stars,
              language: repo.language || undefined,
              updatedAt: new Date()
            }
          });
          skippedCount++;
        } else {
          // Criar novo projeto
          await prisma.project.create({
            data: {
              slug,
              title: repo.name,
              description: repo.description || `Projeto ${repo.name}`,
              link: repo.homepage || repo.url,
              githubUrl: repo.url,
              tags: repo.topics,
              image: '',
              faicon: this.getFaIconByLanguage(repo.language),
              stars: repo.stars,
              language: repo.language || undefined
            }
          });
          syncedCount++;
        }
      }

      // Salvar log da sincronização
      await prisma.gitHubSync.create({
        data: {
          lastSync: new Date(),
          reposCount: publicRepos.length,
          status: 'success',
          message: `Synced: ${syncedCount}, Updated: ${skippedCount}`
        }
      });

      return {
        success: true,
        synced: syncedCount,
        updated: skippedCount,
        total: publicRepos.length
      };
    } catch (error) {
      await prisma.gitHubSync.create({
        data: {
          lastSync: new Date(),
          reposCount: 0,
          status: 'error',
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      throw error;
    }
  }

  async getLastSync() {
    return await prisma.gitHubSync.findFirst({
      orderBy: { lastSync: 'desc' }
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private getFaIconByLanguage(language: string | null): string {
    const iconMap: { [key: string]: string } = {
      'JavaScript': 'fa-brands fa-js',
      'TypeScript': 'fa-brands fa-js',
      'Python': 'fa-brands fa-python',
      'Java': 'fa-brands fa-java',
      'Kotlin': 'fa-brands fa-android',
      'PHP': 'fa-brands fa-php',
      'HTML': 'fa-brands fa-html5',
      'CSS': 'fa-brands fa-css3',
      'React': 'fa-brands fa-react',
      'Vue': 'fa-brands fa-vuejs',
      'Angular': 'fa-brands fa-angular'
    };

    return language ? (iconMap[language] || 'fa-solid fa-code') : 'fa-solid fa-code';
  }
}
