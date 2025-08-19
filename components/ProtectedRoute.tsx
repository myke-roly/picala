import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '@/contexts/AuthContext';
import {Text} from './Text';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {loading, isAuthenticated} = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/(auth)/login');
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

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
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
