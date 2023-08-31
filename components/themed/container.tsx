import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScrollView, View, useThemeColor } from './';
import { ContainerProps } from './type';

export const Container = (props: ContainerProps) => {
  const { statusBar, scrollable, lightColor, darkColor, style, ...rest } =
    props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  const renderView = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View padding="base" style={[{ flex: 1 }, style]} {...rest} />
    </TouchableWithoutFeedback>
  );

  const renderChildren = () => {
    if (scrollable) {
      return <ScrollView>{renderView()}</ScrollView>;
    }

    return renderView();
  };

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor,
          flex: 1,
          position: 'relative',
        },
      ]}>
      <StatusBar style={statusBar || 'light'} />
      {renderChildren()}
    </SafeAreaView>
  );
};
