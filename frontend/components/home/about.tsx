import React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';

import { globalStyles } from '@/styles/global';

interface AboutProps {
  onLayout?: (event: LayoutChangeEvent) => void;
}

export default function About({ onLayout }: AboutProps) {
  return (
    <View
      style={globalStyles.section}
      nativeID="about"
      onLayout={onLayout}
    >
      <Text style={globalStyles.sectionTitle}>
        <Text style={globalStyles.numberPrefix}>01. </Text>
        Sobre Mim
      </Text>

      <View style={globalStyles.aboutContent}>
        <Text style={globalStyles.aboutText}>
          Olá! Sou Camila, desenvolvedora full stack e professora, apaixonada por transformar
          ideias em soluções que facilitam o dia a dia das pessoas. Desenvolvo aplicações web e
          mobile, sempre buscando escrever código limpo, acessível e sustentável — e ensinar
          essas práticas também faz parte da minha missão.
          {'\n\n'}
          Iniciei minha jornada na programação movida pela curiosidade, e hoje essa curiosidade
          se tornou uma carreira sólida, guiada pela vontade de resolver problemas complexos com
          criatividade e tecnologia.
          {'\n\n'}
          Desde 2019, atuei no desenvolvimento de funcionalidades e produtos para empresas como
          Itaú e PagBank. Em equipe, contribui para soluções envolvendo e-commerce, educação
          financeira, pagamentos, comunicação e análise de dados. Em 2022, conquistei 2º lugar no
          HackaPag com um projeto focado em educação financeira — uma experiência que marcou meu
          entusiasmo por inovação.
          {'\n\n'}
          Sou pós-graduada em Inteligência Artificial pelo TIDD da PUC-SP, onde desenvolvi o artigo
          "Consumismo, Moralidade e Excessos da Sociedade Digitalizada". Como pesquisadora, estudo
          desde 2021 o impacto da tecnologia no futuro da sociedade, especialmente a relação entre
          IoT, algoritmos e inteligência artificial — estudos que pretendo aprofundar em um mestrado.
          {'\n\n'}
          Também sou formada em Análise e Desenvolvimento de Sistemas pela FATEC-SP e em Administração
          Pública pela UFOP, trajetória que uniu tecnologia, pessoas e visão estratégica.
          {'\n\n'}
          Hoje, trabalho com tecnologias modernas como React, React Native, Node.js, TypeScript, além
          de bancos de dados relacionais e não-relacionais. Como professora e desenvolvedora, acredito
          no poder da educação e do conhecimento compartilhado — e amo aplicar, aprender e ensinar novas
          tecnologias em projetos reais.
          {'\n\n'}
          A seguir, algumas tecnologias com as quais tenho trabalhado recentemente:
        </Text>

        <View style={globalStyles.techList}>
          <Text style={globalStyles.techItem}>▹ JavaScript (ES6+)</Text>
          <Text style={globalStyles.techItem}>▹ TypeScript</Text>
          <Text style={globalStyles.techItem}>▹ React & React Native</Text>
          <Text style={globalStyles.techItem}>▹ Node.js & Express</Text>
          <Text style={globalStyles.techItem}>▹ MongoDB & PostgreSQL</Text>
          <Text style={globalStyles.techItem}>▹ Git & GitHub</Text>
        </View>
      </View>
    </View>
  );
}