import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import { BlogPost } from '@/interface/blog';
import { analyticsApi } from '@/services/api';
import { globalStyles } from '@/styles/global';
import { blogStyles } from '@/styles/blog';
import { BlogController } from '@/controller/blog';

export default function BlogScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsApi.trackVisit('/blog').catch(console.error);
    BlogController.fetchBlogPosts(setLoading, setPosts, setError);
  }, []);

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.section}>
          {/* Cabeçalho */}
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>01. </Text>Blog
          </Text>

          <Text style={globalStyles.contactDescription}>
            Compartilho conhecimento sobre desenvolvimento, tecnologia e aprendizado contínuo.
            Confira os últimos artigos do apprendendo.blog!
          </Text>

          {/* Estado de Loading */}
          {loading ? (
            <View style={blogStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#64ffda" />
              <Text style={blogStyles.loadingText}>Carregando posts...</Text>
            </View>
          ) : error ? (
            /* Estado de Erro */
            <View style={blogStyles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#ff6b6b" />
              <Text style={blogStyles.errorText}>{error}</Text>

              <Pressable style={blogStyles.retryButton} onPress={() => BlogController.fetchBlogPosts(setLoading, setPosts, setError)}>
                <MaterialIcons name="refresh" size={20} color="#64ffda" style={{ marginRight: 8 }} />
                <Text style={blogStyles.retryButtonText}>Tentar Novamente</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {/* Lista de Posts */}
              <View style={blogStyles.postsContainer}>
                {posts.map((post) => (
                  <Pressable
                    key={post.id}
                    style={blogStyles.postCard}
                    onPress={() => BlogController.openPost(post.url)}
                  >
                    {!!post.imageUrl && (
                      <Image
                        source={{ uri: post.imageUrl }}
                        style={blogStyles.postImage}
                        resizeMode="cover"
                      />
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

              {/* Botão Ver Todos */}
              <View style={blogStyles.viewAllContainer}>
                <Pressable style={blogStyles.viewAllButton} onPress={BlogController.openBlog}>
                  <FontAwesome5 name="wordpress" size={20} color="#64ffda" style={{ marginRight: 12 }} />
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