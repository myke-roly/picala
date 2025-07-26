import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Text, CustomButton, CustomInput} from '@/components/';
import {resendVerificationEmail} from '@/services/auth';

const SendEmailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const {email} = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResendEmail = async () => {
    setLoading(true);
    setError('');

    try {
      await resendVerificationEmail(email as string);
    } catch (error: any) {
      console.error('Send email error:', error);
      setError(error.message || 'Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.icon}>📧</Text>

          <Text style={styles.title}>Email Sent to {email}</Text>

          <Text style={styles.message}>
            We've sent a magic link to your email address. Please check your inbox and click the link to continue.
          </Text>

          <Text style={styles.helpText}>Don't see the email? Check your spam folder or try resending.</Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <CustomButton
              loading={loading}
              fullWidth
              title="Resend Email"
              onPress={handleResendEmail}
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  icon: {
    fontSize: 25,
    marginBottom: 20,
    color: '#3b82f6',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1f2937',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    color: '#6b7280',
  },
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    color: '#9ca3af',
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
});

export default SendEmailScreen;

SendEmailScreen.options = {
  headerShown: false,
};
