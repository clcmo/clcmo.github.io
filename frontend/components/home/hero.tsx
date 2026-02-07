import React from 'react';
import { View, Text, ImageBackground, Pressable } from 'react-native';

import { globalStyles } from '@/styles/global';
import { HeroController } from '@/controller/hero';

interface HeroProps {
  onPressKnowMore: () => void;
}

export default function Hero({ onPressKnowMore }: HeroProps) {
  return (
    <ImageBackground
      source={HeroController.getBackgroundSource()}
      resizeMode="cover"
      style={[globalStyles.heroBg, HeroController.getBackgroundStyle()]}
      imageStyle={globalStyles.heroBgImage}
    >
      <View style={globalStyles.heroOverlay}>
        <View style={globalStyles.heroInner}>
          <Text style={globalStyles.greeting}>Olá, meu nome é</Text>

          <Text style={globalStyles.heroName}>Camila Leite Oliveira</Text>

          <Text style={globalStyles.heroTagline}>
            Desenvolvedora Full Stack + Professora
          </Text>

          <Text style={globalStyles.heroDescription}>
            Sou desenvolvedora apaixonada por criar soluções elegantes e funcionais.
            Especializada em desenvolvimento web e mobile com foco em experiência do usuário.
          </Text>

          <Pressable
            style={[globalStyles.buttonOutline, globalStyles.heroCta]}
            onPress={onPressKnowMore}
          >
            <Text style={globalStyles.buttonOutlineText}>Conheça Mais</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}