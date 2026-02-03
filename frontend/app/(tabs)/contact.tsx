import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';

import { analyticsApi } from '@/services/api';
import { globalStyles } from '@/styles/global';

export default function ContactScreen() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    analyticsApi.trackVisit('/contact').catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setFormStatus('sending');

    // simulação de envio
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView style={globalStyles.scroll} contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>01. </Text>Entre em Contato
          </Text>

          <Text style={globalStyles.contactDescription}>
            Estou sempre aberta a novas oportunidades e colaborações.
            Se você tem um projeto em mente ou apenas quer dizer olá, sinta-se à vontade para me enviar uma mensagem!
          </Text>

          <View style={globalStyles.form}>
            <TextInput
              style={globalStyles.input}
              placeholder="Nome"
              placeholderTextColor="#8892b0"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              placeholderTextColor="#8892b0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <TextInput
              style={[globalStyles.input, globalStyles.textArea]}
              placeholder="Mensagem"
              placeholderTextColor="#8892b0"
              multiline
              numberOfLines={6}
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
            />

            <Pressable
              style={[globalStyles.submitButton, formStatus === 'sending' && globalStyles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={formStatus === 'sending'}
            >
              <Text style={globalStyles.submitButtonText}>
                {formStatus === 'sending'
                  ? 'Enviando...'
                  : formStatus === 'success'
                    ? 'Enviado! ✓'
                    : 'Enviar Mensagem'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
