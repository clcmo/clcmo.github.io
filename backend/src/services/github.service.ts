const axios = require('axios');
const env = require('../config/env');

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  },
  timeout: 15000
});

// token opcional para aumentar rate limit (5k/h autenticado)
if (env.GITHUB_TOKEN) {
  api.defaults.headers.common['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
}

/**
 * Busca repositórios públicos do usuário com paginação.
 * Docs oficiais: /users/{username}/repos (versão 2022-11-28). 
 * @returns {Promise<Array>}
 */
export async function listUserPublicRepos(username: string, { perPage = 100, maxPages = 2 } = {}) {
  const all = [];
  for (let page = 1; page <= maxPages; page++) {
    const res = await api.get(`/users/${username}/repos`, {
      params: { per_page: perPage, page, sort: 'updated', direction: 'desc' }
    });
    const data = Array.isArray(res.data) ? res.data : [];
    all.push(...data);
    if (data.length < perPage) break; // acabou
  }
  // Mapeia apenas os campos que nossa API expõe
  return all.map(r => ({
    githubId: r.id,
    name: r.name,
    fullName: r.full_name,
    htmlUrl: r.html_url,
    description: r.description,
    homepage: r.homepage,
    language: r.language,
    topics: Array.isArray(r.topics) ? r.topics : [], // pode vir vazio dependendo do header/endpoint
    stars: r.stargazers_count,
    forks: r.forks_count,
    visibility: r.visibility || (r.private ? 'private' : 'public'),
    archived: r.archived,
    license: r.license?.spdx_id ?? r.license?.key ?? null,
    createdAt: r.created_at ? new Date(r.created_at) : null,
    pushedAt: r.pushed_at ? new Date(r.pushed_at) : null,
    updatedAt: r.updated_at ? new Date(r.updated_at) : null
  }));
}

module.exports = { listUserPublicRepos };