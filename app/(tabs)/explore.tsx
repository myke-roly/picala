import React from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import {
  ScreenContainer,
  BaseInput,
  MatchCard,
  CategoryFilter
} from '@/components/core';
import { getFeaturedMatches } from '@/services/matches';
import { useQuery } from '@/hooks/useQuery';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'trending', name: 'Trending' },
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'nearby', name: 'Nearby' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const { data: featuredMatches, loading, error } = useQuery(getFeaturedMatches);

  return (
    <ScreenContainer withScroll>
      <View style={styles.header}>
        <Text variant="h1">Explore</Text>
        <Text variant="body" opacity={0.6}>Find your next favorite match</Text>
      </View>

      <BaseInput
        placeholder="Search for matches, teams or venues..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon="magnifyingglass"
        containerStyle={styles.searchBar}
      />

      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryPress={setActiveCategory}
      />

      <View style={styles.section}>
        <Text variant="h3" weight="bold" style={styles.sectionTitle}>
          {activeCategory === 'all' ? 'Featured for You' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Matches`}
        </Text>

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text variant="caption" style={{ marginTop: 12 }}>Loading matches...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && featuredMatches && (
          <View style={styles.matchesContainer}>
            {featuredMatches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                date={match.date}
                location={match.location || 'Stadium Arena'}
                onPress={() => router.push({ pathname: '/match', params: { id: match.id } })}
              />
            ))}

            {featuredMatches.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text variant="body" opacity={0.5}>No matches found.</Text>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={{ height: 100 }} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacing.xl,
    paddingTop: 20,
  },
  searchBar: {
    marginBottom: Spacing.xl,
  },
  section: {
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.lg,
  },
  matchesContainer: {
    gap: Spacing.md,
  },
  centerContainer: {
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  errorCard: {
    backgroundColor: '#FEE2E2',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  errorText: {
    color: Colors.status.error,
    textAlign: 'center',
  },
});

