// services/wordpressApi.ts

export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: Record<string, { source_url: string }>;
      };
      alt_text?: string;
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy?: string;
      }>
    >;
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
  // ✅ base correto (sem /posts)
  private site = 'apprendendo.blog';
  private baseUrl = `https://public-api.wordpress.com/wp/v2/sites/${this.site}`;

  private async request<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      // Se tiver cache/CDN, às vezes ajuda:
      // cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status} ${response.statusText} - ${text}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Busca posts
   */
  async getPosts(perPage = 10, page = 1): Promise<BlogPost[]> {
    const posts = await this.request<WordPressPost[]>(
      `/posts?per_page=${perPage}&page=${page}&_embed`
    );

    return posts.map((post) => this.transformPost(post));
  }

  /**
   * Busca um post por ID
   */
  async getPost(id: string): Promise<BlogPost | null> {
    try {
      const post = await this.request<WordPressPost>(`/posts/${id}?_embed`);
      return this.transformPost(post);
    } catch {
      return null;
    }
  }

  /**
   * Busca posts por categoria (id)
   */
  async getPostsByCategory(categoryId: number, perPage = 10): Promise<BlogPost[]> {
    const posts = await this.request<WordPressPost[]>(
      `/posts?categories=${categoryId}&per_page=${perPage}&_embed`
    );
    return posts.map((post) => this.transformPost(post));
  }

  /**
   * Busca categorias
   */
  async getCategories(): Promise<Array<{ id: number; name: string; slug: string }>> {
    return this.request(`/categories?per_page=100`);
  }

  /**
   * Busca posts por tag (id)
   */
  async getPostsByTag(tagId: number, perPage = 10): Promise<BlogPost[]> {
    const posts = await this.request<WordPressPost[]>(
      `/posts?tags=${tagId}&per_page=${perPage}&_embed`
    );
    return posts.map((post) => this.transformPost(post));
  }

  /**
   * Search
   */
  async searchPosts(query: string, perPage = 10): Promise<BlogPost[]> {
    const posts = await this.request<WordPressPost[]>(
      `/posts?search=${encodeURIComponent(query)}&per_page=${perPage}&_embed`
    );
    return posts.map((post) => this.transformPost(post));
  }

  /**
   * Transforma WordPressPost -> BlogPost
   */
  private transformPost(post: WordPressPost): BlogPost {
    // ✅ imagem destacada: tenta source_url e tamanhos
    const fm = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl =
      fm?.media_details?.sizes?.medium?.source_url ||
      fm?.media_details?.sizes?.full?.source_url ||
      fm?.source_url;

    // ✅ categoria: normalmente vem em wp:term[0]
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name;

    // ✅ tags: normalmente em wp:term[1]
    const tags = post._embedded?.['wp:term']?.[1]?.map((t) => t.name) ?? [];

    const excerpt = this.stripHtml(post.excerpt?.rendered ?? '');

    return {
      id: String(post.id),
      title: post.title?.rendered ?? '',
      excerpt: excerpt.length > 200 ? excerpt.slice(0, 200) + '...' : excerpt,
      content: post.content?.rendered ?? '',
      date: post.date,
      url: post.link,
      imageUrl,
      category,
      tags,
    };
  }

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