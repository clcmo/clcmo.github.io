import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, StyleSheet, Share, Clipboard } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

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
  const pixName = 'Camila Leite Oliveira';
  const pixCity = 'Sao Paulo';

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

  // Gerar payload do Pix para QR Code
  const generatePixPayload = (): string => {
    const createEMVField = (id: string, value: string): string => {
      const length = value.length.toString().padStart(2, '0');
      return `${id}${length}${value}`;
    };

    let payload = '';
    payload += createEMVField('00', '01');
    
    let merchantAccount = '';
    merchantAccount += createEMVField('00', 'BR.GOV.BCB.PIX');
    merchantAccount += createEMVField('01', pixKey);
    payload += createEMVField('26', merchantAccount);
    
    payload += createEMVField('52', '0000');
    payload += createEMVField('53', '986');
    payload += createEMVField('58', 'BR');
    payload += createEMVField('59', pixName.substring(0, 25));
    payload += createEMVField('60', pixCity.substring(0, 15));
    
    payload += '6304';
    
    const crc = calculateCRC16(payload);
    payload += crc;
    
    return payload;
  };

  const calculateCRC16 = (payload: string): string => {
    let crc = 0xFFFF;
    
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc = crc << 1;
        }
      }
    }
    
    crc = crc & 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
  };

  const pixPayload = generatePixPayload();

  return (
    <View style={globalStyles.screen}>
      <ScrollView style={globalStyles.scroll} contentContainerStyle={globalStyles.content}>
        <View style={globalStyles.section}>
          <View style={donateStyles.headerContainer}>
            <View style={donateStyles.iconHeader}>
              <FontAwesome5 name="hand-holding-usd" size={28} color="#64ffda" />
            </View>
            <Text style={globalStyles.sectionTitle}>
              <Text style={globalStyles.numberPrefix}>03. </Text>Apoie Meu Trabalho
            </Text>
          </View>

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
                    onPress={sharePixKey}
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

          {/* Valores sugeridos */}
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

          {/* Mensagem de agradecimento */}
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