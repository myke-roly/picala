import React, {useState, useEffect} from 'react';
import Form, {FormField, FormButton} from '@/components/Form';
import {signIn} from '@/services/auth';
import {useRouter, useLocalSearchParams} from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  // Check if user just verified their email
  useEffect(() => {
    if (params.verified === 'true') {
      setSuccess('Email verified successfully! You can now sign in.');
    }
  }, [params.verified]);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      // Navigate to the main app after successful login
      router.replace('/(tabs)');
    } catch (err: any) {
      console.log(err);
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
      onChangeText: setEmail,
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoComplete: 'email',
      required: true,
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
      onPress: handleSubmit,
      loading: loading,
      disabled: loading,
    },
    {
      variant: 'primary',
      title: "Don't have an account? Sign up",
      onPress: () => router.push('/register'),
      disabled: loading,
    },
  ];

  return (
    <Form title="Sign in to your account" fields={formFields} buttons={formButtons} error={error} success={success} />
  );
};

export default Login;
