import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

interface PasswordStrengthIndicatorProps {
  password: string;
}

type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong';

const getPasswordStrength = (password: string): { level: StrengthLevel; score: number } => {
  let score = 0;

  if (!password) {
    return { level: 'weak', score: 0 };
  }

  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

  if (score <= 1) return { level: 'weak', score };
  if (score <= 2) return { level: 'fair', score };
  if (score <= 3) return { level: 'good', score };
  return { level: 'strong', score };
};

const getStrengthColor = (level: StrengthLevel): string => {
  switch (level) {
    case 'weak':
      return Colors.status.error;
    case 'fair':
      return Colors.status.warning;
    case 'good':
      return Colors.status.success;
    case 'strong':
      return Colors.status.win;
    default:
      return '#E2E8F0';
  }
};

const getStrengthText = (level: StrengthLevel): string => {
  switch (level) {
    case 'weak':
      return 'Weak';
    case 'fair':
      return 'Fair';
    case 'good':
      return 'Good';
    case 'strong':
      return 'Strong';
    default:
      return '';
  }
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const { level, score } = getPasswordStrength(password);
  const color = getStrengthColor(level);
  const text = getStrengthText(level);
  const maxScore = 5;
  const percentage = (score / maxScore) * 100;

  if (!password) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text variant="small" weight="medium" style={{ color }}>
        Password strength: {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -8,
    marginBottom: 16,
  },
  barContainer: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  bar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default PasswordStrengthIndicator;
