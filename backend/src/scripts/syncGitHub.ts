import { MongoClient } from 'mongodb';
import { Octokit } from '@octokit/rest';
import env from '../config/env';

export async function syncGitHubProjects() {
  let client: MongoClient | null = null;
  
  try {
    console.log('🔄 Iniciando sincronização com GitHub...');
    
    const username = env.GITHUB_USERNAME;
    console.log('👤 Username:', username);
    
    // Conecta ao MongoDB diretamente
    client = new MongoClient(env.DATABASE_URL);
    await client.connect();
    const db = client.db();
    const collection = db.collection('Project');
    
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

    let count = 0;

    for (const repo of repos) {
      console.log(`📝 Processando: ${repo.name}`);
      
      if (!repo.created_at || !repo.pushed_at || !repo.updated_at) {
        console.warn(`⚠️  Pulando ${repo.name} - datas inválidas`);
        continue;
      }

      try {
        const projectData = {
          githubId: repo.id.toString(), // MongoDB usa string para IDs grandes
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
        };

        // Usa updateOne com upsert (não requer replica set)
        await collection.updateOne(
          { githubId: repo.id.toString() },
          { $set: projectData },
          { upsert: true }
        );
        
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
  } finally {
    if (client) {
      await client.close();
    }
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