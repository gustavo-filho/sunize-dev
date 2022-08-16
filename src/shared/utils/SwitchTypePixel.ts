import { FaFacebook } from 'react-icons/fa';
import { SiGoogleads } from 'react-icons/si';

export interface ISwitchTypePixel {
  title?: string;
  icon?: any;
  placeholder?: string;
  id?: 'facebook' | 'ads' | 'analytics';
}

export function switchTypePixel(
  key: 'facebook' | 'ads' | 'analytics',
): ISwitchTypePixel {
  switch (key) {
    case 'facebook':
      return {
        title: 'Pixel do facebook',
        icon: FaFacebook,
        placeholder: 'Ex: 1234567890',
        id: 'facebook',
      };
    case 'ads':
      return {
        title: 'Pixel do Ads',
        icon: SiGoogleads,
        placeholder: 'Ex: AW-00000000',
        id: 'ads',
      };
    case 'analytics':
      return {
        title: 'Pixel do Analytics',
        icon: SiGoogleads,
        placeholder: 'EX: G-XXXXXXX',
        id: 'analytics',
      };
    default:
      return {
        title: 'Pixel do facebook',
        icon: FaFacebook,
        placeholder: 'Ex: 1234567890',
        id: 'facebook',
      };
  }
}
