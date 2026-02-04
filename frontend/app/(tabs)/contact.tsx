import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

import { contactMethods, getContactsByType } from '@/interface/contact';
import { analyticsApi } from '@/services/api';
import { globalStyles } from '@/styles/global';
import { contactStyles } from '@/styles/contact';

export default function ContactScreen() {
  useEffect(() => {
    analyticsApi.trackVisit('/contact').catch(console.error);
  }, []);

  // Agrupa os contatos por tipo
  const emailContacts = getContactsByType('email');
  const socialContacts = getContactsByType('social');
  const professionalContacts = getContactsByType('professional');

  // Renderiza um card de contato
  const renderContactCard = (method: typeof contactMethods[0], index: number) => {
    const { IconComponent, iconName } = method;
    
    return (
      <Pressable
        key={`${method.type}-${method.value}-${index}`}
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
  };

  // Renderiza uma seção de contatos
  const renderContactSection = (
    title: string,
    contacts: typeof contactMethods,
    showDivider: boolean = true
  ) => {
    if (contacts.length === 0) return null;

    return (
      <View style={contactStyles.contactSection}>
        <Text style={contactStyles.subsectionTitle}>{title}</Text>
        <View style={contactStyles.contactGrid}>
          {contacts.map(renderContactCard)}
        </View>
        {showDivider && <View style={contactStyles.sectionDivider} />}
      </View>
    );
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView style={globalStyles.scroll} contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.section}>
          {/* Cabeçalho */}
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>03. </Text>Entre em Contato
          </Text>

          <Text style={globalStyles.contactDescription}>
            Estou sempre aberta a novas oportunidades e colaborações.
            Se você tem um projeto em mente ou apenas quer dizer olá, escolha a melhor forma de me contatar!
          </Text>

          {/* Seção Email */}
          {renderContactSection('Email', emailContacts, true)}

          {/* Seção Redes Sociais */}
          {renderContactSection('Redes Sociais', socialContacts, true)}

          {/* Seção Profissional */}
          {renderContactSection('Profissional', professionalContacts, false)}

          {/* CTA de Email (mantido do original) */}
          {emailContacts.length > 0 && (
            <View style={contactStyles.emailSection}>
              <Text style={contactStyles.emailLabel}>Ou envie um email direto:</Text>
              <Pressable
                style={contactStyles.emailButton}
                onPress={emailContacts[0].action}
              >
                <Text style={contactStyles.emailButtonText}>Enviar Email</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}