import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import {
  useColorScheme,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
  StyleSheet,
} from 'react-native';

import { NavigationIcons } from '@/components/icons';
import { View, Text, useThemeColor } from '@/components/themed';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { Sizing } from '@/constants/sizing';
import { Spacing } from '@/constants/spacing';

export type TabParamList = 'index' | 'activities' | 'items';

const styles = StyleSheet.create({
  navigator: {
    flexDirection: 'row',
    height: Sizing[19],
    ...Platform.select({
      ios: {
        paddingTop: Spacing.sm,
        paddingBottom: Layout.isSmallDevice ? Spacing.base : Spacing.xl,
        height: Sizing[24],
      },
      android: {
        paddingBottom: Spacing.md,
      },
    }),
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTab: {
    width: Sizing[16],
    height: Sizing[16],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: -Sizing[8],
    ...Platform.select({
      ios: {
        marginTop: -Sizing[9],
      },
    }),
  },
});

const BottomTabs = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;

  const primaryColor = useThemeColor(
    { light: undefined, dark: undefined },
    'primary'
  );

  return (
    <View
      borderTop={1}
      bg="dark"
      style={{
        ...(styles.navigator as any),
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          const { name, key } = route;

          if (!isFocused && !event.defaultPrevented) {
            const preservedParams = !['Activity'].includes(name);
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ key, name, merge: preservedParams });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconColor = isFocused ? 'text' : 'iconColor';
        const textColor = isFocused ? 'text' : 'iconColor';

        const tabNames: { [key in TabParamList]: string } = {
          activities: 'Activities',
          index: 'Connect',
          items: 'Items',
        };

        const isTabConnect = route.name === 'index';

        const key = `bottom-tab-item-${index}`;

        const buttonProps: TouchableOpacityProps = {
          onPress,
          onLongPress,
          accessibilityState: isFocused ? { selected: true } : {},
          accessibilityRole: 'button',
          accessibilityLabel: options.tabBarAccessibilityLabel,
          testID: options.tabBarTestID,
          activeOpacity: 0.8,
        };

        if (isTabConnect) {
          return (
            <TouchableOpacity
              key={key}
              {...buttonProps}
              style={{
                ...styles.iconTab,
                backgroundColor: primaryColor,
              }}>
              <NavigationIcons
                iconColor="text"
                type={label as TabParamList}
                strokeWidth={3}
              />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={key} {...buttonProps} style={styles.tab}>
            <NavigationIcons
              iconColor={iconColor}
              type={label as TabParamList}
            />
            <Text size="xs" align="center" color={textColor}>
              {tabNames[route.name as TabParamList]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].iconColor,
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabs {...props} />}>
      <Tabs.Screen name="items" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="activities" />
    </Tabs>
  );
};

export default TabLayout;
