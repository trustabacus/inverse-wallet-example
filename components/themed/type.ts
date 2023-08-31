import { StatusBarStyle } from 'expo-status-bar';
import {
  Text as DefaultText,
  View as DefaultView,
  TextStyle,
  FlexStyle,
  ViewStyle,
  ImageProps as DefaultImageProps,
  ScrollViewProps as DefaultScrollViewProps,
  KeyboardAvoidingViewProps,
} from 'react-native';

import { ColorNameProps } from '@/constants/colors';
import { SpacingType } from '@/constants/spacing';
import { FontSizeType, FontsType, FontKeysType } from '@/constants/typography';

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps &
  DefaultText['props'] & {
    color?: ColorNameProps;
    size?: FontSizeType;
    font?: FontsType;
    weight?: FontKeysType;
    colorCode?: string;
    align?: TextStyle['textAlign'];
    transform?: TextStyle['textTransform'];
    type?: 'inline';
    lineHeight?: TextStyle['lineHeight'];
    letterSpacing?: TextStyle['letterSpacing'];
  };

export type ViewProps = ThemeProps &
  DefaultView['props'] & {
    bg?: ColorNameProps;
    direction?: FlexStyle['flexDirection'];

    padding?: SpacingType;
    paddingX?: SpacingType;
    paddingY?: SpacingType;
    paddingBottom?: SpacingType;
    paddingTop?: SpacingType;
    paddingRight?: SpacingType;
    paddingLeft?: SpacingType;

    margin?: SpacingType;
    marginX?: SpacingType;
    marginY?: SpacingType;
    marginBottom?: SpacingType;
    marginTop?: SpacingType;
    marginRight?: SpacingType;
    marginLeft?: SpacingType;

    flex?: FlexStyle['flex'];
    flexCenter?: boolean;
    flexCenterX?: boolean;
    flexCenterY?: boolean;

    justifyContent?: FlexStyle['justifyContent'];
    alignContent?: FlexStyle['alignContent'];
    alignItems?: FlexStyle['alignItems'];
    alignSelf?: FlexStyle['alignSelf'];

    border?: number;
    borderTop?: number;
    borderBottom?: number;
    borderLeft?: number;
    borderRight?: number;
    borderRadius?: number;

    borderColor?: ColorNameProps;

    width?: FlexStyle['width'];
    height?: FlexStyle['height'];
    size?: ViewStyle['width'];

    overflow?: FlexStyle['overflow'];
    position?: FlexStyle['position'];
    opacity?: ViewStyle['opacity'];
  };

export interface ContainerProps extends ViewProps {
  statusBar?: StatusBarStyle;
  scrollable?: boolean;
}

export interface ImageProps extends Partial<DefaultImageProps> {
  fit?: DefaultImageProps['resizeMode'];
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
}

export type ScrollViewProps = ThemeProps &
  ViewProps & {
    scrollY?: boolean;
    scrollX?: boolean;
    scrollFlex?: boolean;
    scrollProps?: DefaultScrollViewProps;
    keyboardAvoidView?: boolean;
    keyboardProps?: KeyboardAvoidingViewProps;
  };
