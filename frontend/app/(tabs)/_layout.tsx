import React from 'react';
import { Stack  } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend';
import AppLoading from 'expo-app-loading';

import { globalStyles, menuStyles } from '@/styles/global';
import { SiteFooter } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { TopNav } from '@/components/layout/nav';

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <SafeAreaProvider>
      {/* ✅ HEAD GLOBAL (vale para todas as rotas) */}
      <Header />

      {/* Seu Stack */}
      <SafeAreaView style={globalStyles.shell} edges={['top', 'left', 'right']}>
        <View style={globalStyles.shellContent}>
          {/* Header/Stack */}
          <Stack
            screenOptions={{
              headerStyle: menuStyles.headerStyle,
              headerTitleStyle: menuStyles.headerTitleStyle,
              headerTitle: '<CL />',
              headerRight: () => (
                <View style={globalStyles.headerRightContainer}>
                  <TopNav />
                </View>
              ),
              headerTransparent: true,
              headerBlurEffect: 'dark',
            }}
          />

          {/* Footer fixo no final */}
          <SiteFooter />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}