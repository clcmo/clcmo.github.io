import React from 'react';
import {router } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

import { globalStyles, menuStyles } from '@/styles/global';

export function TopNav() {
  return (
    <View style={globalStyles.nav}>
      <Pressable onPress={() => router.replace('/')}>
        <Text style={globalStyles.navLink}>Sobre</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/blog')}>
        <Text style={globalStyles.navLink}>Blog</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/projects')}>
        <Text style={globalStyles.navLink}>Projetos</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/contact')}>
        <Text style={globalStyles.navLink}>Contato</Text>
      </Pressable>
      <Pressable onPress={() => router.replace('/donate')}>
        <Text style={globalStyles.navLink}>Apoie</Text>
      </Pressable>
    </View>
  );
}