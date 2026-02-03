import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const aboutStyles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
        gap: spacing.lg,
    },

    text: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        lineHeight: typography.lineHeight.md,
        color: colors.textMuted,
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
        width: '45%',
    },
});