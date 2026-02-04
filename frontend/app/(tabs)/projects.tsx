import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { projectsApi, analyticsApi } from '@/services/api';
import { Project } from '@/types';
import ProjectCard from '@/components/project-card';
import { globalStyles } from '@/styles/global';
import { projectCardStyles } from '@/styles/project-card';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setError(null);
      const data = await projectsApi.getAll();
      setProjects(data.sort((a, b) => b.stars - a.stars));
    } catch (err) {
      setError('Erro ao carregar projetos');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProjects();
    analyticsApi.trackVisit('/projects').catch(console.error);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProjects();
  };

  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.center}>
        <Text style={globalStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProjectCard project={item} />}
        contentContainerStyle={projectCardStyles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={projectCardStyles.headerRow}>
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>02. </Text>Projetos
            </Text>
            <Text style={globalStyles.contactDescription}>São {projects.length} repositórios disponíveis, para conhecer os projetos e ideias realizadas</Text>
          </View>
        }
      />
    </View>
  );
}