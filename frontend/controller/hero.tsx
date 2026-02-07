import { Platform } from 'react-native';

const WEB_STARS =
  'https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Stars.svg?sanitize=true';

export class HeroController {
  static getBackgroundStyle() {
    return Platform.OS === 'web'
      ? ({
          backgroundImage: `url(${WEB_STARS})`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        } as any)
      : undefined;
  }

  static getBackgroundSource() {
    return Platform.OS === 'web' 
      ? undefined 
      : require('@/assets/stars.png');
  }
}