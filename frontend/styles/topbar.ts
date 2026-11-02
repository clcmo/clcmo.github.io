import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '@/theme';

const web = Platform.OS === 'web';

// Cabeçalho do tema: monograma + botão de menu; o menu abre em tela cheia sobre fundo linho.
export const topBarStyles = StyleSheet.create({
  bar: {
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: web ? 32 : 20,
    paddingTop: web ? 28 : 12,
    paddingBottom: 8,
    backgroundColor: colors.bg,
  },
  logo: { zIndex: 60, width: 44, height: 44, justifyContent: 'center' },
  logoImagem: { width: 40, height: 40, resizeMode: 'contain', tintColor: colors.marca },

  menuBtn: { zIndex: 60, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  linha: { width: 20, height: 2, backgroundColor: colors.text },
  linhaEspaco: { marginTop: 4 },
  linhaX: { position: 'absolute', width: 20, height: 2, backgroundColor: colors.text },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    backgroundColor: colors.surface,
    paddingHorizontal: web ? 32 : 20,
    paddingTop: 110,
    paddingBottom: 48,
    justifyContent: 'center',
  },
  lista: { width: '100%', maxWidth: 1088, alignSelf: 'center', gap: 4 },
  link: { fontFamily: fonts.sansBold, textTransform: 'uppercase', color: colors.text, alignSelf: 'flex-start' },
  linkAtivo: { textDecorationLine: 'underline' },
});
