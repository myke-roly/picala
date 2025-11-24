import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, MatchCard } from '@/components';
import { getFeaturedMatches, Match } from '@/services/matches';
import { BackgroundColors, TextColors, AccentColors } from '@/constants';

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover new matches and events</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Featured Matches</Text>
          <View style={styles.matchesContainer}>
            <ExploreContent />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const ExploreContent = () => {
  const [featuredMatches, setFeaturedMatches] = React.useState<Match[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const loadMatches = async () => {
      const matches = await getFeaturedMatches();
      setFeaturedMatches(matches);
    };
    loadMatches();
  }, []);

  return (
    <>
      {featuredMatches.map((match) => (
        <MatchCard
          key={match.id}
          {...match}
          onPress={() => router.push({ pathname: '/match', params: { id: match.id } })}
        />
      ))}
    </>
  );
};
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
    fontWeight: '700',
    color: '#1c434e',
    marginBottom: 16,
  },
  matchesContainer: {
    gap: 16,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
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
