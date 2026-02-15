import React, { useState } from 'react';
import Form, { FormField, FormButton } from '@/components/Form';
import { forgotPassword } from '@/services/auth';
import { useRouter } from 'expo-router';

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
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link. Please try again.');
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
  ];

  const formButtons: FormButton[] = [
    {
      title: loading ? 'Sending...' : 'Send Reset Link',
      onPress: handleSubmit,
      loading: loading,
      disabled: loading,
    },
    {
      variant: 'outline',
      title: 'Back to Login',
      onPress: () => router.back(),
      disabled: loading,
    },
  ];

  return (
    <Form title="Reset your password" fields={formFields} buttons={formButtons} error={error} success={success} />
  );
};

export default ForgotPassword;
