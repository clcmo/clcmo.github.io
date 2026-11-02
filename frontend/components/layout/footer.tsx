import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/theme/colors';
import { footerStyles } from '@/styles/footer';

export function SiteFooter() {
  return (
    <View style={footerStyles.container}>
      <Image
        source={{ uri: '/marca-camila.svg' }}
        accessibilityLabel="Logo Camila L. Oliveira"
        contentFit="contain"
        tintColor={colors.marca}
        style={footerStyles.marca}
      />
      <Text style={footerStyles.copy}>
        © {new Date().getFullYear()}. Camila L. Oliveira. Todos os direitos reservados.
      </Text>
    </View>
  );
}
