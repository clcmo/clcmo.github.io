import React, { useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Project } from '@/types';
import { colors } from '@/theme';
import { projetos as s } from '@/styles/projetos';

// Campos que o backend já devolve; declarados aqui para não depender do tipo global.
type Extra = { coverUrl?: string | null };

interface ProjectCardProps {
  project: Project;
  width?: number;
}

const open = (url: string) => Linking.openURL(url);

function Cta({ label, url, outline = false }: { label: string; url: string; outline?: boolean }) {
  const [hover, setHover] = useState(false);
  const bg = outline ? (hover ? colors.preto : 'transparent') : hover ? colors.marca : colors.preto;
  const border = outline ? colors.preto : bg;
  const color = outline && !hover ? colors.text : colors.bg;
  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => open(url)}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      style={[s.cta, { backgroundColor: bg, borderColor: border }]}
    >
      <Text style={[s.ctaTexto, { color }]}>{label}</Text>
    </Pressable>
  );
}

export default function ProjectCard({ project, width }: ProjectCardProps) {
  const p = project as Project & Extra;
  const href = p.homepage || p.htmlUrl;
  const year = p.pushedAt ? new Date(p.pushedAt).getFullYear() : null;
  const meta = [p.language, year].filter(Boolean).join(', ');

  return (
    <View style={width ? { width } : { width: '100%' }}>
      <Pressable accessible={false} onPress={() => open(href)} style={s.capa}>
        {p.coverUrl ? (
          <Image source={{ uri: p.coverUrl }} style={s.capaImagem} contentFit="cover" />
        ) : (
          <Text style={s.capaTexto}>{p.name}</Text>
        )}
      </Pressable>

      <Pressable accessibilityRole="link" onPress={() => open(href)}>
        <Text style={s.nome}>{p.name}</Text>
      </Pressable>

      {meta !== '' && <Text style={s.meta}>{meta}</Text>}
      {p.description ? (
        <Text style={s.descricao} numberOfLines={3}>
          {p.description}
        </Text>
      ) : null}

      <View style={s.links}>
        <Cta label="Código" url={p.htmlUrl} />
        {p.homepage ? <Cta label="Ver ao vivo" url={p.homepage} outline /> : null}
      </View>
    </View>
  );
}
