import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { BlogPost, BlogSource } from "@/interface/blog";
import { analyticsApi } from "@/services/api";
import { globalStyles } from "@/styles/global";
import { blogStyles } from "@/styles/blog";
import { BlogController } from "@/controller/blog";
import { SiteFooter } from "@/components/layout/footer";

import { colors } from "@/theme";
export default function BlogScreen() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<BlogSource | "all">("all");
  const visiblePosts =
    sourceFilter === "all"
      ? posts
      : posts.filter((post) => post.source === sourceFilter);

    const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    analyticsApi.trackVisit("/blog").catch(console.error);
    BlogController.fetchBlogPosts(setLoading, setPosts, setError);
  }, []);

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        ref={scrollRef}
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.page}
      >
        <View style={globalStyles.content}>
          {/* Cabeçalho */}
          <Text style={globalStyles.sectionTitle}>Blog</Text>

          <Text style={globalStyles.contactDescription}>
            Compartilho conhecimento sobre desenvolvimento, tecnologia e
            aprendizado contínuo. Confira os últimos artigos dos meus blogs.
          </Text>

          <View
            style={blogStyles.sourceFilters}
            accessibilityRole="toolbar"
            accessibilityLabel="Filtrar posts por blog"
          >
            {(
              [
                { label: "Todos", value: "all" },
                { label: "Camila L. Oliveira", value: "camila" },
                { label: "Apprendendo", value: "apprendendo" },
              ] as const
            ).map((filter) => {
              const selected = sourceFilter === filter.value;
              return (
                <Pressable
                  key={filter.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setSourceFilter(filter.value)}
                  style={[
                    blogStyles.sourceFilter,
                    selected && blogStyles.sourceFilterSelected,
                  ]}
                >
                  <Text
                    style={[
                      blogStyles.sourceFilterText,
                      selected && blogStyles.sourceFilterTextSelected,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Estado de Loading */}
          {loading ? (
            <View style={blogStyles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={blogStyles.loadingText}>Carregando posts...</Text>
            </View>
          ) : error ? (
            /* Estado de Erro */
            <View style={blogStyles.errorContainer}>
              <MaterialIcons
                name="error-outline"
                size={48}
                color={colors.danger}
              />
              <Text style={blogStyles.errorText}>{error}</Text>

              <Pressable
                style={blogStyles.retryButton}
                onPress={() =>
                  BlogController.fetchBlogPosts(setLoading, setPosts, setError)
                }
              >
                <MaterialIcons
                  name="refresh"
                  size={20}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={blogStyles.retryButtonText}>Tentar Novamente</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {/* Lista de Posts */}
              <View style={blogStyles.postsContainer}>
                {visiblePosts.map((post) => (
                  <Pressable
                    key={`${post.source}-${post.id}`}
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
                      <View style={blogStyles.categoryContainer}>
                        <Text style={blogStyles.postSource}>
                          {post.source === "camila"
                            ? "Camila L. Oliveira"
                            : "Apprendendo"}
                        </Text>
                        {!!post.category && (
                          <Text style={blogStyles.postCategory}>
                            {post.category}
                          </Text>
                        )}
                      </View>

                      <Text style={blogStyles.postTitle}>{post.title}</Text>
                      <Text style={blogStyles.postExcerpt}>{post.excerpt}</Text>

                      <View style={blogStyles.postFooter}>
                        <MaterialIcons
                          name="calendar-today"
                          size={12}
                          color={colors.textMuted}
                        />
                        <Text style={blogStyles.postDate}>
                          {new Date(post.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </Text>
                      </View>

                      <View style={blogStyles.readMore}>
                        <Text style={blogStyles.readMoreText}>Ler artigo</Text>
                        <MaterialIcons
                          name="arrow-forward"
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>

              <View style={blogStyles.viewAllContainer}>
                <Pressable
                  style={blogStyles.viewAllButton}
                  onPress={() => BlogController.openBlog("camila")}
                >
                  <FontAwesome5
                    name="wordpress"
                    size={20}
                    color={colors.primary}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={blogStyles.viewAllButtonText}>
                    Camila L. Oliveira
                  </Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={20}
                    color={colors.primary}
                    style={{ marginLeft: 8 }}
                  />
                </Pressable>
                <Pressable
                  style={blogStyles.viewAllButton}
                  onPress={() => BlogController.openBlog("apprendendo")}
                >
                  <FontAwesome5
                    name="wordpress"
                    size={20}
                    color={colors.primary}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={blogStyles.viewAllButtonText}>Apprendendo</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={20}
                    color={colors.primary}
                    style={{ marginLeft: 8 }}
                  />
                </Pressable>
              </View>
            </>
          )}
        </View>
        <SiteFooter />
      </ScrollView>
    </View>
  );
}
