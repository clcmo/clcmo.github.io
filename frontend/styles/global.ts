import { Platform, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

/**
 * ✅ GLOBAL STYLES
 * - Contém tudo que o Home (index) e outras páginas usam.
 * - Mantém aliases para não quebrar seu código antigo.
 */
export const globalStyles = StyleSheet.create({
    // ===== Base =====
    screen: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    // Aliases (compatibilidade)
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    scroll: {
        flex: 1,
    },

    // Alias
    scrollView: {
        flex: 1,
    },

    /**
     * OBS:
     * Você usa: <ScrollView contentContainerStyle={globalStyles.content}>
     * Então "content" precisa ser contentContainerStyle-friendly.
     */
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

    // ===== Feedback / Estado =====
    errorText: {
        fontSize: typography.size.md,
        color: colors.danger,
    },

    list: {
        padding: spacing.lg,
        paddingBottom: spacing.xxxl,
    },

    // ===== Navbar / Topbar (se você usar em algum lugar) =====
    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.bg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    logo: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        color: colors.primary,
    },
    nav: {
        flexDirection: 'row',
        gap: 20,
    },
    navLink: {
        color: colors.text,
        fontSize: typography.size.sm,
    },

    // ===== Hero (Home) =====
    hero: {
        minHeight: Platform.OS === 'web' ? 600 : 400,
        justifyContent: 'center',
        paddingVertical: 60,
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
    },
    greeting: {
        fontSize: typography.size.md,
        color: colors.primary,
        marginBottom: spacing.sm,
    },

    // nomes "novos"
    heroName: {
        fontSize: typography.size.heroName,
        fontWeight: typography.weight.bold,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    heroTagline: {
        fontSize: typography.size.heroTagline,
        fontWeight: typography.weight.bold,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },

    // aliases para o seu JSX atual
    name: {
        fontSize: typography.size.heroName,
        fontWeight: typography.weight.bold,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    tagline: {
        fontSize: typography.size.heroTagline,
        fontWeight: typography.weight.bold,
        color: colors.textMuted,
        marginBottom: spacing.lg,
    },

    description: {
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
        color: colors.primary,
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
    },

    // aliases para o seu JSX atual
    ctaButton: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    ctaButtonText: {
        color: colors.primary,
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
    },

    // ===== Seções =====
    section: {
        marginTop: 80,
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
    },

    sectionTitle: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        color: colors.text,
        marginBottom: spacing.xxl,
    },

    numberPrefix: {
        color: colors.primary,
        fontSize: typography.size.lg,
    },

    // ===== About =====
    aboutContent: {
        gap: spacing.lg,
    },
    aboutText: {
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
        color: colors.textMuted,
        fontSize: typography.size.sm,
        width: Platform.OS === 'web' ? '30%' : '45%',
    },

    // ===== Projects CTA "Ver mais" =====
    viewMoreButton: {
        marginTop: spacing.xxl,
        alignSelf: 'flex-start',
    },
    viewMoreText: {
        color: colors.primary,
        fontSize: typography.size.md,
    },

    // ===== Contact =====
    contactDescription: {
        fontSize: typography.size.md,
        color: colors.textMuted,
        lineHeight: typography.lineHeight.md,
        marginBottom: spacing.xxl,
        maxWidth: 650,
    },

    form: {
        gap: spacing.md,
        width: '100%',
        maxWidth: 650,
    },

    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        padding: spacing.md,
        color: colors.text,
        fontSize: typography.size.md,
    },

    textArea: {
        minHeight: 150,
        textAlignVertical: 'top',
    },

    submitButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: colors.primary,
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
    },

    // ===== Footer =====
    footer: {
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center',
        gap: 20,
    },
    socialLinks: {
        flexDirection: 'row',
        gap: 24,
    },
    socialLink: {
        color: colors.textMuted,
        fontSize: typography.size.sm,
    },
    footerTitle: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        color: colors.primary,
    },
    footerText: {
        color: colors.textMuted,
        fontSize: typography.size.xs,
    },
    shell: {
        flex: 1,
        backgroundColor: colors.bg,
    },

    shellContent: {
        flex: 1,
    },

    page: {
        // deixa o scroll crescer e não força padding global
        flexGrow: 1,
        backgroundColor: colors.bg,
    },



    heroBg: {
        // full width “de verdade”
        width: '100%',
        minHeight: Platform.OS === 'web' ? 600 : 420,
        justifyContent: 'center',
    },

    heroBgImage: {
        // controla como a imagem aparece
        opacity: 0.25,
    },

    heroOverlay: {
        // overlay para contraste
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 25, 47, 0.65)',
    },

    heroInner: {
        // aqui sim entra o padding e o maxWidth do conteúdo
        width: '100%',
        maxWidth: 1100,
        alignSelf: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: 60,
    },

    headerRightContainer: {
        paddingRight: spacing.lg,   // ✅ dá “folga” da borda direita
        paddingLeft: spacing.sm,    // opcional (equilibra)
        alignItems: 'center',
        justifyContent: 'center',
    },

});

/**
 * ✅ PROJECT CARD STYLES
 * IMPORTANTE:
 * Seu ProjectCard.tsx usa: header, folder, link, footer, topics, stats...
 * Seu ProjectsScreen usa: headerRow, title, subtitle...
 *
 * Então aqui eu deixei os dois conjuntos (e aliases) para não quebrar nada.
 */
export const projectCardStyles = StyleSheet.create({
    // Card base
    card: {
        backgroundColor: colors.surface,
        borderRadius: 4,
        padding: spacing.xl,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
    },

    // Header do card (ProjectCard.tsx)
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },

    // Alias usado em ProjectsScreen ListHeaderComponent
    headerRow: {
        marginBottom: spacing.lg,
    },

    folder: {
        fontSize: 28,
    },
    link: {
        fontSize: 20,
        color: colors.primary,
    },

    // Nome / descrição do repositório
    name: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        color: colors.text,
        marginBottom: spacing.md,
    },
    description: {
        fontSize: typography.size.sm,
        color: colors.textMuted,
        lineHeight: 20,
        marginBottom: spacing.md,
    },

    // Rodapé do card
    footer: {
        gap: spacing.md,
    },

    topics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    topic: {
        fontSize: typography.size.xs,
        color: colors.primary,
    },

    stats: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    stat: {
        fontSize: typography.size.xs,
        color: colors.textMuted,
    },

    // ✅ Para o header do ProjectsScreen
    title: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: typography.size.sm,
        color: colors.textMuted,
    },
});

/**
 * ✅ STATS CARD STYLES
 */
export const statsCardStyles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 12,
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
        fontSize: 32,
        marginBottom: spacing.sm,
    },
    value: {
        fontSize: 32,
        fontWeight: typography.weight.bold,
        color: colors.blue,
        marginBottom: 4,
    },
    title: {
        fontSize: typography.size.sm,
        color: '#586069',
        textAlign: 'center',
    },
});
