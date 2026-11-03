import axios, { isAxiosError } from 'axios';
import { Platform } from 'react-native';
import type { Project } from '../types';

const configuredApiUrl =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://localhost:5555';
const API_URL = configuredApiUrl.replace(/\/+$/, '').replace(/\/api$/i, '');

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

function isProjectSnapshot(value: unknown): value is Project[] {
  return (
    Array.isArray(value) &&
    value.every(
      (project) =>
        typeof project === 'object' &&
        project !== null &&
        'name' in project &&
        typeof project.name === 'string' &&
        'htmlUrl' in project &&
        typeof project.htmlUrl === 'string' &&
        'topics' in project &&
        Array.isArray(project.topics),
    )
  );
}

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    try {
      const { data } = await api.get<Project[]>('/api/projects');
      return data;
    } catch (apiError) {
      const status = isAxiosError(apiError) ? apiError.response?.status : undefined;
      if (Platform.OS !== 'web' || (status !== undefined && status < 500)) {
        throw apiError;
      }

      const response = await fetch('/projects.json');
      if (!response.ok) {
        throw new Error(
          `API de projetos indisponível e snapshot local retornou HTTP ${response.status}`,
        );
      }
      const snapshot: unknown = await response.json();
      if (!isProjectSnapshot(snapshot)) {
        throw new Error('O snapshot de projetos tem formato inválido');
      }
      return snapshot;
    }
  },
};

export const analyticsApi = {
  trackVisit: async (path: string): Promise<void> => {
    await api.post('/api/analytics/visit', { path });
  },
  
};

export default api;