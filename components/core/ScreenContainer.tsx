import React from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Spacing } from '@/constants/Spacing';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  withScroll?: boolean;
}

export function ScreenContainer({
  children,
  style,
  withScroll = false
}: ScreenContainerProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const backgroundColor = Colors[colorScheme].background;

  if (withScroll) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.innerContainer, style]}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }
      ]}
    >
      <View style={[styles.innerContainer, style]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
  },
});
