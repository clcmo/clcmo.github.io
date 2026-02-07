import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';

import { globalStyles } from '@/styles/global';
import { Project } from '@/types';
import ProjectCard from '@/components/cards/project';

interface ProjectsSectionProps {
    recentProjects: Project[];
}

export default function ProjectsSection({ recentProjects }: ProjectsSectionProps) {
    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
                <Text style={globalStyles.numberPrefix}>02. </Text>
                Projetos Recentes
            </Text>

            {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}

            <Pressable
                style={globalStyles.viewMoreButton}
                onPress={() => router.replace('/projects')}
            >
                <Text style={globalStyles.viewMoreText}>Ver Todos os Projetos →</Text>
            </Pressable>
        </View>
    );
}