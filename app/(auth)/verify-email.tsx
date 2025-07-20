import React, {useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import {ThemedText, ThemeLinkText, CustomInput, CustomButton} from '@/components/';
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            Verify Your Email
          </ThemedText>

          <ThemedText style={styles.description}>
            We've sent a verification link to your email address. Please check your inbox and click the link to verify
            your account.
          </ThemedText>

          <View style={styles.inputContainer}>
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <CustomInput
              label="Verification Token (Optional)"
              placeholder="Enter verification token from email"
              value={token}
              onChangeText={setToken}
              autoCapitalize="none"
            />
          </View>

          {error ? <ThemedText style={styles.errorText}>{error}</ThemedText> : null}
          {success ? <ThemedText style={styles.successText}>{success}</ThemedText> : null}

          <CustomButton
            title={loading ? 'Verifying...' : 'Verify Email'}
            onPress={handleVerifyEmail}
            loading={loading}
            disabled={loading}
          />

          <View style={styles.divider} />

          <ThemedText style={styles.resendText}>Didn't receive the email?</ThemedText>

          <CustomButton
            title={resendLoading ? 'Sending...' : 'Resend Verification Email'}
            onPress={handleResendEmail}
            loading={resendLoading}
            disabled={resendLoading}
            variant="secondary"
          />

          <ThemeLinkText center onPress={() => router.back()}>
            Back to Login
          </ThemeLinkText>
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
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#6b7280',
    lineHeight: 20,
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
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
  },
  resendText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#6b7280',
  },
});

export default VerifyEmail;
