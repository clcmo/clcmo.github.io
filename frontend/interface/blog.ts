export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  imageUrl?: string;
  category?: string;
}