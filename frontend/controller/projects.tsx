import { projectsApi } from '@/services/api';
import type { Dispatch, SetStateAction } from 'react';
import type { Project } from '@/types';

export class ProjectsController {
  static loadProjects = async (
    setProjects: Dispatch<SetStateAction<Project[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError?: Dispatch<SetStateAction<string | null>>,
  ) => {
    try {
      setError?.(null);
      const data = await projectsApi.getAll();
      setProjects(
        data.sort(
          (a, b) =>
            new Date(b.pushedAt ?? 0).getTime() -
            new Date(a.pushedAt ?? 0).getTime()
        )
      );
    } catch (err) {
      console.error(err);
      setError?.(
        err instanceof Error
          ? `Não foi possível carregar os projetos: ${err.message}`
          : 'Não foi possível carregar os projetos.',
      );
    } finally {
      setLoading(false);
    }
  };

  static onRefresh = (
    setRefreshing: Dispatch<SetStateAction<boolean>>,
    setProjects: Dispatch<SetStateAction<Project[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    setRefreshing(true);
    ProjectsController.loadProjects(setProjects, setLoading);
  };
}