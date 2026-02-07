import { Project } from '@/types';
import { LanguageData } from '@/interface/language';

export class LanguageController {
  static getLanguageStats(projects: Project[]): LanguageData[] {
    const languageCounts: { [key: string]: number } = {};
    let total = 0;

    // Conta as ocorrências de cada linguagem
    projects.forEach((project) => {
      if (project.language) {
        languageCounts[project.language] = (languageCounts[project.language] || 0) + 1;
        total++;
      }
    });

    // Converte para o formato esperado com percentual
    return Object.entries(languageCounts)
      .map(([language, count]) => ({
        language,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }
}