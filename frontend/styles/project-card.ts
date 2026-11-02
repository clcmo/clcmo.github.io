import { Platform, StyleSheet } from 'react-native';
import { colors, spacing, typography, fonts } from '@/theme';

/**
 * Project Card Styles
 * - Suporta: ProjectsScreen (list/headerRow/title/subtitle)
 * - Suporta: ProjectCard (card/header/icons/text/topics/stats/footer)
 * - Padronizado com tokens (colors, spacing, typography) + Lexend
 */
export const projectCardStyles = StyleSheet.create({
  // ====== Lista / Tela ======
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },

  headerRow: {
    marginBottom: spacing.lg,
  },

  title: {
    fontFamily: fonts.sansBold,
    fontSize: typography.size.xxl,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontFamily: fonts.sans,
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },

  // ====== Card Base ======
  card: {
    backgroundColor: colors.surface,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },

  // Use se quiser efeito “hover” no web (opcional)
  cardWeb: Platform.select({
    web: {
      cursor: 'pointer',
      transitionProperty: 'transform, box-shadow',
      transitionDuration: '150ms',
    } as any,
    default: {},
  }),

  // ====== Header do Card (ícones + links) ======
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  // Ícone de pasta (ou qualquer ícone à esquerda)
  folder: {
    fontSize: typography.size.xl,
    color: colors.primary,
  },

  // Ícone/link (ex: github/external)
  link: {
    fontSize: typography.size.lg,
    color: colors.primary,
  },

  // Caso use um "chip" de linguagem no header
  languagePill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 0,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'transparent',
  },

  languageText: {
    fontFamily: fonts.sans,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },

  // ====== Conteúdo do Card ======
  name: {
    fontFamily: fonts.sansBold,
    fontSize: typography.size.lg,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  description: {
    fontFamily: fonts.serif,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    lineHeight: typography.lineHeight.md,
    marginBottom: spacing.md,
  },

  // Caso haja um "meta" (ex: updatedAt, license, etc)
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },

  metaText: {
    fontFamily: fonts.sans,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },

  // ====== Footer ======
  footer: {
    marginTop: spacing.sm,
    gap: spacing.md,
  },

  // ====== Topics (tags) ======
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  // Duas opções: topic simples (texto) OU chip
  topic: {
    fontFamily: fonts.sans,
    fontSize: typography.size.xs,
    color: colors.primary,
  },

  topicChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 0,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'transparent',
  },

  topicChipText: {
    fontFamily: fonts.sans,
    fontSize: typography.size.xs,
    color: colors.primary,
  },

  // ====== Stats (stars, forks etc) ======
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.md,
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  statIcon: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },

  stat: {
    fontFamily: fonts.sans,
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },

  // ====== Estados (loading/empty) se quiser reutilizar no card/list ======
  emptyState: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontFamily: fonts.sansBold,
    fontSize: typography.size.lg,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },

  emptyText: {
    fontFamily: fonts.serif,
    fontSize: typography.size.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
    maxWidth: 520,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl || 60,
  },
  loadingText: {
    marginTop: spacing.md || 16,
    fontSize: 16,
    color: colors.textMuted,
    fontFamily: fonts.sans,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxxl || 60,
  },
  
  errorText: {
    marginTop: spacing.md || 16,
    fontSize: 16,
    color: colors.danger,
    textAlign: 'center',
    fontFamily: fonts.sans,
    paddingHorizontal: spacing.lg || 20,
  },
  projectsContainer: {
    marginTop: spacing.lg || 24,
    gap: spacing.lg || 24,
  },
});