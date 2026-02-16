import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { Button, ScreenContainer } from '@/components/core';
import { resendVerificationEmail } from '@/services/auth';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { IconSymbol } from '@/components/ui/IconSymbol';

const SendEmailScreen = () => {
  const params = useLocalSearchParams();
  const { email } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');

    try {
      await resendVerificationEmail(email as string);
      Alert.alert('Email Sent', 'We have resent the verification email.');
    } catch (error: any) {
      setError(error.message || 'Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconSymbol name="envelope.badge.fill" size={48} color={Colors.primary} />
        </View>

        <Text variant="h1" center style={styles.title}>Check your email</Text>

        <Text variant="body" center opacity={0.7} style={styles.message}>
          We've sent a magic link to <Text weight="bold" style={{ color: Colors.primary }}>{email}</Text>.
          Click the link in the email to verify your account and continue.
        </Text>

        <Text variant="caption" center opacity={0.5} style={styles.helpText}>
          Don't see the email? Check your spam folder or try resending.
        </Text>

        {error ? (
          <View style={styles.errorContainer}>
            <Text variant="small" style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            title="Resend Email"
            onPress={handleResendEmail}
            loading={loading}
          />
          <Button
            variant="secondary"
            title="Back to Login"
            onPress={() => router.replace('/(auth)/login')}
            style={{ marginTop: Spacing.md }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FCE7F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.md,
    color: Colors.primary,
  },
  message: {
    marginVertical: Spacing.lg,
    lineHeight: 24,
  },
  helpText: {
    marginBottom: Spacing.xxl,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: '#991B1B',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.xl,
  },
});

export default SendEmailScreen;
