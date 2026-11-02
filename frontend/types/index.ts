export interface Project {
  id: string;
  githubId: string;
  slug: string | null;
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
  isFork: boolean | null;
  hidden: boolean | null;
  featured: boolean | null;
  coverUrl: string | null;
  category: string | null;
  license: string | null;
  createdAt: string;
  pushedAt: string | null;
  updatedAt: string;
}
