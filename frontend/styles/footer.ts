import { StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

export const footerStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    width: '100%',
    marginTop: 32,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 6,
  },
  marca: { width: 176, height: 60 },
  copy: { fontFamily: fonts.serif, fontSize: 13.6, lineHeight: 20, color: colors.text, textAlign: 'center' },
});
