import { StyleSheet, View } from 'react-native';
import { ThemedText, ThemedView } from '@/components';

export default function TabTwoScreen() {
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
