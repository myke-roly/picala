import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {ThemedText} from '@/components/ThemedText';
import {verifyEmail} from '@/services/auth';
import {DEEP_LINK_PATHS} from '@/constants/deepLinks';

const LinkingScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('Processing your request...');

  const handleVerifyEmail = async () => {
    try {
      setMessage('Verifying email...');
      const token = params.token as string;

      await verifyEmail(token);

      setTimeout(() => {
        router.replace('/(auth)/login?verified=true');
      }, 2000);
    } catch (error) {
      router.replace('/(auth)/invalid-magic-link');
    }
  };

  useEffect(() => {
    const handleVerification = async () => {
      const path = params.path as string;
      switch (true) {
        case path.includes(DEEP_LINK_PATHS.VERIFY_EMAIL):
          await handleVerifyEmail();
          break;
        default:
          break;
      }
    };

    handleVerification();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#3b82f6" style={styles.loader} />
        <ThemedText style={styles.title}>{message}</ThemedText>
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
