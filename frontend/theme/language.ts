import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export const languageStyles = StyleSheet.create({
  container: {
    gap: 16,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontFamily: fonts.sans,
    color: colors.text,
    fontSize: 14,
    width: 100,
  },
  barWrapper: {
    flex: 1,
    height: 24,
    backgroundColor: colors.surface,
    borderRadius: 0,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 0,
  },
  count: {
    fontFamily: fonts.sans,
    color: colors.textMuted,
    fontSize: 14,
    width: 40,
    textAlign: 'right',
  },
});