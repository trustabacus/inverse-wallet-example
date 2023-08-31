import ReactToast, { ToastConfig } from 'react-native-toast-message';

import { View, Text } from '../themed';

import { Sizing } from '@/constants/sizing';
import { isIOS, isString } from '@/helpers/base';

export type ShowToastElement = JSX.Element | string;

export type ShowToastTypeOptions = 'base' | 'primary' | 'danger';

export type ShowToastOptions = {
  type?: ShowToastTypeOptions;
  text: ShowToastElement;
  duration?: number;
  topOffset?: number;
};

/*
  - Create the config
*/
export const toastConfig: ToastConfig = {
  base: ({ props }) => (
    <View
      height={Sizing[13]}
      bg="dark"
      border={1}
      paddingX="base"
      borderRadius={Sizing[3]}
      flexCenter
      style={{
        ...(isIOS()
          ? {
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }
          : {}),
      }}>
      {isString(props.text) ? (
        <Text weight="medium" size="sm">
          {props.text}
        </Text>
      ) : (
        props.text
      )}
    </View>
  ),
  primary: ({ props }) => (
    <View
      bg="primary"
      border={0}
      paddingX="base"
      paddingY="base"
      marginX="base"
      borderRadius={Sizing[3]}
      flexCenter
      style={{
        ...(isIOS()
          ? {
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }
          : {}),
      }}>
      {isString(props.text) ? (
        <Text weight="medium" size="sm">
          {props.text}
        </Text>
      ) : (
        props.text
      )}
    </View>
  ),
  danger: ({ props }) => (
    <View
      height={Sizing[13]}
      bg="danger"
      border={1}
      paddingX="base"
      borderRadius={Sizing[3]}
      flexCenter
      style={{
        ...(isIOS()
          ? {
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }
          : {}),
      }}>
      {isString(props.text) ? (
        <Text weight="medium" size="sm">
          {props.text}
        </Text>
      ) : (
        props.text
      )}
    </View>
  ),
};

// Toast
export const Toast = ReactToast;

// - Toast helper
export const showToast = (options: ShowToastOptions) => {
  Toast.show({
    type: options?.type || 'primary',
    props: {
      text: options.text || '',
    },
    visibilityTime: options.duration || 5000,
    topOffset: options.topOffset || 60,
  });
};
