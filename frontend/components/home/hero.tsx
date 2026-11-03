import React from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';

import { globalStyles } from '@/styles/global';
import { colors } from '@/theme/colors';

// Retrato usado na capa do site camilaloliveira.com
const RETRATO =
  'https://i0.wp.com/camilaloliveira.com/wp-content/uploads/2026/06/IMG_4510.jpg?fit=1538%2C2048&ssl=1';

interface HeroProps {
  onPressKnowMore: () => void;
}

/** Capa: marca grande + retrato em largura total, depois apresentação (como a home do site). */
export default function Hero({ onPressKnowMore }: HeroProps) {
  const { width, height } = useWindowDimensions();
  // retrato 3:4, limitado a 80% da altura da tela (celular: 4:5)
  const fotoAltura = Math.min(height * 0.8, width < 640 ? (width - 24) * 1.25 : (width - 48) * (4 / 3));

  return (
    <View>
      <View style={globalStyles.capa}>
        <View
          accessibilityRole="header"
          accessibilityLabel="Camila L. Oliveira"
          style={[
            globalStyles.capaMarca,
            { marginBottom: Math.min(48, Math.max(24, width * 0.04)) },
          ]}
        >
          <Image
            source={{ uri: '/marca-camila.svg' }}
            accessibilityLabel="Logo Camila L. Oliveira"
            contentFit="contain"
            tintColor={colors.marca}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <View style={[globalStyles.capaFoto, { height: fotoAltura }]}>
          <Image
            source={{ uri: RETRATO }}
            accessibilityLabel="Retrato de Camila L. Oliveira"
            contentFit="cover"
            contentPosition={{ top: '25%', left: '50%' }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>

      <View style={globalStyles.capaTexto}>
        <Text style={globalStyles.capaTagline}>Desenvolvedora Full Stack + Professora</Text>
        <Text style={globalStyles.capaDescricao}>
          Sou desenvolvedora apaixonada por criar soluções elegantes e funcionais. Especializada em
          desenvolvimento web e mobile com foco em experiência do usuário.
        </Text>
        <Pressable accessibilityRole="button" style={globalStyles.buttonOutline} onPress={onPressKnowMore}>
          <Text style={globalStyles.buttonOutlineText}>Conheça mais</Text>
        </Pressable>
      </View>
    </View>
  );
}
