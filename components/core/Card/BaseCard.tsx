import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

interface BaseCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
}

export function BaseCard({ children, style, padding = 'lg' }: BaseCardProps) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: Colors[colorScheme].card,
          borderColor: Colors[colorScheme].border,
          padding: typeof padding === 'string' ? Spacing[padding as keyof typeof Spacing] : (padding as any)
        } as ViewStyle,
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.borderRadius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
});
