import { Platform } from 'react-native';

// Nomes registrados por @expo-google-fonts/outfit e /literata (carregados em app/(tabs)/_layout.tsx).
// Na web entra a mesma pilha de fallback do CSS do tema.
export const fonts = {
  sans: Platform.select({
    web: "Outfit_500Medium, 'Avenir Next', 'Helvetica Neue', Arial, sans-serif",
    default: 'Outfit_500Medium',
  }) as string,
  sansBold: Platform.select({
    web: "Outfit_700Bold, 'Avenir Next', 'Helvetica Neue', Arial, sans-serif",
    default: 'Outfit_700Bold',
  }) as string,
  serif: Platform.select({
    web: "Literata_400Regular, 'Iowan Old Style', Georgia, 'Times New Roman', serif",
    default: 'Literata_400Regular',
  }) as string,
};

export const typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    body: 17, // 1.0625rem do tema
    lg: 20,
    xl: 24,
    xxl: 28,
    heroName: Platform.OS === 'web' ? 64 : 40,
    heroTagline: Platform.OS === 'web' ? 40 : 24,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    lg: 28,
    md: 24,
    sm: 20,
    body: 29, // 1.7 do tema

    hero: Platform.OS === 'web' ? 72 : 44,
    heroTag: Platform.OS === 'web' ? 46 : 30,
  },
};
