import { PrismaClient } from '@prisma/client';
import { Octokit } from '@octokit/rest';

const prisma = new PrismaClient();
const octokit = new Octokit();

async function syncGithubRepos() {
  try {
    console.log('🔄 Iniciando sincronização com GitHub...');
    
    // Substitua pelo seu username do GitHub
    const username = 'clcmo';
    
    // Busca todos os repositórios públicos
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated'
    });

    console.log(`📦 Encontrados ${repos.length} repositórios`);

    let count = 0;

    for (const repo of repos) {
      // Validações para campos obrigatórios
      if (!repo.created_at || !repo.pushed_at || !repo.updated_at) {
        console.warn(`⚠️  Pulando ${repo.name} - datas inválidas`);
        continue;
      }

      await prisma.project.upsert({
        where: { githubId: repo.id },
        update: {
          name: repo.name,
          fullName: repo.full_name,
          htmlUrl: repo.html_url,
          description: repo.description || null,
          homepage: repo.homepage || null,
          language: repo.language || null,
          topics: repo.topics || [],
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          visibility: repo.visibility || 'public',
          archived: repo.archived,
          license: repo.license?.name || null,
          createdAt: new Date(repo.created_at),
          pushedAt: new Date(repo.pushed_at),
          updatedAt: new Date(repo.updated_at),
          syncedAt: new Date()
        },
        create: {
          githubId: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          htmlUrl: repo.html_url,
          description: repo.description || null,
          homepage: repo.homepage || null,
          language: repo.language || null,
          topics: repo.topics || [],
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          visibility: repo.visibility || 'public',
          archived: repo.archived,
          license: repo.license?.name || null,
          createdAt: new Date(repo.created_at),
          pushedAt: new Date(repo.pushed_at),
          updatedAt: new Date(repo.updated_at),
          syncedAt: new Date()
        }
      });
      count++;
      console.log(`✓ ${repo.name}`);
    }

    // Atualiza registro de sincronização
    await prisma.gitHubSync.create({
      data: {
        lastSync: new Date(),
        reposCount: count,
        status: 'success',
        message: `Sincronizados ${count} repositórios`
      }
    });

    console.log(`✅ Sincronização concluída! ${count} repositórios salvos.`);
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
    
    await prisma.gitHubSync.create({
      data: {
        lastSync: new Date(),
        reposCount: 0,
        status: 'error',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}

syncGithubRepos();