// '@/styles/global.ts'
import { Platform, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

/**
 * GLOBAL STYLES (Design System)
 * - Tipografia: Lexend
 * - Tokens: colors / spacing / typography
 */

export const globalStyles = StyleSheet.create({
    // ===== Base / Layout =====
    screen: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    scroll: {
        flex: 1,
    },

    /**
     * Usado em ScrollView contentContainerStyle
     * (flexGrow para permitir centralização/rodapé)
     */
    page: {
        flexGrow: 1,
        backgroundColor: colors.bg,
    },

    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxxl,
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bg,
    },

    // ===== Tipografia base =====
    section: {
        marginTop: spacing.xxxl,
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
    },

    sectionTitle: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.xxl,
        color: colors.text,
        marginBottom: spacing.xl,
    },

    numberPrefix: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.lg,
        color: colors.primary,
    },

    greeting: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.primary,
        marginBottom: spacing.sm,
    },

    paragraph: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
    },

    // ===== Hero =====
    heroBg: {
        width: '100%',
        minHeight: Platform.OS === 'web' ? 600 : 420,
        justifyContent: 'center',
    },

    heroBgImage: {
        opacity: 0.25,
    },

    heroOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 25, 47, 0.65)',
    },

    heroInner: {
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xxxl,
    },

    heroName: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.heroName,
        color: colors.text,
        marginBottom: spacing.sm,
        lineHeight: typography.lineHeight.hero ?? undefined, // opcional
    },

    heroTagline: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.heroTagline,
        color: colors.textMuted,
        marginBottom: spacing.lg,
        lineHeight: typography.lineHeight.heroTag ?? undefined, // opcional
    },


    heroCta: {
        marginTop: spacing.lg,        // garante espaço acima do botão
        alignSelf: 'flex-start',
    },

    heroDescription: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        maxWidth: 650,
        marginBottom: spacing.lg,     // ✅ menor que xxl pra não empurrar o botão
    },

    description: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        maxWidth: 650,
        marginBottom: spacing.xxl,
    },

    // ===== Botões (padrão outline) =====
    buttonOutline: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },

    buttonOutlineText: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.md,
        color: colors.primary,
    },

    // ===== About =====
    aboutContent: {
        gap: spacing.lg,
    },

    aboutText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        maxWidth: 650,
    },

    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginTop: spacing.md,
    },

    techItem: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.sm,
        color: colors.textMuted,
        width: Platform.OS === 'web' ? '30%' : '45%',
    },

    // ===== Projects CTA =====
    viewMoreButton: {
        marginTop: spacing.xxl,
        alignSelf: 'flex-start',
    },

    viewMoreText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.primary,
    },

    // ===== Contact =====
    contactDescription: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        marginBottom: spacing.xxl,
        maxWidth: 650,
    },

    submitButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
    },

    submitButtonText: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.md,
        color: colors.primary,
    },

    // ===== States =====
    errorText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.danger,
        textAlign: 'center',
    },

    // ===== Header/Nav (se precisar) =====
    nav: {
        flexDirection: 'row',
        gap: spacing.lg,
    },

    navLink: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.sm,
        color: colors.text,
    },

    headerRightContainer: {
        paddingRight: spacing.lg,
        paddingLeft: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ===== Aliases (opcional: compatibilidade antiga) =====
    // Se você ainda usa em alguma tela antiga, pode manter:
    ctaButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    ctaButtonText: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.md,
        color: colors.primary,
    },


    shell: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    shellContent: {
        flex: 1,
    },

});