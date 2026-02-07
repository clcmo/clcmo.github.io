import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ProjectsController } from '@/controller/projects';
import { analyticsApi } from '@/services/api';
import { Project } from '@/types';
import ProjectCard from '@/components/cards/project';
import { globalStyles } from '@/styles/global';
import { projectCardStyles } from '@/styles/project-card';
import { colors } from '@/theme';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyticsApi.trackVisit('/projects').catch(console.error);
    ProjectsController.loadProjects(setProjects, setLoading);
  }, []);

  const onRefresh = () => {
    ProjectsController.onRefresh(setRefreshing, setProjects, setLoading);
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <View style={globalStyles.section}>
          {/* Cabeçalho */}
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>02. </Text>Projetos
          </Text>

          <Text style={globalStyles.contactDescription}>
            {loading 
              ? 'Carregando projetos...' 
              : `${projects.length} repositórios disponíveis para conhecer os projetos e ideias realizadas.`
            }
          </Text>

          {/* Estado de Loading */}
          {loading ? (
            <View style={projectCardStyles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={projectCardStyles.loadingText}>Carregando projetos...</Text>
            </View>
          ) : error ? (
            /* Estado de Erro */
            <View style={projectCardStyles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#ff6b6b" />
              <Text style={projectCardStyles.errorText}>{error}</Text>
            </View>
          ) : (
            /* Lista de Projetos */
            <View style={projectCardStyles.projectsContainer}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}