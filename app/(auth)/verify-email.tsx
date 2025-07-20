import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {ThemeLinkText} from '@/components/';
import Form, {FormField} from '@/components/Form';
import {resendVerificationEmail, verifyEmail} from '@/services/auth';
import {useRouter, useLocalSearchParams} from 'expo-router';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  // Extract token from URL params if available
  useEffect(() => {
    if (params.token) {
      setToken(params.token as string);
    }
    if (params.email) {
      setEmail(params.email as string);
    }
  }, [params]);

  const handleVerifyEmail = async () => {
    if (!token) {
      setError('Please enter the verification token');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await verifyEmail(token);
      setSuccess('Email verified successfully!');
      // Navigate to login after a short delay
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 2000);
    } catch (err: any) {
      console.log('Verification error:', err);
      setError(err.message || 'Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setError('');
    setResendLoading(true);

    try {
      const result = await resendVerificationEmail(email);
      setSuccess(result.message);
    } catch (err: any) {
      console.log('Resend error:', err);
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setResendLoading(false);
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
    },
    {
      key: 'token',
      label: 'Verification Token (Optional)',
      placeholder: 'Enter verification token from email',
      value: token,
      onChangeText: setToken,
      autoCapitalize: 'none',
    },
  ];

  return (
    <Form
      title="Verify Your Email"
      fields={formFields}
      onSubmit={handleVerifyEmail}
      submitButtonText="Verify Email"
      loadingButtonText="Verifying..."
      error={error}
      success={success}
      loading={loading}
    >
      <ThemeLinkText center onPress={handleResendEmail}>
        Didn't receive the email? Resend verification
      </ThemeLinkText>
      <ThemeLinkText center onPress={() => router.back()}>
        Back to Login
      </ThemeLinkText>
    </Form>
  );
};

export default VerifyEmail;
