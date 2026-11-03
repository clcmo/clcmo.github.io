import { StyleSheet } from 'react-native';
import { colors, spacing, typography, fonts } from '@/theme';

export const statsCardStyles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 0,
        padding: spacing.xl,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
        margin: spacing.sm,
    },

    icon: {
        fontSize: typography.size.xxl,
        marginBottom: spacing.sm,
        color: colors.primary,
    },

    value: {
        fontFamily: fonts.sansBold,
        fontSize: typography.size.xxl,
        color: colors.blue,
        marginBottom: spacing.xs,
    },

    title: {
        fontFamily: fonts.sans,
        fontSize: typography.size.sm,
        color: colors.textMuted,
        textAlign: 'center',
    },
});