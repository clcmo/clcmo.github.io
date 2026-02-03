import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import { analyticsApi } from '@/services/api';
import { globalStyles } from '@/styles/global';
import { contactStyles } from '@/styles/contact';

export default function ContactScreen() {
  useEffect(() => {
    analyticsApi.trackVisit('/contact').catch(console.error);
  }, []);

  const contactMethods = [
    {
      label: 'Email',
      value: 'contato@apprendendo.blog',
      action: () => Linking.openURL('mailto:contato@apprendendo.blog'),
      IconComponent: MaterialIcons,
      iconName: 'email',
    },
    {
      label: 'TikTok',
      value: '@apprendendo',
      action: () => Linking.openURL('https://tiktok.com/@apprendendo'),
      IconComponent: FontAwesome5,
      iconName: 'tiktok',
    },
    {
      label: 'LinkedIn',
      value: 'Camila Leite',
      action: () => Linking.openURL('https://linkedin.com/in/clcmo'),
      IconComponent: FontAwesome5,
      iconName: 'linkedin',
    },
    {
      label: 'GitHub',
      value: '@clcmo',
      action: () => Linking.openURL('https://github.com/clcmo'),
      IconComponent: FontAwesome5,
      iconName: 'github',
    }
  ];

  return (
    <View style={globalStyles.screen}>
      <ScrollView style={globalStyles.scroll} contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>01. </Text>Entre em Contato
          </Text>

          <Text style={globalStyles.contactDescription}>
            Estou sempre aberta a novas oportunidades e colaborações.
            Se você tem um projeto em mente ou apenas quer dizer olá, escolha a melhor forma de me contatar!
          </Text>

          <View style={contactStyles.contactGrid}>
            {contactMethods.map((method, index) => {
              const { IconComponent, iconName } = method;
              return (
                <Pressable
                  key={index}
                  style={contactStyles.contactCard}
                  onPress={method.action}
                >
                  <View style={contactStyles.iconContainer}>
                    <IconComponent name={iconName} size={40} color="#64ffda" />
                  </View>
                  <Text style={contactStyles.contactLabel}>{method.label}</Text>
                  <Text style={contactStyles.contactValue}>{method.value}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={contactStyles.emailSection}>
            <Text style={contactStyles.emailLabel}>Ou envie um email direto:</Text>
            <Pressable
              style={contactStyles.emailButton}
              onPress={() => Linking.openURL('mailto:contato@apprendendo.blog')}
            >
              <Text style={contactStyles.emailButtonText}>Enviar Email</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}