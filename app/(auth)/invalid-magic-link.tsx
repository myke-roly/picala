import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {useRouter} from 'expo-router';
import {ThemedText, CustomButton} from '@/components/';

const InvalidMagicLinkScreen = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.replace('/(auth)/login');
  };

  const handleGoToRegister = () => {
    router.replace('/(auth)/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <ThemedText style={styles.icon}>🔗</ThemedText>

          <ThemedText style={styles.title}>Invalid Magic Link</ThemedText>

          <ThemedText style={styles.message}>
            The magic link you used is invalid or has expired. This can happen if:
          </ThemedText>

          <View style={styles.reasonsContainer}>
            <ThemedText style={styles.reason}>• The link has expired</ThemedText>
            <ThemedText style={styles.reason}>• The link was already used</ThemedText>
            <ThemedText style={styles.reason}>• The link was modified</ThemedText>
            <ThemedText style={styles.reason}>• You're using an old link</ThemedText>
          </View>

          <ThemedText style={styles.helpText}>
            Please request a new magic link or try logging in with your credentials.
          </ThemedText>

          <View style={styles.buttonContainer}>
            <CustomButton
              fullWidth
              title="Go to Login"
              onPress={handleGoToLogin}
              variant="primary"
              style={styles.button}
            />

            <CustomButton
              fullWidth
              title="Create Account"
              onPress={handleGoToRegister}
              variant="outline"
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
  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  icon: {
    fontSize: 20,
    marginBottom: 20,
    color: '#ef4444',
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
    marginBottom: 20,
    color: '#6b7280',
  },
  reasonsContainer: {
    alignSelf: 'stretch',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  reason: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#6b7280',
    textAlign: 'left',
  },
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    color: '#9ca3af',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
});

export default InvalidMagicLinkScreen;

InvalidMagicLinkScreen.options = {
  headerShown: false,
};
