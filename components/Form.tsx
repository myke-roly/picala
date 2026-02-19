import React, { ReactNode, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from '@/components/Text';
import { Button } from '@/components/core/Button/Button';
import { BaseInput } from '@/components/core/Input/BaseInput';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useColorScheme } from '@/hooks/useColorScheme';

export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'password' | 'password-new' | 'name' | 'tel' | 'url' | 'off';
  required?: boolean;
  multiline?: boolean;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  renderAfter?: ReactNode;
}

export interface FormButton {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

export interface FormValidation {
  [key: string]: (value: string) => string | null;
}

interface FormProps {
  title: string;
  subtitle?: string;
  fields: FormField[];
  buttons: FormButton[];
  error?: string;
  success?: string;
  children?: ReactNode;
  validation?: FormValidation;
}

const Form: React.FC<FormProps> = ({ title, subtitle, fields, buttons, error, success, children }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const firstInputRef = useRef<TextInput>(null);

  // Auto-focus on first input when component mounts
  useEffect(() => {
    if (fields.length > 0 && firstInputRef.current) {
      // Small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [fields.length]);

  return (
    <View
      style={[
        styles.formContainer,
        { backgroundColor: Colors[colorScheme].surface }
      ]}
    >
      <Text variant="h2" weight="bold" style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text variant="body" style={{ textAlign: 'center', marginBottom: Spacing.lg, opacity: 0.7 }}>
          {subtitle}
        </Text>
      )}

      <View style={styles.inputContainer}>
        {fields.map((field, index) => (
          <React.Fragment key={field.key}>
            <BaseInput
              key={field.key}
              ref={index === 0 ? firstInputRef : null}
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              onChangeText={field.onChangeText}
              secureTextEntry={field.secureTextEntry}
              keyboardType={field.keyboardType}
              autoCapitalize={field.autoCapitalize}
              autoComplete={field.autoComplete}
              required={field.required}
              multiline={field.multiline}
              leftIcon={field.leftIcon}
              rightIcon={field.rightIcon}
              onRightIconPress={field.onRightIconPress}
              error={field.error}
            />
            {field.renderAfter}
          </React.Fragment>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            title={button.title}
            onPress={button.onPress}
            variant={button.variant || 'primary'}
            loading={button.loading}
            disabled={button.disabled}
            fullWidth
          />
        ))}
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
  },
  formContainer: {
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    borderRadius: Spacing.borderRadius.lg,
    borderCurve: 'continuous',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spacing.xxl,
    color: Colors.primary,
  },
  inputContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  buttonContainer: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  errorText: {
    color: Colors.status.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
    fontSize: 14,
    fontWeight: '500',
  },
  successText: {
    color: Colors.status.success,
    textAlign: 'center',
    marginBottom: Spacing.md,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Form;
