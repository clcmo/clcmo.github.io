import React from 'react';
import { View, Text } from 'react-native';
import { statsCardStyles } from '@/styles/global';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: string;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <View style={statsCardStyles.card}>
      {icon && <Text style={statsCardStyles.icon}>{icon}</Text>}
      <Text style={statsCardStyles.value}>{value}</Text>
      <Text style={statsCardStyles.title}>{title}</Text>
    </View>
  );
}