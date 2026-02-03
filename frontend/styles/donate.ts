import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const donateStyles = StyleSheet.create({
  // ===== Header da seção =====
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  iconHeader: {
    marginRight: spacing.md,
    width: 60,
    height: 60,
    backgroundColor: colors.bg,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },

  // ===== Toggle (Chave Pix / QR Code) =====
  toggleContainer: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#233554',
    overflow: 'hidden',
  },

  toggleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: '#112240',
  },

  toggleButtonActive: {
    backgroundColor: '#64ffda20',
  },

  toggleButtonText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },

  toggleButtonTextActive: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.sm,
    color: colors.primary,
  },

  // ===== Conteúdo Pix (chave) =====
  pixContainer: {
    marginTop: spacing.xs,
  },

  pixCard: {
    backgroundColor: '#112240',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#233554',
    padding: spacing.xxl,
    alignItems: 'center',
  },

  pixIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.bg,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  pixInfo: {
    width: '100%',
    marginBottom: spacing.lg,
    alignItems: 'center',
  },

  pixLabel: {
    fontFamily: 'Lexend_400Regular',
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  pixKey: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.lg,
    color: colors.primary,
    textAlign: 'center',
  },

  pixValue: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.lg,
    color: colors.text,
    textAlign: 'center',
  },

  // ===== Botões (Copiar / Compartilhar) =====
  buttonGroup: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },

  pixButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pixButtonSuccess: {
    backgroundColor: '#64ffda20',
  },

  pixButtonSecondary: {
    borderColor: colors.textMuted,
  },

  pixButtonText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.md,
    color: colors.primary,
  },

  // ===== QR Code =====
  qrCodeContainer: {
    marginTop: spacing.xs,
  },

  qrCodeCard: {
    backgroundColor: '#112240',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#233554',
    padding: spacing.xxl,
    alignItems: 'center',
  },

  qrTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  qrCodeTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.lg,
    color: colors.text,
  },

  // ✅ estava faltando em algumas versões
  qrWrapper: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },

  // ✅ usado no JSX
  qrInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },

  qrInstructionText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: typography.size.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
  },

  // ===== Blocos (header padrão de seção dentro da página) =====
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  // ===== Valores sugeridos =====
  suggestedAmountsContainer: {
    marginTop: spacing.xl,
    padding: spacing.xl,
    backgroundColor: colors.bg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#172a45',
  },

  suggestedAmountsTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.md,
    color: colors.text,
  },

  // ✅ usado no JSX
  suggestedAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },

  amountButton: {
    backgroundColor: '#112240',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },

  amountButtonText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.md,
    color: colors.primary,
  },

  // ✅ usado no JSX
  customAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.md,
  },

  customAmountText: {
    fontFamily: 'Lexend_400Regular',
    fontSize: typography.size.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  // ===== Benefícios =====
  benefitsContainer: {
    marginTop: spacing.xl,
    backgroundColor: colors.bg,
    borderRadius: 8,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: '#172a45',
  },

  benefitsTitle: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.lg,
    color: colors.text,
  },

  // ✅ usado no JSX
  benefitsList: {
    gap: spacing.lg,
  },

  // ✅ usado no JSX
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },

  benefitText: {
    fontFamily: 'Lexend_400Regular',
    flex: 1,
    fontSize: typography.size.md,
    color: colors.textMuted,
    lineHeight: typography.lineHeight.lg,
  },

  // ===== Agradecimento =====
  // ✅ usado no JSX
  thankYouContainer: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  thankYouText: {
    fontFamily: 'Lexend_700Bold',
    fontSize: typography.size.xl,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },

  thankYouSubtext: {
    fontFamily: 'Lexend_400Regular',
    fontSize: typography.size.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
  },
});