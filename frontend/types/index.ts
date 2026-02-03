export interface Project {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  visibility: string;
  archived: boolean;
  license: string | null;
  createdAt: string;
  pushedAt: string;
  updatedAt: string;
}

export interface Analytics {
  totalVisits: number;
  recentVisits: number;
  topPages: {
    path: string;
    visits: number;
  }[];
}