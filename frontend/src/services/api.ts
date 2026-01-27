import axios from 'axios';
import { Project, ProjectStats, GitHubRepo, AnalyticsStats } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging (desenvolvimento)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const projectsAPI = {
  // Buscar todos os projetos
  getAll: async (params?: { featured?: boolean; tag?: string; search?: string }) => {
    const { data } = await api.get<Project[]>('/projects', { params });
    return data;
  },

  // Buscar projeto por slug
  getBySlug: async (slug: string) => {
    const { data } = await api.get<Project>(`/projects/${slug}`);
    return data;
  },

  // Criar projeto
  create: async (project: Partial<Project>) => {
    const { data } = await api.post<Project>('/projects', project);
    return data;
  },

  // Atualizar projeto
  update: async (slug: string, project: Partial<Project>) => {
    const { data } = await api.put<Project>(`/projects/${slug}`, project);
    return data;
  },

  // Deletar projeto
  delete: async (slug: string) => {
    await api.delete(`/projects/${slug}`);
  },

  // Obter estatísticas
  getStats: async () => {
    const { data } = await api.get<ProjectStats>('/projects/stats');
    return data;
  },
};

export const githubAPI = {
  // Buscar repositórios do GitHub
  getRepos: async () => {
    const { data } = await api.get<GitHubRepo[]>('/github/repos');
    return data;
  },

  // Sincronizar com GitHub
  sync: async () => {
    const { data } = await api.post('/github/sync');
    return data;
  },

  // Última sincronização
  getLastSync: async () => {
    const { data } = await api.get('/github/last-sync');
    return data;
  },
};

export const analyticsAPI = {
  // Registrar visita
  trackVisit: async (path: string) => {
    await api.post('/analytics/visit', { path });
  },

  // Obter estatísticas
  getStats: async () => {
    const { data } = await api.get<AnalyticsStats>('/analytics/stats');
    return data;
  },
};

export default api;
