import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, StyleSheet, Share, Clipboard } from 'react-native';

import { analyticsApi } from '@/services/api';
import { globalStyles, donateStyles } from '@/styles/global';

export default function PixScreen() {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    analyticsApi.trackVisit('/pix').catch(console.error);
  }, []);

  // Substitua pelos seus dados reais
  const pixKey = 'camila.leite.oliveira@gmail.com';
  const pixName = 'Camila L. Oliveira';
  const pixCity = 'São Paulo';

  const copyPixKey = async () => {
    try {
      await Clipboard.setString(pixKey);
      setCopied(true);
      Alert.alert('Copiado!', 'Chave Pix copiada para a área de transferência.');
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar a chave Pix.');
    }
  };

  const sharePixKey = async () => {
    try {
      await Share.share({
        message: `Apoie meu trabalho via Pix!\n\nChave: ${pixKey}\nNome: ${pixName}`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <View style={globalStyles.screen}>
      <ScrollView style={globalStyles.scroll} contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>03. </Text>Apoie Meu Trabalho
          </Text>

          <Text style={globalStyles.contactDescription}>
            Se você gosta do conteúdo que produzo e quer apoiar meu trabalho,
            pode fazer uma contribuição via Pix. Sua ajuda é muito apreciada! 💚
          </Text>

          {/* Opção de visualização */}
          <View style={donateStyles.toggleContainer}>
            <Pressable
              style={[donateStyles.toggleButton, !showQRCode && donateStyles.toggleButtonActive]}
              onPress={() => setShowQRCode(false)}
            >
              <Text style={[donateStyles.toggleButtonText, !showQRCode && donateStyles.toggleButtonTextActive]}>
                Chave Pix
              </Text>
            </Pressable>
            <Pressable
              style={[donateStyles.toggleButton, showQRCode && donateStyles.toggleButtonActive]}
              onPress={() => setShowQRCode(true)}
            >
              <Text style={[donateStyles.toggleButtonText, showQRCode && donateStyles.toggleButtonTextActive]}>
                QR Code
              </Text>
            </Pressable>
          </View>

          {/* Exibição da Chave Pix */}
          {!showQRCode ? (
            <View style={donateStyles.pixContainer}>
              <View style={donateStyles.pixCard}>
                <Text style={donateStyles.pixIcon}>💸</Text>
                
                <View style={donateStyles.pixInfo}>
                  <Text style={donateStyles.pixLabel}>Chave Pix:</Text>
                  <Text style={donateStyles.pixKey}>{pixKey}</Text>
                </View>

                <View style={donateStyles.pixInfo}>
                  <Text style={donateStyles.pixLabel}>Nome:</Text>
                  <Text style={donateStyles.pixValue}>{pixName}</Text>
                </View>

                <View style={donateStyles.buttonGroup}>
                  <Pressable
                    style={[donateStyles.pixButton, copied && donateStyles.pixButtonSuccess]}
                    onPress={copyPixKey}
                  >
                    <Text style={donateStyles.pixButtonText}>
                      {copied ? '✓ Copiado!' : '📋 Copiar Chave'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[donateStyles.pixButton, donateStyles.pixButtonSecondary]}
                    onPress={sharePixKey}
                  >
                    <Text style={donateStyles.pixButtonText}>↗ Compartilhar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            /* Exibição do QR Code */
            <View style={donateStyles.qrCodeContainer}>
              <View style={donateStyles.qrCodeCard}>
                <Text style={donateStyles.qrCodeTitle}>Escaneie o QR Code</Text>
                
                {/* 
                  Descomente para usar o componente de QR Code:
                  Antes, instale: npx expo install react-native-qrcode-svg
                  
                  <PixQRCode 
                    pixKey={pixKey}
                    name={pixName}
                    city={pixCity}
                  />
                */}
                
                {/* Placeholder enquanto o QR Code não está implementado */}
                <View style={donateStyles.qrPlaceholder}>
                  <Text style={donateStyles.qrPlaceholderIcon}>📱</Text>
                  <Text style={donateStyles.qrPlaceholderText}>
                    QR Code Pix
                  </Text>
                  <Text style={donateStyles.qrPlaceholderSubtext}>
                    Para habilitar o QR Code, instale:{'\n'}
                    npx expo install react-native-qrcode-svg
                  </Text>
                </View>

                <Text style={donateStyles.qrInstruction}>
                  Abra o app do seu banco e escaneie o código acima
                </Text>
              </View>
            </View>
          )}

          {/* Valores sugeridos (opcional) */}
          <View style={donateStyles.suggestedAmountsContainer}>
            <Text style={donateStyles.suggestedAmountsTitle}>Valores sugeridos:</Text>
            <View style={donateStyles.suggestedAmountsGrid}>
              {[5, 10, 25, 50].map((amount) => (
                <Pressable
                  key={amount}
                  style={donateStyles.amountButton}
                  onPress={() => Alert.alert('Pix', `Copie a chave e faça uma transferência de R$ ${amount}`)}
                >
                  <Text style={donateStyles.amountButtonText}>R$ {amount}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={donateStyles.customAmountText}>
              ou qualquer valor que desejar ❤️
            </Text>
          </View>

          {/* Benefícios */}
          <View style={donateStyles.benefitsContainer}>
            <Text style={donateStyles.benefitsTitle}>Como você me ajuda:</Text>
            <View style={donateStyles.benefitsList}>
              <View style={donateStyles.benefitItem}>
                <Text style={donateStyles.benefitIcon}>✍️</Text>
                <Text style={donateStyles.benefitText}>
                  Criar mais conteúdo de qualidade no blog
                </Text>
              </View>
              <View style={donateStyles.benefitItem}>
                <Text style={donateStyles.benefitIcon}>🎓</Text>
                <Text style={donateStyles.benefitText}>
                  Investir em cursos e aprendizado contínuo
                </Text>
              </View>
              <View style={donateStyles.benefitItem}>
                <Text style={donateStyles.benefitIcon}>💻</Text>
                <Text style={donateStyles.benefitText}>
                  Desenvolver projetos open source
                </Text>
              </View>
              <View style={donateStyles.benefitItem}>
                <Text style={donateStyles.benefitIcon}>☕</Text>
                <Text style={donateStyles.benefitText}>
                  Manter-me energizada com muito café!
                </Text>
              </View>
            </View>
          </View>

          {/* Mensagem de agradecimento */}
          <View style={donateStyles.thankYouContainer}>
            <Text style={donateStyles.thankYouText}>
              Muito obrigada pelo seu apoio! 🙏
            </Text>
            <Text style={donateStyles.thankYouSubtext}>
              Cada contribuição, por menor que seja, faz toda a diferença
              e me motiva a continuar compartilhando conhecimento.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}