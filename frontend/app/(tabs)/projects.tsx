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
const PROJECTS_PER_PAGE = 10;

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [language, setLanguage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
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
  const pageCount = Math.ceil(total / PROJECTS_PER_PAGE);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  const pageProjects = useMemo(
    () =>
      visible.slice(
        (currentPage - 1) * PROJECTS_PER_PAGE,
        currentPage * PROJECTS_PER_PAGE,
      ),
    [visible, currentPage],
  );
  const firstProject = total === 0 ? 0 : (currentPage - 1) * PROJECTS_PER_PAGE + 1;
  const lastProject = Math.min(currentPage * PROJECTS_PER_PAGE, total);

  const goToPage = (nextPage: number) => {
    setPage(nextPage);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

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
                : `${firstProject}–${lastProject} de ${total} ${total === 1 ? "projeto" : "projetos"}`}
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
                      onPress={() => {
                        setLanguage(l);
                        setPage(1);
                      }}
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
            <>
              <ProjectGrid projects={pageProjects} />
              {pageCount > 1 && (
                <View style={s.paginacao} accessibilityRole="toolbar" accessibilityLabel="Paginação dos projetos">
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Página anterior"
                    accessibilityState={{ disabled: currentPage === 1 }}
                    disabled={currentPage === 1}
                    onPress={() => goToPage(currentPage - 1)}
                    style={[s.paginacaoBotao, currentPage === 1 && s.paginacaoBotaoDesabilitado]}
                  >
                    <Text style={s.paginacaoTexto}>Anterior</Text>
                  </Pressable>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => {
                    const selected = pageNumber === currentPage;
                    return (
                      <Pressable
                        key={pageNumber}
                        accessibilityRole="button"
                        accessibilityLabel={`Página ${pageNumber}`}
                        accessibilityState={{ selected }}
                        onPress={() => goToPage(pageNumber)}
                        style={[s.paginacaoBotao, selected && s.paginacaoBotaoAtivo]}
                      >
                        <Text style={[s.paginacaoTexto, selected && s.paginacaoTextoAtivo]}>
                          {pageNumber}
                        </Text>
                      </Pressable>
                    );
                  })}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Próxima página"
                    accessibilityState={{ disabled: currentPage === pageCount }}
                    disabled={currentPage === pageCount}
                    onPress={() => goToPage(currentPage + 1)}
                    style={[s.paginacaoBotao, currentPage === pageCount && s.paginacaoBotaoDesabilitado]}
                  >
                    <Text style={s.paginacaoTexto}>Próxima</Text>
                  </Pressable>
                </View>
              )}
            </>
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
