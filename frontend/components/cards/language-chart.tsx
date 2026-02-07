import React from 'react';
import { View, Text } from 'react-native';

import { globalStyles } from '@/styles/global';
import { LanguageChartProps } from '@/interface/language';
import { languageStyles } from '@/theme/language';
import { statsColors } from '@/theme/colors';

export default function LanguageChart({ data }: LanguageChartProps) {
  return (
    <View style={globalStyles.container}>
      {data.map((item, index) => (
        <View key={item.language} style={languageStyles.barContainer}>
          <Text style={languageStyles.label}>{item.language}</Text>
          <View style={languageStyles.barWrapper}>
            <View 
              style={[
                languageStyles.bar, 
                { 
                  width: `${(item.percentage)}%`,
                  backgroundColor: statsColors[index % statsColors.length]
                }
              ]} 
            />
          </View>
          <Text style={languageStyles.count}>{item.percentage}</Text>
        </View>
      ))}
    </View>
  );
}