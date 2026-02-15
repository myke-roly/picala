import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Form, { FormField, FormButton } from '@/components/Form';
import { signIn } from '@/services/auth';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components';
import { useMutation } from '@/hooks/useMutation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();

  const { mutate: login, loading, error } = useMutation(
    ({ email, password }: { email: string; password: string }) => signIn(email, password),
    {
      onSuccess: () => router.replace('/(tabs)'),
    }
  );

  useEffect(() => {
    if (params.verified === 'true') {
      setSuccess('Email verified successfully! You can now sign in.');
    }
  }, [params.verified]);

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

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      return;
    }

    if (!password) {
      return;
    }

    login({ email, password });
  };

  const formFields: FormField[] = [
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
      autoComplete: 'email',
      required: true,
      error: emailError,
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
      autoCapitalize: 'none',
      required: true,
    },
  ];

  const formButtons: FormButton[] = [
    {
      title: loading ? 'Signing in...' : 'Sign in',
      onPress: handleLogin,
      loading: loading,
      disabled: loading,
    },
    {
      variant: 'primary',
      title: "Don't have an account? Sign up",
      onPress: () => router.push('/register'),
      disabled: loading,
    },
    {
      variant: 'outline',
      title: "Forgot Password?",
      onPress: () => router.push('/forgot-password'),
      disabled: loading,
    }
  ];

  return (
    <Form title="Sign in to your account" fields={formFields} buttons={formButtons} error={error ?? undefined} success={success} />
  );
};

export default Login;
