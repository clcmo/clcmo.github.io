import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LanguageData {
  name: string;
  count: number;
}

interface LanguageChartProps {
  data: LanguageData[];
}

const COLORS = ['#64ffda', '#5a67d8', '#ed8936', '#48bb78', '#ed64a6', '#4299e1'];

export default function LanguageChart({ data }: LanguageChartProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={item.name} style={styles.barContainer}>
          <Text style={styles.label}>{item.name}</Text>
          <View style={styles.barWrapper}>
            <View 
              style={[
                styles.bar, 
                { 
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: COLORS[index % COLORS.length]
                }
              ]} 
            />
          </View>
          <Text style={styles.count}>{item.count}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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