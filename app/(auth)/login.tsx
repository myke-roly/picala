import React, {useState, useEffect} from 'react';
import {ThemeLinkText} from '@/components/';
import Form, {FormField} from '@/components/Form';
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
  }, [params]);

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

  return (
    <Form
      title="Sign in to your account"
      fields={formFields}
      onSubmit={handleSubmit}
      submitButtonText="Sign in"
      loadingButtonText="Signing in..."
      error={error}
      success={success}
      loading={loading}
    >
      <ThemeLinkText center href="/register">
        Don't have an account? Sign up
      </ThemeLinkText>
    </Form>
  );
};

export default Login;
