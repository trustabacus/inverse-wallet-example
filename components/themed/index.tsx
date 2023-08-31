/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { forwardRef } from 'react';
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  Image as DefaultImage,
  ScrollView as DefaultScrollView,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';

import { ImageProps, TextProps, ViewProps, ScrollViewProps } from './type';

import Colors from '@/constants/colors';
import { Sizing } from '@/constants/sizing';
import { Spacing } from '@/constants/spacing';
import { Fonts, getFontSize } from '@/constants/typography';
import { isIOS } from '@/helpers/base';

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

export function Text(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    color: _color = 'text',
    colorCode,
    type,
    align,
    transform,
    lineHeight,
    letterSpacing,
    size,
    ...rest
  } = props;

  const font = props.font ? Fonts[props.font] : Fonts.text;

  const weightArray = Object.keys(font);
  let fontFamily = font[weightArray[1] as never];
  // check if font weight exist in font
  if (props.weight) {
    fontFamily = weightArray.includes(props.weight)
      ? font[props.weight as never]
      : font[weightArray[0] as never];
  }

  const color = useThemeColor({ light: lightColor, dark: darkColor }, _color);

  const fontSize = getFontSize(size || 'base');
  const textAlign = align || 'auto';
  const alignSelf = type === 'inline' ? 'flex-start' : 'auto';
  const textTransform = transform || 'none';

  return (
    <DefaultText
      style={[
        {
          color: props.colorCode || color,
          fontSize,
          fontFamily,
          textAlign,
          alignSelf,
          textTransform,
          lineHeight,
          letterSpacing,
        },
        style,
      ]}
      suppressHighlighting={!!props.onPress}
      {...rest}
    />
  );
}

export function View(props: ViewProps) {
  const {
    style,
    lightColor,
    darkColor,
    bg = 'transparent',
    padding,
    paddingX,
    paddingY,
    paddingBottom,
    paddingLeft,
    paddingTop,
    paddingRight,

    margin,
    marginX,
    marginY,
    marginBottom,
    marginLeft,
    marginTop,
    marginRight,

    direction,

    flex,
    flexCenter,
    flexCenterX,
    flexCenterY,

    justifyContent,
    alignItems,
    alignSelf,
    alignContent,

    border,
    borderBottom,
    borderTop,
    borderLeft,
    borderRight,
    borderRadius,
    borderColor: defaultBorderColor,

    width,
    height,
    size,

    overflow,
    position,

    opacity,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    bg
  );

  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    defaultBorderColor || 'border'
  );

  return (
    <DefaultView
      style={[
        { backgroundColor },
        padding ? { padding: Spacing[padding] } : {},
        paddingTop ? { paddingTop: Spacing[paddingTop] } : {},
        paddingRight ? { paddingRight: Spacing[paddingRight] } : {},
        paddingLeft ? { paddingLeft: Spacing[paddingLeft] } : {},
        paddingBottom ? { paddingBottom: Spacing[paddingBottom] } : {},
        paddingX
          ? { paddingLeft: Spacing[paddingX], paddingRight: Spacing[paddingX] }
          : {},
        paddingY
          ? { paddingTop: Spacing[paddingY], paddingBottom: Spacing[paddingY] }
          : {},

        margin ? { margin: Spacing[margin] } : {},
        marginY
          ? { marginTop: Spacing[marginY], marginBottom: Spacing[marginY] }
          : {},
        marginX
          ? { marginRight: Spacing[marginX], marginLeft: Spacing[marginX] }
          : {},
        marginBottom ? { marginBottom: Spacing[marginBottom] } : {},
        marginTop ? { marginTop: Spacing[marginTop] } : {},
        marginRight ? { marginRight: Spacing[marginRight] } : {},
        marginLeft ? { marginLeft: Spacing[marginLeft] } : {},
        direction ? { flexDirection: direction } : {},

        flex ? { flex } : {},
        flexCenter
          ? {
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }
          : {},
        flexCenterY ? { display: 'flex', justifyContent: 'center' } : {},
        flexCenterX
          ? { display: 'flex', alignContent: 'center', alignItems: 'center' }
          : {},

        alignContent ? { alignContent } : {},
        justifyContent ? { justifyContent } : {},
        alignItems ? { alignItems } : {},
        alignSelf ? { alignSelf } : {},

        border ? { borderColor, borderWidth: border } : {},
        borderTop
          ? { borderTopColor: borderColor, borderTopWidth: borderTop }
          : {},
        borderBottom
          ? { borderBottomColor: borderColor, borderBottomWidth: borderBottom }
          : {},
        borderLeft
          ? { borderLeftColor: borderColor, borderLeftWidth: borderLeft }
          : {},
        borderRight
          ? { borderRightColor: borderColor, borderRightWidth: borderRight }
          : {},

        borderRadius ? { borderRadius } : {},

        width ? { width } : {},
        height ? { height } : {},
        size ? { width: size, height: size } : {},

        overflow ? { overflow } : {},

        position ? { position } : {},

        opacity ? { opacity } : {},

        style,
      ]}
      {...otherProps}
    />
  );
}

export const Image = (props: ImageProps) => {
  const { fit, source, src, alt, resizeMode, width, height, style, ...rest } =
    props;

  return (
    <DefaultImage
      source={source || { uri: src }}
      accessibilityLabel={alt}
      resizeMode={fit || resizeMode || 'cover'}
      style={[width ? { width } : {}, height ? { height } : {}, style]}
      {...rest}
    />
  );
};

export const ScrollView = forwardRef((props: ScrollViewProps, ref) => {
  const {
    scrollY,
    scrollX,
    scrollFlex,
    scrollProps,
    keyboardAvoidView,
    keyboardProps,
    ...otherProps
  } = props;

  const renderChildren = () => {
    return (
      <DefaultScrollView
        showsHorizontalScrollIndicator={scrollX || false}
        showsVerticalScrollIndicator={scrollY || false}
        {...scrollProps}
        ref={ref as any}
        style={[
          scrollFlex ? { flex: 1, paddingBottom: Spacing.lg } : {},
          scrollProps?.style,
        ]}>
        <Pressable>
          <View {...otherProps} />
        </Pressable>
      </DefaultScrollView>
    );
  };

  if (keyboardAvoidView) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={isIOS() ? Sizing[12] : 0}
        behavior={isIOS() ? 'padding' : 'height'}
        {...keyboardProps}>
        {renderChildren()}
      </KeyboardAvoidingView>
    );
  }

  return renderChildren();
});
