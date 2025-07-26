import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text} from './Text';

interface AuthLoadingScreenProps {
  message?: string;
}

export const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({message = 'Loading...'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
});
