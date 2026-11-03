import { useEffect, useMemo, useState } from 'react';
import { listProjects } from '../services/projectsService';
import type { Project } from '../models/Project';

type Status = 'loading' | 'ready' | 'error';

export function useProjectsController() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    listProjects()
      .then((data) => { setProjects(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  const languages = useMemo(
    () => Array.from(new Set(projects.map((p) => p.language).filter(Boolean) as string[])).sort(),
    [projects],
  );

  const visible = useMemo(
    () => (language ? projects.filter((p) => p.language === language) : projects),
    [projects, language],
  );

  return { visible, languages, language, setLanguage, status };
}
