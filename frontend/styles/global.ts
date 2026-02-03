import { Platform, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

/**
 * =====================================
 * GLOBAL STYLES — com fonte Lexend
 * =====================================
 */

export const globalStyles = StyleSheet.create({
    // ===== Base =====
    screen: {
        flex: 1,
        backgroundColor: colors.bg,
        fontFamily: 'Lexend_400Regular', // fonte global
    },

    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    scroll: {
        flex: 1,
    },

    scrollView: {
        flex: 1,
    },

    wrapper: {
        flex: 1,
        flexDirection: 'column',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
    },

    // ===== Feedback =====
    errorText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.danger,
    },

    // ===== Navbar =====
    nav: {
        flexDirection: 'row',
        gap: 20,
    },

    navLink: {
        fontFamily: 'Lexend_400Regular',
        color: colors.text,
        fontSize: typography.size.sm,
    },

    // ===== Hero =====
    hero: {
        minHeight: Platform.OS === 'web' ? 600 : 420,
        justifyContent: 'center',
        paddingVertical: 60,
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
    },

    greeting: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.primary,
        marginBottom: spacing.sm,
    },

    heroName: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.heroName,
        color: colors.text,
        marginBottom: spacing.sm,
    },

    heroTagline: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.heroTagline,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },

    description: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        maxWidth: 650,
        marginBottom: spacing.xxl,
    },

    // ===== Botões =====
    buttonOutline: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },

    buttonOutlineText: {
        fontFamily: 'Lexend_700Bold',
        color: colors.primary,
        fontSize: typography.size.md,
    },

    // ===== Seções =====
    section: {
        marginTop: 80,
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
    },

    sectionTitle: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.xxl,
        color: colors.text,
        marginBottom: spacing.xxl,
    },

    numberPrefix: {
        fontFamily: 'Lexend_700Bold',
        color: colors.primary,
        fontSize: typography.size.lg,
    },

    // ===== About =====
    aboutText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        maxWidth: 650,
    },

    techItem: {
        fontFamily: 'Lexend_400Regular',
        color: colors.textMuted,
        fontSize: typography.size.sm,
        width: Platform.OS === 'web' ? '30%' : '45%',
    },

    // ===== Form / Contact =====
    contactDescription: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        marginBottom: spacing.xxl,
        maxWidth: 650,
    },

    input: {
        fontFamily: 'Lexend_400Regular',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        padding: spacing.md,
        color: colors.text,
        fontSize: typography.size.md,
    },

    submitButtonText: {
        fontFamily: 'Lexend_700Bold',
        color: colors.primary,
        fontSize: typography.size.md,
    },

    // ===== Footer =====
    footerText: {
        fontFamily: 'Lexend_400Regular',
        color: colors.textMuted,
        fontSize: typography.size.xs,
    },

    footerTitle: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.xl,
        color: colors.primary,
    },

    socialLink: {
        fontFamily: 'Lexend_400Regular',
        color: colors.textMuted,
        fontSize: typography.size.sm,
    },

    headerRightContainer: {
        paddingRight: spacing.lg,
        paddingLeft: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
});