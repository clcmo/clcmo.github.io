import { Linking } from "react-native";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Tipos literais para melhor type safety
type ContactType = 'email' | 'social' | 'professional';
type SocialPlatform = 'tiktok' | 'youtube' | 'linkedin' | 'github';

interface ContactMethod {
  type: ContactType;
  label: string;
  value: string;
  action: () => void;
  IconComponent: typeof MaterialIcons | typeof FontAwesome5;
  iconName: string;
  platform?: SocialPlatform; // Opcional, apenas para redes sociais
}

export const contactMethods: ContactMethod[] = [
  // Email
  {
    type: 'email',
    label: 'Email',
    value: 'contato@apprendendo.blog',
    action: () => Linking.openURL('mailto:contato@apprendendo.blog'),
    IconComponent: MaterialIcons,
    iconName: 'email',
  },

  // Redes Sociais - TikTok
  {
    type: 'social',
    platform: 'tiktok',
    label: 'TikTok',
    value: '@apprendendo',
    action: () => Linking.openURL('https://tiktok.com/@apprendendo'),
    IconComponent: FontAwesome5,
    iconName: 'tiktok',
  },

  // Redes Sociais - YouTube
  {
    type: 'social',
    platform: 'youtube',
    label: 'YouTube',
    value: '@apprendendo',
    action: () => Linking.openURL('https://youtube.com/@apprendendo'),
    IconComponent: FontAwesome5,
    iconName: 'youtube',
  },

  // Profissional - LinkedIn
  {
    type: 'professional',
    platform: 'linkedin',
    label: 'LinkedIn',
    value: 'Camila Leite',
    action: () => Linking.openURL('https://linkedin.com/in/clcmo'),
    IconComponent: FontAwesome5,
    iconName: 'linkedin',
  },
  {
    type: 'professional',
    platform: 'linkedin',
    label: 'LinkedIn',
    value: 'Apprendendo',
    action: () => Linking.openURL('https://linkedin.com/company/apprendendo'),
    IconComponent: FontAwesome5,
    iconName: 'linkedin',
  },

  // Profissional - GitHub
  {
    type: 'professional',
    platform: 'github',
    label: 'GitHub',
    value: '@clcmo',
    action: () => Linking.openURL('https://github.com/clcmo'),
    IconComponent: FontAwesome5,
    iconName: 'github',
  },
  {
    type: 'professional',
    platform: 'github',
    label: 'GitHub',
    value: '@apprendendo',
    action: () => Linking.openURL('https://github.com/apprendendo'),
    IconComponent: FontAwesome5,
    iconName: 'github',
  },
];

// Função helper para agrupar por tipo
export const getContactsByType = (type: ContactType): ContactMethod[] => {
  return contactMethods.filter(method => method.type === type);
};

// Função helper para agrupar por plataforma
export const getContactsByPlatform = (platform: SocialPlatform): ContactMethod[] => {
  return contactMethods.filter(method => method.platform === platform);
};