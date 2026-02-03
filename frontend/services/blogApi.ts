// services/blogApi.ts
// Serviço para integração com a API do apprendendo.blog

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  url: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  author?: string;
}

export interface BlogApiResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  perPage: number;
}

class BlogApi {
  private baseUrl = 'https://apprendendo.blog/api'; // Ajuste conforme sua API

  /**
   * Busca os posts mais recentes do blog
   * @param limit - Número máximo de posts a retornar
   * @param page - Página para paginação
   */
  async getPosts(limit: number = 10, page: number = 1): Promise<BlogPost[]> {
    try {
      // IMPORTANTE: Ajuste esta URL para a API real do seu blog
      // Exemplos de possíveis endpoints:
      // - WordPress REST API: /wp-json/wp/v2/posts
      // - Custom API: /api/posts
      // - RSS to JSON: usando um serviço como rss2json.com
      
      const response = await fetch(
        `${this.baseUrl}/posts?limit=${limit}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Transforme a resposta da API para o formato BlogPost
      // Isso depende da estrutura da sua API
      return this.transformPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      
      // Em caso de erro, retorna posts de exemplo (fallback)
      return this.getMockPosts();
    }
  }

  /**
   * Busca um post específico por ID
   * @param id - ID do post
   */
  async getPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}`);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      return this.transformPost(data);
    } catch (error) {
      console.error('Erro ao buscar post:', error);
      return null;
    }
  }

  /**
   * Busca posts por categoria
   * @param category - Nome da categoria
   */
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/posts?category=${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      return this.transformPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts por categoria:', error);
      return [];
    }
  }

  /**
   * Transforma a resposta da API para o formato BlogPost
   * Ajuste conforme a estrutura da sua API
   */
  private transformPosts(data: any): BlogPost[] {
    // Se sua API já retorna no formato correto
    if (Array.isArray(data)) {
      return data.map(post => this.transformPost(post));
    }

    // Se sua API retorna um objeto com array de posts
    if (data.posts && Array.isArray(data.posts)) {
      return data.posts.map((post: any) => this.transformPost(post));
    }

    // WordPress REST API
    if (Array.isArray(data)) {
      return data.map((post: any) => ({
        id: post.id?.toString() || '',
        title: post.title?.rendered || post.title || '',
        excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || post.excerpt || '',
        content: post.content?.rendered || post.content || '',
        date: post.date || new Date().toISOString(),
        url: post.link || `https://apprendendo.blog/${post.slug || post.id}`,
        imageUrl: post.featured_media_url || post.imageUrl,
        category: post.categories?.[0] || post.category,
        tags: post.tags || [],
        author: post.author_name || post.author,
      }));
    }

    return [];
  }

  private transformPost(post: any): BlogPost {
    return {
      id: post.id?.toString() || '',
      title: post.title?.rendered || post.title || '',
      excerpt: post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || post.excerpt || '',
      content: post.content?.rendered || post.content || '',
      date: post.date || new Date().toISOString(),
      url: post.link || `https://apprendendo.blog/${post.slug || post.id}`,
      imageUrl: post.featured_media_url || post.imageUrl,
      category: post.categories?.[0] || post.category,
      tags: post.tags || [],
      author: post.author_name || post.author,
    };
  }

  /**
   * Posts de exemplo (fallback quando a API não está disponível)
   */
  private getMockPosts(): BlogPost[] {
    return [
      {
        id: '1',
        title: 'Como criar aplicativos com React Native',
        excerpt: 'Aprenda os fundamentos do React Native e comece a criar seus próprios aplicativos móveis nativos.',
        date: '2024-01-15',
        url: 'https://apprendendo.blog/react-native-fundamentos',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
        category: 'Mobile',
        tags: ['React Native', 'Mobile', 'JavaScript'],
      },
      {
        id: '2',
        title: 'TypeScript: Guia Completo para Iniciantes',
        excerpt: 'Descubra como o TypeScript pode melhorar a qualidade do seu código JavaScript.',
        date: '2024-01-10',
        url: 'https://apprendendo.blog/typescript-guia',
        imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
        category: 'TypeScript',
        tags: ['TypeScript', 'JavaScript', 'Tutorial'],
      },
      {
        id: '3',
        title: 'Melhores práticas em desenvolvimento web',
        excerpt: 'Conheça as técnicas e padrões mais importantes para criar aplicações web de alta qualidade.',
        date: '2024-01-05',
        url: 'https://apprendendo.blog/melhores-praticas-web',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        category: 'Web',
        tags: ['Web Development', 'Best Practices', 'JavaScript'],
      },
    ];
  }
}

export const blogApi = new BlogApi();