import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { exchangeCodeForSession, setSession, verifyOtp } from '@/services/auth';

const LinkingScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('Processing your request...');

  const handleVerifyEmail = async () => {
    try {
      setMessage('Verifying email...');
      const { token, code, access_token, refresh_token } = params;

      if (code) {
        await exchangeCodeForSession(code as string);
      } else if (access_token && refresh_token) {
        await setSession(access_token as string, refresh_token as string);
      } else if (token) {
        await verifyOtp(token as string);
      } else {
        throw new Error('No verification token or code found.');
      }

      setTimeout(() => {
        router.replace('/(auth)/login?verified=true');
      }, 1000);
    } catch (error) {
      // console.error('Link verification error:', error);
      router.replace('/(auth)/invalid-magic-link');
    }
  };

  useEffect(() => {
    const handleVerification = async () => {
      // Check if we have any relevant auth parameters
      if (params.code || params.token || (params.access_token && params.refresh_token)) {
        await handleVerifyEmail();
      }
    };

    handleVerification();
  }, [params, handleVerifyEmail]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
        <Text style={styles.title}>{message}</Text>
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
  loader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LinkingScreen;
