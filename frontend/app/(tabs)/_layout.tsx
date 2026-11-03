import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Outfit_500Medium, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Literata_400Regular } from '@expo-google-fonts/literata';
import AppLoading from 'expo-app-loading';

import { globalStyles } from '@/styles/global';
import { Header } from '@/components/layout/header';
import { TopBar } from '@/components/layout/nav';
import { colors } from '@/theme';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Outfit_500Medium,
    Outfit_700Bold,
    Literata_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <SafeAreaProvider>
      {/* HEAD GLOBAL (vale para todas as rotas) */}
      <Header />

      <SafeAreaView style={globalStyles.shell} edges={['top', 'left', 'right']}>
        <View style={globalStyles.shellContent}>
          {/* Cabeçalho do tema: monograma + menu em tela cheia */}
          <TopBar />

          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
