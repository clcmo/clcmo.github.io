import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, ActivityIndicator, Platform, ImageBackground } from 'react-native';
import { router } from 'expo-router';

import { projectsApi, analyticsApi } from '@/services/api';
import { Project as ProjectType } from '@/types';
import ProjectCard from '@/components/project-card';
import LanguageChart from '@/components/language-chart';
import { globalStyles } from '@/styles/global';


const WEB_STARS =
  'https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Stars.svg?sanitize=true';

const heroBgStyle =
  Platform.OS === 'web'
    ? ({
      backgroundImage: `url(${WEB_STARS})`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
    } as any)
    : undefined;

type Project = any;

export default function HomeScreen() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
    analyticsApi.trackVisit('/').catch(console.error);
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(
        data.sort(
          (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const recentProjects = projects.slice(0, 3);
  const languageData = getLanguageStats(projects);

  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" color="#64ffda" />
      </View>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.page}
      >


        <ImageBackground
          source={Platform.OS === 'web' ? undefined : require('@/assets/stars.png')}
          resizeMode="cover"
          style={[globalStyles.heroBg, heroBgStyle]} // ✅ AQUI é a diferença
          imageStyle={globalStyles.heroBgImage}
        >


          <View style={globalStyles.heroOverlay}>
            <View style={globalStyles.heroInner}>
              {/* seu conteúdo do hero aqui */}
              <Text style={globalStyles.greeting}>Olá, meu nome é</Text>
              <Text style={globalStyles.name}>Camila Leite Oliveira</Text>
              <Text style={globalStyles.tagline}>Desenvolvedora Full Stack + Professora</Text>

              <Text style={globalStyles.description}>
                Sou desenvolvedora apaixonada por criar soluções elegantes e funcionais.
                Especializada em desenvolvimento web e mobile com foco em experiência do usuário.
              </Text>

              {/* ✅ CTA agora navega para a página/aba de contato */}
              <Pressable
                style={globalStyles.ctaButton}
                onPress={() => router.replace('/contact')}
              >
                <Text style={globalStyles.ctaButtonText}>Entre em Contato</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {/* resto da página com padding normal */}
        <View style={globalStyles.content}>
          {/* About, Projects, etc */}
          {/* About Section */}
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>01. </Text>Sobre Mim
            </Text>

            <View style={globalStyles.aboutContent}>
              <Text style={globalStyles.aboutText}>
                Olá! Sou Camila, desenvolvedora full stack com experiência em criar aplicações web e mobile.
                Minha jornada na programação começou com curiosidade e se transformou em paixão por resolver
                problemas complexos com código elegante.
                {'\n\n'}
                Atualmente trabalho com tecnologias modernas como React, React Native, Node.js, TypeScript e
                bancos de dados relacionais e não-relacionais. Adoro aprender novas tecnologias e aplicá-las
                em projetos reais.
                {'\n\n'}
                Aqui estão algumas tecnologias com as quais tenho trabalhado recentemente:
              </Text>

              <View style={globalStyles.techList}>
                <Text style={globalStyles.techItem}>▹ JavaScript (ES6+)</Text>
                <Text style={globalStyles.techItem}>▹ TypeScript</Text>
                <Text style={globalStyles.techItem}>▹ React & React Native</Text>
                <Text style={globalStyles.techItem}>▹ Node.js & Express</Text>
                <Text style={globalStyles.techItem}>▹ MongoDB & PostgreSQL</Text>
                <Text style={globalStyles.techItem}>▹ Git & GitHub</Text>
              </View>
            </View>
          </View>

          {/* Projects Section */}
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>02. </Text>Projetos Recentes
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

          {/* Language Stats */}
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>03. </Text>Linguagens Mais Utilizadas
            </Text>
            <LanguageChart data={languageData} />
          </View>

          {/* ✅ CTA final (opcional) para reforçar contato */}
          <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>04. </Text>Vamos conversar?
            </Text>

            <Text style={globalStyles.contactDescription}>
              Estou sempre aberta a novas oportunidades e colaborações. Se você tem um projeto em mente
              ou quer só dizer “olá”, me mande uma mensagem.
            </Text>

            <Pressable
              style={globalStyles.submitButton}
              onPress={() => router.replace('/contact')}
            >
              <Text style={globalStyles.submitButtonText}>Ir para Contato</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getLanguageStats(projects: Project[]) {
  const languageCount: { [key: string]: number } = {};

  projects.forEach((project) => {
    if (project.language) {
      languageCount[project.language] = (languageCount[project.language] || 0) + 1;
    }
  });

  return Object.entries(languageCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}