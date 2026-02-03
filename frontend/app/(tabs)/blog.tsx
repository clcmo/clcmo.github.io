// BlogScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { analyticsApi } from '@/services/api';
import { wordpressApi } from '@/services/wpApi';
import { globalStyles } from '@/styles/global';
import { blogStyles } from '@/styles/blog';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  imageUrl?: string;
  category?: string;
}

// (Opcional) decodifica entidades HTML simples que às vezes vêm do WP
const decodeHtml = (text: string) =>
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

export default function BlogScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsApi.trackVisit('/blog').catch(console.error);
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);

      // ✅ Pega posts direto do WordPress REST API (/wp-json/wp/v2/posts?per_page=...&_embed)
      const wpPosts = await wordpressApi.getPosts(6, 1);

      // Normaliza para o formato usado na tela
      const transformed: BlogPost[] = wpPosts.map((p) => ({
        id: p.id,
        title: decodeHtml(p.title),
        excerpt: decodeHtml(p.excerpt),
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

  const openPost = (url: string) => Linking.openURL(url);
  const openBlog = () => Linking.openURL('https://apprendendo.blog');

  return (
    <View style={globalStyles.screen}>
      <ScrollView style={globalStyles.scroll} contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.section}>
          <View style={blogStyles.headerContainer}>
            <View style={blogStyles.iconHeader}>
              <FontAwesome5 name="blog" size={32} color="#64ffda" />
            </View>

            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>02. </Text>Blog
            </Text>
          </View>

          <Text style={globalStyles.contactDescription}>
            Compartilho conhecimento sobre desenvolvimento, tecnologia e aprendizado contínuo.
            Confira os últimos artigos do apprendendo.blog!
          </Text>

          {loading ? (
            <View style={blogStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#64ffda" />
              <Text style={blogStyles.loadingText}>Carregando posts...</Text>
            </View>
          ) : error ? (
            <View style={blogStyles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#ff6b6b" />
              <Text style={blogStyles.errorText}>{error}</Text>

              <Pressable style={blogStyles.retryButton} onPress={fetchBlogPosts}>
                <MaterialIcons name="refresh" size={20} color="#64ffda" style={{ marginRight: 8 }} />
                <Text style={blogStyles.retryButtonText}>Tentar Novamente</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={blogStyles.postsContainer}>
                {posts.map((post) => (
                  <Pressable key={post.id} style={blogStyles.postCard} onPress={() => openPost(post.url)}>
                    {!!post.imageUrl && (
                      <Image source={{ uri: post.imageUrl }} style={blogStyles.postImage} resizeMode="cover" />
                    )}

                    <View style={blogStyles.postContent}>
                      {!!post.category && (
                        <View style={blogStyles.categoryContainer}>
                          <MaterialIcons name="label" size={14} color="#64ffda" />
                          <Text style={blogStyles.postCategory}>{post.category}</Text>
                        </View>
                      )}

                      <Text style={blogStyles.postTitle}>{post.title}</Text>
                      <Text style={blogStyles.postExcerpt}>{post.excerpt}</Text>

                      <View style={blogStyles.postFooter}>
                        <MaterialIcons name="calendar-today" size={12} color="#8892b0" />
                        <Text style={blogStyles.postDate}>
                          {new Date(post.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>
                      </View>

                      <View style={blogStyles.readMore}>
                        <Text style={blogStyles.readMoreText}>Ler artigo</Text>
                        <MaterialIcons name="arrow-forward" size={16} color="#64ffda" />
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>

              <View style={blogStyles.viewAllContainer}>
                <Pressable style={blogStyles.viewAllButton} onPress={openBlog}>
                  <FontAwesome5 name="blog" size={20} color="#64ffda" style={{ marginRight: 12 }} />
                  <Text style={blogStyles.viewAllButtonText}>Ver Todos os Posts</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#64ffda" style={{ marginLeft: 8 }} />
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}