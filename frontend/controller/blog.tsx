import { Linking } from 'react-native';

import { wordpressApi } from '@/services/wpApi';
import { BlogPost } from '@/interface/blog';

export class BlogController {
    // (Opcional) decodifica entidades HTML simples que às vezes vêm do WP
    static decodeHtml = (text: string) =>
        text
            .replace(/&#8217;/g, '’')
            .replace(/&#8220;/g, '“')
            .replace(/&#8221;/g, '”')
            .replace(/&#8211;/g, '–')
            .replace(/&#8230;/g, '…')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"');

    static fetchBlogPosts = async (setLoading: any, setPosts: any, setError: any) => {
        try {
            setLoading(true);
            const wpPosts = await wordpressApi.getPosts(6, 1);

            const transformed: BlogPost[] = wpPosts.map((p) => ({
                id: p.id,
                title: this.decodeHtml(p.title),
                excerpt: this.decodeHtml(p.excerpt),
                date: p.date,
                url: p.url,
                imageUrl: p.imageUrl,
                category: p.category ?? 'Geral',
            }));

            setPosts(transformed);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar posts:', err);
            setError('Não foi possível carregar os posts do blog.');
        } finally {
            setLoading(false);
        }
    };

    static openPost = (url: string) => Linking.openURL(url);
    static openBlog = () => Linking.openURL('https://apprendendo.blog');
}
