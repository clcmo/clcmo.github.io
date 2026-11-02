export type BlogSource = 'camila' | 'apprendendo';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  source: BlogSource;
  imageUrl?: string;
  category?: string;
}