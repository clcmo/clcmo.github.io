import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const footerStyles = StyleSheet.create({
    container: {
        marginTop: spacing.lg,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        gap: spacing.lg,
    },

    socialLinks: {
        flexDirection: 'row',
        gap: spacing.xl,
    },

    socialIcon: {
        fontSize: typography.size.lg,
        color: colors.textMuted,
    },

    footerTitle: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.lg,
        color: colors.primary,
    },

    footerText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.xs,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: typography.lineHeight.sm,
        maxWidth: 500,
    },

    credits: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.xs,
        color: colors.textMuted,
        opacity: 0.8,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
});