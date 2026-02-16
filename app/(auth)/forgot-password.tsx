import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { forgotPassword } from '@/services/auth';
import { Text } from '@/components/Text';
import { Button, BaseInput, ScreenContainer } from '@/components/core';
import Form from '@/components/Form';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);

    try {
      const result = await forgotPassword(email);
      setSuccess(result.message);
      Alert.alert('Link Sent', result.message);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Form
        title="Reset Password"
        subtitle="Enter your email and we'll send you a link to reset your password."
        fields={[
          {
            key: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            value: email,
            onChangeText: (text: string) => {
              setEmail(text);
              if (emailError) validateEmail(text);
            },
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            leftIcon: 'envelope.fill',
            error: emailError,
            autoComplete: 'email',
          },
        ]}
        buttons={[
          {
            title: 'Send Reset Link',
            onPress: handleSubmit,
            variant: 'primary',
            loading: loading,
          },
          {
            title: 'Back to Login',
            onPress: () => router.back(),
            variant: 'secondary',
            disabled: loading,
          },
        ]}
        success={success}
        error={error}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
  },
  errorText: {
    color: '#991B1B',
  },
  successContainer: {
    backgroundColor: '#DCFCE7',
  },
  successText: {
    color: '#166534',
  },
});

export default ForgotPassword;
