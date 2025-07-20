import React, {useState, ReactNode} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {ThemedText, CustomButton, CustomInput} from '@/components/';

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

export interface FormValidation {
  [key: string]: (value: string) => string | null;
}

interface FormProps {
  title: string;
  fields: FormField[];
  onSubmit: () => Promise<void>;
  submitButtonText: string;
  loadingButtonText?: string;
  error?: string;
  success?: string;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  validation?: FormValidation;
}

const Form: React.FC<FormProps> = ({
  title,
  fields,
  onSubmit,
  submitButtonText,
  loadingButtonText = 'Loading...',
  error,
  success,
  loading = false,
  disabled = false,
  children,
  validation,
}) => {
  const handleSubmit = async () => {
    await onSubmit();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>

          <View style={styles.inputContainer}>
            {fields.map((field) => (
              <CustomInput
                key={field.key}
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

          {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}
          {success ? <ThemedText style={styles.successText}>{success}</ThemedText> : null}

          <CustomButton
            title={loading ? loadingButtonText : submitButtonText}
            onPress={handleSubmit}
            loading={loading}
            disabled={disabled || loading}
          />

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
