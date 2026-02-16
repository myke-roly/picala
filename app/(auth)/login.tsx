import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '@/components/Text';
import { Button, BaseInput, ScreenContainer } from '@/components/core';
import Form from '@/components/Form';
import { Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';
import { signIn } from '@/services/auth';
import { useMutation } from '@/hooks/useMutation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

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
    <ScreenContainer>
      <Form
        title="Picala"
        fields={[
          {
            key: 'email',
            label: 'Email Address',
            placeholder: 'Enter your email',
            value: email,
            onChangeText: (text: string) => {
              setEmail(text);
              if (emailError) validateEmail(text);
            },
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            leftIcon: 'envelope.fill',
            error: emailError,
            autoComplete: 'email',
          },
          {
            key: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            value: password,
            onChangeText: setPassword,
            secureTextEntry: !showPassword,
            autoCapitalize: 'none',
            leftIcon: 'lock.fill',
            autoComplete: 'password',
            renderAfter: (
              <TouchableOpacity
                onPress={() => router.push('/forgot-password')}
                style={styles.forgotPassword}
              >
                <Text variant="link" weight="medium" style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            ),
          },
        ]}
        buttons={[
          {
            title: 'Sign In',
            onPress: handleLogin,
            variant: 'primary',
            loading: loading,
          },
        ]}
        success={success}
        error={error || undefined}
      >
        <View style={styles.header}>
          <Text variant="body" opacity={0.7} style={styles.subtitle}>
            Sign in to find and join matches around you
          </Text>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text variant="caption" style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          variant="secondary"
          title="Create Account"
          onPress={() => router.push('/register')}
          style={styles.button}
        />
      </Form>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 40,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xxl,
  },
  forgotPasswordText: {
    color: Colors.primary,
  },
  button: {
    marginBottom: Spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: '#94A3B8',
  },
  successContainer: {
    backgroundColor: '#DCFCE7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  successText: {
    color: '#166534',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#991B1B',
  },
});

export default Login;
