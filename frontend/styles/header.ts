import { StyleSheet } from 'react-native';
import { colors, fonts, spacing, typography } from '@/theme';

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.fio,
  },
  logo: { fontFamily: fonts.sansBold, fontSize: typography.size.xl, color: colors.marca },
  nav: { flexDirection: 'row', gap: spacing.lg },
  navLink: { fontFamily: fonts.sans, fontSize: typography.size.sm, color: colors.text },
  headerRightContainer: {
    paddingRight: spacing.lg,
    paddingLeft: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
