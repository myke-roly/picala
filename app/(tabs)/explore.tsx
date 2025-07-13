import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ThemedText, ThemedView} from '@/components';
import {useAuth} from '@/contexts/AuthContext';
import {useRouter} from 'expo-router';

export default function TabTwoScreen() {
  const {isAuthenticated} = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      {isAuthenticated ? (
        <View style={styles.content}>
          <ThemedText>This app includes example code to help you get started.</ThemedText>
          <ThemedText style={styles.featureText}>🎉 You have access to all features!</ThemedText>
        </View>
      ) : (
        <View style={styles.authPrompt}>
          <ThemedText style={styles.authMessage}>Sign in to explore all features and content</ThemedText>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <ThemedText style={styles.loginButtonText}>Sign In to Continue</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#4f46e5',
  },
  authPrompt: {
    flex: 1,
    justifyContent: 'center',
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
