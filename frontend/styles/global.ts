// '@/styles/global.ts'
import { Platform, StyleSheet } from 'react-native';
import { colors, fonts, spacing, typography } from '@/theme';

/**
 * GLOBAL STYLES — tema camilaloliveira.com
 * - Títulos: Outfit bold, caixa-alta
 * - Texto corrido: Literata
 * - Cantos retos, linhas pretas finas, fundo branco / linho
 */
const web = Platform.OS === 'web';
const LARGA = 1088; // --larga
const MEDIDA = 608; // --medida

export const globalStyles = StyleSheet.create({
  // ===== Base / Layout =====
  screen: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  page: { flexGrow: 1, backgroundColor: colors.bg },

  content: {
    paddingHorizontal: web ? 32 : spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: 96,
    width: '100%',
    maxWidth: LARGA + 64,
    alignSelf: 'center',
  },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },

  // ===== Seções e títulos =====
  section: { marginTop: web ? 72 : 48, width: '100%', alignSelf: 'center' },

  // equivale a .vitrine__cab h2: filete preto no topo + título pequeno em caixa-alta
  sectionTitle: {
    fontFamily: fonts.sansBold,
    fontSize: 17,
    lineHeight: 19,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    color: colors.text,
    borderTopWidth: 1,
    borderTopColor: colors.fio,
    paddingTop: spacing.md,
    marginBottom: spacing.xxl,
  },

  // equivale a .titulo-pagina
  pageTitle: {
    fontFamily: fonts.sansBold,
    fontSize: web ? 30 : 24,
    lineHeight: web ? 33 : 26,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    color: colors.text,
    marginBottom: 40,
  },

  numberPrefix: { fontFamily: fonts.sansBold, fontSize: 17, color: colors.marca },

  greeting: {
    fontFamily: fonts.sans,
    fontSize: typography.size.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.marca,
    marginBottom: spacing.sm,
  },

  paragraph: {
    fontFamily: fonts.serif,
    fontSize: typography.size.body,
    color: colors.text,
    lineHeight: typography.lineHeight.body,
  },

  description: {
    fontFamily: fonts.serif,
    fontSize: typography.size.body,
    color: colors.text,
    lineHeight: typography.lineHeight.body,
    maxWidth: MEDIDA,
    marginBottom: spacing.xxl,
  },

  // ===== Capa da home (marca + retrato) =====
  capa: { width: '100%', paddingHorizontal: web ? 24 : 12, paddingTop: web ? 40 : 12 },
  capaMarca: {
    width: '88%',
    maxWidth: 736,
    aspectRatio: 550 / 185,
    alignSelf: 'center',
  },
  capaFoto: { width: '100%', backgroundColor: colors.surface },
  capaTexto: {
    width: '100%',
    maxWidth: LARGA + 64,
    alignSelf: 'center',
    paddingHorizontal: web ? 32 : spacing.lg,
    marginTop: web ? 48 : 32,
  },
  capaTagline: {
    fontFamily: fonts.sansBold,
    fontSize: web ? 22 : 18,
    lineHeight: web ? 28 : 24,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    color: colors.text,
    marginBottom: spacing.md,
  },
  capaDescricao: {
    fontFamily: fonts.serif,
    fontSize: typography.size.body,
    lineHeight: typography.lineHeight.body,
    color: colors.text,
    maxWidth: MEDIDA,
    marginBottom: spacing.xl,
  },

  // ===== Botões (padrão contorno, como .botao-contorno) =====
  buttonOutline: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.preto,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutlineText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.65,
    color: colors.preto,
  },
  heroCta: { alignSelf: 'flex-start' },

  // ===== About =====
  aboutContent: { gap: spacing.lg },
  aboutText: {
    fontFamily: fonts.serif,
    fontSize: typography.size.body,
    color: colors.text,
    lineHeight: typography.lineHeight.body,
    maxWidth: MEDIDA,
  },
  techList: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.md },
  techItem: {
    fontFamily: fonts.sans,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    width: web ? '30%' : '45%',
  },

  // ===== Link "Ver todos" (como .vitrine__ver) =====
  viewMoreButton: { marginTop: spacing.xxxl, alignSelf: 'flex-start' },
  viewMoreText: {
    fontFamily: fonts.sans,
    fontSize: 13.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.text,
    textDecorationLine: 'underline',
  },

  // ===== Contact =====
  contactDescription: {
    fontFamily: fonts.serif,
    fontSize: typography.size.body,
    color: colors.text,
    lineHeight: typography.lineHeight.body,
    marginBottom: spacing.xxxl,
    maxWidth: MEDIDA,
  },
  submitButton: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.preto,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  submitButtonText: {
    fontFamily: fonts.sansBold,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.65,
    color: colors.preto,
  },

  // ===== States =====
  errorText: { fontFamily: fonts.sans, fontSize: typography.size.md, color: colors.danger, textAlign: 'center' },

  // ===== Compatibilidade (nav antiga) =====
  nav: { flexDirection: 'row', gap: spacing.lg },
  navLink: { fontFamily: fonts.sans, fontSize: typography.size.sm, color: colors.text },
  headerRightContainer: { paddingRight: spacing.lg, paddingLeft: spacing.sm, alignItems: 'center', justifyContent: 'center' },
  ctaButton: {
    minHeight: 42,
    borderWidth: 1,
    borderColor: colors.preto,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
    alignSelf: 'flex-start',
  },
  ctaButtonText: { fontFamily: fonts.sansBold, fontSize: 13, textTransform: 'uppercase', color: colors.preto },

  shell: { flex: 1, backgroundColor: colors.bg },
  shellContent: { flex: 1 },
});

export const menuStyles = StyleSheet.create({
  headerStyle: { backgroundColor: colors.bg },
  headerTintColor: { color: colors.text },
  headerTitleStyle: {
    fontFamily: fonts.sansBold,
    fontWeight: '700',
    fontSize: typography.size.lg,
    color: colors.text,
  },
});
