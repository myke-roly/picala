import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {ThemedText} from '@/components/ThemedText';
import {BackgroundColors, TextColors, AccentColors} from '@/constants/Colors';

export default function ExploreScreen() {
  const router = useRouter();

  const handleMatchPress = () => {
    router.push('/match');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Explore</ThemedText>
          <ThemedText style={styles.subtitle}>Discover new matches and events</ThemedText>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.sectionTitle}>Featured Matches</ThemedText>
          <TouchableOpacity style={styles.featuredCard} onPress={handleMatchPress}>
            <ThemedText style={styles.cardTitle}>Barcelona vs Real Madrid</ThemedText>
            <ThemedText style={styles.cardSubtitle}>El Clásico - This Weekend</ThemedText>
            <View style={styles.cardDetails}>
              <ThemedText style={styles.detailText}>📍 Camp Nou</ThemedText>
              <ThemedText style={styles.detailText}>🕐 20:00</ThemedText>
              <ThemedText style={styles.detailText}>📅 Saturday, April 15</ThemedText>
            </View>
          </TouchableOpacity>

          <ThemedText style={styles.sectionTitle}>Nearby Events</ThemedText>
          <View style={styles.eventCard}>
            <ThemedText style={styles.cardTitle}>Local Tournament</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Community Soccer League</ThemedText>
            <View style={styles.cardDetails}>
              <ThemedText style={styles.detailText}>📍 Central Park</ThemedText>
              <ThemedText style={styles.detailText}>🕐 14:00</ThemedText>
              <ThemedText style={styles.detailText}>📅 Sunday, April 16</ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.primary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: TextColors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: TextColors.secondary,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: TextColors.primary,
    marginBottom: 16,
    marginTop: 24,
  },
  featuredCard: {
    backgroundColor: BackgroundColors.secondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: AccentColors.primary,
  },
  eventCard: {
    backgroundColor: BackgroundColors.secondary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TextColors.primary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: TextColors.secondary,
    marginBottom: 12,
  },
  cardDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: TextColors.secondary,
  },
});
