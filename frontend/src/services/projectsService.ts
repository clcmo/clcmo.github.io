import { API_URL } from '../config/env';
import { asset } from '../utils/assets';
import type { Project } from '../models/Project';

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return res.json() as Promise<T>;
}

/** API primeiro; se o backend estiver fora, usa o snapshot gerado no deploy. */
export async function listProjects(): Promise<Project[]> {
  try {
    return await getJson<Project[]>(`${API_URL}/projects`);
  } catch {
    return getJson<Project[]>(asset('/projects.json'));
  }
}
