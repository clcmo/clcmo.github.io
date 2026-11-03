import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  Linking,
} from "react-native";

import { ProjectsController } from "@/controller/projects";
import { analyticsApi } from "@/services/api";
import { Project } from "@/types";
import ProjectGrid from "@/components/cards/project-grid";
import { SiteFooter } from "@/components/layout/footer";
import { globalStyles } from "@/styles/global";
import { projetos as s } from "@/styles/projetos";
import { colors } from "@/theme";

const GITHUB_URL = "https://github.com/clcmo";

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    analyticsApi.trackVisit("/projects").catch(console.error);
    ProjectsController.loadProjects(setProjects, setLoading, setError);
  }, []);

  // O controller não reseta `refreshing`; aqui o spinner do pull-to-refresh termina quando a busca termina.
  const onRefresh = async () => {
    setRefreshing(true);
    await ProjectsController.loadProjects(setProjects, () => {}, setError);
    setRefreshing(false);
  };

  const languages = useMemo(
    () =>
      Array.from(
        new Set(projects.map((p) => p.language).filter(Boolean) as string[]),
      ).sort(),
    [projects],
  );
  const visible = useMemo(
    () =>
      language ? projects.filter((p) => p.language === language) : projects,
    [projects, language],
  );
  const total = visible.length;

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        ref={scrollRef}
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.page}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.preto}
            colors={[colors.preto]}
          />
        }
      >
        <View style={globalStyles.content}>
          <Text accessibilityRole="header" style={globalStyles.pageTitle}>
            Projetos
          </Text>

          <View style={s.toolbar}>
            <Text style={s.resultado}>
              {loading
                ? " "
                : `${total} ${total === 1 ? "projeto" : "projetos"}`}
            </Text>

            {languages.length > 1 && (
              <View style={s.filtros} accessibilityRole="toolbar">
                <Text style={s.filtroRotulo}>Linguagem</Text>
                {[null, ...languages].map((l) => {
                  const ativo = language === l;
                  return (
                    <Pressable
                      key={l ?? "todos"}
                      accessibilityRole="button"
                      accessibilityState={{ selected: ativo }}
                      onPress={() => setLanguage(l)}
                      style={[s.filtro, ativo && s.filtroAtivo]}
                    >
                      <Text
                        style={[s.filtroTexto, ativo && s.filtroTextoAtivo]}
                      >
                        {l ?? "Todos"}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          {loading ? (
            <View style={s.estado}>
              <ActivityIndicator color={colors.preto} />
            </View>
          ) : total === 0 ? (
            <View style={s.estado}>
              <Text style={s.estadoTexto}>{error ?? 'Nenhum projeto para mostrar agora.'}</Text>
            </View>
          ) : (
            <ProjectGrid projects={visible} />
          )}

          <Pressable
            accessibilityRole="link"
            style={globalStyles.viewMoreButton}
            onPress={() => Linking.openURL(GITHUB_URL)}
          >
            <Text style={globalStyles.viewMoreText}>Ver todos no GitHub ↗</Text>
          </Pressable>
        </View>
        <SiteFooter />
      </ScrollView>
    </View>
  );
}
