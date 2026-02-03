import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { Project } from '@/types';
import { projectCardStyles } from '@/styles/global';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <Pressable 
      style={projectCardStyles.card}
      onPress={() => openUrl(project.htmlUrl)}
    >
      <View style={projectCardStyles.header}>
        <Text style={projectCardStyles.folder}>📁</Text>
        <Pressable onPress={() => openUrl(project.htmlUrl)}>
          <Text style={projectCardStyles.link}>↗</Text>
        </Pressable>
      </View>

      <Text style={projectCardStyles.name}>{project.name}</Text>

      {project.description && (
        <Text style={projectCardStyles.description} numberOfLines={3}>
          {project.description}
        </Text>
      )}

      <View style={projectCardStyles.footer}>
        <View style={projectCardStyles.topics}>
          {project.topics.slice(0, 2).map((topic) => (
            <Text key={topic} style={projectCardStyles.topic}>
              {topic}
            </Text>
          ))}
        </View>
        <View style={projectCardStyles.stats}>
          <Text style={projectCardStyles.stat}>⭐ {project.stars}</Text>
          {project.language && (
            <Text style={projectCardStyles.stat}>• {project.language}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}