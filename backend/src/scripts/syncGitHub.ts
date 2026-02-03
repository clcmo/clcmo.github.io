import { PrismaClient } from '@prisma/client';
import { Octokit } from '@octokit/rest';
import env from '../config/env';

const prisma = new PrismaClient();

export async function syncGitHubProjects() {
  try {
    console.log('🔄 Iniciando sincronização com GitHub...');
    
    const username = env.GITHUB_USERNAME;
    console.log('👤 Username:', username);
    
    const octokit = new Octokit({
      auth: env.GITHUB_TOKEN || undefined
    });
    
    console.log('🔍 Buscando repositórios...');
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated'
    });

    console.log(`📦 Encontrados ${repos.length} repositórios`);
    console.log('Primeiros repos:', repos.slice(0, 3).map(r => r.name));

    let count = 0;

    for (const repo of repos) {
      console.log(`📝 Processando: ${repo.name}`);
      
      if (!repo.created_at || !repo.pushed_at || !repo.updated_at) {
        console.warn(`⚠️  Pulando ${repo.name} - datas inválidas`);
        continue;
      }

      try {
        await prisma.project.upsert({
          where: { githubId: BigInt(repo.id) },
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
            githubId: BigInt(repo.id),
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
        console.log(`✓ ${repo.name} salvo com sucesso`);
      } catch (error) {
        console.error(`❌ Erro ao salvar ${repo.name}:`, error);
      }
    }

    console.log(`✅ Sincronização concluída! ${count} repositórios salvos.`);
    
    return { count, status: 'success', totalFound: repos.length };
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
    throw error;
  }
}

if (require.main === module) {
  syncGitHubProjects()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Erro ao sincronizar:', error);
      process.exit(1);
    });
}