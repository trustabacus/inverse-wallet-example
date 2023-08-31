import type { KeyboardTypeOptions, TextInputProps } from 'react-native';

import { HeightSizes } from '../button';
import { TextProps, ThemeProps } from '../themed/type';

type ButtonType = 'inline';

export type ButtonTypeAlignContents = {
  [key in ButtonType]: 'flex-start' | 'auto';
};

export interface InputProps extends ThemeProps, TextInputProps {
  size?: keyof typeof HeightSizes;
  type?: KeyboardTypeOptions | 'password';
  textProps?: TextProps;
  bg?: string;
  color?: string;
  borderRadius?: number;
  icon?: React.ReactNode;
  textarea?: boolean;
  disabled?: boolean;
}
