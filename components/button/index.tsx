import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import {
  ButtonColorSchemesData,
  ButtonProps,
  ButtonTypeAlignContents,
  CopyButtonProps,
} from './type';
import { CheckIcon, CopyIcon } from '../icons';
import { Text, View, useThemeColor } from '../themed';

import { Sizing } from '@/constants/sizing';
import { useAppDispatch } from '@/hooks';
import { removeGlobalCredentials } from '@/redux/reducers/global';

export const HeightSizes = {
  sm: Sizing[10], // 32
  md: Sizing[11], // 44
  lg: Sizing[14], // 56
};

// This reference to the typography font sizes
export const FontSizes = {
  sm: 'xs',
  md: 'base',
  lg: 'lg',
};

export const PaddingHorizontals = {
  sm: Sizing[3],
  md: Sizing[4],
  lg: Sizing[4.5],
};

const ButtonTypeAlignSelf: ButtonTypeAlignContents = {
  inline: 'flex-start',
};

const ButtonColorSchemes: ButtonColorSchemesData = {
  primary: {
    bg: 'primary',
    color: 'text',
  },
  secondary: {
    bg: 'backgroundFaded',
    color: 'text',
  },
  danger: {
    bg: 'danger',
    color: 'text',
  },
};

export const Button = (props: ButtonProps) => {
  const {
    text,
    size = 'md',
    type,
    textProps,
    lightColor,
    darkColor,
    disabled,
    borderRadius = Sizing[2],
    style,
    rightIcon,
    leftIcon,
    paddingX,
    height: propsHeight,
    width,
    colorScheme = 'primary',
    ...rest
  } = props;

  const colorSchemeData = ButtonColorSchemes[colorScheme];

  const bgColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorSchemeData.bg
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorSchemeData.color
  );

  const bg = props?.bg || bgColor;
  const color = props?.color || textColor;

  const height = propsHeight || HeightSizes[size];
  const paddingHorizontal = paddingX || PaddingHorizontals[size];
  const fontSize = FontSizes[size];

  const alignSelf = type ? ButtonTypeAlignSelf[type] : 'auto';

  const onPressHandler = (e: GestureResponderEvent) => {
    if (!disabled) {
      props.onPress?.(e);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={onPressHandler}
      {...rest}>
      <View
        direction="row"
        flexCenterX
        style={[
          {
            backgroundColor: bg,
            height,
            paddingHorizontal,
            alignSelf,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius,
            borderColor: bg,
            borderWidth: 1,
            opacity: disabled ? 0.6 : 1,
          },
          width ? { width } : {},
          style,
        ]}>
        {props.leftIcon || null}
        {text ? (
          <Text
            style={{ color }}
            size={fontSize as any}
            align="center"
            weight="semiBold"
            {...textProps}>
            {text}
          </Text>
        ) : null}
        {props.rightIcon || null}
      </View>
    </TouchableOpacity>
  );
};

export const CopyButton = (props: CopyButtonProps) => {
  const { value, size, ...rest } = props;

  const [copied, setCopied] = useState(false);

  const iconSize = size || Sizing[12];

  const onPressHandler = async () => {
    // ...
    await Clipboard.setStringAsync(value || '');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      width={iconSize}
      height={iconSize}
      rightIcon={
        copied ? <CheckIcon iconColor="text" /> : <CopyIcon iconColor="text" />
      }
      onPress={onPressHandler}
      {...rest}
    />
  );
};

export const LogoutButton = (props: ButtonProps) => {
  const dispatch = useAppDispatch();

  const onPressHandler = () => {
    dispatch(removeGlobalCredentials());
  };

  return (
    <Button
      text="Logout"
      colorScheme="danger"
      {...props}
      onPress={onPressHandler}
    />
  );
};
