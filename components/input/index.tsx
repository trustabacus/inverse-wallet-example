import {
  GestureResponderEvent,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { InputProps } from './type';
import { HeightSizes, PaddingHorizontals, FontSizes } from '../button';
import { Text, View, useThemeColor } from '../themed';

import { Sizing } from '@/constants/sizing';
import { getFontSize } from '@/constants/typography';

export const Input = (props: InputProps) => {
  const {
    size = 'md',
    type,
    textProps,
    lightColor,
    darkColor,
    borderRadius,
    style,
    icon,
    value,
    textarea,
    disabled,
    autoCapitalize,
    ...rest
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'dark'
  );

  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'border'
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  const textFadedColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'textFaded'
  );

  const bg = props?.bg || backgroundColor;
  const color = props?.color || textColor;

  const height = HeightSizes[size];
  const paddingHorizontal = PaddingHorizontals[size];
  const fontSize = FontSizes[size];

  const isPassword = type === 'password';
  const keyboardType = isPassword ? 'default' : type;
  const isTextarea = textarea;

  return (
    <View
      direction="row"
      flexCenterX
      style={[
        {
          backgroundColor: bg,
          height,
          paddingHorizontal,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: borderRadius || Sizing[2],
          borderColor,
          borderWidth: 1,
        },
        style,
      ]}>
      <TextInput
        keyboardType={keyboardType}
        returnKeyType="go"
        editable={disabled ? false : props.editable || true}
        selectTextOnFocus={false}
        selectionColor={textColor}
        style={[
          {
            width: '100%',
            height: '100%',
            color,
            fontSize: getFontSize(fontSize as any),
          },
        ]}
        value={value}
        /**
         * @Android Fix input autofill highlight yellow background color
         * Right now there is not way for Expo workflow to remove this else
         * this would have been the fix
         * @link https://developer.android.com/guide/topics/text/autofill-optimize#highlighted
         */
        importantForAutofill="no"
        autoCapitalize={
          keyboardType === 'email-address' ? 'none' : autoCapitalize
        }
        multiline={isTextarea}
        textAlignVertical={isTextarea ? 'top' : 'auto'}
        placeholderTextColor={textFadedColor}
        {...rest}
      />
      <View>{props.icon && props.icon}</View>
    </View>
  );
};
