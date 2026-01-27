export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  link: string;
  githubUrl?: string;
  tags: string[];
  image?: string;
  faicon: string;
  featured: boolean;
  stars: number;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectStats {
  totalProjects: number;
  featuredProjects: number;
  totalStars: number;
  languageStats: {
    language: string;
    _count: number;
  }[];
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  forks: number;
  language?: string;
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  isFork: boolean;
}

export interface Theme {
  mode: 'light' | 'dark';
}

export interface AnalyticsStats {
  totalVisits: number;
  recentVisits: number;
  topPages: {
    path: string;
    visits: number;
  }[];
}
