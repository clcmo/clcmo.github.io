import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const contactStyles = StyleSheet.create({
    contactGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginTop: spacing.xl,
    },

    contactCard: {
        flex: 1,
        minWidth: 150,
        backgroundColor: colors.surface,
        padding: spacing.lg,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
    },

    iconContainer: {
        width: 64,
        height: 64,
        backgroundColor: colors.bg,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: colors.primary,
    },

    contactLabel: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.md,
        color: colors.primary,
        marginBottom: spacing.xs,
    },

    contactValue: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.sm,
        color: colors.textMuted,
        textAlign: 'center',
    },

    emailSection: {
        marginTop: spacing.xxl,
        alignItems: 'center',
    },

    emailLabel: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.textMuted,
        marginBottom: spacing.md,
    },

    emailButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },

    emailButtonText: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.md,
        color: colors.primary,
    },
});