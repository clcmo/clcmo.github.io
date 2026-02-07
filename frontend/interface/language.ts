export interface LanguageData {
  name: string;        
  count: number;       
  percentage: number;  
}

export interface LanguageChartProps {
  data: LanguageData[];
}

export interface LanguageStatsProps {
  languageData: LanguageData[];
}