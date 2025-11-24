import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components';
import { BackgroundColors, TextColors, AccentColors } from '@/constants';

export default function ExploreScreen() {
  const router = useRouter();

  const handleMatchPress = () => {
    router.push('/match');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover new matches and events</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Featured Matches</Text>
          <TouchableOpacity style={styles.featuredCard} onPress={handleMatchPress}>
            <Text variant="title">Barcelona vs Real Madrid</Text>
            <Text>El Clásico - This Weekend</Text>
            <View style={styles.cardDetails}>
              <Text>📍 Camp Nou</Text>
              <Text>🕐 20:00</Text>
              <Text>📅 Saturday, April 15</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Nearby Events</Text>
          <View style={styles.eventCard}>
            <Text variant="title">Local Tournament</Text>
            <Text>Community Soccer League</Text>
            <View style={styles.cardDetails}>
              <Text>📍 Central Park</Text>
              <Text>🕐 14:00</Text>
              <Text>📅 Sunday, April 16</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// TODO: Replace with real data from Supabase
const featuredMatches = [
  {
    id: 1,
    team1: { logo: '', name: 'Man City' },
    team2: { logo: '', name: 'Liverpool' },
    date: 'Sun, 16 Apr',
    time: '18:30',
    location: 'Etihad Stadium',
    playerCount: 10,
    maxPlayers: 11,
  },
  {
    id: 2,
    team1: { logo: '', name: 'Arsenal' },
    team2: { logo: '', name: 'Chelsea' },
    date: 'Mon, 17 Apr',
    time: '20:00',
    location: 'Emirates Stadium',
    playerCount: 6,
    maxPlayers: 11,
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.light,
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
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: AccentColors.primary,
  },
  eventCard: {
    backgroundColor: BackgroundColors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardDetails: {
    gap: 4,
  },
});
