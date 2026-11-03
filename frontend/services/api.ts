import axios from 'axios';
import { Platform } from 'react-native';
import type { Project } from '../types';

const configuredApiUrl =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://localhost:5555';
const hasConfiguredApiUrl = Boolean(process.env.EXPO_PUBLIC_API_URL?.trim());
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
    if (Platform.OS === 'web') {
      const response = await fetch('/projects.json');
      if (!response.ok) {
        throw new Error(`O snapshot de projetos retornou HTTP ${response.status}`);
      }
      const snapshot: unknown = await response.json();
      if (!isProjectSnapshot(snapshot)) {
        throw new Error('O snapshot de projetos tem formato inválido');
      }
      return snapshot;
    }

    const { data } = await api.get<Project[]>('/api/projects');
    return data;
  },
};

export const analyticsApi = {
  trackVisit: async (path: string): Promise<void> => {
    if (Platform.OS === 'web' && !hasConfiguredApiUrl) return;
    await api.post('/api/analytics/visit', { path });
  },
  
};

export default api;