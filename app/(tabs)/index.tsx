import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { usePersistentAuth } from '@/hooks/usePersistentAuth';
import { Text } from '@/components/Text';
import {
  Button,
  CategoryFilter,
  FeaturedMatch,
  HomeHeader,
  MatchCard,
  ScreenContainer
} from '@/components/core';
import { Spacing } from '@/constants/Spacing';
import { Colors, TextColors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Category } from '@/components/core/Filter/CategoryFilter';

const CATEGORIES: Category[] = [
  { id: 'football', name: 'Football', icon: 'soccerball' },
  { id: 'volleyball', name: 'Volleyball', icon: 'volleyball' },
  { id: 'tennis', name: 'Tennis', icon: 'tennisball' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball' },
  { id: 'padel', name: 'Padel', icon: 'sportscourt' },
];

const HomeScreen = () => {
  const { user, isAuthenticated } = usePersistentAuth();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const [activeCategory, setActiveCategory] = React.useState('football');

  const handleProfilePress = () => {
    if (isAuthenticated) {
      router.push('/profile');
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleMatchPress = (matchId: string) => {
    router.push({
      pathname: '/matches',
      params: { matchId },
    });
  };

  const upcomingMatches = [
    {
      id: '1',
      team1: { name: 'Man City', logo: 'M' },
      team2: { name: 'Arsenal', logo: 'A' },
      date: 'Sat, 18 May',
      time: '10:00 AM',
      location: 'Camp Nou',
    },
    {
      id: '2',
      team1: { name: 'Lakers', logo: 'L' },
      team2: { name: 'Warriors', logo: 'W' },
      date: 'Sun, 19 May',
      time: '4:00 PM',
      location: 'Crypto Arena',
    }
  ];

  return (
    <ScreenContainer withScroll>
      <HomeHeader
        userEmail={user?.email}
        onProfilePress={handleProfilePress}
        onNotificationPress={() => Alert.alert('Notifications', 'No new notifications')}
      />

      <Button
        leftIcon={<IconSymbol name="plus" color={TextColors.white} />}
        title="Create Match"
        onPress={() => Alert.alert('Create Match', 'Coming soon!')}
      />

      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryPress={setActiveCategory}
        style={styles.categoriesContainer}
      />

      <View style={styles.sectionHeader}>
        <Text variant="h3" weight="bold">My Upcoming Matches</Text>
        <Pressable
          onPress={() => router.push('/matches')}
          style={({ pressed }) => pressed && { opacity: 0.7 }}
        >
          <Text variant="small" weight="bold" style={{ color: Colors.primary }}>See all</Text>
        </Pressable>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: Spacing.md }}
        >
          {upcomingMatches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              time={match.time}
              location={match.location}
              onPress={() => handleMatchPress(match.id)}
            />
          ))}
        </ScrollView>
      </View>


      <View style={styles.sectionHeader}>
        <Text variant="h3" weight="bold">Active Invitations</Text>
      </View>

      <View style={[styles.invitationCard, { backgroundColor: Colors[colorScheme].card, borderColor: Colors[colorScheme].border }]}>
        <View style={styles.invitationHeader}>
          <Text variant="small" weight="bold" style={{ color: Colors.primary, textTransform: 'uppercase' }}>Wed, 22 May</Text>
          <Text variant="small" weight="medium" style={{ color: Colors[colorScheme].text.secondary }}>6:00 PM</Text>
        </View>
        <Text variant="body" weight="bold" style={{ marginBottom: 4 }}>Tennis Doubles</Text>
        <Text variant="small" style={{ color: Colors[colorScheme].text.secondary, marginBottom: 4 }}>City Park Courts</Text>
        <Text variant="small" style={{ color: Colors[colorScheme].text.secondary }}>
          Invited by <Text weight="medium" style={{ color: Colors[colorScheme].text.primary }}>Alex K.</Text>
        </Text>

        <View style={styles.invitationActions}>
          <Pressable
            style={({ pressed }) => [
              styles.invitationButton,
              { backgroundColor: Colors.primary, borderWidth: 0 },
              pressed && { opacity: 0.8 }
            ]}
          >
            <Text weight="bold" style={{ color: '#FFFFFF' }}>Accept</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.invitationButton,
              { borderColor: Colors[colorScheme].border },
              pressed && { backgroundColor: Colors[colorScheme].input }
            ]}
          >
            <Text weight="bold" style={{ color: Colors[colorScheme].text.primary }}>Decline</Text>
          </Pressable>
        </View>
      </View>

      {/* Featured Match */}
      <View style={styles.sectionHeader}>
        <Text variant="h3" weight="bold">Featured Match</Text>
      </View>

      <FeaturedMatch
        category="Premier League"
        title="Man City vs Arsenal"
        time="2:00 PM"
        onPress={() => handleMatchPress('featured')}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    marginVertical: Spacing.xxl
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  matchCardItem: {
    width: 280,
    marginRight: Spacing.md,
  },
  invitationCard: {
    padding: Spacing.lg,
    borderRadius: Spacing.borderRadius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  invitationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  invitationActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  invitationButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
});

export default HomeScreen;
