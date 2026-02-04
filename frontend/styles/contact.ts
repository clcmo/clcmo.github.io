import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const contactStyles = StyleSheet.create({
  // Seção de contatos
  contactSection: {
    marginBottom: spacing.xxl,
  },

  // Título de subseção
  subsectionTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    fontFamily: 'Lexend_700Bold',
    letterSpacing: 0.5,
  },

  // Divisor entre seções
  sectionDivider: {
    height: 1,
    backgroundColor: `${colors.primary}1A`, // primary com ~10% de opacidade
    marginTop: spacing.xxl,
  },

  // Grid de cards de contato
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginVertical: spacing.sm,
  },

  // Card individual de contato
  contactCard: {
    flex: 1,
    minWidth: 150,
    maxWidth: '48%', // 2 colunas no mobile
    backgroundColor: `${colors.primary}0D`, // primary com ~5% de opacidade
    borderWidth: 1,
    borderColor: `${colors.primary}1A`, // primary com ~10% de opacidade
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },

  // Estado pressed do card
  contactCardPressed: {
    backgroundColor: `${colors.primary}1A`, // primary com ~10% de opacidade
    transform: [{ scale: 0.98 }],
  },

  // Container do ícone
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary}1A`, // primary com ~10% de opacidade
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  // Label do contato (ex: "Email", "GitHub")
  contactLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.text,
    fontFamily: 'Lexend_700Bold',
    textAlign: 'center',
  },

  // Valor do contato (ex: email, @username)
  contactValue: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    fontFamily: 'Lexend_400Regular',
    textAlign: 'center',
  },

  // Seção de email (CTA no final)
  emailSection: {
    marginTop: spacing.xxxl,
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    backgroundColor: `${colors.primary}08`, // primary com ~3% de opacidade
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}1A`, // primary com ~10% de opacidade
  },

  // Label da seção de email
  emailLabel: {
    fontSize: typography.size.md,
    color: colors.textMuted,
    marginBottom: spacing.md,
    fontFamily: 'Lexend_400Regular',
    textAlign: 'center',
  },

  // Botão de email
  emailButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm + spacing.xs, // 14px
    paddingHorizontal: spacing.xxl,
    minWidth: 200,
  },

  // Estado pressed do botão
  emailButtonPressed: {
    backgroundColor: `${colors.primary}1A`, // primary com ~10% de opacidade
    transform: [{ scale: 0.98 }],
  },

  // Texto do botão de email
  emailButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.primary,
    fontFamily: 'Lexend_700Bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});