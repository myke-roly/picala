import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { Button } from '@/components/core/Button/Button';
import { BaseInput } from '@/components/core/Input/BaseInput';
import { Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { signIn } from '@/services/auth';
import { useMutation } from '@/hooks/useMutation';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ScreenContainer } from '@/components/core';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';

  const { mutate: login, loading, error } = useMutation(
    ({ email, password }: { email: string; password: string }) => signIn(email, password),
    {
      onSuccess: () => router.replace('/(tabs)'),
    }
  );

  useEffect(() => {
    if (params.verified === 'true') {
      setSuccess('Email verified successfully! You can now sign in.');
    }
  }, [params.verified]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) return;
    if (!password) return;

    login({ email, password });
  };

  return (
    <ScreenContainer withScroll style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={[
          styles.card,
          {
            backgroundColor: Colors[colorScheme].card,
            borderColor: Colors[colorScheme].border,
          }
        ]}>
          <View style={styles.header}>
            <Text
              variant="h1"
              style={[styles.title, { color: Colors.primary }]}
              weight="bold"
            >
              Picala
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: Colors[colorScheme].text.secondary }
              ]}
              weight="medium"
            >
              YOUR SPORTS BETTING COMPANION
            </Text>
            <Text
              variant="h3"
              weight="semibold"
              style={[
                styles.heading,
                { color: Colors[colorScheme].text.primary }
              ]}
            >
              Sign in to your account
            </Text>
          </View>

          <View style={styles.form}>
            <BaseInput
              label="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) validateEmail(text);
              }}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon="envelope.fill"
              error={emailError}
              required
            />

            <BaseInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              leftIcon="lock.fill"
              rightIcon={showPassword ? "eye.slash.fill" : "eye.fill"}
              onRightIconPress={() => setShowPassword(!showPassword)}
              required
            />

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText} variant="small">
                  {error}
                </Text>
              </View>
            )}

            {success && (
              <View style={styles.successContainer}>
                <Text style={styles.successText} variant="small">
                  {success}
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Button
                title="Sign in"
                onPress={handleLogin}
                loading={loading}
                variant="primary"
                size="large"
              />

              <Button
                title="Don't have an account? Sign up"
                onPress={() => router.push('/register')}
                variant="outline"
                size="large"
              />
            </View>

            <Pressable
              onPress={() => router.push('/forgot-password')}
              style={({ pressed }) => [
                styles.forgotPassword,
                pressed && { opacity: 0.7 }
              ]}
            >
              <Text
                variant="small"
                weight="medium"
                style={[
                  styles.forgotPasswordText,
                  { color: Colors[colorScheme].text.secondary }
                ]}
              >
                Forgot Password?
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xl,
    justifyContent: 'center',
    minHeight: '100%',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  card: {
    borderRadius: Spacing.borderRadius.xl,
    borderWidth: 1,
    padding: Spacing.xl * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
  },
  form: {
    gap: Spacing.sm,
  },
  buttonContainer: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.sm,
    marginBottom: Spacing.md,
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: '#DCFCE7',
    padding: Spacing.md,
    borderRadius: Spacing.borderRadius.sm,
    marginBottom: Spacing.md,
  },
  successText: {
    color: '#16A34A',
    textAlign: 'center',
  },
});

export default Login;
