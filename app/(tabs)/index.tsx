import {StyleSheet, Button, View, TouchableOpacity} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useAuth} from '@/contexts/AuthContext';
import {signOutUser} from '@/services/auth';
import {useRouter} from 'expo-router';

const HomeScreen = () => {
  const {user, isAuthenticated} = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to Picala</ThemedText>

      {isAuthenticated ? (
        <>
          <View style={styles.userInfo}>
            <ThemedText style={styles.userEmail}>{user?.email}</ThemedText>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutButtonText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.authContainer}>
          <ThemedText style={styles.authMessage}>Sign in to access all features</ThemedText>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  userInfo: {
    marginVertical: 20,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  authContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  authMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
