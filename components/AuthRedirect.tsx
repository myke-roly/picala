import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '@/contexts/AuthContext';
import {Text} from './Text';

export const AuthRedirect: React.FC = () => {
  const {user, loading, isAuthenticated} = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
  },
});
