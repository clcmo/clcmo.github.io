import { Platform } from 'react-native';
import { router } from 'expo-router';
import { RefObject } from 'react';
import { ScrollView } from 'react-native';

export class HomeController {
  static scrollToAbout(
    scrollRef: RefObject<ScrollView | null>,
    aboutY: number
  ): void {
    // scroll suave em qualquer plataforma
    scrollRef.current?.scrollTo({ y: aboutY, animated: true });

    // no web, também atualiza a URL com hash (opcional)
    if (Platform.OS === 'web') {
      router.replace('/about');
    }
  }
}