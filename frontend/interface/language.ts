interface LanguageData {
  name: string;
  count: number;
}

export interface LanguageChartProps {
  data: LanguageData[];
}

export interface LanguageStatsProps {
    languageData: { 
        language: string; 
        percentage: number }[];
}

export interface LanguageStats {
  language: string;
  percentage: number;
}