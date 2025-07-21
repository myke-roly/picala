import {StyleSheet, View} from 'react-native';
import {ThemedText, ThemedView, CustomButton} from '@/components';
import {usePersistentAuth} from '@/hooks/usePersistentAuth';
import {useRouter} from 'expo-router';

export default function TabTwoScreen() {
  const {isAuthenticated} = usePersistentAuth();
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
          <CustomButton title="Sign In to Continue" onPress={handleLogin} />
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
});
