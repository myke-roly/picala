import {StyleSheet, Button, View} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useAuth} from '@/contexts/AuthContext';
import {signOutUser} from '@/services/auth';
import {useRouter} from 'expo-router';
import {CustomButton} from '@/components';

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
          <CustomButton title="Sign Out" variant="danger" onPress={handleLogout} />
        </>
      ) : (
        <View style={styles.authContainer}>
          <ThemedText style={styles.authMessage}>Sign in to access all features</ThemedText>
          <CustomButton title="Sign In" onPress={handleLogin} />
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
});

export default HomeScreen;
