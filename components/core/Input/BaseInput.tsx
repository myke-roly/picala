import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Pressable
} from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export interface BaseInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  required?: boolean;
}

export const BaseInput = forwardRef<TextInput, BaseInputProps>(({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  required,
  ...props
}, ref) => {
  const colorScheme = useColorScheme() ?? 'light';
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          variant="small"
          weight="medium"
          style={[styles.label, { color: Colors[colorScheme].text.secondary }]}
        >
          {label}
          {required && <Text style={{ color: Colors.status.error }}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: Colors[colorScheme].input,
            borderColor: error
              ? Colors.status.error
              : isFocused
                ? Colors.primary
                : Colors[colorScheme].border
          }
        ]}
      >
        {leftIcon && (
          <View style={styles.iconLeft}>
            <IconSymbol name={leftIcon as any} size={20} color={Colors[colorScheme].text.secondary} />
          </View>
        )}

        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text.primary,
              fontFamily: Typography.fontFamily.regular
            }
          ]}
          placeholderTextColor={Colors[colorScheme].text.secondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <Pressable onPress={onRightIconPress} style={styles.iconRight}>
            <IconSymbol name={rightIcon as any} size={20} color={Colors[colorScheme].text.secondary} />
          </Pressable>
        )}
      </View>

      {error && (
        <Text variant="small" style={{ color: Colors.status.error, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
});

BaseInput.displayName = 'BaseInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
  label: {
    marginBottom: Spacing.xs,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.borderRadius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
    height: 52,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  iconLeft: {
    // Gap handles the spacing now
  },
  iconRight: {
    // Gap handles the spacing now
  },
});
