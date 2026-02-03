// services/wordpressApi.ts
// Integração específica para WordPress REST API

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  url: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}

class WordPressApi {
  private baseUrl = 'https://apprendendo.blog/wp-json/wp/v2';

  /**
   * Busca posts do WordPress
   * @param perPage - Número de posts por página (padrão: 10)
   * @param page - Número da página (padrão: 1)
   */
  async getPosts(perPage: number = 10, page: number = 1): Promise<BlogPost[]> {
    try {
      // _embed inclui dados de mídia e categorias na resposta
      const response = await fetch(
        `${this.baseUrl}/posts?per_page=${perPage}&page=${page}&_embed`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const posts: WordPressPost[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Erro ao buscar posts do WordPress:', error);
      throw error;
    }
  }

  /**
   * Busca um post específico por ID
   */
  async getPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}?_embed`);

      if (!response.ok) {
        return null;
      }

      const post: WordPressPost = await response.json();
      return this.transformPost(post);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      return null;
    }
  }

  /**
   * Busca posts por categoria
   */
  async getPostsByCategory(categoryId: number, perPage: number = 10): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/posts?categories=${categoryId}&per_page=${perPage}&_embed`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const posts: WordPressPost[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Erro ao buscar posts por categoria:', error);
      return [];
    }
  }

  /**
   * Busca categorias
   */
  async getCategories(): Promise<Array<{ id: number; name: string; slug: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/categories?per_page=100`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  }

  /**
   * Busca posts por tag
   */
  async getPostsByTag(tagId: number, perPage: number = 10): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/posts?tags=${tagId}&per_page=${perPage}&_embed`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const posts: WordPressPost[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Erro ao buscar posts por tag:', error);
      return [];
    }
  }

  /**
   * Busca posts (search)
   */
  async searchPosts(query: string, perPage: number = 10): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/posts?search=${encodeURIComponent(query)}&per_page=${perPage}&_embed`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const posts: WordPressPost[] = await response.json();
      return posts.map(post => this.transformPost(post));
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      return [];
    }
  }

  /**
   * Transforma um post do WordPress para o formato BlogPost
   */
  private transformPost(post: WordPressPost): BlogPost {
    // Extrai a imagem destacada
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    // Extrai a primeira categoria
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name;

    // Extrai as tags
    const tags = post._embedded?.['wp:term']?.[1]?.map(tag => tag.name) || [];

    // Remove HTML do excerpt
    const excerpt = post.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();

    return {
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: excerpt.length > 200 ? excerpt.substring(0, 200) + '...' : excerpt,
      content: post.content.rendered,
      date: post.date,
      url: post.link,
      imageUrl,
      category,
      tags,
    };
  }

  /**
   * Remove HTML tags de uma string
   */
  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }
}

export const wordpressApi = new WordPressApi();

// Exemplo de uso:
/*
import { wordpressApi } from '@/services/wordpressApi';

// Buscar posts
const posts = await wordpressApi.getPosts(6);

// Buscar por categoria
const categories = await wordpressApi.getCategories();
const categoryPosts = await wordpressApi.getPostsByCategory(categories[0].id);

// Buscar um post específico
const post = await wordpressApi.getPost('123');

// Buscar posts
const searchResults = await wordpressApi.searchPosts('react native');
*/