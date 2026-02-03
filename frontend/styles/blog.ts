import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export const blogStyles = StyleSheet.create({
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

    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxxl,
    },

    loadingText: {
        fontFamily: 'Lexend_400Regular',
        marginTop: spacing.md,
        fontSize: typography.size.md,
        color: colors.textMuted,
    },

    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxxl,
    },

    errorText: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.md,
        color: colors.danger,
        textAlign: 'center',
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },

    retryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },

    retryButtonText: {
        fontFamily: 'Lexend_700Bold',
        color: colors.primary,
        fontSize: typography.size.sm,
    },

    postsContainer: {
        marginTop: spacing.xl,
        gap: spacing.lg,
    },

    postCard: {
        backgroundColor: '#112240',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#233554',
        overflow: 'hidden',
    },

    postImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#1d2d50',
    },

    postContent: {
        padding: spacing.lg,
    },

    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.xs,
    },

    postCategory: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.xs,
        color: colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    postTitle: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.lg,
        color: colors.text,
        marginBottom: spacing.sm,
    },

    postExcerpt: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.sm,
        lineHeight: typography.lineHeight.md,
        color: colors.textMuted,
        marginBottom: spacing.md,
    },

    postFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },

    postDate: {
        fontFamily: 'Lexend_400Regular',
        fontSize: typography.size.xs,
        color: colors.textMuted,
        fontStyle: 'italic',
    },

    readMore: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginTop: spacing.xs,
    },

    readMoreText: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.sm,
        color: colors.primary,
    },

    viewAllContainer: {
        marginTop: spacing.xxl,
        alignItems: 'center',
    },

    viewAllButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewAllButtonText: {
        fontFamily: 'Lexend_700Bold',
        fontSize: typography.size.md,
        color: colors.primary,
    },
});