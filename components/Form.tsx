import React, {ReactNode, useRef, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput} from 'react-native';
import {Text, CustomButton, CustomInput} from '@/components';

export interface FormField {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'password' | 'name' | 'tel' | 'url' | 'off';
  required?: boolean;
  multiline?: boolean;
}

export interface FormButton {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

export interface FormValidation {
  [key: string]: (value: string) => string | null;
}

interface FormProps {
  title: string;
  fields: FormField[];
  buttons: FormButton[];
  error?: string;
  success?: string;
  children?: ReactNode;
  validation?: FormValidation;
}

const Form: React.FC<FormProps> = ({title, fields, buttons, error, success, children}) => {
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text variant="title" style={styles.title}>
            {title}
          </Text>

          <View style={styles.inputContainer}>
            {fields.map((field, index) => (
              <CustomInput
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
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <CustomButton
                key={index}
                title={button.title}
                onPress={button.onPress}
                variant={button.variant}
                loading={button.loading}
                disabled={button.disabled}
              />
            ))}
          </View>

          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Form;
