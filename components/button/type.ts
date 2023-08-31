import type { TouchableOpacityProps } from 'react-native';

import { HeightSizes } from '.';
import { TextProps, ThemeProps } from '../themed/type';

import { ColorNameProps } from '@/constants/colors';

type ButtonType = 'inline';

export type ButtonColorScheme = 'secondary' | 'primary' | 'danger';

export type ButtonColorSchemesData = {
  [key in ButtonColorScheme]: {
    bg: ColorNameProps;
    color: ColorNameProps;
  };
};

export type ButtonTypeAlignContents = {
  [key in ButtonType]: 'flex-start' | 'auto';
};

export interface ButtonProps extends ThemeProps, TouchableOpacityProps {
  text?: string;
  size?: keyof typeof HeightSizes;
  type?: ButtonType;
  textProps?: TextProps;
  bg?: string;
  color?: string;
  borderRadius?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  paddingX?: number;
  width?: number;
  height?: number;
  colorScheme?: ButtonColorScheme;
}

export interface CopyButtonProps extends Omit<ButtonProps, 'size'> {
  value?: string;
  size?: number;
}
