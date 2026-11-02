import React, { useState } from 'react';
import { View } from 'react-native';

import { Project } from '@/types';
import ProjectCard from '@/components/cards/project';
import { projetos as s } from '@/styles/projetos';

const GAP = 28;

/** Grade de 1, 2 ou 3 colunas conforme a largura do próprio contêiner (equivale ao auto-fill do tema). */
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [w, setW] = useState(0);
  const cols = w >= 840 ? 3 : w >= 500 ? 2 : 1;
  const cardWidth = Math.floor((w - GAP * (cols - 1)) / cols);

  return (
    <View style={s.grid} onLayout={(e) => setW(Math.floor(e.nativeEvent.layout.width))}>
      {w > 0 &&
        projects.map((p) => <ProjectCard key={p.fullName || p.name} project={p} width={cardWidth} />)}
    </View>
  );
}
