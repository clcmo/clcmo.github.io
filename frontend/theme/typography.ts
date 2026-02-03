import { Platform } from 'react-native';
export const typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
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

    hero: Platform.OS === 'web' ? 72 : 44,
    heroTag: Platform.OS === 'web' ? 46 : 30,

  },
};
