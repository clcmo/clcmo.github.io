import React from 'react';
import { Stack, router } from 'expo-router';
import Head from "expo-router/head";
import { Pressable, View, Text, SafeAreaView } from 'react-native';
import { useFonts, Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend';
import AppLoading from 'expo-app-loading';

import { globalStyles } from '@/styles/global';
import { SiteFooter } from '@/components/site-footer';

const SITE_URL = 'https://dev.camilaloliveira.me';
const DEFAULT_TITLE = 'Camila L. Oliveira | Full Stack + Professora';
const DEFAULT_DESCRIPTION =
  'Portfólio de Camila L. Oliveira — projetos, tecnologias e contato. Desenvolvimento web e mobile com foco em UX.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function TopNav() {
  return (
    <View style={globalStyles.nav}>
      <Pressable onPress={() => router.replace('/')}>
        <Text style={globalStyles.navLink}>Sobre</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/blog')}>
        <Text style={globalStyles.navLink}>Blog</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/projects')}>
        <Text style={globalStyles.navLink}>Projetos</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/contact')}>
        <Text style={globalStyles.navLink}>Contato</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/donate')}>
        <Text style={globalStyles.navLink}>Apoie</Text>
      </Pressable>
    </View>
  );
}

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      {/* ✅ HEAD GLOBAL (vale para todas as rotas) */}
      <Head>
        {/* Básico */}
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a192f" />

        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph (Facebook, LinkedIn, WhatsApp, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Camila L. Oliveira" />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Portfólio de Camila L. Oliveira" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Opcional: se você tiver @ no Twitter/X */}
        {/* <meta name="twitter:site" content="@seuuser" /> */}
        {/* <meta name="twitter:creator" content="@seuuser" /> */}
      </Head>

      {/* Seu Stack */}
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.wrapper}>
          {/* Header/Stack */}
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: 'rgba(1, 14, 28, 0.5)' },
              headerTintColor: '#fff',
              headerTitle: '<CL />'.toLocaleUpperCase(),
              headerRight: () => (
                <View style={globalStyles.headerRightContainer}>
                  <TopNav />
                </View>
              ),
            }}
          />

          {/* Footer fixo no final */}
          <SiteFooter />
        </View>
      </SafeAreaView>
    </>
  );
}