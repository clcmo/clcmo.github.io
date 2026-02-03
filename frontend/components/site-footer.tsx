import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import { globalStyles } from '@/styles/global';

export function SiteFooter() {
  return (
    <View style={globalStyles.footer}>
      <Text style={globalStyles.footerTitle}>{'<CL />'}</Text>

      <View style={globalStyles.socialLinks}>
        <Pressable onPress={() => Linking.openURL('https://github.com/clcmo')}>
          <Text style={globalStyles.socialLink}>GitHub</Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL('https://linkedin.com/in/camilaloliveira')}>
          <Text style={globalStyles.socialLink}>LinkedIn</Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL('mailto:milla@apprendendo.blog')}>
          <Text style={globalStyles.socialLink}>Email</Text>
        </Pressable>
      </View>

      <Text style={globalStyles.footerText}>Desenvolvido por Camila Leite Oliveira</Text>
    </View>
  );
}