import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';
import {useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {StyleSheet, View, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import {Colors} from '@/constants/Colors';

const TAB_WIDTH = 100;

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const indicatorPosition = useSharedValue(state.index * TAB_WIDTH);

  useEffect(() => {
    indicatorPosition.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateX: indicatorPosition.value}],
  }));

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <BlurView
        tint="dark"
        intensity={90}
        style={StyleSheet.absoluteFill}
      />
      
      <AnimatedIndicator style={animatedIndicatorStyle} />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
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
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <TabIcon 
              name={iconName} 
              focused={isFocused} 
              color={isFocused ? Colors.tabBar.active : Colors.tabBar.inactive}
            />
            <TabLabel focused={isFocused} label={label as string} />
          </Pressable>
        );
      })}
    </View>
  );
}

function AnimatedIndicator({style}: {style: any}) {
  return (
    <View style={[styles.indicatorContainer, style]}>
      <View style={styles.indicator}>
        <View style={styles.indicatorGlow} />
      </View>
    </View>
  );
}

function TabIcon({name, focused, color}: {name: string; focused: boolean; color: string}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(focused ? 1.15 : 1, {duration: 200});
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <AnimatedIcon name={name} color={color} style={animatedStyle} />
  );
}

import {IconSymbol} from '@/components/ui/IconSymbol';
import {Text} from '@/components/Text';

function AnimatedIcon({name, color, style}: {name: string; color: string; style?: any}) {
  return (
    <View style={style}>
      <IconSymbol size={24} name={name as any} color={color} />
    </View>
  );
}

function TabLabel({focused, label}: {focused: boolean; label: string}) {
  return (
    <View style={styles.labelContainer}>
      <AnimatedLabel focused={focused} label={label} />
    </View>
  );
}

function AnimatedLabel({focused, label}: {focused: boolean; label: string}) {
  const opacity = useSharedValue(focused ? 1 : 0.7);
  const translateY = useSharedValue(focused ? 0 : 5);

  useEffect(() => {
    opacity.value = withTiming(focused ? 1 : 0.6, {duration: 200});
    translateY.value = withTiming(focused ? 0 : 3, {duration: 200});
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return (
    <AnimatedText style={animatedStyle} focused={focused}>
      {label}
    </AnimatedText>
  );
}

function AnimatedText({children, focused, style}: {children: string; focused: boolean; style?: any}) {
  return (
    <View style={style}>
      <Text
        style={[
          styles.label,
          {color: focused ? Colors.tabBar.active : Colors.tabBar.inactive},
        ]}
      >
        {children}
      </Text>
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
    backgroundColor: Colors.tabBar.background,
    borderTopWidth: 0,
    paddingTop: 8,
    height: 85,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 0,
    width: TAB_WIDTH,
    alignItems: 'center',
  },
  indicator: {
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.tabBar.active,
  },
  indicatorGlow: {
    position: 'absolute',
    top: -5,
    left: -10,
    right: -10,
    bottom: -5,
    backgroundColor: Colors.tabBar.active,
    opacity: 0.3,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  labelContainer: {
    marginTop: 4,
    height: 16,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
