import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Form, { FormField, FormButton } from '@/components/Form';
import { signUp } from '@/services/auth';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password);

      if (result.requiresEmailConfirmation) {
        router.push({
          pathname: '/(auth)/send-email',
          params: { email },
        });
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again.');
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
    {
      key: 'confirmPassword',
      label: 'Confirm Password',
      placeholder: 'Confirm your password',
      value: confirmPassword,
      onChangeText: setConfirmPassword,
      secureTextEntry: true,
      autoCapitalize: 'none',
      required: true,
    },
  ];

  const formButtons: FormButton[] = [
    {
      title: loading ? 'Creating Account...' : 'Create Account',
      onPress: handleRegister,
      loading: loading,
      disabled: loading,
    },
    {
      variant: 'outline',
      title: 'Already have an account? Sign in',
      onPress: () => router.back(),
      disabled: loading,
    },
  ];

  return (
    <Form title="Create your account" fields={formFields} buttons={formButtons} error={error}>
      <PasswordStrengthIndicator password={password} />
    </Form>
  );
};

export default Register;
