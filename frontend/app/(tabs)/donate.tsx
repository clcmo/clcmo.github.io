import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

import { pixData, PixController } from '@/controller/pix';
import { analyticsApi } from '@/services/api';
import { globalStyles } from '@/styles/global';
import { donateStyles } from '@/styles/donate';

export default function PixScreen() {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    analyticsApi.trackVisit('/pix').catch(console.error);
  }, []);

  const pixPayload = PixController.generatePixPayload();

  return (
    <View style={globalStyles.screen}>
      <ScrollView 
        style={globalStyles.scroll} 
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.section}>
          {/* Cabeçalho */}
          <Text style={globalStyles.sectionTitle}>
            <Text style={globalStyles.numberPrefix}>04. </Text>Apoie Meu Trabalho
          </Text>

          <Text style={globalStyles.contactDescription}>
            Se você gosta do conteúdo que produzo e quer apoiar meu trabalho,
            pode fazer uma contribuição via Pix. Sua ajuda é muito apreciada! 💚
          </Text>

          {/* Toggle Chave/QR Code */}
          <View style={donateStyles.toggleContainer}>
            <Pressable
              style={[donateStyles.toggleButton, !showQRCode && donateStyles.toggleButtonActive]}
              onPress={() => setShowQRCode(false)}
            >
              <MaterialIcons name="vpn-key" size={20} color={!showQRCode ? '#64ffda' : '#8892b0'} />
              <Text style={[donateStyles.toggleButtonText, !showQRCode && donateStyles.toggleButtonTextActive]}>
                Chave Pix
              </Text>
            </Pressable>
            <Pressable
              style={[donateStyles.toggleButton, showQRCode && donateStyles.toggleButtonActive]}
              onPress={() => setShowQRCode(true)}
            >
              <MaterialIcons name="qr-code" size={20} color={showQRCode ? '#64ffda' : '#8892b0'} />
              <Text style={[donateStyles.toggleButtonText, showQRCode && donateStyles.toggleButtonTextActive]}>
                QR Code
              </Text>
            </Pressable>
          </View>

          {/* Exibição da Chave Pix */}
          {!showQRCode ? (
            <View style={donateStyles.pixContainer}>
              <View style={donateStyles.pixCard}>
                <View style={donateStyles.pixIconContainer}>
                  <MaterialCommunityIcons name="cash" size={48} color="#64ffda" />
                </View>
                
                <View style={donateStyles.pixInfo}>
                  <Text style={donateStyles.pixLabel}>Chave Pix:</Text>
                  <Text style={donateStyles.pixKey}>{pixData.key}</Text>
                </View>

                <View style={donateStyles.pixInfo}>
                  <Text style={donateStyles.pixLabel}>Nome:</Text>
                  <Text style={donateStyles.pixValue}>{pixData.name}</Text>
                </View>

                <View style={donateStyles.buttonGroup}>
                  <Pressable
                    style={[donateStyles.pixButton, copied && donateStyles.pixButtonSuccess]}
                    onPress={() => PixController.copyPixKey(setCopied)}
                  >
                    <MaterialIcons 
                      name={copied ? "check-circle" : "content-copy"} 
                      size={20} 
                      color="#64ffda" 
                      style={{ marginRight: 8 }}
                    />
                    <Text style={donateStyles.pixButtonText}>
                      {copied ? 'Copiado!' : 'Copiar Chave'}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[donateStyles.pixButton, donateStyles.pixButtonSecondary]}
                    onPress={PixController.sharePixKey}
                  >
                    <MaterialIcons name="share" size={20} color="#8892b0" style={{ marginRight: 8 }} />
                    <Text style={[donateStyles.pixButtonText, { color: '#8892b0' }]}>Compartilhar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            /* Exibição do QR Code */
            <View style={donateStyles.qrCodeContainer}>
              <View style={donateStyles.qrCodeCard}>
                <View style={donateStyles.qrTitleContainer}>
                  <MaterialIcons name="qr-code-scanner" size={32} color="#64ffda" />
                  <Text style={donateStyles.qrCodeTitle}>Escaneie o QR Code</Text>
                </View>
                
                <View style={donateStyles.qrWrapper}>
                  <QRCode
                    value={pixPayload}
                    size={220}
                    backgroundColor="white"
                    color="black"
                  />
                </View>

                <View style={donateStyles.qrInstruction}>
                  <MaterialIcons name="smartphone" size={20} color="#8892b0" />
                  <Text style={donateStyles.qrInstructionText}>
                    Abra o app do seu banco e escaneie o código
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Valores Sugeridos */}
          <View style={donateStyles.suggestedAmountsContainer}>
            <View style={donateStyles.sectionHeader}>
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#64ffda" />
              <Text style={donateStyles.suggestedAmountsTitle}>Valores sugeridos:</Text>
            </View>
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
            <View style={donateStyles.customAmount}>
              <MaterialIcons name="favorite" size={16} color="#ff6b9d" />
              <Text style={donateStyles.customAmountText}>
                ou qualquer valor que desejar
              </Text>
            </View>
          </View>

          {/* Benefícios */}
          <View style={donateStyles.benefitsContainer}>
            <View style={donateStyles.sectionHeader}>
              <MaterialIcons name="lightbulb" size={24} color="#64ffda" />
              <Text style={donateStyles.benefitsTitle}>Como você me ajuda:</Text>
            </View>
            <View style={donateStyles.benefitsList}>
              <View style={donateStyles.benefitItem}>
                <MaterialIcons name="edit" size={24} color="#64ffda" />
                <Text style={donateStyles.benefitText}>
                  Criar mais conteúdo de qualidade no blog
                </Text>
              </View>
              <View style={donateStyles.benefitItem}>
                <MaterialIcons name="school" size={24} color="#64ffda" />
                <Text style={donateStyles.benefitText}>
                  Investir em cursos e aprendizado contínuo
                </Text>
              </View>
              <View style={donateStyles.benefitItem}>
                <FontAwesome5 name="code" size={24} color="#64ffda" />
                <Text style={donateStyles.benefitText}>
                  Desenvolver projetos open source
                </Text>
              </View>
              <View style={donateStyles.benefitItem}>
                <MaterialCommunityIcons name="coffee" size={24} color="#64ffda" />
                <Text style={donateStyles.benefitText}>
                  Manter-me energizada com muito café!
                </Text>
              </View>
            </View>
          </View>

          {/* Mensagem de Agradecimento */}
          <View style={donateStyles.thankYouContainer}>
            <MaterialIcons name="favorite" size={32} color="#ff6b9d" />
            <Text style={donateStyles.thankYouText}>
              Muito obrigada pelo seu apoio!
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