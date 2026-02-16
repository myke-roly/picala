import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '@/services/auth';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { Text } from '@/components/Text';
import { ScreenContainer } from '@/components/core';
import Form from '@/components/Form';
import { Spacing } from '@/constants/Spacing';
import { Colors } from '@/constants/Colors';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

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

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    if (!validateEmail(email)) {
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(email, password);

      if (result.requiresEmailConfirmation) {
        router.push({
          pathname: '/(auth)/send-email',
          params: { email },
        });
      } else {
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Form
        title="Join Picala"
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
            placeholder: 'Create a password',
            value: password,
            onChangeText: setPassword,
            secureTextEntry: !showPassword,
            autoCapitalize: 'none',
            leftIcon: 'lock.fill',
            autoComplete: 'password-new',
            renderAfter: <PasswordStrengthIndicator password={password} />,
            rightIcon: showPassword ? "eye.slash.fill" : "eye.fill",
            onRightIconPress: () => setShowPassword(!showPassword),
          },
          {
            key: 'confirmPassword',
            label: 'Confirm Password',
            placeholder: 'Confirm your password',
            value: confirmPassword,
            onChangeText: setConfirmPassword,
            secureTextEntry: !showConfirmPassword,
            autoCapitalize: 'none',
            leftIcon: 'lock.fill',
            autoComplete: 'password-new',
            rightIcon: showConfirmPassword ? "eye.slash.fill" : "eye.fill",
            onRightIconPress: () => setShowConfirmPassword(!showConfirmPassword),
          },
        ]}
        buttons={[
          {
            title: 'Create Account',
            onPress: handleRegister,
            variant: 'primary',
            loading: loading,
          },
        ]}
        error={error}
      >
        <View style={styles.header}>
          <Text variant="body" opacity={0.7} style={styles.subtitle}>
            Create an account to start playing and finding matches
          </Text>
        </View>

        <View style={styles.footer}>
          <Text variant="body">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text variant="link" weight="semibold" style={styles.loginLink}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  loginLink: {
    color: Colors.primary,
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

export default Register;
