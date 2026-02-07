export interface LanguageData {
  language: string;
  percentage: number;
}

export interface LanguageChartProps {
  data: LanguageData[];
}

export interface LanguageStatsProps {
  languageData: LanguageData[];
}