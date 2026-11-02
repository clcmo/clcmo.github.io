import { Linking } from 'react-native';
import type { Dispatch, SetStateAction } from 'react';

import { camilaWordPressApi, wordpressApi } from '@/services/wpApi';
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

    static fetchBlogPosts = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setPosts: Dispatch<SetStateAction<BlogPost[]>>,
        setError: Dispatch<SetStateAction<string | null>>,
    ) => {
        try {
            setLoading(true);
            const [apprendendoResult, camilaResult] = await Promise.allSettled([
                wordpressApi.getPosts(6, 1),
                camilaWordPressApi.getPosts(6, 1),
            ]);

            if (apprendendoResult.status === 'rejected') {
                console.error('Erro ao carregar posts do Apprendendo:', apprendendoResult.reason);
            }
            if (camilaResult.status === 'rejected') {
                console.error('Erro ao carregar posts de Camila L. Oliveira:', camilaResult.reason);
            }
            if (apprendendoResult.status === 'rejected' && camilaResult.status === 'rejected') {
                throw new Error('Não foi possível carregar posts de nenhum dos blogs.');
            }

            const wpPosts = [
                ...(apprendendoResult.status === 'fulfilled' ? apprendendoResult.value : []),
                ...(camilaResult.status === 'fulfilled' ? camilaResult.value : []),
            ].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

            const transformed: BlogPost[] = wpPosts.map((p) => ({
                id: p.id,
                title: this.decodeHtml(p.title),
                excerpt: this.decodeHtml(p.excerpt),
                date: p.date,
                url: p.url,
                source: p.source,
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
    static openBlog = (source: 'camila' | 'apprendendo') =>
        Linking.openURL(source === 'camila' ? 'https://camilaloliveira.com/blog/' : 'https://apprendendo.blog');
}
