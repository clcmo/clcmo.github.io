import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  LayoutChangeEvent,
} from 'react-native';

import { analyticsApi } from '@/services/api';
import { Project as ProjectType } from '@/types';
import { globalStyles } from '@/styles/global';

import Hero from '@/components/home/hero';
import About from '@/components/home/about';
import ProjectsSection from '@/components/home/projects';
import LanguageStats from '@/components/home/language-stats';
import CTA from '@/components/home/cta';
import { SiteFooter } from '@/components/layout/footer';

import { LanguageController } from '@/controller/language';
import { ProjectsController } from '@/controller/projects';
import { HomeController } from '@/controller/home';

import { colors } from '@/theme';
export default function HomeScreen() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  // Scroll + âncora real
  const scrollRef = useRef<ScrollView>(null);
  const [aboutY, setAboutY] = useState(0);

  useEffect(() => {
    ProjectsController.loadProjects(setProjects, setLoading, setProjectsError);
    analyticsApi.trackVisit('/').catch(console.error);
  }, []);

  const recentProjects = useMemo(() => projects.slice(0, 3), [projects]);
  const languageData = useMemo(() => LanguageController.getLanguageStats(projects), [projects]);

  const onAboutLayout = (e: LayoutChangeEvent) => {
    setAboutY(e.nativeEvent.layout.y);
  };

  const goToAbout = () => {
    HomeController.scrollToAbout(scrollRef, aboutY);
  };

  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        ref={scrollRef}
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.page}
      >
        <Hero onPressKnowMore={goToAbout} />

        {/* resto da página com padding normal */}
        <View style={globalStyles.content}>
          {/* About Section */}
          <About onLayout={onAboutLayout} />

          {/* Projects Section */}
          <ProjectsSection recentProjects={recentProjects} error={projectsError} />

          {/* Language Stats */}
          <LanguageStats languageData={languageData} />

          {/* CTA final */}
          <CTA />
        </View>
        <SiteFooter />
      </ScrollView>
    </View>
  );
}