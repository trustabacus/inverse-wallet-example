import { SvgProps } from 'react-native-svg';

import { ThemeProps } from '../themed/type';

import { ColorNameProps } from '@/constants/colors';
import { iconSizes } from '@/constants/sizing';

export type SvgIconProps = SvgProps &
  ThemeProps & {
    size?: keyof typeof iconSizes;
    rx?: number;
    iconColor?: ColorNameProps;
    iconColorAlt?: ColorNameProps;
  };

export type OtherSvgIconProps = {
  bg?: string;
};
