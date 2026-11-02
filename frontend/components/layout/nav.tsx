import React, { useState } from 'react';
import { Image, Linking, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { router, usePathname } from 'expo-router';

import { topBarStyles as s } from '@/styles/topbar';

const ITEMS = [
  { label: 'Sobre', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'Projetos', path: '/projects' },
  { label: 'Contato', path: '/contact' },
  { label: 'Apoie', path: '/donate' },
];
const LIVROS_URL = 'https://camilaloliveira.com/livros/';

/** Monograma + botão de menu; o menu abre em tela cheia (como no tema do site). */
export function TopBar() {
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowDimensions();
  const pathname = usePathname();
  const fontSize = width < 600 ? 32 : 56;

  const go = (path: string) => {
    setOpen(false);
    router.replace(path as any);
  };

  return (
    <View style={s.bar}>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel="Camila L. Oliveira — página inicial"
        style={s.logo}
        onPress={() => go('/')}
      >
        <Image source={require('../../public/icon.png')} style={s.logoImagem} />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={open ? 'Fechar menu' : 'Abrir menu'}
        accessibilityState={{ expanded: open }}
        style={s.menuBtn}
        onPress={() => setOpen(!open)}
      >
        {open ? (
          <>
            <View style={[s.linhaX, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[s.linhaX, { transform: [{ rotate: '-45deg' }] }]} />
          </>
        ) : (
          <>
            <View style={s.linha} />
            <View style={[s.linha, s.linhaEspaco]} />
            <View style={[s.linha, s.linhaEspaco]} />
          </>
        )}
      </Pressable>

      {open && (
        <View style={[s.overlay, { height }]}>
          <View style={s.lista} accessibilityRole="menu">
            {ITEMS.map((item) => (
              <Pressable key={item.path} accessibilityRole="link" onPress={() => go(item.path)}>
                <Text
                  style={[s.link, { fontSize, lineHeight: fontSize * 1.15 }, pathname === item.path && s.linkAtivo]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
            <Pressable accessibilityRole="link" onPress={() => Linking.openURL(LIVROS_URL)}>
              <Text style={[s.link, { fontSize, lineHeight: fontSize * 1.15 }]}>Livros ↗</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
