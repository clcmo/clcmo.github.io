import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { analyticsApi } from '@/services/api';
import { blogStyles, globalStyles } from '@/styles/global';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  imageUrl?: string;
  category?: string;
}

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
      
      // Importar o serviço de API
      // import { blogApi } from '@/services/blogApi';
      // const posts = await blogApi.getPosts(6);
      
      // Opção alternativa usando RSS Feed
      // Se seu blog tem RSS feed, você pode usar:
      const rssFeedUrl = 'https://apprendendo.blog/feed'; // ou /rss
      
      // Usando rss2json.com (serviço gratuito para converter RSS em JSON)
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}&api_key=YOUR_API_KEY&count=6`
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.status === 'ok' && data.items) {
          const transformedPosts: BlogPost[] = data.items.map((item: any, index: number) => ({
            id: index.toString(),
            title: item.title,
            excerpt: item.description?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            date: item.pubDate,
            url: item.link,
            imageUrl: item.thumbnail || item.enclosure?.link,
            category: item.categories?.[0] || 'Geral',
          }));
          
          setPosts(transformedPosts);
          setError(null);
          return;
        }
      }
      
      // Fallback: usar posts de exemplo
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Como criar aplicativos com React Native',
          excerpt: 'Aprenda os fundamentos do React Native e comece a criar seus próprios aplicativos móveis nativos.',
          date: '2024-01-15',
          url: 'https://apprendendo.blog/react-native-fundamentos',
          imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
          category: 'Mobile'
        },
        {
          id: '2',
          title: 'TypeScript: Guia Completo para Iniciantes',
          excerpt: 'Descubra como o TypeScript pode melhorar a qualidade do seu código JavaScript.',
          date: '2024-01-10',
          url: 'https://apprendendo.blog/typescript-guia',
          imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
          category: 'TypeScript'
        },
        {
          id: '3',
          title: 'Melhores práticas em desenvolvimento web',
          excerpt: 'Conheça as técnicas e padrões mais importantes para criar aplicações web de alta qualidade.',
          date: '2024-01-05',
          url: 'https://apprendendo.blog/melhores-praticas-web',
          imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
          category: 'Web'
        }
      ];

      setPosts(mockPosts);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar posts:', err);
      setError('Não foi possível carregar os posts do blog.');
    } finally {
      setLoading(false);
    }
  };

  const openPost = (url: string) => {
    Linking.openURL(url);
  };

  const openBlog = () => {
    Linking.openURL('https://apprendendo.blog');
  };

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
                  <Pressable
                    key={post.id}
                    style={blogStyles.postCard}
                    onPress={() => openPost(post.url)}
                  >
                    {post.imageUrl && (
                      <Image
                        source={{ uri: post.imageUrl }}
                        style={blogStyles.postImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={blogStyles.postContent}>
                      {post.category && (
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
                            year: 'numeric'
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