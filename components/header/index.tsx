import { router } from 'expo-router';
import { Pressable } from 'react-native';

import { PageHeaderProps } from './type';
import { ChevronLeftIcon } from '../icons';
import { Text, View } from '../themed';

import { Sizing } from '@/constants/sizing';

export const PageHeader = (props: PageHeaderProps) => {
  const { title, titleProps, showBackIcon } = props;

  const onBackHandler = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/');
    }
  };

  return (
    <View
      paddingTop="sm"
      direction="row"
      height={Sizing[12]}
      alignContent="center"
      flexCenterX
      borderBottom={1}>
      {showBackIcon ? (
        <Pressable onPress={onBackHandler}>
          <View flexCenter size={Sizing[8]} paddingX="md">
            <ChevronLeftIcon />
          </View>
        </Pressable>
      ) : null}

      <View flex={1}>
        <Text
          weight="medium"
          align="center"
          transform="uppercase"
          numberOfLines={1}
          size="sm"
          {...titleProps}>
          {title}
        </Text>
      </View>

      {showBackIcon ? <View size={Sizing[8]} /> : null}
    </View>
  );
};
