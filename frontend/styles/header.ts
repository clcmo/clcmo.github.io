import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.bg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    logo: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.xl,
        color: colors.primary,
    },

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
});