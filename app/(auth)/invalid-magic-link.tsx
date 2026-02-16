import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { Button, ScreenContainer, BaseCard } from '@/components/core';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { IconSymbol } from '@/components/ui/IconSymbol';

const InvalidMagicLinkScreen = () => {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.replace('/(auth)/login');
  };

  const handleGoToRegister = () => {
    router.replace('/(auth)/register');
  };

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconSymbol name="link.badge.plus" size={48} color={Colors.status.error} />
        </View>

        <Text variant="h1" center style={styles.title}>Invalid Link</Text>

        <Text variant="body" center opacity={0.7} style={styles.message}>
          The magic link you used is invalid or has expired. This can happen for several reasons:
        </Text>

        <BaseCard style={styles.reasonsCard} padding="lg">
          <ReasonItem text="The link has expired" />
          <ReasonItem text="The link was already used" />
          <ReasonItem text="The link was modified" />
          <ReasonItem text="You're using an older link" />
        </BaseCard>

        <Text variant="caption" center opacity={0.5} style={styles.helpText}>
          Please request a new magic link or try logging in with your password.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            title="Back to Login"
            onPress={handleGoToLogin}
          />
          <Button
            variant="secondary"
            title="Create Account"
            onPress={handleGoToRegister}
            style={{ marginTop: Spacing.md }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const ReasonItem = ({ text }: { text: string }) => (
  <View style={styles.reasonItem}>
    <IconSymbol name="xmark.circle.fill" size={16} color={Colors.status.error} />
    <Text variant="body" style={styles.reasonText}>{text}</Text>
  </View>
);

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
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    marginBottom: Spacing.md,
    color: Colors.status.error,
  },
  message: {
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  reasonsCard: {
    width: '100%',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonText: {
    marginLeft: 12,
  },
  helpText: {
    marginBottom: Spacing.xxl,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default InvalidMagicLinkScreen;

InvalidMagicLinkScreen.options = {
  headerShown: false,
};
