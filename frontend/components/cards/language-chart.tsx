import React from 'react';
import { View, Text } from 'react-native';

import { LanguageChartProps } from '@/interface/language';
import { languageStyles } from '@/theme/language';
import { statsColors } from '@/theme/colors';

export default function LanguageChart({ data }: LanguageChartProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <View style={languageStyles.container}>
      {data.map((item, index) => (
        <View key={item.name} style={languageStyles.barContainer}>
          <Text style={languageStyles.label}>{item.name}</Text>
          <View style={languageStyles.barWrapper}>
            <View 
              style={[
                languageStyles.bar, 
                { 
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: statsColors[index % statsColors.length]
                }
              ]} 
            />
          </View>
          <Text style={languageStyles.count}>{item.count}</Text>
        </View>
      ))}
    </View>
  );
}