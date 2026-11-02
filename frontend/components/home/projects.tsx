import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import { globalStyles } from '@/styles/global';
import { projetos as styles } from '@/styles/projetos';
import { Project } from '@/types';
import ProjectGrid from '@/components/cards/project-grid';

interface ProjectsSectionProps {
  recentProjects: Project[];
  error?: string | null;
}

export default function ProjectsSection({ recentProjects, error }: ProjectsSectionProps) {
  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>Projetos recentes</Text>

      {error ? (
        <View style={styles.estado}>
          <Text style={styles.estadoTexto}>{error}</Text>
        </View>
      ) : (
        <ProjectGrid projects={recentProjects} />
      )}

      <Pressable
        accessibilityRole="link"
        style={globalStyles.viewMoreButton}
        onPress={() => router.replace('/projects')}
      >
        <Text style={globalStyles.viewMoreText}>Ver todos os projetos →</Text>
      </Pressable>
    </View>
  );
}
