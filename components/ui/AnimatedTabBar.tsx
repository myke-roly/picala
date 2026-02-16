import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Text } from '@/components/Text';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const tabWidth = SCREEN_WIDTH / state.routes.length;
  const indicatorPosition = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    indicatorPosition.value = withSpring(state.index * tabWidth, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index, tabWidth]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
    width: tabWidth,
  }));

  return (
    <View style={[
      styles.container,
      {
        paddingBottom: Math.max(insets.bottom, 16),
        backgroundColor: Colors[colorScheme].surface,
        borderTopColor: Colors[colorScheme].border,
      }
    ]}>
      <View style={StyleSheet.absoluteFill} />

      <AnimatedIndicator style={animatedIndicatorStyle} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = getTabIcon(route.name);

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <TabIcon
              name={iconName}
              focused={isFocused}
              color={isFocused ? Colors.primary : Colors[colorScheme].text.secondary}
            />
            <Text
              variant="small"
              weight={isFocused ? 'semibold' : 'medium'}
              style={{
                marginTop: 4,
                color: isFocused ? Colors.primary : Colors[colorScheme].text.secondary,
              }}
            >
              {label as string}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function AnimatedIndicator({ style }: { style: any }) {
  return (
    <View style={[styles.indicatorWrapper, style]}>
      <View style={styles.indicator} />
    </View>
  );
}

function TabIcon({ name, focused, color }: { name: string; focused: boolean; color: string }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.1 : 1, { duration: 200 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={animatedStyle}>
      <IconSymbol size={24} name={name as any} color={color} />
    </View>
  );
}

function getTabIcon(routeName: string): string {
  const icons: Record<string, string> = {
    index: 'house.fill',
    explore: 'paperplane.fill',
    matches: 'sportscourt.fill',
    messages: 'message.fill',
    profile: 'person.fill',
  };
  return icons[routeName] || 'circle.fill';
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    height: 85,
    paddingTop: 8,
  },
  indicatorWrapper: {
    position: 'absolute',
    top: -1,
    alignItems: 'center',
  },
  indicator: {
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
