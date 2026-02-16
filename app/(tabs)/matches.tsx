import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { MatchCard, ScreenContainer, CategoryFilter } from '@/components/core';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

interface Match {
  id: string;
  team1: { name: string; logo: string };
  team2: { name: string; logo: string };
  date: string;
  sport: string;
  status: 'upcoming' | 'live' | 'completed';
  location: string;
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    team1: { name: 'DET Lions', logo: '' },
    team2: { name: 'KC Chiefs', logo: '' },
    date: 'Friday, Nov 24 - 9:00 PM',
    sport: 'Football',
    status: 'upcoming',
    location: 'Ford Field',
  },
  {
    id: '2',
    team1: { name: 'NY Giants', logo: '' },
    team2: { name: 'DAL Cowboys', logo: '' },
    date: 'Sunday, Nov 26 - 4:30 PM',
    sport: 'Football',
    status: 'upcoming',
    location: 'MetLife Stadium',
  },
  {
    id: '3',
    team1: { name: 'LAL Lakers', logo: '' },
    team2: { name: 'GSW Warriors', logo: '' },
    date: 'Live Now',
    sport: 'Basketball',
    status: 'live',
    location: 'Crypto.com Arena',
  },
  {
    id: '4',
    team1: { name: 'NYY Yankees', logo: '' },
    team2: { name: 'BOS Red Sox', logo: '' },
    date: 'Final',
    sport: 'Baseball',
    status: 'completed',
    location: 'Yankee Stadium',
  },
];

const TABS = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'live', name: 'Live Now' },
  { id: 'results', name: 'Results' },
];

const MatchesScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredMatches = MOCK_MATCHES.filter(match => {
    if (activeTab === 'upcoming') return match.status === 'upcoming';
    if (activeTab === 'live') return match.status === 'live';
    if (activeTab === 'results') return match.status === 'completed';
    return true;
  });

  return (
    <ScreenContainer withScroll>
      <View style={styles.header}>
        <Text variant="h1">Matches</Text>
        <Text variant="body" opacity={0.6}>Follow your favorite teams</Text>
      </View>

      <CategoryFilter
        categories={TABS}
        activeCategory={activeTab}
        onCategoryPress={setActiveTab}
      />

      <View style={styles.section}>
        <View style={styles.matchesList}>
          {filteredMatches.map(match => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              location={match.location}
              onPress={() => router.push({ pathname: '/match', params: { id: match.id } })}
            />
          ))}

          {filteredMatches.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text variant="body" opacity={0.5}>No matches found in this category.</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ height: 100 }} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacing.xl,
    paddingTop: 20,
  },
  section: {
    marginTop: Spacing.md,
  },
  matchesList: {
    gap: Spacing.sm,
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
});

export default MatchesScreen;
