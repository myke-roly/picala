import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {ThemedText} from '@/components/ThemedText';
import {verifyEmail} from '@/services/auth';

const VerifyEmailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const token = params.token as string;
        const type = params.type as string;

        console.log('Verification params:', {token: !!token, type});

        if (!token || type !== 'signup') {
          setStatus('error');
          setMessage('Invalid verification link. Please check your email for the correct link.');
          return;
        }

        console.log('Verifying email with token...');
        await verifyEmail(token);

        console.log('Email verified successfully!');
        setStatus('success');
        setMessage('Email verified successfully! Redirecting to login...');

        // Redirect to login after a short delay
        setTimeout(() => {
          router.replace('/(auth)/login?verified=true');
        }, 2000);
      } catch (error: any) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to verify email. Please try again.');
      }
    };

    handleVerification();
  }, [params.token, params.type, router]);

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#3b82f6';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⏳';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={[styles.icon, {color: getStatusColor()}]}>{getStatusIcon()}</ThemedText>

        <ThemedText style={styles.title}>
          {status === 'loading' && 'Verifying Email'}
          {status === 'success' && 'Email Verified'}
          {status === 'error' && 'Verification Failed'}
        </ThemedText>

        <ThemedText style={styles.message}>{message}</ThemedText>

        {status === 'error' && (
          <ThemedText style={styles.helpText}>
            If you continue to have issues, please contact support or try requesting a new verification email.
          </ThemedText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    color: '#6b7280',
  },
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: '#9ca3af',
  },
});

export default VerifyEmailScreen;
