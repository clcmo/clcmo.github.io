import { StyleSheet } from 'react-native';
import { colors, spacing, typography, fonts } from '@/theme';

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
        borderRadius: 0,
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
        fontFamily: fonts.sans,
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
        fontFamily: fonts.sans,
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
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    retryButtonText: {
        fontFamily: fonts.sansBold,
        color: colors.primary,
        fontSize: typography.size.sm,
    },

    sourceFilters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.lg,
    },

    sourceFilter: {
        minHeight: 40,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.fio,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },

    sourceFilterSelected: {
        backgroundColor: colors.preto,
    },

    sourceFilterText: {
        fontFamily: fonts.sans,
        fontSize: typography.size.sm,
        color: colors.text,
    },

    sourceFilterTextSelected: {
        color: colors.bg,
    },

    postsContainer: {
        marginTop: spacing.xl,
        gap: spacing.lg,
    },

    postCard: {
        backgroundColor: colors.surface,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },

    postImage: {
        width: '100%',
        height: 200,
        backgroundColor: colors.surface,
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
        fontFamily: fonts.sansBold,
        fontSize: typography.size.xs,
        color: colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    postSource: {
        fontFamily: fonts.sansBold,
        fontSize: typography.size.xs,
        color: colors.marca,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },

    postTitle: {
        fontFamily: fonts.sansBold,
        fontSize: typography.size.lg,
        color: colors.text,
        marginBottom: spacing.sm,
    },

    postExcerpt: {
        fontFamily: fonts.serif,
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
        fontFamily: fonts.sans,
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
        fontFamily: fonts.sansBold,
        fontSize: typography.size.sm,
        color: colors.primary,
    },

    viewAllContainer: {
        marginTop: spacing.xxl,
        alignItems: 'center',
        gap: spacing.md,
    },

    viewAllButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },

    viewAllButtonText: {
        fontFamily: fonts.sansBold,
        fontSize: typography.size.md,
        color: colors.primary,
    },
});