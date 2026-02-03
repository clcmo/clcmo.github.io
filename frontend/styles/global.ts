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

export const contactStyles = StyleSheet.create({
    contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 32,
  },
  contactCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#112240',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#233554',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 14,
    color: '#64ffda',
    fontWeight: '600',
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 14,
    color: '#ccd6f6',
    textAlign: 'center',
  },
  emailSection: {
    marginTop: 48,
    alignItems: 'center',
  },
  emailLabel: {
    fontSize: 16,
    color: '#8892b0',
    marginBottom: 16,
  },
  emailButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#64ffda',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  emailButtonText: {
    color: '#64ffda',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const blogStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconHeader: {
    marginRight: 16,
    width: 60,
    height: 60,
    backgroundColor: '#0a192f',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#64ffda',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8892b0',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#64ffda',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#64ffda',
    fontSize: 14,
    fontWeight: '600',
  },
  postsContainer: {
    marginTop: 32,
    gap: 24,
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
    padding: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  postCategory: {
    fontSize: 12,
    color: '#64ffda',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ccd6f6',
    marginBottom: 12,
  },
  postExcerpt: {
    fontSize: 14,
    color: '#8892b0',
    lineHeight: 22,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  postDate: {
    fontSize: 12,
    color: '#8892b0',
    fontStyle: 'italic',
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: '#64ffda',
    fontWeight: '600',
  },
  viewAllContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#64ffda',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllButtonText: {
    color: '#64ffda',
    fontSize: 16,
    fontWeight: '600',
  },
});

export const donateStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconHeader: {
    marginRight: 16,
    width: 60,
    height: 60,
    backgroundColor: '#0a192f',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#64ffda',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#233554',
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#112240',
  },
  toggleButtonActive: {
    backgroundColor: '#64ffda20',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8892b0',
  },
  toggleButtonTextActive: {
    color: '#64ffda',
  },
  pixContainer: {
    marginTop: 8,
  },
  pixCard: {
    backgroundColor: '#112240',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#233554',
    padding: 32,
    alignItems: 'center',
  },
  pixIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#0a192f',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#64ffda',
  },
  pixInfo: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  pixLabel: {
    fontSize: 14,
    color: '#8892b0',
    marginBottom: 8,
  },
  pixKey: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64ffda',
    textAlign: 'center',
  },
  pixValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ccd6f6',
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
    marginTop: 12,
  },
  pixButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#64ffda',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pixButtonSuccess: {
    backgroundColor: '#64ffda20',
  },
  pixButtonSecondary: {
    borderColor: '#8892b0',
  },
  pixButtonText: {
    color: '#64ffda',
    fontSize: 16,
    fontWeight: '600',
  },
  qrCodeContainer: {
    marginTop: 8,
  },
  qrCodeCard: {
    backgroundColor: '#112240',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#233554',
    padding: 32,
    alignItems: 'center',
  },
  qrTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  qrCodeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ccd6f6',
  },
  qrWrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
  },
  qrInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  qrInstructionText: {
    fontSize: 14,
    color: '#8892b0',
    textAlign: 'center',
  },
  suggestedAmountsContainer: {
    marginTop: 32,
    padding: 24,
    backgroundColor: '#0a192f',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#172a45',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  suggestedAmountsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccd6f6',
  },
  suggestedAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  amountButton: {
    backgroundColor: '#112240',
    borderWidth: 1,
    borderColor: '#64ffda',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  amountButtonText: {
    color: '#64ffda',
    fontSize: 16,
    fontWeight: '600',
  },
  customAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
  },
  customAmountText: {
    fontSize: 14,
    color: '#8892b0',
    fontStyle: 'italic',
  },
  benefitsContainer: {
    marginTop: 32,
    backgroundColor: '#0a192f',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: '#172a45',
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ccd6f6',
  },
  benefitsList: {
    gap: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: '#8892b0',
    lineHeight: 24,
  },
  thankYouContainer: {
    marginTop: 48,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ccd6f6',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  thankYouSubtext: {
    fontSize: 14,
    color: '#8892b0',
    textAlign: 'center',
    lineHeight: 22,
  },
});