import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {ThemedText} from './ThemedText';

interface VerificationErrorHandlerProps {
  children: React.ReactNode;
}

export const VerificationErrorHandler: React.FC<VerificationErrorHandlerProps> = ({children}) => {
  const params = useLocalSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = params.error as string;
    if (errorParam) {
      setError(errorParam);

      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [params.error]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorTitle}>Verification Error</ThemedText>
        <ThemedText style={styles.errorMessage}>{getErrorMessage(error)}</ThemedText>
      </View>
    );
  }

  return <>{children}</>;
};

const getErrorMessage = (error: string): string => {
  switch (error) {
    case 'verification_failed':
      return 'Email verification failed. Please try again or request a new verification link.';
    case 'invalid_link':
      return 'The verification link is invalid or has expired. Please request a new one.';
    case 'network_error':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'An error occurred during verification. Please try again.';
  }
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fef2f2',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#7f1d1d',
    textAlign: 'center',
    lineHeight: 24,
  },
});
