import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Form, { FormField, FormButton } from '@/components/Form';
import { signIn } from '@/services/auth';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();

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
    setError('');
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
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
    <Form title="Sign in to your account" fields={formFields} buttons={formButtons} error={error} success={success} />
  );
};

export default Login;
