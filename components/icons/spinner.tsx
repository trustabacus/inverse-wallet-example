import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

import { View, useThemeColor } from '../themed';

import { Sizing } from '@/constants/sizing';

type SpinnerIconProps = {
  size?: number;
  borderWidth?: number;
  duration?: number;
};

const startRotationAnimation = (
  duration: number,
  rotationDegree: Animated.Value
): void => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
};

export const SpinnerIcon = (props: SpinnerIconProps) => {
  const { size = Sizing[10], borderWidth = 4, duration = 1000 } = props;

  const primaryColor = useThemeColor(
    { light: undefined, dark: undefined },
    'primary'
  );

  const altColor = useThemeColor({ light: undefined, dark: undefined }, 'dark');

  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(duration, rotationDegree);
  }, [duration, rotationDegree]);

  return (
    <View flexCenter size={size} accessibilityRole="progressbar">
      <Animated.View
        style={[
          {
            borderRadius: size / 2,
            width: '100%',
            height: '100%',
            borderWidth,
            borderLeftColor: altColor,
            borderRightColor: altColor,
            borderBottomColor: altColor,
            borderTopColor: primaryColor,
          },
          {
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};
