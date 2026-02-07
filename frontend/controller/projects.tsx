import { projectsApi } from '@/services/api';

export class ProjectsController {
  static loadProjects = async (setProjects: any, setLoading: any) => {
    try {
      const data = await projectsApi.getAll();
      setProjects(
        data.sort(
          (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  static onRefresh = (setRefreshing: any, setProjects: any, setLoading: any) => {
    setRefreshing(true);
    ProjectsController.loadProjects(setProjects, setLoading);
  };
}