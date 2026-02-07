import React from 'react';
import { View, Text} from 'react-native';
import { footerStyles } from '@/styles/footer';

export function SiteFooter() {
  return (
    <View style={footerStyles.container}>
      <Text style={footerStyles.footerTitle}>{'<CL />'}</Text>
      <Text style={footerStyles.footerText}>Desenvolvido por Camila Leite Oliveira</Text>
    </View>
  );
}