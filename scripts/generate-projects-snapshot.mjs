import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const username = process.env.GITHUB_USERNAME || 'clcmo';
const token = process.env.GITHUB_TOKEN;
const curationPath = resolve(repositoryRoot, 'frontend/data/project-curation.json');
const outputPath = resolve(
  repositoryRoot,
  process.argv[2] || 'frontend/public/projects.json',
);

function isValidCuration(value, repository) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Curadoria inválida para ${repository}`);
  }

  for (const [field, fieldValue] of Object.entries(value)) {
    if (field === 'hidden' || field === 'featured') {
      if (typeof fieldValue !== 'boolean') {
        throw new Error(`O campo ${field} de ${repository} precisa ser booleano`);
      }
    } else if (field === 'coverUrl' || field === 'category') {
      if (fieldValue !== null && typeof fieldValue !== 'string') {
        throw new Error(`O campo ${field} de ${repository} precisa ser texto ou null`);
      }
    } else {
      throw new Error(`Campo de curadoria desconhecido: ${field}`);
    }
  }

  return value;
}

async function fetchRepositories(page) {
  const url = new URL(`https://api.github.com/users/${encodeURIComponent(username)}/repos`);
  url.search = new URLSearchParams({
    type: 'owner',
    sort: 'updated',
    direction: 'desc',
    per_page: '100',
    page: String(page),
  });

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API retornou HTTP ${response.status} ao listar repositórios`);
  }

  const repositories = await response.json();
  if (!Array.isArray(repositories)) {
    throw new Error('A resposta do GitHub não é uma lista de repositórios');
  }
  return repositories;
}

const curation = JSON.parse(await readFile(curationPath, 'utf8'));
if (typeof curation !== 'object' || curation === null || Array.isArray(curation)) {
  throw new Error('O arquivo de curadoria precisa ser um objeto JSON');
}
for (const [repository, editorial] of Object.entries(curation)) {
  isValidCuration(editorial, repository);
}

const repositories = [];
for (let page = 1; ; page += 1) {
  const pageRepositories = await fetchRepositories(page);
  repositories.push(...pageRepositories);
  if (pageRepositories.length < 100) break;
}

if (repositories.length === 0) {
  throw new Error('O GitHub não retornou repositórios; snapshot vazio não será publicado');
}

const projects = repositories
  .filter((repository) => repository.private === false && repository.archived !== true)
  .map((repository) => {
    const fullName = repository.full_name;
    const editorial = curation[fullName] ?? {};
    if (editorial.hidden === true) return null;

    return {
      id: String(repository.id),
      githubId: String(repository.id),
      slug: repository.name.toLowerCase(),
      name: repository.name,
      fullName,
      htmlUrl: repository.html_url,
      description: repository.description ?? null,
      homepage: repository.homepage ?? null,
      language: repository.language ?? null,
      topics: repository.topics ?? [],
      stars: repository.stargazers_count ?? 0,
      forks: repository.forks_count ?? 0,
      visibility: 'public',
      archived: false,
      isFork: repository.fork ?? false,
      hidden: false,
      featured: editorial.featured ?? false,
      coverUrl: editorial.coverUrl ?? null,
      category: editorial.category ?? null,
      license: repository.license?.spdx_id ?? repository.license?.key ?? null,
      createdAt: repository.created_at,
      pushedAt: repository.pushed_at,
      updatedAt: repository.updated_at,
    };
  })
  .filter(Boolean);

if (projects.length === 0) {
  throw new Error('Nenhum projeto visível foi encontrado; snapshot vazio não será publicado');
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(projects, null, 2)}\n`);
console.log(`Snapshot gerado: ${projects.length} projetos públicos em ${outputPath}`);
