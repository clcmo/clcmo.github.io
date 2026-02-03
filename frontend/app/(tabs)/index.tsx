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
                onPress={() => router.replace('#about')}
              >
                <Text style={globalStyles.ctaButtonText}>Conheça Mais</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {/* resto da página com padding normal */}
        <View style={globalStyles.content}>
          {/* About, Projects, etc */}
          {/* About Section */}
          <View style={globalStyles.section} id="about">
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>01. </Text>Sobre Mim
            </Text>

            <View style={globalStyles.aboutContent}>
              <Text style={globalStyles.aboutText}>
                Olá! Sou Camila, desenvolvedora full stack e professora, apaixonada por transformar ideias em soluções que facilitam o dia a dia das pessoas. Desenvolvo aplicações web e mobile, sempre buscando escrever código limpo, acessível e sustentável — e ensinar essas práticas também faz parte da minha missão.
                {'\n\n'}
                Iniciei minha jornada na programação movida pela curiosidade, e hoje essa curiosidade se tornou uma carreira sólida, guiada pela vontade de resolver problemas complexos com criatividade e tecnologia.
                {'\n\n'}
                Desde 2019, atuei no desenvolvimento de funcionalidades e produtos para empresas como Itaú e PagBank. Em equipe, contribui para soluções envolvendo e-commerce, educação financeira, pagamentos, comunicação e análise de dados. Em 2022, conquistei 2º lugar no HackaPag com um projeto focado em educação financeira — uma experiência que marcou meu entusiasmo por inovação.
                {'\n\n'}
                Sou pós-graduada em Inteligência Artificial pelo TIDD da PUC-SP, onde desenvolvi o artigo “Consumismo, Moralidade e Excessos da Sociedade Digitalizada”. Como pesquisadora, estudo desde 2021 o impacto da tecnologia no futuro da sociedade, especialmente a relação entre IoT, algoritmos e inteligência artificial — estudos que pretendo aprofundar em um mestrado.
                {'\n\n'}
                Também sou formada em Análise e Desenvolvimento de Sistemas pela FATEC-SP e em Administração Pública pela UFOP, trajetória que uniu tecnologia, pessoas e visão estratégica.
                {'\n\n'}
                Hoje, trabalho com tecnologias modernas como React, React Native, Node.js, TypeScript, além de bancos de dados relacionais e não-relacionais. Como professora e desenvolvedora, acredito no poder da educação e do conhecimento compartilhado — e amo aplicar, aprender e ensinar novas tecnologias em projetos reais.
                {'\n\n'}
                A seguir, algumas tecnologias com as quais tenho trabalhado recentemente:
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