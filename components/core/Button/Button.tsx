import React from 'react';
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const isInteractionDisabled = loading || disabled;

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          button: {
            backgroundColor: Colors.primary,
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 4,
          },
          text: { color: '#FFFFFF' },
          loadingColor: '#FFFFFF',
        };
      case 'secondary':
        return {
          button: {
            backgroundColor: colorScheme === 'light' ? '#F1F5F9' : '#1E293B',
          },
          text: { color: Colors[colorScheme].text.primary },
          loadingColor: Colors.primary,
        };
      case 'outline':
        return {
          button: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Colors[colorScheme].border,
          },
          text: { color: Colors[colorScheme].text.primary },
          loadingColor: Colors.primary,
        };
      case 'ghost':
        return {
          button: { backgroundColor: 'transparent' },
          text: { color: Colors[colorScheme].text.primary },
          loadingColor: Colors.primary,
        };
      case 'danger':
        return {
          button: { backgroundColor: Colors.status.error },
          text: { color: '#FFFFFF' },
          loadingColor: '#FFFFFF',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          button: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md },
          text: { fontSize: 14 },
        };
      case 'large':
        return {
          button: { paddingVertical: Spacing.xl, paddingHorizontal: Spacing.xxl },
          text: { fontSize: 18 },
        };
      default:
        return {
          button: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing.xl },
          text: { fontSize: 16 },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={isInteractionDisabled}
      style={({ pressed }) => [
        styles.baseButton,
        variantStyles.button as ViewStyle,
        sizeStyles.button as ViewStyle,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.loadingColor} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon}
          <Text
            variant="body"
            weight="semibold"
            style={[variantStyles.text as TextStyle, sizeStyles.text as TextStyle, textStyle]}
          >
            {title}
          </Text>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: Spacing.borderRadius.lg,
    borderCurve: 'continuous',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
