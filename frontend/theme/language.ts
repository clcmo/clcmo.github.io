import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

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
    color: '#ccd6f6',
    fontSize: 14,
    width: 100,
  },
  barWrapper: {
    flex: 1,
    height: 24,
    backgroundColor: '#112240',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  count: {
    color: '#8892b0',
    fontSize: 14,
    width: 40,
    textAlign: 'right',
  },
});