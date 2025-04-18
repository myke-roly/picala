import { StyleSheet, Button, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Picala</ThemedText>
      <View>
        <Link href="/login" asChild>
          <Button title="Login" />
        </Link>
      </View>
    </ThemedView>
  );
}

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
});

export default HomeScreen;
