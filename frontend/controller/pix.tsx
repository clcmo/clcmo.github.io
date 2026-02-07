import { Alert, Share, Clipboard } from 'react-native';

export const pixData = {
  key: 'camila.leite.oliveira@gmail.com',
  name: 'Camila Leite Oliveira',
  city: 'Sao Paulo'
};

export class PixController {
  static async copyPixKey(setCopied: (copied: boolean) => void): Promise<void> {
    try {
      await Clipboard.setString(pixData.key);
      setCopied(true);
      Alert.alert('Copiado!', 'Chave Pix copiada para a área de transferência.');

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar a chave Pix.');
    }
  }

  static async sharePixKey(): Promise<void> {
    try {
      await Share.share({
        message: `Apoie meu trabalho via Pix!\n\nChave: ${pixData.key}\nNome: ${pixData.name}`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  }

  static generatePixPayload(): string {
    const createEMVField = (id: string, value: string): string => {
      const length = value.length.toString().padStart(2, '0');
      return `${id}${length}${value}`;
    };

    let payload = '';
    payload += createEMVField('00', '01');

    let merchantAccount = '';
    merchantAccount += createEMVField('00', 'BR.GOV.BCB.PIX');
    merchantAccount += createEMVField('01', pixData.key);
    payload += createEMVField('26', merchantAccount);

    payload += createEMVField('52', '0000');
    payload += createEMVField('53', '986');
    payload += createEMVField('58', 'BR');
    payload += createEMVField('59', pixData.name.substring(0, 25));
    payload += createEMVField('60', pixData.city.substring(0, 15));

    payload += '6304';

    const crc = this.calculateCRC16(payload);
    payload += crc;

    return payload;
  }

  private static calculateCRC16(payload: string): string {
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
  }
}