import axios from 'axios';
import { Project, Analytics } from '../types';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await api.get('/api/projects');
    return data;
  },
};

export const analyticsApi = {
  trackVisit: async (path: string): Promise<void> => {
    await api.post('/api/analytics/visit', { path });
  },
  
  getStats: async (): Promise<Analytics> => {
    const { data } = await api.get('/api/analytics/stats');
    return data;
  },
};

export default api;