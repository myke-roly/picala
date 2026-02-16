import React from 'react';
import { View, StyleSheet, ScrollView, Share, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';
import { signOut } from '@/services/auth';
import { Text } from '@/components/Text';
import {
  CategoryFilter,
  FeaturedMatch,
  HomeHeader,
  MatchCard,
  ScreenContainer
} from '@/components/core';
import { Spacing } from '@/constants/Spacing';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'football', name: 'Football' },
  { id: 'basketball', name: 'Basketball' },
  { id: 'baseball', name: 'Baseball' },
  { id: 'volleyball', name: 'Volleyball' },
];

const HomeScreen = () => {
  const { user, isAuthenticated } = usePersistentAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState('all');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfilePress = () => {
    if (isAuthenticated) {
      router.push('/profile');
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleInvite = async () => {
    try {
      await Share.share({
        message: 'Join me for a match on Picala! Download the app now.',
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share invite.');
    }
  };

  const handleMatchPress = (matchId: string) => {
    router.push({
      pathname: '/match',
      params: { matchId },
    });
  };

  // Mock data for matches
  const matches = [
    {
      id: '1',
      team1: { logo: '', name: 'DET Lions' },
      team2: { logo: '', name: 'KC Chiefs' },
      date: 'Friday, Nov 24 - 9:00 PM',
      location: 'Ford Field, Detroit',
    },
    {
      id: '2',
      team1: { logo: '', name: 'NY Giants' },
      team2: { logo: '', name: 'DAL Cowboys' },
      date: 'Sunday, Nov 26 - 4:30 PM',
      location: 'MetLife Stadium, NJ',
    },
  ];

  return (
    <ScreenContainer withScroll>
      <HomeHeader
        userEmail={user?.email}
        onProfilePress={handleProfilePress}
        onNotificationPress={() => Alert.alert('Notifications', 'Coming soon!')}
      />

      <FeaturedMatch
        category="American Football"
        title="NFL Week 12: Lions vs Chiefs"
        time="59:45"
        onPress={() => handleMatchPress('1')}
      />

      <View style={styles.sectionHeader}>
        <Text variant="h3" weight="bold">Categories</Text>
      </View>

      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryPress={setActiveCategory}
      />

      <View style={styles.sectionHeader}>
        <Text variant="h3" weight="bold">Upcoming Matches</Text>
        <TouchableOpacity onPress={() => router.push('/matches')}>
          <Text variant="link" weight="semibold">View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.matchesList}>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            location={match.location}
            onPress={() => handleMatchPress(match.id)}
          />
        ))}
      </View>

      <View style={{ height: 100 }} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  matchesList: {
    gap: Spacing.sm,
  },
});

export default HomeScreen;
