import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface AuthLogoProps {
  size?: 'small' | 'medium' | 'large';
}

const AuthLogo: React.FC<AuthLogoProps> = ({ size = 'medium' }) => {
  const fontSize = size === 'small' ? 24 : size === 'large' ? 40 : 32;
  const subtitleSize = size === 'small' ? 10 : size === 'large' ? 16 : 12;

  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { fontSize }]}>Picala</Text>
      <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>Your Sports Betting Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontWeight: 'bold',
    color: '#1c434e',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#a58266',
    marginTop: 4,
    fontWeight: '500',
  },
});

export default AuthLogo;
